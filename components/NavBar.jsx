import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import CartContent from "./CartContent";
import { useCart } from "@/context/useCart";
import { Tooltip } from "react-tooltip";

const NavBar = ({
  cart,
  addToCart,
  reduceFromCart,
  clearCart,
  subTotalAmt,
}) => {
  const { isCartOpen, toggleCart } = useCart();

  return (
    <div className="sticky top-0 z-10 bg-gray-200">
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* logo */}
          <a className="cursor-pointer flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">ExquiseBakeHub</span>
          </a>
          {/* nav items */}
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center space-x-5 md:space-x-10">
            <Link
              href={"/"}
              className="text-gray-800 font-semibold hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500 transition-transform"
            >
              Home
            </Link>
            <Link
              href={"/cakes"}
              className="text-gray-800 font-semibold hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500 transition-transform"
            >
              Cakes
            </Link>
            <Link
              href={"/mousses"}
              className="text-gray-800 font-semibold hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500 transition-transform"
            >
              Mousses
            </Link>
            <Link
              href={"/create"}
              className="text-gray-800 font-semibold hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500 transition-transform"
            >
              Create a Cake
            </Link>
          </nav>
          {/* account and cart btns */}
          <div className="flex justify-between items-center w-full md:w-auto md:block md:space-x-2">
            <Link href={"/login"}>
              <button
                className="inline-flex items-cente border-0 p-2 focus:outline-none hover:bg-gray-300 rounded-full text-base mt-4 md:mt-0"
                data-tooltip-id="account"
                data-tooltip-content="Account"
              >
                <RiAccountCircleFill size={25} />
              </button>
            </Link>
            <Tooltip id="account" />
            <button
              onClick={toggleCart}
              className="inline-flex items-cente border-0 p-2 focus:outline-none hover:bg-gray-300 rounded-full text-base mt-4 md:mt-0"
              data-tooltip-id="cart"
              data-tooltip-content="Your Cart"
            >
              <FaShoppingCart size={25} />
            </button>
            <Tooltip id="cart" />
          </div>

          {/* Cart Sidebar */}
          <section
            className={`absolute top-0 right-0 transform transition-transform ${
              isCartOpen ? "translate-x-0" : "translate-x-full"
            } text-gray-600 body-font w-full md:w-auto md:min-w-[25rem] h-[100vh] overflow-y-scroll bg-indigo-100`}
          >
            <CartContent
              cart={cart}
              addToCart={addToCart}
              reduceFromCart={reduceFromCart}
              clearCart={clearCart}
              toggleCart={toggleCart}
              subTotalAmt={subTotalAmt}
              isCheckout={false}
            />
          </section>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
