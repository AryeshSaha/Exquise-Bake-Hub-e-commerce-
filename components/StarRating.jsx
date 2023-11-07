import React, { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className='flex space-x-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <BsStarFill
          key={star}
          className={`${star <= (hoverRating || rating) ? 'text-indigo-600' : 'text-gray-300'} cursor-pointer`}
          size={30}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleRatingClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
