import { Suspense } from "react";
import GalleryTabs from "@/components/GalleryTabs";
import { getSquareCatalogProducts } from "@/lib/square-catalog";

export default async function ShopPage() {
  let products = await getSquareCatalogProducts().catch((err: unknown) => {
    console.error("[shop] Failed to fetch Square catalog:", err);
    return [] as import("@/lib/types").Product[];
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">

      {/* Header */}
      <div className="flex items-baseline justify-between mb-8 pb-5 border-b border-earth/15">
        <h1 className="font-display text-4xl font-normal text-earth">
          The <em className="italic text-clay">Shop</em>
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.14em] text-mist">
          {products.length} pieces
        </p>
      </div>

      {products.length === 0 ? (
        <p className="font-serif text-mist text-sm py-10 text-center">
          Nothing here yet — check back soon.
        </p>
      ) : (
        <Suspense fallback={<div className="font-serif text-mist text-sm py-10">Loading...</div>}>
          <GalleryTabs products={products} />
        </Suspense>
      )}
    </div>
  );
}
