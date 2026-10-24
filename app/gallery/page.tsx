import Link from "next/link";
import Image from "next/image";
import { getSquareCatalogProducts } from "@/lib/square-catalog";
import type { Product } from "@/lib/types";

const GRADIENTS = [
  "linear-gradient(135deg, #8B4513 0%, #C4622D 50%, #D4956A 100%)",
  "linear-gradient(155deg, #3D2B1F 0%, #6B4C38 40%, #8B6650 100%)",
  "linear-gradient(125deg, #7B4F3A 0%, #C4622D 70%, #E8A87C 100%)",
  "linear-gradient(135deg, #5D3A1A 0%, #8B6914 60%, #B8860B 100%)",
  "linear-gradient(145deg, #2C1810 0%, #5D3A1A 50%, #8B4513 100%)",
  "linear-gradient(160deg, #4A3728 0%, #7B5B4A 50%, #A67C6B 100%)",
];

function toRoman(n: number): string {
  const vals = [10, 9, 5, 4, 1];
  const syms = ["X", "IX", "V", "IV", "I"];
  let result = "";
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
  }
  return result;
}

// Asymmetric grid pattern across a 3-column, auto-row grid
function getSpanClass(index: number): string {
  const pattern = [
    "md:col-span-2 md:row-span-2", // large square
    "md:col-span-1 md:row-span-1", // small
    "md:col-span-1 md:row-span-1", // small
    "md:col-span-1 md:row-span-2", // tall
    "md:col-span-2 md:row-span-1", // wide
    "md:col-span-1 md:row-span-1", // small
  ];
  return pattern[index % pattern.length];
}

export default async function GalleryPage() {
  const all = await getSquareCatalogProducts().catch(() => [] as Product[]);
  const products = all.filter((p) => p.featured);

  return (
    <div className="bg-parchment min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="w-full"
          style={{
            height: "70vh",
            minHeight: "480px",
            background: "linear-gradient(145deg, #2C1810 0%, #5D3A1A 30%, #8B4513 65%, #C4622D 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/75 via-earth/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-12 md:pb-16">
          <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-clay/60 mb-4">
            Kansas City · Ceramics
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-normal text-parchment leading-none">
            The Work
          </h1>
        </div>
      </section>

      {/* ── Artist Statement ── */}
      <section className="max-w-xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="w-6 h-px bg-clay mx-auto mb-10" />
        <blockquote className="font-display text-xl md:text-2xl font-normal text-earth leading-[1.55] italic">
          "Each piece begins as a conversation between hands and clay — what emerges is never quite what was planned, and that's exactly the point."
        </blockquote>
        <p className="font-serif text-[9px] uppercase tracking-[0.25em] text-mist mt-8">
          — Ben Shipley
        </p>
        <div className="w-6 h-px bg-clay mx-auto mt-10" />
      </section>

      {/* ── Collection Grid ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div className="flex items-center gap-5 mb-10 border-t border-earth/15 pt-8">
          <h2 className="font-serif text-[9px] uppercase tracking-[0.28em] text-mist shrink-0">
            Works
          </h2>
          <div className="flex-1 h-px bg-earth/10" />
          <span className="font-serif text-[9px] uppercase tracking-[0.2em] text-mist/40 shrink-0">
            {products.length > 0 ? `${products.length} pieces` : ""}
          </span>
        </div>

        {products.length === 0 ? (
          <p className="font-serif text-mist text-sm text-center py-20">
            Works coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[260px]">
            {products.map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={`group relative overflow-hidden ${getSpanClass(i)}`}
              >
                {/* Gradient base */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                />
                {/* Real image on top */}
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                {/* Dark scrim on hover */}
                <div className="absolute inset-0 bg-earth/0 group-hover:bg-earth/55 transition-colors duration-500" />

                {/* Work number */}
                <span className="absolute top-4 left-4 font-serif text-[9px] uppercase tracking-[0.22em] text-parchment/40 group-hover:text-parchment/70 transition-colors duration-300">
                  {toRoman(i + 1)}
                </span>

                {/* Title reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-parchment text-lg font-normal leading-snug">
                    {product.name}
                  </p>
                  {product.categories[0] && (
                    <p className="font-serif text-[9px] uppercase tracking-[0.18em] text-clay/80 mt-1.5">
                      {product.categories[0]}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── The Practice ── */}
      <section className="border-t border-earth/15 bg-sand">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="font-serif text-[9px] uppercase tracking-[0.28em] text-clay mb-7">
              The Practice
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-earth leading-snug mb-7">
              Wheel-thrown in<br />
              <em className="italic text-clay">Kansas City</em>
            </h2>
            <p className="font-serif text-bark text-[15px] leading-relaxed">
              Every piece is made by hand in Ben's studio. The work spans functional ware — mugs, bowls, vases — to custom commissions shaped around the people who will use them.
            </p>
            <p className="font-serif text-bark text-[15px] leading-relaxed mt-4">
              Glazes are mixed in-studio, drawing from natural materials and the particular light of the Midwest. No two pieces are alike.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-9 font-serif text-[10px] uppercase tracking-[0.2em] text-clay border-b border-clay pb-0.5 hover:text-earth hover:border-earth transition-colors duration-200"
            >
              Browse the shop →
            </Link>
          </div>
          <div
            className="aspect-[4/3] rounded-sm"
            style={{ background: "linear-gradient(155deg, #4A3728 0%, #8B4513 55%, #C4622D 100%)" }}
          />
        </div>
      </section>

    </div>
  );
}
