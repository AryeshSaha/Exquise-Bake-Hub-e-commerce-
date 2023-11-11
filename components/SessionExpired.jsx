import { useRouter } from "next/router";
import React from "react";

const SessionExpired = () => {
    const router = useRouter()
    const handleOnClick = () => {
        router.push("/login")
    }
  return (
    <>
      <div className="min-h-screen container mx-auto space-y-5 flex flex-col items-center justify-center">
        <h1 className="text-gray-600 text-2xl text-center">
          Something went wrong. Please Login Again
        </h1>
        <button onClick={handleOnClick} className="flex justify-center items-center text-white bg-indigo-500 border-0 py-2 px-6 cursor-pointer focus:outline-none hover:bg-indigo-600 rounded text-lg">Go To Login</button>
      </div>
    </>
  );
};

export default SessionExpired;
