import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "./_app";
import { useRouter } from "next/router";
import { FaRupeeSign } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const fetchMyOrders = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const {
          data: { orders },
        } = await axios.post(`${BaseUrl}/api/getmyorders`, { token });
        setOrders(orders);
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: "bottom-left",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <>
      <div className="container px-5 py-20 mx-auto min-h-screen">
        <h1 className="text-2xl font-semibold text-center capitalize p-8">
          my orders
        </h1>
        <div className="overflow-x-hidden shadow-md sm:rounded-lg">
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
              {orders.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-600 bg-gray-200 hover:bg-gray-100"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {/* Review: Name should be here */}
                    {item.email}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4 flex items-center">
                    <FaRupeeSign />
                    {item.amount}.00
                  </td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/order?orderId=${item.orderId}`}
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
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Orders;
