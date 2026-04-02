import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/lib/products";

const featured = PRODUCTS.filter((p) => p.featured);

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">

          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <p className="hero-eyebrow font-serif text-[11px] uppercase tracking-[0.22em] text-clay mb-5">
              Handmade Ceramics
            </p>
            <h1 className="hero-heading font-display text-4xl sm:text-5xl md:text-[3.75rem] leading-[1.08] font-normal text-earth mb-6">
              Thrown by hand,<br />
              <em className="italic text-clay">finished with care.</em>
            </h1>
            <p className="hero-body font-serif text-bark text-lg leading-relaxed max-w-md mb-10">
              Each piece is wheel-thrown in Kansas City and glazed with intention.
              No two are alike — that&apos;s the point.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link
                href="/gallery"
                className="inline-block bg-black text-parchment font-serif text-[11px] uppercase tracking-[0.16em] px-8 py-4 hover:bg-clay transition-colors duration-300"
              >
                View Gallery
              </Link>
              <Link
                href="/gallery"
                className="font-serif text-[13px] text-clay border-b border-clay pb-0.5 hover:text-earth hover:border-earth transition-colors duration-200"
              >
                See what&apos;s new →
              </Link>
            </div>
          </div>

          {/* Right: hero image placeholder */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-sand">
              {/* 2×2 color-block grid — replace with <Image> when photo is ready */}
              <div className="absolute inset-0 grid grid-cols-2 gap-px bg-clay/20">
                <div className="bg-[#8B4513]" />
                <div className="bg-[#D4956A]" />
                <div className="bg-[#E8C9A0]" />
                <div className="bg-[#6B3A2A]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display italic text-parchment/50 text-sm tracking-wide">
                  hero photo
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-earth/15" />
      </div>

      {/* ── Featured Pieces ── */}
      <section className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        <div className="flex items-baseline justify-between mb-8 md:mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-earth">
            Featured <em className="italic text-clay">Pieces</em>
          </h2>
          <Link
            href="/gallery"
            className="font-serif text-[11px] uppercase tracking-[0.14em] text-clay border-b border-clay pb-0.5 hover:text-earth hover:border-earth transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-sand rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background:
                      product.category === "mugs"
                        ? "linear-gradient(145deg, #8B4513, #C4622D)"
                        : product.category === "vases"
                        ? "linear-gradient(145deg, #5D3A1A, #8B6914)"
                        : "linear-gradient(145deg, #3D2B1F, #6B4C38)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-3">
                  <span className="font-display italic text-parchment/50 text-xs">
                    [photo]
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="font-display text-[17px] font-normal text-earth mb-1 group-hover:text-clay transition-colors duration-200">
                  {product.name}
                </p>
                <p className="font-serif text-clay text-base">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
