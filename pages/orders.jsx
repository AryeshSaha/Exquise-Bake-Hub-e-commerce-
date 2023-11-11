import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { BaseUrl, dropdownAtom } from "@/global/Atoms";
import { useAtom } from "jotai";
import useAuth from "@/hooks/useAuth";
import SessionExpired from "@/components/SessionExpired";

const Orders = ({ data, status }) => {
  const [orders, setOrders] = useState([]);
  const [, setDropdown] = useAtom(dropdownAtom);
  const { setUser } = useAuth();

  useEffect(() => {
    console.log("orders: ", data);
    setOrders(data);
  }, [data]);

  if (status && status === 401) {
    setUser(false);
    return <SessionExpired />;
  }

  const dateMaker = (date) => {
    const d = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return d.toLocaleString("en-IN", options);
  };
  return (
    <>
      <div
        className="container px-5 md:py-20 mx-auto min-h-screen"
        onClick={() => setDropdown(false)}
      >
        {Object.keys(orders).length <= 0 && (
          <>
            <h1 className="text-2xl font-semibold text-center capitalize p-8">
              No Orders Yet
            </h1>
          </>
        )}
        {Object.keys(orders).length > 0 && (
          <>
            <h1 className="text-2xl font-semibold text-center capitalize p-8">
              my orders
            </h1>
            {/* Web View */}
            <div className="hidden md:block overflow-x-auto shadow-md sm:rounded-lg">
              <table className="table-auto w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-white uppercase bg-indigo-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-600 bg-gray-200 hover:bg-gray-100"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {order.name}
                      </th>
                      <td className="px-6 py-4">{order.email}</td>
                      <td className="px-6 py-4 flex items-center">
                        <FaRupeeSign />
                        {order.amount}.00
                      </td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/order?orderId=${order.orderId}`}
                          className="font-medium text-indigo-600 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile View */}
            <div className="md:hidden bg-transparent">
              <ul>
                {orders.map((order) => (
                  <li
                    key={order._id}
                    className="mb-4 border-b border-b-gray-400 shadow-md rounded-lg bg-gray-200 active:bg-gray-100"
                  >
                    <Link
                      href={`/order?orderId=${order.orderId}`}
                      className="flex items-center justify-between py-4 px-6 active:text-indigo-600"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          Placed on {dateMaker(order.updatedAt)}
                        </span>
                        <span className="text-base text-gray-700">
                          For {order.name}
                        </span>
                        <span className="text-sm text-indigo-600">
                          Status: {order.status}
                        </span>
                      </div>
                      <MdNavigateNext size={24} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie || "";

  const config = {
    headers: {
      Cookie: cookies,
    },
    withCredentials: true,
  };
  try {
    const {
      data: { orders },
    } = await axios.get(`${BaseUrl}/api/getmyorders`, config);

    return {
      props: {
        data: orders,
      },
    };
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status == 401) {
      return {
        props: {
          status: error.response.status,
        },
      };
    } else {
      return {
        redirect: {
          destination:
            "/login?message=Please%20log%20in%20to%20access%20this%20page",
          permanent: false,
        },
      };
    }
  }
};

export default Orders;
