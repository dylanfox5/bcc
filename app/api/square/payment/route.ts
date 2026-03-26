import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
import { getProduct } from "@/lib/products";
import { CartItem } from "@/lib/types";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN ?? "",
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export async function POST(request: Request) {
  const { sourceId, items } = await request.json() as {
    sourceId: string;
    items: CartItem[];
  };

  if (!sourceId) {
    return NextResponse.json({ error: "Missing sourceId" }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  // Recalculate total server-side from the authoritative product catalog.
  // Never trust the amount sent by the client.
  let amountCents = 0;
  for (const item of items) {
    const product = getProduct(item.product.id);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${item.product.id}` },
        { status: 400 }
      );
    }
    if (!product.inStock) {
      return NextResponse.json(
        { error: `${product.name} is out of stock` },
        { status: 400 }
      );
    }
    amountCents += product.price * item.quantity;
  }

  if (amountCents <= 0) {
    return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
  }

  try {
    const result = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amountCents),
        currency: "USD",
      },
      locationId: process.env.SQUARE_LOCATION_ID ?? "",
    });

    return NextResponse.json({ payment: result.payment });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Payment failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
