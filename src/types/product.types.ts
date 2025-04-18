export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  bestSeller?: boolean;
  glutenFree?: boolean;
  vegan?: boolean;
  featured?: boolean;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export type ProductCategory = "COOKIES" | "CAKE" | "BRETZEL" | "PASTRIES" | "CROISSANT" | "BAGEL" | "BREAD" | "ALL";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: string;
  estimatedDelivery: string;
}