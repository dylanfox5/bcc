"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { DeliveryMethod } from "@/lib/types";
import SquarePaymentForm from "@/components/SquarePaymentForm";
import LocalDeliveryForm from "@/components/LocalDeliveryForm";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-display italic text-earth text-2xl mb-6">No items in cart.</p>
        <Link
          href="/gallery"
          className="font-serif text-[11px] uppercase tracking-[0.14em] text-clay border-b border-clay pb-0.5 hover:text-earth hover:border-earth transition-colors"
        >
          Back to gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl font-normal text-earth mb-10">
        Check<em className="italic text-clay">out</em>
      </h1>

      {/* Order summary */}
      <div className="bg-sand border border-earth/10 p-6 mb-8">
        <h2 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist mb-4">
          Order Summary
        </h2>
        <ul className="divide-y divide-earth/10">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="py-2.5 flex justify-between">
              <span className="font-serif text-sm text-bark">
                {product.name} <span className="text-mist">× {quantity}</span>
              </span>
              <span className="font-serif text-sm text-earth">
                {formatPrice(product.price * quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="pt-4 mt-2 border-t border-earth/15 flex justify-between items-baseline">
          <span className="font-serif text-[10px] uppercase tracking-[0.14em] text-mist">Total</span>
          <span className="font-display italic text-clay text-xl">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Delivery method selection */}
      {!deliveryMethod && (
        <div>
          <h2 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist mb-4">
            How would you like to receive your order?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryMethod("shipping")}
              className="bg-sand border border-earth/15 p-5 text-left hover:border-clay transition-colors duration-200 group"
            >
              <p className="font-display text-earth text-base mb-1 group-hover:text-clay transition-colors duration-200">
                Ship to me
              </p>
              <p className="font-serif text-mist text-xs leading-relaxed">
                Pay online with card via Square
              </p>
            </button>
            <button
              onClick={() => setDeliveryMethod("local")}
              className="bg-sand border border-earth/15 p-5 text-left hover:border-clay transition-colors duration-200 group"
            >
              <p className="font-display text-earth text-base mb-1 group-hover:text-clay transition-colors duration-200">
                Local pickup / delivery
              </p>
              <p className="font-serif text-mist text-xs leading-relaxed">
                Submit your info and we&apos;ll be in touch
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Forked checkout flows */}
      {deliveryMethod === "shipping" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist">
              Payment
            </h2>
            <button
              onClick={() => setDeliveryMethod(null)}
              className="font-serif text-[10px] uppercase tracking-[0.12em] text-mist hover:text-clay transition-colors"
            >
              ← Change
            </button>
          </div>
          <SquarePaymentForm totalPrice={totalPrice} />
        </div>
      )}

      {deliveryMethod === "local" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist">
              Local Pickup / Delivery
            </h2>
            <button
              onClick={() => setDeliveryMethod(null)}
              className="font-serif text-[10px] uppercase tracking-[0.12em] text-mist hover:text-clay transition-colors"
            >
              ← Change
            </button>
          </div>
          <LocalDeliveryForm />
        </div>
      )}
    </div>
  );
}
