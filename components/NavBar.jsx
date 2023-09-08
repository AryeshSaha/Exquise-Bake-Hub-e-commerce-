import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleFill, RiArrowDropDownLine } from "react-icons/ri";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import CartContent from "./CartContent";
import { useCart } from "@/context/useCart";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/router";
import { useAuth } from "@/context/useAuth";

const NavBar = ({
  cart,
  addToCart,
  reduceFromCart,
  clearCart,
  subTotalAmt,
}) => {
  const { user, setUser } = useAuth();
  const { isCartOpen, toggleCart } = useCart();
  const [dropdown, setDropdown] = useState(false);
  const [isBurger, setIsBurger] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setDropdown(false);
    setIsBurger(true);
  }, [router.query]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser("");
  };

  return (
    <div className="bg-gray-200 text-gray-600 shadow-lg flex flex-wrap p-5 items-center sticky top-0 z-50 md:px-32">
      {/* logo */}
      <div className="cursor-pointer flex title-font font-medium items-center text-gray-900 lg:mr-24 xl:mr-40 2xl:72">
        {/* burger menu button */}
        <button
          className="border-none outline-none bg-transparent rounded-sm lg:hidden"
          onClick={() => {
            setDropdown(false);
            setIsBurger(!isBurger);
          }}
        >
          {isBurger ? (
            <RxHamburgerMenu size={25} className="mt-0.5" />
          ) : (
            <RxCross1 size={25} className="mt-0.5" />
          )}
        </button>
        <span className="ml-2 text-xl">ExquiseBakeHub</span>
      </div>
      {/* nav items */}
      <nav
        className={`${
          isBurger ? "hidden" : "flex"
        } flex-col absolute top-20 right-0 w-full bg-gray-800 shadow-xl rounded-lg space-y-3 py-4 transition-all duration-1000 ease-in-out lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:rounded-none lg:flex flex-wrap items-center text-base justify-center lg:flex-row lg:ml-auto lg:mr-auto lg:py-0 lg:space-y-0 lg:space-x-10`}
      >
        <Link
          href={"/"}
          className="text-white border-b border-indigo-500 font-semibold md:text-gray-800 md:border-0 md:hover:text-indigo-500  md:hover:border-b-2 md:hover:border-indigo-500 transition-transform"
        >
          Home
        </Link>
        <Link
          href={"/cakes"}
          className="text-white border-b border-indigo-500 font-semibold md:text-gray-800 md:border-0 md:hover:text-indigo-500  md:hover:border-b-2 md:hover:border-indigo-500 transition-transform"
        >
          Cakes
        </Link>
        <Link
          href={"/mousses"}
          className="text-white border-b border-indigo-500 font-semibold md:text-gray-800 md:border-0 md:hover:text-indigo-500  md:hover:border-b-2 md:hover:border-indigo-500 transition-transform"
        >
          Mousses
        </Link>
        <Link
          href={"/create"}
          className="text-white border-b border-indigo-500 font-semibold md:text-gray-800 md:border-0 md:hover:text-indigo-500  md:hover:border-b-2 md:hover:border-indigo-500 transition-transform"
        >
          Create a Cake
        </Link>
      </nav>
      {/* account and cart btns */}
      <div className="flex justify-end items-center w-auto ml-auto -mr-2 md:mr-0 md:space-x-1">
        <button
          id="dropdownHoverButton"
          onClick={() => {
            setIsBurger(true);
            setDropdown(!dropdown);
          }}
          className="inline-flex items-center border-0 p-2 -mr-3 md:mr-0 focus:outline-none hover:bg-gray-300 rounded-full text-base"
          data-tooltip-id="account"
          data-tooltip-content="Account"
        >
          <RiAccountCircleFill size={25} />
          <RiArrowDropDownLine size={23} />
        </button>
        <Tooltip id="account" />
        {/* Dropdown menu */}
        {dropdown && (
          <div className="z-10 absolute top-16 right-0 text-center lg:text-left md:left-auto md:top-16 md:right-10 2xl:right-32 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700">
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              {!user ? (
                <>
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/account"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/orders?token=${user}`}
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      onClick={() => {
                        logoutHandler();
                        setDropdown(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        <button
          onClick={() => {
            setDropdown(false);
            setIsBurger(true);
            toggleCart();
          }}
          className="inline-flex items-center border-0 p-2 focus:outline-none hover:bg-gray-300 rounded-full text-base"
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
  );
};

export default NavBar;
