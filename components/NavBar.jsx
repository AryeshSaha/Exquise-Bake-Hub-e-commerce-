import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleFill, RiArrowDropDownLine } from "react-icons/ri";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import CartContent from "./CartContent";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { BaseUrl, cartSidebarAtom, dropdownAtom } from "@/global/Atoms";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { user, setUser } = useAuth();
  const [isCartOpen, setIsCartOpen] = useAtom(cartSidebarAtom);
  const [dropdown, setDropdown] = useAtom(dropdownAtom);
  const [isBurger, setIsBurger] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setDropdown(false);
    setIsBurger(true);
  }, [router.query]);

  const logoutHandler = async () => {
    try {
      const {
        data: { msg },
      } = await axios.get(`${BaseUrl}/api/logout`, {
        withCredentials: true,
      });
      setUser(false);
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data.msg, {
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
  };

  return (
    <>
      <div className="bg-gray-200 text-gray-600 shadow-lg flex flex-wrap p-5 items-center sticky top-0 z-40 md:px-32 overflow-x-clip">
        <ToastContainer />
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
          } flex-col absolute top-20 right-0 w-full bg-gray-800 shadow-xl space-y-10 py-10 transform transition-transform duration-1000 ease-in-out lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:rounded-none lg:flex flex-wrap items-center text-xl md:text-base justify-center lg:flex-row lg:ml-auto lg:mr-auto lg:py-0 lg:space-y-0 lg:space-x-10`}
        >
          <Link
            href={"/"}
            className="text-white border-b border-indigo-500 font-semibold lg:text-gray-800 lg:border-0 lg:hover:text-indigo-500  lg:hover:border-b-2 lg:hover:border-indigo-500 transition-transform"
          >
            Home
          </Link>
          <Link
            href={"/cakes"}
            className="text-white border-b border-indigo-500 font-semibold lg:text-gray-800 lg:border-0 lg:hover:text-indigo-500  lg:hover:border-b-2 lg:hover:border-indigo-500 transition-transform"
          >
            Cakes
          </Link>
          <Link
            href={"/mousses"}
            className="text-white border-b border-indigo-500 font-semibold lg:text-gray-800 lg:border-0 lg:hover:text-indigo-500  lg:hover:border-b-2 lg:hover:border-indigo-500 transition-transform"
          >
            Mousses
          </Link>
          <Link
            href={"/create"}
            className="text-white border-b border-indigo-500 font-semibold lg:text-gray-800 lg:border-0 lg:hover:text-indigo-500  lg:hover:border-b-2 lg:hover:border-indigo-500 transition-transform"
          >
            Create a Cake
          </Link>
        </nav>
        {/* account and cart btns */}
        <div className="relative flex justify-end items-center w-auto ml-auto -mr-2 space-x-3 md:mr-0 md:space-x-1">
          <button
            id="dropdownHoverButton"
            onClick={() => {
              setIsBurger(true);
              setDropdown((prev) => !prev);
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
          {/* {dropdown && ( */}
          <div
            className={`z-10 absolute ${
              dropdown
                ? user
                  ? "translate-y-20"
                  : "translate-y-16"
                : "-translate-y-full"
            } right-10 transform transition-transform duration-500 ease-in-out text-center lg:text-left text-xl md:text-base md:left-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700`}
          >
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
                      href="/orders"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        logoutHandler();
                        setDropdown(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* )} */}
          <button
            onClick={() => {
              setDropdown(false);
              setIsBurger(true);
              setIsCartOpen(true);
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
            isCartOpen ? "translate-x-0 fixed" : "translate-x-full"
          } duration-500 ease-in-out text-gray-600 body-font w-full md:w-auto md:min-w-[25rem] min-h-screen overflow-y-scroll bg-indigo-100`}
        >
          <CartContent
            setIsCartOpen={setIsCartOpen}
            isCheckout={false}
          />
        </section>
      </div>
    </>
  );
};

export default NavBar;
