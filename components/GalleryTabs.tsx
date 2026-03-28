"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

type Tab = "all" | "new" | "commission";

const TABS: { id: Tab; label: string }[] = [
  { id: "all",        label: "All Work"    },
  { id: "new",        label: "New Work"    },
  { id: "commission", label: "Commissions" },
];

const CATEGORY_GRADIENT: Record<string, string> = {
  mugs:     "linear-gradient(145deg, #8B4513, #C4622D)",
  vases:    "linear-gradient(145deg, #5D3A1A, #8B6914)",
  planters: "linear-gradient(145deg, #7B4F3A, #C4622D)",
  bowls:    "linear-gradient(145deg, #3D2B1F, #6B4C38)",
};

function isValidTab(v: string | null): v is Tab {
  return v === "all" || v === "new" || v === "commission";
}

export default function GalleryTabs({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const param = searchParams.get("tab");
  const active: Tab = isValidTab(param) ? param : "all";

  function setTab(tab: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    const qs = params.toString();
    router.push(qs ? `/gallery?${qs}` : "/gallery", { scroll: false });
  }

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.collection === active);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-earth/15 mb-10">
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
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background:
                      CATEGORY_GRADIENT[product.category] ??
                      "linear-gradient(145deg, #3D2B1F, #6B4C38)",
                  }}
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-earth/50 flex items-center justify-center">
                    <span className="font-serif text-[10px] uppercase tracking-[0.14em] text-parchment/80">
                      Sold Out
                    </span>
                  </div>
                )}
                {product.collection === "new" && (
                  <div className="absolute top-2 left-2 bg-clay text-parchment font-serif text-[9px] uppercase tracking-[0.12em] px-2 py-0.5">
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
