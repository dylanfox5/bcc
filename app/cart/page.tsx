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
    <div className="max-w-2xl mx-auto px-6 py-8 md:py-14">
      <h1 className="font-display text-3xl md:text-4xl font-normal text-earth mb-8 md:mb-10">
        Your <em className="italic text-clay">Cart</em>
      </h1>

      <ul className="divide-y divide-earth/10 mb-10">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="py-5 flex items-start gap-4">

            {/* Thumbnail */}
            <div
              className="w-16 h-16 rounded-sm flex-shrink-0"
              style={{
                background:
                  CATEGORY_GRADIENT[product.category] ??
                  "linear-gradient(145deg, #3D2B1F, #6B4C38)",
              }}
            />

            {/* Name + price + controls */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-display text-earth text-base leading-snug">{product.name}</p>
                <p className="font-serif text-earth text-sm flex-shrink-0">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
              <p className="font-serif text-clay text-sm mb-3">{formatPrice(product.price)}</p>

              <div className="flex items-center justify-between">
                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-10 h-10 border border-earth/30 text-bark hover:border-clay hover:text-clay transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-serif text-sm text-earth">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-10 h-10 border border-earth/30 text-bark hover:border-clay hover:text-clay transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="font-serif text-[10px] uppercase tracking-[0.12em] text-mist hover:text-clay transition-colors py-2 px-1"
                >
                  Remove
                </button>
              </div>
            </div>

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
        className="block w-full text-center bg-black text-parchment font-serif text-[11px] uppercase tracking-[0.16em] px-6 py-4 hover:bg-clay transition-colors duration-300"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
