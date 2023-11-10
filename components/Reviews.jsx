// import { useAuth } from "@/context/useAuth";
import { BsFillTrashFill, BsStarFill } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { BaseUrl, reviewsAtom } from "@/global/Atoms";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

/* eslint-disable @next/next/no-img-element */
const Reviews = ({ reviews }) => {
  const { userDetails, setUser } = useAuth();
  const [feedbacks, setFeedbacks] = useAtom(reviewsAtom);

  useEffect(() => {
    setFeedbacks(reviews);
  }, [reviews, setFeedbacks]);
  const handleDelete = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const { data } = await axios.delete(
        `${BaseUrl}/api/deleteReview?id=${id}`,
        config
      );
      if (data.msg) {
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
      }
      const updatedReviewsArr = feedbacks.filter((review) => review._id !== id);
      setFeedbacks(updatedReviewsArr);
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
        toast.error("Sorry, something went wrong", {
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
      <h2 className="text-left font-semibold text-3xl text-gray-600 mb-4">
        Reviews({feedbacks.length})
      </h2>
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
      {feedbacks.length == 0 && (
        <h2 className="text-left font-semibold text-3xl text-gray-600 mb-4">
          be the first one to review
        </h2>
      )}
      {feedbacks.length > 0 &&
        feedbacks.map((review) => (
          <article key={review._id}>
            <div className="flex items-start justify-between w-full md:w-1/2 bg-indigo-100 rounded-md my-4 p-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4 space-x-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/cake.jpg"
                    alt="profile_pic"
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {review.author.name}
                      <span className="block text-sm text-gray-500">
                        Verified buyer
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-1 space-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <BsStarFill
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }
                    />
                  ))}
                </div>
                <footer className="mb-5 text-sm text-gray-500">
                  <div className="flex space-x-1">
                    <p>Reviewed in India on</p>
                    <div className="text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </footer>
                <p className="mb-3 text-gray-500 ">{review.review}</p>
              </div>
              {userDetails?.email === review.author.email && (
                <div
                  onClick={() => handleDelete(review._id)}
                  className="flex cursor-pointer"
                >
                  <BsFillTrashFill className="text-xl text-rose-900" />
                </div>
              )}
            </div>
          </article>
        ))}
    </>
  );
};

export default Reviews;
