import Link from "next/link";
import React from "react";

const orders = () => {
  return (
    <>
      <div className="container px-5 py-20 mx-auto">
        <h1 className="text-2xl font-semibold text-center capitalize p-8">
          my orders
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-900">
            <thead className="text-xs text-white uppercase bg-indigo-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600 bg-gray-200 hover:bg-gray-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-gray-600 bg-gray-200 hover:bg-gray-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default orders;
