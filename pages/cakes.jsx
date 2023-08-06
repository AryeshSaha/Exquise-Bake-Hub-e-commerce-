/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React from "react";
import { BaseUrl } from "./_app";

const Cakes = ({ cakes }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(cakes).length == 0 && <p>Coming soon! Stay Tuned.</p> }
            {Object.keys(cakes).length > 0 && Object.keys(cakes).map((item) => (
              <div
                key={cakes[item]._id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer mb-4 lg:mx-5 shadow-md rounded-md"
              >
                <Link href={`/product/${cakes[item].slug}`}>
                  <div className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="h-[24vh] m-auto block"
                      src="/cake.jpg"
                    />
                  </div>
                  <div className="text-center md:text-left mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                      {cakes[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium capitalize">
                      {cakes[item].title}
                    </h2>
                    <p className="mt-1">₹{cakes[item].price}.00</p>
                    <p className="mt-1 text-sm">Prices vary for different weights</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// This gets called on request
export async function getServerSideProps(context) {
  // Fetching data from external API
  try {
    const { data } = await axios.get(`${BaseUrl}/api/getcakes`);
    // Passing data to the page via props
    return { props: { cakes: data.cakes } };
  } catch (error) {
    console.log(error);
    return { props: { cakes: [] } };
  }
}

export default Cakes;
