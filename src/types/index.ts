export type Role = "customer" | "supplier";

export interface Account {
  id: string;
  role: Role;
  name: string;
  avatarColor: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageColor: string;
  rating: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  specs: Record<string, string>;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderRole: Role;
  senderName: string;
  text: string;
  createdAt: number;
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface CategoryBreakdown {
  category: string;
  value: number;
  color: string;
}
