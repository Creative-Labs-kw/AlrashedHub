import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useInsertOrder, useInsertOrderItems } from "@/api/orders";
import { initialisePaymentSheet, openPaymentSheet } from "@/lib/stripe";
import { Item, Tables } from "@/types";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";

type CartType = {
  items: Item[];
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
  const [items, setItems] = useState<Item[]>([]);

  const AddItemToCart = (item: Item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.item_id === item.item_id
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.item_id === item.item_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increase quantity
            : cartItem
        );
      }

      // Add new item if it doesn't exist
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      (prevItems) =>
        prevItems
          .map(
            (item) =>
              item.item_id !== itemId
                ? item
                : { ...item, quantity: item.quantity + amount } // Update quantity
          )
          .filter((item) => item.quantity > 0) // Remove items with zero quantity
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async () => {
    if (total <= 0) return;

    await initialisePaymentSheet(Math.floor(total * 100));
    const paid = await openPaymentSheet();
    if (!paid) {
      return;
    }

    InsertOrder({ total }, { onSuccess: saveOrderItems });
  };

  const saveOrderItems = (data: { order_id: string }) => {
    const orderItems = items.map((item) => ({
      order_id: data.order_id,
      item_id: item.item_id,
      quantity: item.quantity,
    }));
    InsertOrderItems(orderItems, { onSuccess: clearCart });
    router.push(`/(userView)/orders/${data.order_id}`);
  };

  return (
    <CartContext.Provider
      value={{ items, AddItemToCart, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
