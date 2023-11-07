import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";
import Review from "@/models/Reviews";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ success: false, error: "Bad request" });
    return;
  }

  const { user } = req;
  const { title, rating, review } = req.body;

  if (!title || !rating || !review) {
    res.status(400).json({ success: false, error: "Empty Inputs" });
    return;
  }

  if (rating < 1 || rating > 5) {
    res.status(400).json({ success: false, error: "Invalid rating" });
    return;
  }

  try {
    // Create a new review
    const feedback = new Review({
      title,
      author: user._id,
      review,
      rating,
    });
    await feedback.save();

    // Populate the author field of the newly added feedback
    await feedback.populate("author");

    // Update all products with the same title using an aggregation pipeline
    await Product.updateMany({ title }, [
      {
        $set: {
          feedbacks: { $concatArrays: ["$feedbacks", [feedback._id]] },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      msg: "Feedback added",
      feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default dbCon(Auth(handler));
