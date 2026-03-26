"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

const CATEGORY_GRADIENT: Record<string, string> = {
  mugs:     "linear-gradient(145deg, #8B4513, #C4622D)",
  vases:    "linear-gradient(145deg, #5D3A1A, #8B6914)",
  planters: "linear-gradient(145deg, #7B4F3A, #C4622D)",
  bowls:    "linear-gradient(145deg, #3D2B1F, #6B4C38)",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-display italic text-earth text-2xl mb-6">Your cart is empty.</p>
        <Link
          href="/gallery"
          className="font-serif text-[11px] uppercase tracking-[0.14em] text-clay border-b border-clay pb-0.5 hover:text-earth hover:border-earth transition-colors"
        >
          Browse the gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl font-normal text-earth mb-10">
        Your <em className="italic text-clay">Cart</em>
      </h1>

      <ul className="divide-y divide-earth/10 mb-10">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="py-5 flex items-center gap-5">

            {/* Thumbnail */}
            <div
              className="w-16 h-16 rounded-sm flex-shrink-0"
              style={{
                background:
                  CATEGORY_GRADIENT[product.category] ??
                  "linear-gradient(145deg, #3D2B1F, #6B4C38)",
              }}
            />

            {/* Name + price */}
            <div className="flex-1 min-w-0">
              <p className="font-display text-earth text-base">{product.name}</p>
              <p className="font-serif text-clay text-sm">{formatPrice(product.price)}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-7 h-7 border border-earth/30 text-bark hover:border-clay hover:text-clay transition-colors text-sm"
              >
                −
              </button>
              <span className="w-5 text-center font-serif text-sm text-earth">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-7 h-7 border border-earth/30 text-bark hover:border-clay hover:text-clay transition-colors text-sm"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <p className="w-20 text-right font-serif text-sm text-earth">
              {formatPrice(product.price * quantity)}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeItem(product.id)}
              className="font-serif text-[10px] uppercase tracking-[0.12em] text-mist hover:text-clay transition-colors ml-1"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex items-baseline justify-between border-t border-earth/15 pt-6 mb-8">
        <p className="font-serif text-[11px] uppercase tracking-[0.14em] text-mist">Total</p>
        <p className="font-display italic text-clay text-2xl">{formatPrice(totalPrice)}</p>
      </div>

      <Link
        href="/checkout"
        className="block w-full text-center bg-earth text-parchment font-serif text-[11px] uppercase tracking-[0.16em] px-6 py-4 hover:bg-clay transition-colors duration-300"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
