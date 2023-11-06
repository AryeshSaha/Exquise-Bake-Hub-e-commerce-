// CartContext.js
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleCart = () => {
    setCartOpen((prevState) => !prevState);
  };

  const toggleDropDown = (instruction) => {
    setDropdown(instruction);
  };

  return (
    <CartContext.Provider value={{ dropdown, toggleDropDown, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
