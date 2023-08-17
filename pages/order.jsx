/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React from "react";
import { BsCurrencyRupee, BsFillPrinterFill } from "react-icons/bs";
import { BaseUrl } from "./_app";

const Order = ({ order }) => {
  const { amount, orderId, products, status } = order;
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm uppercase title-font text-gray-500 tracking-widest">
              exquisebakehub.com
            </h2>
            <h1 className="text-gray-900 text-xl sm:text-2xl title-font font-medium mb-4">
              Order Id - {orderId}
            </h1>
            <p className="leading-relaxed mb-4 capitalize">
              order has been successfully placed.
            </p>
            <div className="flex mb-4">
              <h5 className="flex-grow text-left border-b-2 border-indigo-500 py-2 text-lg px-1">
                Items
              </h5>
              <h5 className="flex-grow text-right border-b-2 border-indigo-500 py-2 text-lg px-1">
                Quantity
              </h5>
              <h5 className="flex-grow text-right border-b-2 border-indigo-500 py-2 text-lg px-1">
                Price
              </h5>
            </div>

            {Object.keys(products).map((item) => {
              return (
                <div
                  key={item}
                  className="flex justify-between items-center border-t border-gray-200 py-2"
                >
                  <div className="w-full text-left flex flex-col">
                    <div className="text-gray-800 font-semibold">
                      {products[item].name}
                    </div>
                    <div className="text-gray-500">
                      ({products[item].flavor}/{products[item].weight}
                      {products[item].weight < 2 ? "pound" : "pounds"})
                    </div>
                  </div>
                  <div className="w-full text-center sm:text-right text-gray-900">
                    {products[item].qty}
                  </div>
                  <div className="w-full text-right text-gray-900">
                    {products[item].qty * products[item].price}.00
                  </div>
                </div>
              );
            })}

            <div className="flex mt-10">
              <span className="flex justify-center items-center title-font font-medium text-2xl text-gray-900">
                Subtotal - <BsCurrencyRupee className="-mr-1 mt-0.5" />
                {amount}.00
              </span>
              <button className="flex justify-center items-center ml-auto text-white uppercase bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                {/* Print <BsFillPrinterFill className="ml-1 mt-0.5" /> */}
                {status}
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-96 object-cover object-center rounded-lg"
            src="https://pic.cakesdecor.com/c400/vcutrc5lss8yuzptyir2.jpg"
          />
        </div>
      </div>
    </section>
  );
};

// This gets called on request
export async function getServerSideProps(context) {
  // Fetching data from external API
  try {
    const {
      data: { order },
    } = await axios.get(
      `${BaseUrl}/api/getorder?orderId=${context.query.orderId}`
    );
    // Passing data to the page via props
    return { props: { order } };
  } catch (error) {
    return { props: { error } };
  }
}

export default Order;
