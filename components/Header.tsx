"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/gallery",               label: "Gallery"     },
  { href: "/gallery?tab=new",       label: "New Work"    },
  { href: "/gallery?tab=commission",label: "Commissions" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black border-b border-crimson/40">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
          <Logo size={44} />
          <div className="leading-tight">
            <span className="block font-display text-clay text-base font-normal tracking-wide">
              Ben&apos;s Custom
            </span>
            <span className="block font-display italic text-clay text-base tracking-wide">
              Creations
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif text-xs uppercase tracking-[0.14em] text-clay/80 hover:text-crimson transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
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

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/cart"
            className="font-serif text-xs uppercase tracking-[0.14em] text-clay/80 hover:text-clay transition-colors duration-200 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            {totalItems > 0 && (
              <span className="bg-clay text-parchment text-[10px] font-serif rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span className={`block w-5 h-px bg-clay transition-transform duration-200 origin-center ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block w-5 h-px bg-clay transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-clay transition-transform duration-200 origin-center ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 bg-black px-6 py-4 flex flex-col gap-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-xs uppercase tracking-[0.14em] text-clay/80 hover:text-clay transition-colors duration-200 py-3.5 border-b border-white/10 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
