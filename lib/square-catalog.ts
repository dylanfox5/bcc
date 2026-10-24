import { SquareClient, SquareEnvironment } from "square";
import type { Product } from "./types";

// Square category names that map to collection tabs (everything else is a product type)
const COLLECTION_CATEGORY_MAP: Record<string, string> = {
  "New Work": "new",
  "Commissions": "commission",
  "Featured": "featured",
};

function createClient() {
  return new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN ?? "",
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
}

export async function getSquareCatalogProducts(): Promise<Product[]> {
  if (!process.env.SQUARE_ACCESS_TOKEN) {
    console.error("[square-catalog] SQUARE_ACCESS_TOKEN is not set");
    return [];
  }

  const client = createClient();

  const [itemPage, imagePage, categoryPage] = await Promise.all([
    client.catalog.list({ types: "ITEM" }),
    client.catalog.list({ types: "IMAGE" }),
    client.catalog.list({ types: "CATEGORY" }),
  ]);

  // Build image ID → URL map
  const imageUrlMap = new Map<string, string>();
  for await (const obj of imagePage) {
    if (obj.type === "IMAGE" && obj.imageData?.url) {
      imageUrlMap.set(obj.id, obj.imageData.url);
    }
  }

  // Build category ID → name map
  const categoryNameMap = new Map<string, string>();
  for await (const obj of categoryPage) {
    if (obj.type === "CATEGORY" && obj.id && obj.categoryData?.name) {
      categoryNameMap.set(obj.id, obj.categoryData.name);
    }
  }

  const products: Product[] = [];

  for await (const obj of itemPage) {
    if (obj.type !== "ITEM" || !obj.itemData) continue;

    const item = obj.itemData;

    // Use the first variation's price
    let price = 0;
    const firstVariation = item.variations?.[0];
    if (
      firstVariation?.type === "ITEM_VARIATION" &&
      firstVariation.itemVariationData?.priceMoney?.amount != null
    ) {
      price = Number(firstVariation.itemVariationData.priceMoney.amount);
    }

    // Resolve image URLs from the image map
    const images = (item.imageIds ?? [])
      .map((id) => imageUrlMap.get(id))
      .filter((url): url is string => url != null);

    // Resolve category names and split into collections vs product types
    const allCategoryNames = (item.categories ?? [])
      .map((ref) => categoryNameMap.get(ref.id ?? "") ?? "")
      .filter(Boolean);

    const collections = allCategoryNames
      .filter((name) => name in COLLECTION_CATEGORY_MAP)
      .map((name) => COLLECTION_CATEGORY_MAP[name]);

    const categories = allCategoryNames
      .filter((name) => !(name in COLLECTION_CATEGORY_MAP))
      .map((name) => name.toLowerCase());

    products.push({
      id: obj.id,
      name: item.name ?? "Untitled",
      description: item.description ?? "",
      price,
      images,
      categories,
      collections,
      inStock: true,
      featured: collections.includes("featured"),
    });
  }

  return products;
}

export async function getSquareCatalogProduct(id: string): Promise<Product | undefined> {
  if (!process.env.SQUARE_ACCESS_TOKEN) return undefined;

  const client = createClient();

  try {
    const response = await client.catalog.object.get({
      objectId: id,
      includeRelatedObjects: true,
    });

    const obj = response.object;
    if (!obj || obj.type !== "ITEM" || !obj.itemData) return undefined;

    const item = obj.itemData;

    const imageUrlMap = new Map<string, string>();
    const categoryNameMap = new Map<string, string>();
    for (const related of response.relatedObjects ?? []) {
      if (related.type === "IMAGE" && related.imageData?.url) {
        imageUrlMap.set(related.id, related.imageData.url);
      }
      if (related.type === "CATEGORY" && related.id && related.categoryData?.name) {
        categoryNameMap.set(related.id, related.categoryData.name);
      }
    }

    let price = 0;
    const firstVariation = item.variations?.[0];
    if (
      firstVariation?.type === "ITEM_VARIATION" &&
      firstVariation.itemVariationData?.priceMoney?.amount != null
    ) {
      price = Number(firstVariation.itemVariationData.priceMoney.amount);
    }

    const images = (item.imageIds ?? [])
      .map((imgId) => imageUrlMap.get(imgId))
      .filter((url): url is string => url != null);

    const allCategoryNames = (item.categories ?? [])
      .map((ref) => categoryNameMap.get(ref.id ?? "") ?? "")
      .filter(Boolean);

    const collections = allCategoryNames
      .filter((name) => name in COLLECTION_CATEGORY_MAP)
      .map((name) => COLLECTION_CATEGORY_MAP[name]);

    const categories = allCategoryNames
      .filter((name) => !(name in COLLECTION_CATEGORY_MAP))
      .map((name) => name.toLowerCase());

    return {
      id: obj.id,
      name: item.name ?? "Untitled",
      description: item.description ?? "",
      price,
      images,
      categories,
      collections,
      inStock: true,
      featured: collections.includes("featured"),
    };
  } catch {
    return undefined;
  }
}
