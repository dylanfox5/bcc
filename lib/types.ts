export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  images: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
  collection?: "new" | "commission";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = "shipping" | "local";

export interface OrderDetails {
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  total: number; // in cents
}

export interface LocalDeliveryFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}
