export const RatingCalc = (reviews) => {
  const ratings = reviews.map((review) => review.rating);
  let total = 0;
  if (ratings.length === 0) return 0;
  else if (ratings.length === 1) return ratings[0];
  else {
    for (let rating of ratings) {
      total += rating;
    }
    let avg = parseFloat(total / ratings.length).toFixed(2);
    return avg;
  }
};
