/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React from "react";
import { BaseUrl } from "./_app";

const Mousses = ({ mousses }) => {
  const mousseKeys = Object.keys(mousses); // [array of keys from the mousses object]
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {mousseKeys.length == 0 && <p>Coming soon! Stay Tuned.</p>}
            {mousseKeys.length > 0 &&
              mousseKeys.map((item) => (
                <div
                  key={mousses[item][0].slug}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer mb-4 lg:mx-5 shadow-md rounded-md"
                >
                  <Link href={`/mousses/${mousses[item][0].slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[24vh] m-auto block"
                        src="/cake.jpg"
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
    const { data } = await axios.get(`${BaseUrl}/api/getmousses`);
    // Passing data to the page via props
    return { props: { mousses: data.mousses } };
  } catch (error) {
    console.log(error);
    return { props: { mousses: [] } };
  }
}

export default Mousses;
