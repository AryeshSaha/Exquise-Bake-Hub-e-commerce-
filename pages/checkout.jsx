import CartContent from "@/components/CartContent";
import axios from "axios";
import React, { useState } from "react";
import { BsCurrencyRupee, BsFillBagCheckFill } from "react-icons/bs";
import { BaseUrl } from "./_app";

const Checkout = ({ cart, subTotalAmt, addToCart, reduceFromCart }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e) => {
    if (e.target.name == 'name')
      setName(e.target.value)
    else if (e.target.name == 'phone')
      setPhone(e.target.value)
    else if (e.target.name == 'email')
      setEmail(e.target.value)
    else if (e.target.name == 'pincode')
      setPincode(e.target.value)
    else if (e.target.name == 'address')
      setAddress(e.target.value)
    // Review: Form Validation not done properly
    if (name && email && pincode)
      setDisabled(false)
  }

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
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const { data: { order } } = await axios.post(`${BaseUrl}/api/createorder`, {
        email, products: cart, amount: subTotalAmt, address,
      });

      if (!order) {
        alert("Server error. Are you online?");
        return;
      }

      console.log(order);

      const options = {
        key: process.env.RZP_KEY_ID,
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Exquiz Bakery",
        description: "Test Transaction",
        image: "https://images.unsplash.com/photo-1516919549054-e08258825f80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        order_id: order.id,
        callback_url: `${BaseUrl}/api/paymentverification`,
        prefill: {
          // Review: get user details and prefill them
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#6366F1",
        },
      };
      const rzpPopup = new window.Razorpay(options);
      rzpPopup.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-2 sm:m-auto">
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
            <label
              htmlFor="email"
              className="leading-7 text-sm text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      {/* Cart Items */}
      <h2 className="font-bold text-xl">2. Review Cart Items</h2>
      <div className="w-auto xl:w-[50vw] mx-auto bg-gray-200 rounded-xl">
        <CartContent
          cart={cart}
          addToCart={addToCart}
          reduceFromCart={reduceFromCart}
          subTotalAmt={subTotalAmt}
          isCheckout={true}
        />
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
    </div>
  );
};

export default Checkout;
