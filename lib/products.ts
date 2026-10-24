export const CATEGORY_GRADIENT: Record<string, string> = {
  mugs:     "linear-gradient(145deg, #8B4513, #C4622D)",
  vases:    "linear-gradient(145deg, #5D3A1A, #8B6914)",
  planters: "linear-gradient(145deg, #7B4F3A, #C4622D)",
  bowls:    "linear-gradient(145deg, #3D2B1F, #6B4C38)",
};

export const DEFAULT_GRADIENT = "linear-gradient(145deg, #3D2B1F, #6B4C38)";

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
