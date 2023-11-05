/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { BaseUrl } from "./_app";

const Cakes = ({ cakes }) => {
  const cakesKeys = Object.keys(cakes);
  const [hoveredItem, setHoveredItem] = useState(null);
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-16 md:py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {cakesKeys.length == 0 && (
              <p className="text-center text-3xl">Coming soon! Stay Tuned.</p>
            )}
            {cakesKeys.length > 0 &&
              cakesKeys.map((item) => (
                <div
                  key={cakes[item][0].slug}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer mb-4 lg:mx-5 shadow-md rounded-md hover:scale-95 transition-all ease-in-out duration-500"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link href={`/product/${cakes[item][0].slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="previewImg"
                        className={`transition-opacity duration-300 ${
                          hoveredItem === item ? "opacity-10" : "opacity-100"
                        } h-[24vh] m-auto block`}
                        src={cakes[item][0].previewImg || "/cake.jpg"}
                      />
                      <img
                        alt="img"
                        className={`transition-opacity duration-300 ${
                          hoveredItem === item ? "opacity-100" : "opacity-0"
                        } h-[24vh] m-auto block absolute top-0 left-1/2 transform -translate-x-1/2`}
                        src={cakes[item][0].img || "/cake.jpg"}
                      />
                    </div>
                    <div className="text-center md:text-left mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                        {cakes[item][0].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium capitalize">
                        {item}
                      </h2>
                      <p className="mt-1">₹{cakes[item][0].price}.00</p>
                      <p className="mt-1 text-sm">
                        Prices vary for different weights
                      </p>
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
