import CartContent from "@/components/CartContent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCurrencyRupee, BsFillBagCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parse } from "cookie";
import { useAtom } from "jotai";
import { BaseUrl, dropdownAtom } from "@/global/Atoms";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";

const Checkout = () => {
  const [, toggleDropDown] = useAtom(dropdownAtom);
  const { loading, setUser, user, userDetails } = useAuth();
  const { cart, subTotalAmt } = useCart()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Please login again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
        setAddress(userDetails.address);
        setPhone(userDetails.phone);
        setPincode(userDetails.pincode);
        getPincode(userDetails.pincode);
        if (userDetails.name && userDetails.email && userDetails.pincode)
          setDisabled(false);
      }
    }
  }, [loading, userDetails]);

  const getPincode = async (value) => {
    const {
      data: { pincodes },
    } = await axios.get(`${BaseUrl}/api/pincode`);
    if (Object.keys(pincodes).includes(value)) {
      setCity(pincodes[value][0]);
      setState(pincodes[value][1]);
    } else {
      toast.error("Sorry! We don't provide service in your area", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setCity("");
      setState("");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") setName(e.target.value);
    else if (e.target.name == "phone") setPhone(e.target.value);
    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let value = e.target.value;
        getPincode(value);
      } else {
        setCity("");
        setState("");
      }
    } else if (e.target.name == "address") setAddress(e.target.value);
    // Review: Form Validation not done properly
    if (name && email && pincode) setDisabled(false);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const config = {
        withCredentials: true,
      };
      const {
        data: { order },
      } = await axios.post(
        `${BaseUrl}/api/createorder`,
        {
          name,
          email,
          products: cart,
          amount: subTotalAmt,
          address,
          phone,
          pincode,
        },
        config
      );

      if (!order) {
        toast.error("Server Error. Make sure you're online", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      const options = {
        key: process.env.RZP_KEY_ID,
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Exquiz Bakery",
        description: "Test Transaction",
        image:
          "https://images.unsplash.com/photo-1516919549054-e08258825f80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        order_id: order.id,
        callback_url: `${BaseUrl}/api/paymentverification`,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        notes: {
          address: "Exquise Bake Hub Address",
        },
        theme: {
          color: "#6366F1",
        },
      };
      const rzpPopup = new window.Razorpay(options);
      rzpPopup.open();
    } catch (error) {
      if (error.response.status == 401) {
        setUser(false);
        toast.error("Please login again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div
      className="container px-2 sm:m-auto min-h-screen"
      onClick={() => toggleDropDown(false)}
    >
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      {/* name and email */}
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      {/* Address */}
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            cols="30"
            rows="2"
            name="address"
            value={address}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1.5 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      {/* phone and pincode */}
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      {/* State and City */}
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              onChange={handleChange}
              value={state}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleChange}
              value={city}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      {/* Cart Items */}
      <h2 className="font-bold text-xl">2. Review Cart Items</h2>
      <div className="w-auto xl:w-[50vw] mx-auto bg-gray-200 rounded-xl">
        <CartContent isCheckout={true} />
      </div>
      {/* Pay Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={checkoutHandler}
          className="disabled:bg-indigo-200 flex justify-center items-center text-white bg-indigo-500 border-0 py-2 px-6 cursor-pointer focus:outline-none hover:bg-indigo-600 rounded text-lg"
          disabled={disabled}
        >
          <BsFillBagCheckFill className="mr-1" />
          Pay
          <BsCurrencyRupee className="ml-1" />
          {subTotalAmt}
        </button>
      </div>
      <ToastContainer rtl={false} pauseOnFocusLoss />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");
  if (
    cookies.jwt === "" ||
    cookies.jwt === null ||
    cookies.jwt === undefined ||
    !cookies.jwt
  ) {
    return {
      redirect: {
        destination:
          "/login?message=Please%20log%20in%20to%20access%20this%20page",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default Checkout;
