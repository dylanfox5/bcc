"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-earth border-b border-earth/20">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={44} />
          <div className="leading-tight">
            <span className="block font-display text-parchment text-base font-normal tracking-wide">
              Ben&apos;s Custom
            </span>
            <span className="block font-display italic text-clay text-base tracking-wide">
              Creations
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <Link
            href="/gallery"
            className="font-serif text-xs uppercase tracking-[0.14em] text-parchment/70 hover:text-clay transition-colors duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/gallery?tab=new"
            className="font-serif text-xs uppercase tracking-[0.14em] text-parchment/70 hover:text-clay transition-colors duration-200"
          >
            New Work
          </Link>
          <Link
            href="/gallery?tab=commission"
            className="font-serif text-xs uppercase tracking-[0.14em] text-parchment/70 hover:text-clay transition-colors duration-200"
          >
            Commissions
          </Link>
          <Link
            href="/cart"
            className="font-serif text-xs uppercase tracking-[0.14em] text-parchment/70 hover:text-clay transition-colors duration-200 flex items-center gap-2"
          >
            Cart
            {totalItems > 0 && (
              <span className="bg-clay text-parchment text-[10px] font-serif rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  );
}
