/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { BaseUrl } from "@/global/Atoms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = ({ email }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "cpassword") setCPassword(e.target.value);
  };

  const changePass = async () => {
    if (password !== cPassword)
      return toast.error("Passwords don't match", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.post(
          `${BaseUrl}/api/newPass`,
          {
            email,
            password,
          },
          config
        );
        if (data.message) router.push(`${BaseUrl}/login`);
      } catch (error) {
        router.push(`${BaseUrl}/forgotpass`);
      }
    }
  };
  return (
    <section className="bg-gray-50">
      <ToastContainer newestOnTop rtl={false} pauseOnFocusLoss={false} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <>
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot your password?
            </h1>
            <p className="font-light text-gray-500">
              Dont fret! Just type in your email and we will send you a code to
              reset your password!
            </p>

            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cpassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  value={cPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <button
                onClick={changePass}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Change Password
              </button>
            </div>
          </>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = context.query;
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };
  try {
    const {
      data: { email },
    } = await axios.get(`${BaseUrl}/api/getEmailFromToken`, config);

    return {
      props: {
        email,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/forgotpass",
        permanent: false,
      },
    };
  }
};

export default ChangePassword;
