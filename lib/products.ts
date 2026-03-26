import { Product } from "./types";

// Placeholder product data — replace with real CMS/DB data
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Speckled Mug",
    description:
      "A hand-thrown stoneware mug with a natural speckled glaze. Holds approximately 12oz.",
    price: 4500,
    images: ["/images/placeholder.jpg"],
    category: "mugs",
    inStock: true,
    featured: true,
    collection: "new",
  },
  {
    id: "2",
    name: "Bud Vase",
    description:
      "A small, elegant bud vase with a matte white glaze. Perfect for a single stem.",
    price: 3500,
    images: ["/images/placeholder.jpg"],
    category: "vases",
    inStock: true,
    featured: true,
    collection: "new",
  },
  {
    id: "3",
    name: "Dinner Bowl",
    description:
      "A wide, shallow bowl ideal for pasta, salads, or soup. Hand-finished with a reactive glaze.",
    price: 5500,
    images: ["/images/placeholder.jpg"],
    category: "bowls",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Planter",
    description:
      "A sturdy ceramic planter with drainage hole and matching saucer.",
    price: 6500,
    images: ["/images/placeholder.jpg"],
    category: "planters",
    inStock: false,
    featured: false,
  },
  {
    id: "5",
    name: "Custom Mug Set",
    description:
      "A set of four matching hand-thrown mugs glazed to your color preference. Lead time 3–4 weeks.",
    price: 16000,
    images: ["/images/placeholder.jpg"],
    category: "mugs",
    inStock: true,
    featured: false,
    collection: "commission",
  },
  {
    id: "6",
    name: "Personalized Bowl",
    description:
      "A one-of-a-kind bowl with your choice of glaze, size, and an optional hand-stamped name or date.",
    price: 8500,
    images: ["/images/placeholder.jpg"],
    category: "bowls",
    inStock: true,
    featured: false,
    collection: "commission",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
