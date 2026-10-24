"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { formatPrice, CATEGORY_GRADIENT, DEFAULT_GRADIENT } from "@/lib/products";

type Tab = "all" | "new" | "commission";

const TABS: { id: Tab; label: string }[] = [
  { id: "all",        label: "All Work"    },
  { id: "new",        label: "New Work"    },
  { id: "commission", label: "Commissions" },
];

function isValidTab(v: string | null): v is Tab {
  return v === "all" || v === "new" || v === "commission";
}

export default function GalleryTabs({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const param = searchParams.get("tab");
  const active: Tab = isValidTab(param) ? param : "all";
  const activeCat = searchParams.get("cat") ?? "";

  function setTab(tab: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") params.delete("tab"); else params.set("tab", tab);
    params.delete("cat");
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }

  function setCat(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === activeCat) { params.delete("cat"); } else { params.set("cat", cat); }
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }

  const tabFiltered =
    active === "all"
      ? products
      : products.filter((p) => p.collections.includes(active));

  // Derive sorted unique product-type categories from tab-filtered products
  const availableCategories = Array.from(
    new Set(tabFiltered.flatMap((p) => p.categories))
  ).sort();

  const filtered =
    activeCat && availableCategories.includes(activeCat)
      ? tabFiltered.filter((p) => p.categories.includes(activeCat))
      : tabFiltered;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-earth/15 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={[
              "font-serif text-[11px] uppercase tracking-[0.16em] px-5 py-4 border-b-2 -mb-px transition-colors duration-200",
              active === tab.id
                ? "border-clay text-clay"
                : "border-transparent text-mist hover:text-bark",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category chips */}
      {availableCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCat(cat)}
              className={[
                "font-serif text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors duration-200",
                activeCat === cat
                  ? "border-earth bg-earth text-parchment"
                  : "border-earth/30 text-mist hover:border-earth hover:text-bark",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Commission callout */}
      {active === "commission" && (
        <div className="bg-sand border border-earth/10 rounded-sm px-6 py-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-earth text-lg mb-1">
              Want something <em className="italic text-clay">made just for you?</em>
            </p>
            <p className="font-serif text-bark text-sm leading-relaxed">
              Each commission is a collaboration. Reach out to discuss glaze, size, and timeline.
            </p>
          </div>
          <a
            href="mailto:benashipley@gmail.com"
            className="shrink-0 w-full sm:w-auto text-center font-serif text-[11px] uppercase tracking-[0.14em] border border-earth text-earth px-5 py-3.5 hover:bg-earth hover:text-parchment transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="font-serif text-mist text-sm py-10 text-center">
          Nothing here yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-sand rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: CATEGORY_GRADIENT[product.categories[0] ?? ""] ?? DEFAULT_GRADIENT,
                  }}
                />
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-earth/50 flex items-center justify-center">
                    <span className="font-serif text-[10px] uppercase tracking-[0.14em] text-parchment/80">
                      Sold Out
                    </span>
                  </div>
                )}
                {product.collections.includes("new") && (
                  <div className="absolute top-2 left-2 bg-crimson text-parchment font-serif text-[9px] uppercase tracking-[0.12em] px-2 py-0.5">
                    New
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="font-display text-[16px] font-normal text-earth mb-1 group-hover:text-clay transition-colors duration-200">
                  {product.name}
                </p>
                <p className="font-serif text-clay text-sm">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
