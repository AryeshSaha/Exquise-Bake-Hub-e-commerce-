import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import CartContent from "./CartContent";
import { useRouter } from "next/router";

const NavBar = ({
  cart,
  addToCart,
  reduceFromCart,
  clearCart,
  subTotalAmt,
}) => {
  const ref = useRef();
  const router = useRouter();
  const [isActive, setIsActive] = useState(router?.asPath);

  const navActiveItem = (path) => setIsActive(path);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <div className="sticky top-0 z-10 bg-gray-200">
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
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
          {/* TODO: Active Link problem */}
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center space-x-5 md:space-x-10">
            <Link
              href={"/"}
              onClick={(e) => navActiveItem("/")}
              className={`hover:text-indigo-900 ${
                isActive === "/" ? "font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={"/cakes"}
              onClick={(e) => navActiveItem("/cakes")}
              className={`hover:text-indigo-900 ${
                isActive === "/cakes" ? "font-bold" : ""
              }`}
            >
              Products
            </Link>
            <Link
              href={"/about"}
              onClick={(e) => navActiveItem("/about")}
              className={`hover:text-indigo-900 ${
                isActive === "/about" ? "font-bold" : ""
              }`}
            >
              About
            </Link>
            <Link
              href={"/contact"}
              onClick={(e) => navActiveItem("/contact")}
              className={`hover:text-indigo-900 ${
                isActive === "/contact" ? "font-bold" : ""
              }`}
            >
              Contact
            </Link>
          </nav>
          <div className="flex justify-between items-center w-full md:w-auto md:block md:space-x-2">
            <Link href={"/login"}>
              <button className="inline-flex items-cente border-0 p-2 focus:outline-none hover:bg-gray-300 rounded-full text-base mt-4 md:mt-0">
                <RiAccountCircleFill size={25} />
              </button>
            </Link>
            <button
              onClick={toggleCart}
              className="inline-flex items-cente border-0 p-2 focus:outline-none hover:bg-gray-300 rounded-full text-base mt-4 md:mt-0"
            >
              <FaShoppingCart size={25} />
            </button>
          </div>

          {/* Cart Sidebar */}
          <section
            ref={ref}
            className="absolute top-0 right-0 transform transition-transform translate-x-full text-gray-600 body-font w-full md:w-auto md:min-w-[25rem] h-[100vh] bg-indigo-100"
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
