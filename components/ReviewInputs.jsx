import { useState } from "react";
import StarRating from "./StarRating";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { BaseUrl, reviewsAtom } from "@/global/Atoms";
import useAuth from "@/hooks/useAuth";
// import { useAuth } from "@/context/useAuth";

const ReviewInputs = ({ cake }) => {
  const { user, setUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [textReview, setTextReview] = useState("");
  const [feedbacks, setFeedbacks] = useAtom(reviewsAtom);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // handle enter keydown for submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user)
      toast.error("Please create an account or login to leave a review", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    // review submit operation
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/feedback`,
        { rating, review: textReview, title: cake.title },
        config
      );
      console.log(data);
      setTextReview("");
      setRating(0);
      setFeedbacks([...feedbacks, data.feedback]);
      toast.success(data.msg, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        setUser(false);
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
        toast.error(error.response.data.error, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <span className="capitalize text-2xl text-gray-600 mb-4">
          Give us your feedback
        </span>

        {/* star review */}
        <StarRating rating={rating} onRatingChange={handleRatingChange} />

        {/* text review */}
        <div className="p-2 w-[50rem] max-w-full">
          <div className="relative">
            <label htmlFor="review" className="leading-7 text-sm text-gray-600">
              Write something...
            </label>
            <textarea
              id="review"
              name="review"
              value={textReview}
              onChange={(e) => setTextReview(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={8}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        {/* submit button */}
        <div className="p-2 w-full">
          <button
            onClick={handleSubmit}
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewInputs;
