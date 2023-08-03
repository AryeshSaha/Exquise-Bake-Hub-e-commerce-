/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsCurrencyRupee, BsFillPrinterFill } from "react-icons/bs";

const Order = ({ subTotalAmt }) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm uppercase title-font text-gray-500 tracking-widest">
              exquisebakehub.com
            </h2>
            <h1 className="capitalize text-gray-900 text-3xl title-font font-medium mb-4">
              order id - #784569
            </h1>
            <p className="leading-relaxed mb-4 capitalize">
              order has been successfully placed.
            </p>
            <div className="flex mb-4">
              <h5 className="flex-grow text-left border-b-2 border-indigo-500 py-2 text-lg px-1">
                Items
              </h5>
              <h5 className="flex-grow text-center border-b-2 border-indigo-500 py-2 text-lg px-1">
                Quantity
              </h5>
              <h5 className="flex-grow text-right border-b-2 border-indigo-500 py-2 text-lg px-1">
                Price
              </h5>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 py-2">
              <div className="w-full text-left text-gray-500">Color</div>
              <div className="w-full text-center text-gray-900">1</div>
              <div className="w-full text-right text-gray-900">Blue</div>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 py-2">
              <div className="w-full text-left text-gray-500">Size</div>
              <div className="w-full text-center text-gray-900">1</div>
              <div className="w-full text-right text-gray-900">Medium</div>
            </div>
            <div className="flex justify-between items-center border-t border-b mb-6 border-gray-200 py-2">
              <div className="w-full text-left text-gray-500">Quantity</div>
              <div className="w-full text-center text-gray-900">4</div>
              <div className="w-full text-right text-gray-900">499</div>
            </div>
            <div className="flex">
              <span className="flex justify-center items-center title-font font-medium text-2xl text-gray-900">
                Subtotal - <BsCurrencyRupee className="-mr-1 mt-0.5" />
                {subTotalAmt}
              </span>
              <button className="flex justify-center items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Print <BsFillPrinterFill className="ml-1 mt-0.5" />
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export default Order;
