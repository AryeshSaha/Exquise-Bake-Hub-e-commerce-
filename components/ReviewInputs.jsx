import { useState } from "react";
import StarRating from "./StarRating";

const ReviewInputs = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <span className="capitalize text-2xl text-gray-600 mb-4">
          Give us your review
        </span>

        {/* star review */}
        <StarRating rating={rating} onRatingChange={handleRatingChange} />

        {/* text review */}
        <div className="p-2 w-[50rem] max-w-full">
          <div className="relative">
            <label for="review" className="leading-7 text-sm text-gray-600">
              Write something...
            </label>
            <textarea
              id="review"
              name="review"
              rows={8}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        {/* submit button */}
        <div className="p-2 w-full">
          <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewInputs;
