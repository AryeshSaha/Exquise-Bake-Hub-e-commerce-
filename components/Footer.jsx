import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="bg-indigo-900 text-white body-font">
        <div className="container -mb-12 px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="cursor-pointer flex title-font font-medium items-center md:justify-start text-white">
              {/* TODO: Put Logo here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 -ml-2 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-1 text-xl">ExquiseBakeHub.com</span>
            </a>
            <p className="mt-2 text-center text-md text-gray-300">
              Indulge in Exquisite Delights Where Passionate Baking Meets
              Heartfelt Creations!
            </p>
            {/* TODO: put this in about us page */}
            {/* <p className="text-center text-md text-gray-500">
              Welcome to Exquisite Bake Hub, where each delightful creation is
              lovingly crafted in the warmth of our home kitchen, bringing you a
              taste of homemade perfection with every heavenly bite.
            </p> */}
          </div>
          <div className="flex-grow flex flex-wrap md:pl-40 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="uppercase title-font font-medium text-white tracking-widest text-sm mb-3">
                about
              </h2>
              <nav className="list-none capitalize mb-10">
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    about us
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    privacy
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    testimonials
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="uppercase title-font font-medium text-white tracking-widest text-sm mb-3">
                help
              </h2>
              <nav className="list-none capitalize mb-10">
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    contact us
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    f.a.qs
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    cancellation
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    delivery
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="uppercase title-font font-medium text-white tracking-widest text-sm mb-3">
                social media
              </h2>
              <nav className="list-none capitalize mb-10">
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    facebook
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 cursor-pointer hover:border-b-2 hover:border-indigo-300 hover:text-white">
                    instagram
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-indigo-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-700 text-sm text-center sm:text-left">
              © {year} ExquiseBakeHub.com | All Rights Reserved
            </p>
            {/* Social Icons */}
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <Link
                href={"/"}
                target="_blank"
                className="ml-3 text-gray-500 cursor-pointer hover:scale-110 hover:shadow-md"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </Link>
              <Link
                href={"https://www.instagram.com/exquise.bake_hub_/"}
                target="_blank"
                className="ml-3 text-gray-500 cursor-pointer hover:scale-110 hover:shadow-md"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
