import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/useAuth";
import { BaseUrl } from "./_app";
import { parse } from "cookie";

const Account = () => {
  const {
    userDetails,
    setUserDetails,
    tokenExpired,
    loading,
    setLoading,
  } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [nPassword, setNPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  useEffect(() => {
    if (!loading) {
      if (tokenExpired) {
        toast.error("Please login again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (userDetails.name) setName(userDetails.name);
        if (userDetails.email) setEmail(userDetails.email);
        if (userDetails.address) setAddress(userDetails.address);
        if (userDetails.phone) setPhone(userDetails.phone);
        if (userDetails.pincode) setPincode(userDetails.pincode);
      }
    }
  }, [loading, userDetails]);

  const handleChange = async (e) => {
    if (e.target.name == "name") setName(e.target.value);
    else if (e.target.name == "phone") setPhone(e.target.value);
    else if (e.target.name == "pincode") setPincode(e.target.value);
    else if (e.target.name == "address") setAddress(e.target.value);
    else if (e.target.name == "password") setPassword(e.target.value);
    else if (e.target.name == "npassword") setNPassword(e.target.value);
    else if (e.target.name == "cpassword") setCPassword(e.target.value);
  };

  const updateDetails = async () => {
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.put(
        `${BaseUrl}/api/updateUser`,
        {
          name,
          address,
          phone,
          pincode,
        },
        config
      );

      console.log("updated: ", data);
      setUserDetails(data.updatedUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (nPassword !== cPassword) {
      toast.error("New and Confirm Passwords don't match.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNPassword("");
      setCPassword("");
    } else {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      try {
        const { data } = await axios.put(
          `${BaseUrl}/api/updateUserPass`,
          {
            password,
            nPassword,
            cPassword,
          },
          config
        );

        console.log("updated: ", data);
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
      setPassword("");
      setNPassword("");
      setCPassword("");
    }
  };

  return (
    <div className="container px-2 sm:m-auto">
      <h1 className="font-bold text-3xl my-8 text-center">Account</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      {/* name and email */}
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      {/* Address */}
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            cols="30"
            rows="2"
            name="address"
            value={address}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1.5 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      {/* phone and pincode */}
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={updateDetails}
          className="disabled:bg-indigo-200 flex justify-center items-center text-white bg-indigo-500 border-0 py-2 px-6 cursor-pointer focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Submit
        </button>
      </div>

      {/* Password */}
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="npassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="npassword"
              name="npassword"
              value={nPassword}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={cPassword}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={updatePassword}
          className="disabled:bg-indigo-200 flex justify-center items-center text-white bg-indigo-500 border-0 py-2 px-6 cursor-pointer focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Submit
        </button>
      </div>

      <ToastContainer rtl={false} pauseOnFocusLoss />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || "");
  if (
    cookies.jwt === "" ||
    cookies.jwt === null ||
    cookies.jwt === undefined ||
    !cookies.jwt
  ) {
    return {
      redirect: {
        destination:
          "/login?message=Please%20log%20in%20to%20access%20this%20page",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default Account;
