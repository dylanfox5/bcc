"use client";

import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/products";

interface Props {
  totalPrice: number; // in cents
}

export default function SquarePaymentForm({ totalPrice }: Props) {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID ?? "";
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? "";

  async function handlePayment(token: string) {
    const res = await fetch("/api/square/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceId: token, items }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(`Payment failed: ${data.error ?? "Unknown error"}`);
      return;
    }

    clearCart();
    router.push("/checkout/success");
  }

  return (
    <div className="bg-sand border border-earth/10 p-6">
      <p className="font-serif text-bark text-sm mb-5">
        Paying <span className="text-clay">{formatPrice(totalPrice)}</span> securely via Square.
      </p>

      {appId && locationId ? (
        <PaymentForm
          applicationId={appId}
          locationId={locationId}
          cardTokenizeResponseReceived={async (token) => {
            if (token.status === "OK" && token.token) {
              await handlePayment(token.token);
            } else {
              alert("Card tokenization failed. Please try again.");
            }
          }}
        >
          <CreditCard />
        </PaymentForm>
      ) : (
        <div className="border border-earth/20 bg-parchment px-4 py-3 font-serif text-sm text-bark">
          Square credentials not configured. Add{" "}
          <code className="font-mono text-xs text-clay">NEXT_PUBLIC_SQUARE_APP_ID</code> and{" "}
          <code className="font-mono text-xs text-clay">NEXT_PUBLIC_SQUARE_LOCATION_ID</code> to{" "}
          <code className="font-mono text-xs text-clay">.env.local</code>.
        </div>
      )}
    </div>
  );
}
