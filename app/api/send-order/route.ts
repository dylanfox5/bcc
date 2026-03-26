import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CartItem, LocalDeliveryFormData } from "@/lib/types";
import { formatPrice } from "@/lib/products";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(request: Request) {
  const { formData, items } = (await request.json()) as {
    formData: LocalDeliveryFormData;
    items: CartItem[];
  };

  if (!formData?.name?.trim() || !formData?.email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  // Recalculate total from the authoritative product catalog
  const { getProduct } = await import("@/lib/products");
  let totalPrice = 0;
  for (const item of items) {
    const product = getProduct(item.product.id);
    if (!product) continue;
    totalPrice += product.price * item.quantity;
  }

  const itemsList = items
    .map(
      ({ product, quantity }) =>
        `  • ${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`
    )
    .join("\n");

  const body = `
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

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "orders@example.com",
      to: process.env.ORDER_RECIPIENT_EMAIL ?? "potter@example.com",
      subject: `New order request from ${formData.name}`,
      text: body,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Email failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
