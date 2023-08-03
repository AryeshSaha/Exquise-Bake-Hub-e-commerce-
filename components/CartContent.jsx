import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaPlus, FaMinus, FaRupeeSign } from "react-icons/fa";
import { MdShoppingCartCheckout, MdClear } from "react-icons/md";
import Link from "next/link";

const CartContent = ({
  toggleCart,
  cart,
  addToCart,
  reduceFromCart,
  clearCart,
  subTotalAmt,
  isCheckout,
}) => {
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
          {!isCheckout && "Shopping Cart"}
        </h1>
        <div className="w-full mx-auto px-2 md:px-5 overflow-x-hidden">
          {Object.keys(cart).length == 0 && (
            <p className="text-lg font-semibold text-gray-800 text-center">
              Your Cart is Empty!
            </p>
          )}
          {Object.keys(cart).length > 0 && (
            <table
              className={
                isCheckout
                  ? "table-fixed w-full text-center"
                  : "table-auto w-full text-left"
              }
            >
              <thead>
                <tr>
                  <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Cake
                  </th>
                  <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Quantity
                  </th>
                  <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart).map((item) => (
                  <tr key={item}>
                    <td className="px-2 py-3">{cart[item].name}</td>
                    <td className="px-2 py-3 font-semibold text-lg text-gray-900">
                      <div className="flex justify-center items-center">
                        <FaMinus
                          onClick={() =>
                            reduceFromCart(
                              item,
                              cart[item].name,
                              1,
                              cart[item].price,
                              cart[item].flavor,
                              cart[item].weight,
                              cart[item].category
                            )
                          }
                          className="cursor-pointer mx-2 text-indigo-500"
                        />
                        {cart[item].qty}
                        <FaPlus
                          onClick={() => {
                            addToCart(
                              item,
                              cart[item].name,
                              1,
                              cart[item].price,
                              cart[item].flavor,
                              cart[item].weight,
                              cart[item].category
                            );
                          }}
                          className="cursor-pointer mx-2 text-indigo-500"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-3 text-md md:text-lg font-medium text-gray-900">
                      <div className="flex justify-center items-center">
                        <FaRupeeSign /> {cart[item].price}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {Object.keys(cart).length > 0 && isCheckout && (
            <div className="flex justify-center items-center my-2 px-2">
              <p className="px-2 py-3 text-lg font-semibold text-gray-900">
                SubTotal:
              </p>
              <p className="flex justify-center items-center px-2 py-3 text-lg text-gray-900">
                <FaRupeeSign /> {subTotalAmt}
              </p>
            </div>
          )}
        </div>
        {/* buttons */}
        {Object.keys(cart).length > 0 && !isCheckout && (
          <div className="flex flex-col mt-8 space-y-8 md:flex-row md:justify-evenly md:items-center md:space-y-0">
            <button
              onClick={clearCart}
              className="flex justify-center items-center w-full md:w-auto uppercase text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
            >
              <MdClear className="mr-2 mt-auto" size={23} />
              clear
            </button>
            <Link
              href={"/checkout"}
              className="w-full flex justify-center items-center md:w-auto"
              onClick={toggleCart}
            >
              <button className="flex justify-center items-center w-full md:w-auto uppercase text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                checkout
                <MdShoppingCartCheckout className="ml-2 mt-auto" size={20} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartContent;
