import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({}); //object of objects
  const [subTotalAmt, setSubTotalAmt] = useState(0.00)

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    try {
      if (localCart) {
        setCart(JSON.parse(localCart));
        subTotalAmtPayable(JSON.parse(localCart))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const subTotalAmtPayable = (cart) => {
    let keys = Object.keys(cart)
    let subTotal = 0.00
    let total = 0.00
    for(let i = 0; i < keys.length; i++) {
      subTotal = cart[keys[i]].price * cart[keys[i]].qty
      total += subTotal
    }
    setSubTotalAmt(total)
  }

  const addToCart = (itemCode, name, qty, price, flavor, weight, category) => {
    // Deep copy of the cart object using JSON serialization
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { name, qty, price, flavor, weight, category };
    }
    // console.log("Added to cart: ", newCart); // TODO: Add functionality for adding item to Cart here
    localStorage.setItem("cart", JSON.stringify(newCart));
    subTotalAmtPayable(newCart)
    setCart(newCart);
  };

  const reduceFromCart = (
    itemCode,
    name,
    qty,
    price,
    flavor,
    weight,
    category
  ) => {
    // Deep copy of the cart object using JSON serialization
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
    }
    if (newCart[itemCode].qty < 1) delete newCart[itemCode];
    // console.log("Reduced from cart: ", newCart); // TODO: Add functionality for reducing item to Cart here
    localStorage.setItem("cart", JSON.stringify(newCart));
    subTotalAmtPayable(newCart)
    setCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };
  return (
    <>
      <NavBar cart={cart} addToCart={addToCart} reduceFromCart={reduceFromCart} clearCart={clearCart} subTotalAmt={subTotalAmt} />
      <Component cart={cart} addToCart={addToCart} reduceFromCart={reduceFromCart} clearCart={clearCart} subTotalAmt={subTotalAmt} {...pageProps} />
      <Footer />
    </>
  );
}
