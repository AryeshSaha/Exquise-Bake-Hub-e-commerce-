import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CartProvider } from "@/context/useCart";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BaseUrl = "http://localhost:3000";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({}); //object of objects
  const [subTotalAmt, setSubTotalAmt] = useState(0.0);
  const router = useRouter();

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    try {
      if (localCart) {
        setCart(JSON.parse(localCart));
        subTotalAmtPayable(JSON.parse(localCart));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const subTotalAmtPayable = (cart) => {
    let keys = Object.keys(cart);
    let subTotal = 0.0;
    let total = 0.0;
    for (let i = 0; i < keys.length; i++) {
      subTotal = cart[keys[i]].price * cart[keys[i]].qty;
      total += subTotal;
    }
    setSubTotalAmt(total);
  };

  const addToCart = (itemCode, name, qty, price, flavor, weight, category) => {
    // Deep copy of the cart object using JSON serialization
    let newCart = JSON.parse(JSON.stringify(cart));
    try {
      if (itemCode in newCart) {
        newCart[itemCode].qty += qty;
        // TODO: Add toastify here
      } else {
        newCart[itemCode] = { name, qty, price, flavor, weight, category };
        toast.success("item added to cart successfully, go to cart", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      subTotalAmtPayable(newCart);
      setCart(newCart);
    } catch (error) {
      console.log(error);
    }
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
    subTotalAmtPayable(newCart);
    setCart(newCart);
  };

  const orderNow = (itemCode, name, qty, price, flavor, weight, category) => {
    console.log(itemCode, name, qty, price, flavor, weight, category);
    let newCart = {};
    newCart[itemCode] = { name, qty, price, flavor, weight, category };
    localStorage.setItem("cart", JSON.stringify(newCart));
    subTotalAmtPayable(newCart);
    setCart(newCart);
    const url = `${BaseUrl}/checkout`;
    router.push(url);
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };
  return (
    <>
      <CartProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <NavBar
          cart={cart}
          addToCart={addToCart}
          reduceFromCart={reduceFromCart}
          clearCart={clearCart}
          subTotalAmt={subTotalAmt}
        />
        <Component
          cart={cart}
          addToCart={addToCart}
          reduceFromCart={reduceFromCart}
          clearCart={clearCart}
          orderNow={orderNow}
          subTotalAmt={subTotalAmt}
          {...pageProps}
        />
        <Footer />
      </CartProvider>
    </>
  );
}
