import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPrice, CATEGORY_GRADIENT } from "@/lib/products";
import { getSquareCatalogProduct } from "@/lib/square-catalog";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getSquareCatalogProduct(id);

  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 md:py-14">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-10 font-serif text-[11px] uppercase tracking-[0.14em] text-mist">
        <Link href="/shop" className="hover:text-clay transition-colors duration-200">
          Shop
        </Link>
        <span>/</span>
        <span className="text-bark">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-start">

        {/* Image */}
        <div className="aspect-square rounded-sm overflow-hidden relative"
          style={{
            background:
              CATEGORY_GRADIENT[product.categories[0] ?? ""] ??
              "linear-gradient(145deg, #3D2B1F, #6B4C38)",
          }}
        >
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          {product.collections.includes("new") && (
            <span className="font-serif text-[10px] uppercase tracking-[0.18em] text-clay">
              New Work
            </span>
          )}
          {product.collections.includes("commission") && (
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
