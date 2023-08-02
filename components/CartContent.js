import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaPlus, FaMinus, FaRupeeSign } from "react-icons/fa";
import { MdShoppingCartCheckout, MdClear } from "react-icons/md";

const CartContent = ({ toggleCart }) => {
  return (
    <>
      <div className="container px-5 py-10 mx-auto">
        <span
          onClick={toggleCart}
          className="absolute top-5 right-5 cursor-pointer"
        >
          <GiCrossMark size={30} className="text-pink-500" />
        </span>
        <h1 className="sm:text-4xl text-3xl font-medium text-center title-font mb-5 text-gray-900">
          Pricing
        </h1>
        <div className="w-full mx-auto px-2 md:px-5 overflow-x-hidden">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Cake
                </th>
                <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>
                <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-3">The Chocolava Fort</td>
                <td className="font-semibold px-2 py-3 text-lg text-gray-900">
                  <div className="flex justify-center items-center">
                    <FaPlus className="cursor-pointer mx-2 text-indigo-500" /> 1
                    <FaMinus className="cursor-pointer mx-2 text-indigo-500" />
                  </div>
                </td>
                <td className="px-2 py-3 text-md md:text-lg font-medium text-gray-900">
                  <div className="flex justify-center items-center">
                    <FaRupeeSign /> 375.00
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-3">The Chocolava Fort</td>
                <td className="px-2 py-3 font-semibold text-lg text-gray-900">
                  <div className="flex justify-center items-center">
                    <FaPlus className="cursor-pointer mx-2 text-indigo-500" /> 1
                    <FaMinus className="cursor-pointer mx-2 text-indigo-500" />
                  </div>
                </td>
                <td className="px-2 py-3 text-md md:text-lg font-medium text-gray-900">
                  <div className="flex justify-center items-center">
                    <FaRupeeSign /> 650.00
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end items-center my-2 px-2">
            <p className="px-2 py-3 text-lg uppercase font-semibold text-gray-900">
              Total:
            </p>
            <p className="flex justify-center items-center px-2 py-3 text-lg text-gray-900">
              <FaRupeeSign /> 1025.00
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button className="flex justify-center items-center uppercase mx-auto md:ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
            <MdClear className="mr-2 mt-auto" size={23} />
            clear
          </button>
          <button className="flex justify-center items-center uppercase mx-auto md:ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            checkout
            <MdShoppingCartCheckout className="ml-2 mt-auto" size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartContent;
