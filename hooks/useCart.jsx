import { BaseUrl, cartAtom, subTotalAtom, userAtom } from "@/global/Atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [subTotalAmt, setSubTotalAmt] = useAtom(subTotalAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();

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

  const orderNow = (
    itemCode,
    name,
    qty,
    price,
    flavor,
    weight,
    category
  ) => {
    // const user = localStorage.getItem("token");
    if (!user)
      toast.error("Please Create an Account.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else {
      let newCart = {};
      newCart[itemCode] = { name, qty, price, flavor, weight, category };
      localStorage.setItem("cart", JSON.stringify(newCart));
      subTotalAmtPayable(newCart);
      setCart(newCart);
      const url = `${BaseUrl}/checkout`;
      router.push(url);
    }
  };

  const addToCart = (
    itemCode,
    name,
    qty,
    price,
    flavor,
    weight,
    category
  ) => {
    // const user = localStorage.getItem("token");
    if (!user)
      toast.error("Please Create an Account.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else {
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
      }
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
    localStorage.setItem("cart", JSON.stringify(newCart));
    subTotalAmtPayable(newCart);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };
  return { cart, setCart, subTotalAmt, setSubTotalAmt, subTotalAmtPayable, orderNow, addToCart, reduceFromCart, clearCart };
};

export default useCart;
