import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const AvgStarRating = ({ rating }) => {
  const genStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= .5;

    // Filled Stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <BsStarFill key={`full-${i}`} className="w-4 h-4 text-indigo-600" />
      );
    }

    // Half Star
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="w-4 h-4 text-indigo-600" />);
    }

    // Empty Stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <BsStar key={`empty-${i}`} className="w-4 h-4 text-indigo-600" />
      );
    }

    return stars;
  };

  return (
    <div className="flex">
      {genStars().map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default AvgStarRating;
