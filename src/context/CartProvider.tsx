import { useInsertOrderItems } from "@/api/order-items";
import { useInsertOrder } from "@/api/orders";
import { initialisePaymentSheet, openPaymentSheet } from "@/lib/stripe";
import { CartItem, Tables } from "@/types";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type Item = Tables<"items"> & { price: number }; // Ensure `price` is always present

type CartType = {
  items: CartItem[];
  AddItemToCart: (item: Item) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  AddItemToCart: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const { mutate: InsertOrder } = useInsertOrder();
  const { mutate: InsertOrderItems } = useInsertOrderItems();
  const [items, setItems] = useState<CartItem[]>([]);

  const AddItemToCart = (item: Item) => {
    const existingItem = items.find((cartItem) => cartItem.item_id === item.id);
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: Crypto.randomUUID(),
      item, // Store the entire item object
      item_id: item.id,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => (sum += item.item.price * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async () => {
    await initialisePaymentSheet(Math.floor(total * 100));
    const paid = await openPaymentSheet();
    if (!paid) {
      return;
    }

    InsertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      item_id: cartItem.item_id,
      quantity: cartItem.quantity,
    }));

    InsertOrderItems(orderItems, {
      onSuccess() {
        clearCart();
        router.push(`/(userView)/orders/${order.id}`);
      },
      onError(error) {
        console.error("Error inserting order items:", error.message);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, AddItemToCart, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
