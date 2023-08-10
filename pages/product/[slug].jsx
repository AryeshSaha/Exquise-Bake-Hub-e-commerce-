/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRupeeSign, FaShoppingCart, FaHeart } from "react-icons/fa";
import { BaseUrl } from "../_app";
import { useCart } from "@/context/useCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";

const Slug = ({ cart, addToCart, cake, variants, orderNow }) => {
  const { toggleCart } = useCart();
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [inService, setInService] = useState();
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState();
  const [weight, setWeight] = useState(cake.weight);
  const [flavor, setFlavor] = useState(cake.flavor);
  const colors = {
    butterscotch: "#E3963E",
    chocolate: "#7B3F00",
    vanilla: "#F3E5AB",
    strawberry: "#c83f49",
  };

  useEffect(() => {
    if (slug in cart) setInCart(true);
    else setInCart(false);
    setFlavor(cake.flavor);
    setWeight(cake.weight);
  }, [cart, slug, cake.flavor, cake.weight]);

  const handleOptionsChange = (w, f) => {
    const url = `${BaseUrl}/product/${variants[f][w].slug}`;
    // window.location = url;
    router.push(url, undefined, { shallow: false });
  };

  const toggleAddToWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const pinChangeHandler = (e) => {
    setPin(e.target.value);
  };

  const serviceability = async () => {
    try {
      const data1 = await axios.get(`${BaseUrl}/api/pincode`);
      if (data1?.data.includes(parseInt(pin))) {
        setInService(true);
        toast.success("Yay! your area is deliverable", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setInService(false);
        toast.error("Sorry! Your area is not deliverable", {
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
    } catch (error) {
      console.error(error);
      setInService(null);
    }
  };
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer newestOnTop rtl={false} pauseOnFocusLoss={false} />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={cake.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                E.B. Hub Presents
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {cake.title} ({flavor}/{weight}
                {weight < 2 ? "pound" : "pounds"})
              </h1>
              <div className="flex mb-4">
                {/* Reviews */}
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                {/* Social media icons */}
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
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
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              {/* product desc */}
              <p className="leading-relaxed">{cake.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* Flavors */}
                <div className="flex">
                  <span className="mr-3">Flavors</span>
                  {Object.keys(variants).map(
                    (v) =>
                      variants[v][cake.weight] && (
                        <button
                          key={variants[v][weight]?.slug}
                          onClick={() => handleOptionsChange(weight, v)}
                          className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${
                            v == flavor ? "border-indigo-300" : ""
                          }`}
                          style={{ backgroundColor: colors[v.toLowerCase()] }}
                          data-tooltip-id="flavors"
                          data-tooltip-content={v}
                          data-tooltip-place="top"
                          data-tooltip-delay-show={500}
                          data-tooltip-delay-hide={1000}
                        ></button>
                      )
                  )}
                  <Tooltip
                    id="flavors"
                    style={{
                      backgroundColor: "rgb(72, 74, 192)",
                      color: "#ffffff",
                    }}
                    className="font-semibold"
                  />
                </div>
                {/* cake weight */}
                <div className="flex ml-6 md:ml-auto items-center">
                  <span className="mr-3">Pounds</span>
                  <div className="relative">
                    <select
                      value={weight}
                      onChange={(e) =>
                        handleOptionsChange(e.target.value, flavor)
                      }
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      <option value={weight}>{weight}</option>
                      {Object.keys(variants[flavor]).map(
                        (w) =>
                          w != weight && (
                            <option key={variants[flavor][w]?.slug} value={w}>
                              {w}
                            </option>
                          )
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              {/* Buy */}
              <div className="md:flex lg:flex-col xl:flex-row space-y-3 md:space-y-0">
                <span className="title-font flex items-center font-medium text-2xl lg:mr-3 text-gray-900">
                  <FaRupeeSign /> {cake.price}.00
                </span>
                <div className="flex ml-auto lg:ml-2 xl:ml-auto justify-evenly">
                  <button
                    onClick={() =>
                      orderNow(
                        slug,
                        cake.title,
                        1,
                        cake.price,
                        cake.flavor,
                        cake.weight,
                        cake.category
                      )
                    }
                    className="flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => {
                      if (!inCart) {
                        addToCart(
                          slug,
                          cake.title,
                          1,
                          cake.price,
                          cake.flavor,
                          cake.weight,
                          cake.category
                        );
                      } else {
                        toast.warning("Item already exists in cart", {
                          position: "bottom-left",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                        toggleCart();
                      }
                    }}
                    className="capitalize flex ml-auto md:ml-4 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded mr-auto"
                  >
                    {inCart ? "go to cart" : "add to cart"}
                    <FaShoppingCart size={23} className="ml-1" />
                  </button>
                  <button
                    onClick={toggleAddToWishlist}
                    className="rounded-full mr-2 md:ml-2 w-10 h-10 bg-gray-200 hover:bg-indigo-600 p-0 border-0 inline-flex items-center justify-center text-gray-800 hover:text-gray-100"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <FaHeart
                        size={25}
                        className={inWishlist ? "text-pink-600" : ""}
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm">Check Delivery In Your Area</p>
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    name="pin"
                    id="pin"
                    onChange={pinChangeHandler}
                    className="px-2 border-2 border-gray-400 bg-white rounded-md"
                    placeholder="enter delivery pincode"
                  />
                  <button
                    onClick={serviceability}
                    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Check
                  </button>
                </div>
              </div>
              {inService != null && inService && (
                <p className="text-lime-600">Yay! Delivery is available</p>
              )}
              {inService != null && !inService && (
                <p className="text-red-600">Sorry, Delivery is not available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// This gets called on request
export async function getServerSideProps(context) {
  // Fetching data from external API
  try {
    const { data } = await axios.post(`${BaseUrl}/api/getslug`, {
      slug: context.query.slug,
    });
    // Passing data to the page via props
    return { props: { cake: data.cake, variants: data.variants } };
  } catch (error) {
    console.log(error);
    return { props: { cake: [] } };
  }
}

export default Slug;
