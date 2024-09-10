// this for passing values into all app if used as hook(Provider & Consumer)
// must use Provider surrounds all screens(children) or whatever component so they can us the values
// use Context hook is to get all the value on other files
import { useInsertOrder } from "@/api/orders";
import { Tables } from "@/database.types";
import { CartItem } from "@/types";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type Product = Tables<"products">;
type CartType = {
  items: CartItem[];
  AddItemToCart: (product: Product) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};
// 1  custom context from the function form react
const CartContext = createContext<CartType>({
  // add default value fro ts
  items: [],
  AddItemToCart: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

// 2
const CartProvider = ({ children }: PropsWithChildren) => {
  //+ insert or create order
  const { mutate: InsertOrder } = useInsertOrder();
  // hold the items
  const [items, setItems] = useState<CartItem[]>([]);
  //+   addItemToCart func
  const AddItemToCart = (product: Product) => {
    // find the item that been added to the cart is = product chosen
    const existingItem = items.find((item) => item.product == product);
    // if the item already in the cart add one
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    //+ How to make new things
    const newCartItem: CartItem = {
      // what it will take to make it
      id: Crypto.randomUUID(), //to change quantity for now
      product,
      product_id: product.id,
      quantity: 1,
    };
    //+ add the items all spread them to the newCartItem
    setItems([newCartItem, ...items]);
  };

  //+   Add updateQuantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    // Create a new array of items with updated quantities
    setItems(
      items
        .map(
          (item) =>
            // Check if the current item's ID matches the one to be updated
            item.id !== itemId
              ? item // If IDs do not match, keep the item unchanged
              : { ...item, quantity: item.quantity + amount } // If IDs match, update the quantity
        )
        .filter((item) => item.quantity > 0) //! if it less then 0 remove it
    );
  };

  //+   To make the sum total
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  // + Clear Cart (after success press on checkout)
  const clearCart = () => {
    setItems([]);
  };

  //+check out
  const checkout = () => {
    InsertOrder(
      { total },
      {
        onSuccess: (data) => {
          clearCart();
          router.push(`/(userView)/orders/${data.id}`);
        },
      }
    );
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
// 3 make the hook
export const useCart = () => useContext(CartContext);
