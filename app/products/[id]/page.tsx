import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS, formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

const CATEGORY_GRADIENT: Record<string, string> = {
  mugs:     "linear-gradient(145deg, #8B4513, #C4622D)",
  vases:    "linear-gradient(145deg, #5D3A1A, #8B6914)",
  planters: "linear-gradient(145deg, #7B4F3A, #C4622D)",
  bowls:    "linear-gradient(145deg, #3D2B1F, #6B4C38)",
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 md:py-14">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-10 font-serif text-[11px] uppercase tracking-[0.14em] text-mist">
        <Link href="/gallery" className="hover:text-clay transition-colors duration-200">
          Gallery
        </Link>
        <span>/</span>
        <span className="text-bark">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-start">

        {/* Image */}
        <div
          className="aspect-square rounded-sm overflow-hidden flex items-end p-4"
          style={{
            background:
              CATEGORY_GRADIENT[product.category] ??
              "linear-gradient(145deg, #3D2B1F, #6B4C38)",
          }}
        >
          <span className="font-display italic text-parchment/40 text-sm">
            [photo]
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          {product.collection === "new" && (
            <span className="font-serif text-[10px] uppercase tracking-[0.18em] text-clay">
              New Work
            </span>
          )}
          {product.collection === "commission" && (
            <span className="font-serif text-[10px] uppercase tracking-[0.18em] text-clay">
              Commission
            </span>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-normal text-earth leading-tight">
            {product.name}
          </h1>

          <p className="font-display italic text-clay text-2xl">
            {formatPrice(product.price)}
          </p>

          <p className="font-serif text-bark text-base leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-earth/10 pt-6">
            {product.inStock ? (
              <AddToCartButton product={product} />
            ) : (
              <p className="font-serif text-[11px] uppercase tracking-[0.14em] text-mist">
                Currently out of stock
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
