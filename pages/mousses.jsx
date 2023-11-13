/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { BaseUrl, dropdownAtom } from "@/global/Atoms";

const Mousses = ({ mousses }) => {
  const [, toggleDropDown ] = useAtom(dropdownAtom);
  const mousseKeys = Object.keys(mousses); // [array of keys from the mousses object]
  const [hoveredItem, setHoveredItem] = useState(null);
  return (
    <>
      <section className="text-gray-600 body-font min-h-screen" onClick={()=> toggleDropDown(false)}>
        <div className="container px-5 py-16 md:py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {mousseKeys.length == 0 && (
              <p className="text-center text-3xl">Coming soon! Stay Tuned.</p>
            )}
            {mousseKeys.length > 0 &&
              mousseKeys.map((item) => (
                <div
                  key={mousses[item][0].slug}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer mb-4 lg:mx-5 shadow-md rounded-md hover:scale-95 transition-all ease-in-out duration-500"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link href={`/mousses/${mousses[item][0].slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="previewImg"
                        className={`transition-opacity duration-300 ${
                          hoveredItem === item ? "opacity-10" : "opacity-100"
                        } h-[24vh] m-auto block`}
                        src={mousses[item][0].previewImg || "/cake.jpg"}
                      />
                      <img
                        alt="img"
                        className={`transition-opacity duration-300 ${
                          hoveredItem === item ? "opacity-100" : "opacity-0"
                        } h-[24vh] m-auto block absolute top-0 left-1/2 transform -translate-x-1/2`}
                        src={mousses[item][0].img || "/cake.jpg"}
                      />
                    </div>
                    <div className="text-center md:text-left mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                        {mousses[item][0].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium capitalize">
                        {item}
                      </h2>
                      <p className="mt-1 text-lg">
                        ₹{mousses[item][0].price}.00
                      </p>
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
    </>
  );
};

// This gets called on request
export async function getServerSideProps(context) {
  // Fetching data from external API
  try {
    const { data } = await axios.get(`${BaseUrl}/api/getmousses`);
    // Passing data to the page via props
    return { props: { mousses: data.mousses } };
  } catch (error) {
    return { props: { mousses: [] } };
  }
}

export default Mousses;
