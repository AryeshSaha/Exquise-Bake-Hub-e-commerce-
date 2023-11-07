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
import Error from "next/error";
import { useAuth } from "@/context/useAuth";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Element, Link } from "react-scroll";
import Reviews from "@/components/Reviews";
import ReviewInputs from "@/components/ReviewInputs";

const Slug = ({ cart, addToCart, mousse, variants, error, orderNow }) => {
  const { user } = useAuth()
  const { toggleCart, toggleDropDown } = useCart();
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [inService, setInService] = useState();
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState();
  const [weight, setWeight] = useState();
  const [flavor, setFlavor] = useState();
  const colors = {
    butterscotch: "#E3963E",
    chocolate: "#7B3F00",
    vanilla: "#F3E5AB",
    strawberry: "#c83f49",
    lemon: "#91ff00",
    honey: "#bd8c06",
  };

  useEffect(() => {
    if (slug in cart) setInCart(true);
    else setInCart(false);
    if (!error) {
      setFlavor(mousse.flavor);
      setWeight(mousse.weight);
    }
  }, [cart, slug, error]);

  const handleFlavorChange = (f) => {
    const url = `${BaseUrl}/mousses/${variants[f][0].slug}`;
    router.push(url, undefined, { shallow: false });
  };
  const handleWeightChange = (f, s) => {
    const slugUrl = variants[f].find((i) => i.slug == s).slug;
    const url = `${BaseUrl}/mousses/${slugUrl}`;
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
      const {
        data: { pincodes },
      } = await axios.get(`${BaseUrl}/api/pincode`);
      if (Object.keys(pincodes).includes(pin)) {
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
  
  if (error === 404) {
    return <Error statusCode={error} />
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen" onClick={()=> toggleDropDown(false)}>
        <ToastContainer newestOnTop rtl={false} pauseOnFocusLoss={false} />
        <div className="container px-5 py-16 md:py-44 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={mousse.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                E.B. Hub Presents
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {mousse.title} ({flavor}/{weight}
                {weight < 2 ? "pound" : "pounds"})
              </h1>
              <div className="flex mb-4">
                {/* Reviews */}
                <span className="flex items-center">
                  <BsStarFill className="w-4 h-4 text-indigo-600" />
                  <BsStarFill className="w-4 h-4 text-indigo-600" />
                  <BsStarFill className="w-4 h-4 text-indigo-600" />
                  <BsStarHalf className="w-4 h-4 text-indigo-600" />
                  <BsStar className="w-4 h-4 text-indigo-600" />
                  <span className="text-gray-600 ml-3 hover:text-red-600 cursor-pointer">
                    <Link to="reviews" smooth={true} duration={500}>
                      4 Reviews
                    </Link>
                  </span>
                  /
                  <span className="text-indigo-600 cursor-pointer">
                    <Link to="give_review" smooth={true} duration={500}>
                      Add Your Review
                    </Link>
                  </span>
                </span>
              </div>
              {/* product desc */}
              <p className="leading-relaxed">{mousse.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* Flavors */}
                <div className="flex">
                  <span className="mr-3">Flavors</span>
                  {Object.keys(variants).map((v) => (
                    <button
                      key={v}
                      onClick={() => handleFlavorChange(v)}
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
                  ))}
                  <Tooltip
                    id="flavors"
                    style={{
                      backgroundColor: "rgb(72, 74, 192)",
                      color: "#ffffff",
                    }}
                    className="font-semibold"
                  />
                </div>
                {/* mousse weight */}
                <div className="flex ml-6 md:ml-auto items-center">
                  <span className="mr-3">Pounds</span>
                  <div className="relative">
                    <select
                      value={slug}
                      onChange={(e) =>
                        handleWeightChange(flavor, e.target.value)
                      }
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {variants[flavor]?.map((w) => (
                        <option key={w.slug} value={w.slug}>
                          {w.weight}
                        </option>
                      ))}
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
              
              {/* Stock Info */}
              {mousse.availableQty === 0 && (
                <p className="text-rose-600 capitalize">Out of stock!</p>
              )}

              {/* Buy */}
              <div className="md:flex lg:flex-col xl:flex-row space-y-3 md:space-y-0">
                <span className="title-font flex items-center font-medium text-2xl lg:mr-3 text-gray-900">
                  <FaRupeeSign /> {mousse.price}.00
                </span>
                <div className="flex items-center justify-between lg:ml-2 xl:ml-auto">
                  <button
                    onClick={() =>
                      orderNow(
                        user,
                        slug,
                        mousse.title,
                        1,
                        mousse.price,
                        mousse.flavor,
                        mousse.weight,
                        mousse.category
                      )
                    }
                    className="flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 disabled:bg-indigo-300 rounded"
                    disabled={mousse.availableQty === 0}
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => {
                      if (!inCart) {
                        addToCart(
                          user,
                          slug,
                          mousse.title,
                          1,
                          mousse.price,
                          mousse.flavor,
                          mousse.weight,
                          mousse.category
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
                    className="capitalize flex md:ml-4 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 disabled:bg-indigo-300 rounded"
                    disabled={mousse.availableQty === 0}
                  >
                    {inCart ? "go to cart" : "add to cart"}
                    <FaShoppingCart size={23} className="ml-1" />
                  </button>
                  {/* Wishlist */}
                  {/* <button
                    onClick={toggleAddToWishlist}
                    className="rounded-full mr-2 md:ml-2 w-10 h-10 bg-gray-200 hover:bg-indigo-600 p-0 border-0 inline-flex items-center justify-center text-gray-800 hover:text-gray-100"
                  >
                    
                  </button> */}
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
      <section className="h-auto">
        <div className="container mx-auto px-5 py-8 flex flex-col justify-center items-center mb-10">
          <Element name="reviews" className="w-full mb-10">
            <Reviews />
          </Element>
          <Element name="give_review" className="w-full">
            <ReviewInputs />
          </Element>
        </div>
      </section>
    </>
  );
};

// This gets called on request
export async function getServerSideProps(context) {
  // Fetching data from external API
  try {
    const { data } = await axios.post(`${BaseUrl}/api/getslug1`, {
      slug: context.query.slug,
    });
    // Passing data to the page via props
    return { props: { mousse: data.mousse, variants: data.variants } };
  } catch (error) {
    console.log(error);
    return { props: { error: 404 } };
  }
}

export default Slug;
