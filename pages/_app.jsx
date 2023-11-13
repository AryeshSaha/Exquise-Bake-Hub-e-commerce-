/* eslint-disable react-hooks/exhaustive-deps */
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";

export default function App({ Component, pageProps }) {
  const { user, tokenExpiry } = useAuth();
  const { setCart, subTotalAmtPayable } = useCart();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    tokenExpiry();
    console.log("useEffect from _app.jsx");
  }, [user]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    // const token = localStorage.getItem("token");
    const localCart = localStorage.getItem("cart");
    try {
      if (localCart) {
        setCart(JSON.parse(localCart));
        subTotalAmtPayable(JSON.parse(localCart));
      }
      // * Cart empty can't go to checkout page
      if (
        router.pathname === "/checkout" &&
        Object.keys(JSON.parse(localCart)).length <= 0
      ) {
        toast.error("Can't checkout at the moment", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Cart doesn't exist", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.clear();
    }
  }, [router.query]);

  return (
    <>
      {/* <AuthProvider> */}
        <LoadingBar
          color="#4b4dca"
          progress={progress}
          waitingTime={400}
          height={3}
          onLoaderFinished={() => setProgress(0)}
        />
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
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      {/* </AuthProvider> */}
    </>
  );
}
