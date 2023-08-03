const mongoose = require("mongoose");

const dbCon = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database!");
    return handler(req, res);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default dbCon;
