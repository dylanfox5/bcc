"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="bg-earth text-parchment font-serif text-[11px] uppercase tracking-[0.16em] px-8 py-3.5 hover:bg-clay transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
