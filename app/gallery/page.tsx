import { Suspense } from "react";
import { PRODUCTS } from "@/lib/products";
import GalleryTabs from "@/components/GalleryTabs";

export default function GalleryPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">

      {/* Header */}
      <div className="flex items-baseline justify-between mb-8 pb-5 border-b border-earth/15">
        <h1 className="font-display text-4xl font-normal text-earth">
          The <em className="italic text-clay">Collection</em>
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.14em] text-mist">
          {PRODUCTS.length} pieces
        </p>
      </div>

      <Suspense fallback={<div className="font-serif text-mist text-sm py-10">Loading...</div>}>
        <GalleryTabs products={PRODUCTS} />
      </Suspense>
    </div>
  );
}
