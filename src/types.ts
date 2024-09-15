import { Database } from "./database.types";

//  types helper for ex: product: Table<'product'> to get the type from the DB
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
// to use the row in a table
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

// export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  // size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

// Update the Order type definition to allow user_id to be null
// Assuming you have access to the Order type definition, modify it as follows:
export type Order = {
  id: number;
  created_at: string;
  status: string | null;
  total: number | null; // total is nullable, so we add null here
  user_id: string | null;
  order_items: {
    id: number;
    created_at: string;
    order_id: number | null;
    product_id: number | null;
    quantity: number | null;
    products: {
      id: number;
      name: string;
      price: number;
    } | null;
  }[];
};


export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  // size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
