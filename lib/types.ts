export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  images: string[];
  categories: string[];
  collections: string[];
  inStock: boolean;
  featured?: boolean;
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

export interface AddressFields {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingFormData {
  email: string;
  phone: string;
  shippingAddress: AddressFields;
  billingSameAsShipping: boolean;
  billingAddress: AddressFields;
  notes: string;
}
