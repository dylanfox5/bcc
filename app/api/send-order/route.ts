import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CartItem, LocalDeliveryFormData, ShippingFormData, AddressFields } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { getSquareCatalogProduct } from "@/lib/square-catalog";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

function formatAddress(address: AddressFields): string {
  const line2 = address.line2 ? `\n         ${address.line2}` : "";
  return `${address.name}\n         ${address.line1}${line2}\n         ${address.city}, ${address.state} ${address.postalCode} ${address.country}`;
}

type RequestBody =
  | { deliveryMethod: "local"; formData: LocalDeliveryFormData; items: CartItem[] }
  | {
      deliveryMethod: "shipping";
      formData: ShippingFormData;
      items: CartItem[];
      paymentId?: string;
    };

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;
  const { deliveryMethod, formData, items } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  // Recalculate total from the authoritative Square catalog
  let totalPrice = 0;
  for (const item of items) {
    const product = await getSquareCatalogProduct(item.product.id);
    if (!product) continue;
    totalPrice += product.price * item.quantity;
  }

  const itemsList = items
    .map(
      ({ product, quantity }) =>
        `  • ${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`
    )
    .join("\n");

  let subject: string;
  let emailBody: string;

  if (deliveryMethod === "local") {
    if (!formData.name?.trim() || !formData.email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    subject = `New order request from ${formData.name}`;
    emailBody = `
New local delivery order request:

Customer
--------
Name:    ${formData.name}
Email:   ${formData.email}
Phone:   ${formData.phone || "—"}
Address: ${formData.address || "—"}
Notes:   ${formData.notes || "—"}

Order
-----
${itemsList}

Total: ${formatPrice(totalPrice)}
`.trim();
  } else {
    if (!formData.email?.trim() || !formData.shippingAddress?.name?.trim()) {
      return NextResponse.json({ error: "Email and shipping name are required" }, { status: 400 });
    }

    const billingNote = formData.billingSameAsShipping
      ? "Same as shipping"
      : formatAddress(formData.billingAddress);

    subject = `New paid order from ${formData.shippingAddress.name}`;
    emailBody = `
New paid shipping order${body.paymentId ? ` (Square payment ${body.paymentId})` : ""}:

Contact
-------
Email:   ${formData.email}
Phone:   ${formData.phone || "—"}

Shipping Address
----------------
${formatAddress(formData.shippingAddress)}

Billing Address
----------------
${billingNote}

Notes:   ${formData.notes || "—"}

Order
-----
${itemsList}

Total: ${formatPrice(totalPrice)}
`.trim();
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "orders@example.com",
      to: process.env.ORDER_RECIPIENT_EMAIL ?? "potter@example.com",
      subject,
      text: emailBody,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Email failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
