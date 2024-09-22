import { Database } from "./database.types";

// Helper types for getting row, insert, and update types from tables
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Profile type
export type Profile = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  stores: string[];
  account_id: string;
  chats: string[];
  carts: string[];
  group: string;
};

// Item type
export type Item = {
  item_id: string;
  store_id: string | null; // Allow store_id to be null
  item_img: string | null;
  item_name: string;
  item_description: string | null;
  price: number;
  quantity: number | null; // Array of cart IDs that the item is in
  created_at: string | null; // Adjust type if necessary
  updated_at: string | null; // Adjust type if necessary
};

// Store type
export type Store = {
  id: string;
  name: string;
  description: string;
  logo: string;
  phone_number: string;
  owner_id: string; // Reference to the owner (a profile)
  instagram_url?: string;
  delivery_price: number;
  delivery_time: string;
  items: string[]; // List of item IDs
};
// ValidSegments
export type ValidSegments =
  | "userView"
  | "adminView"
  | "cart"
  | "orders"
  | "menu"
  | "item";

// Chat type
export type Chat = {
  id: string;
  last_message: string;
  last_message_time: string;
  participants: ChatParticipant[]; // Array of chat participants
};

// Chat Participant type
export type ChatParticipant = {
  id: string;
  chat_id: string; // Reference to the chat
  user_id: string; // Reference to the user
  joined_at: string;
  last_read_message_id?: string; // Optional: track last read message
  role?: "admin" | "member"; // Optional: user role in the chat
};

// Family Notification type
export type FamilyNotification = {
  id: string;
  user_id: string;
  message: string;
  timestamp: string;
  read: boolean;
  description: string;
  reaction: string;
};

// Cart type
export type Cart = {
  id: string;
  user_id: string; // Reference to the user
  items: CartItem[]; // Array of cart items
  total_price: number;
};

// CartItem type
export type CartItem = {
  id: string;
  item: Item[];
};

// Order and OrderItem types (if needed for future use)
export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type Order = {
  id: number;
  created_at: string;
  status: string | null;
  total: number | null;
  user_id: string | null;
  order_items: OrderItem[];
};

export type OrderItem = {
  id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
};
