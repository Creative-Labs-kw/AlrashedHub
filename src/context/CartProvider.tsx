// this for passing values into all app if used as hook(Provider & Consumer)
// must use Provider surrounds all screens(children) or whatever component so they can us the values
// use Context hook is to get all the value on other files
import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  AddItemToCart: (product: Product) => void;
  updateQuantity: () => void;
};
// 1  custom context from the function form react
const CartContext = createContext<CartType>({
  // add default value fro ts
  items: [],
  AddItemToCart: () => {},
  updateQuantity: () => {},
});

// 2
const CartProvider = ({ children }: PropsWithChildren) => {
  // hold the items
  const [items, setItems] = useState<CartItem[]>([]);
  //   addItemToCart func
  const AddItemToCart = (product: Product) => {
    //+ How to make new things
    const newCartItem: CartItem = {
      // what it will take to make it
      id: "1",
      product,
      product_id: product.id,
      quantity: 1,
    };
    //+ add the items all spread them to the newCartItem
    setItems([newCartItem, ...items]);
  };

  //   Add updateQuantity
  const updateQuantity = () => {};
  return (
    <CartContext.Provider value={{ items, AddItemToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
// 3 make the hook
export const useCart = () => useContext(CartContext);
