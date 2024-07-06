const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const postRoutes = require("./routes/post.route.js");
const cors = require("cors");

require("dotenv").config();

const databaseUrl = process.env.DATABASEURL;
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(cookieParser());
//connection to database
const connectToDatabase = async (databaseUrl) => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("connected to database");
    //listening to requests
    app.listen(port, () => {
      console.log(`listening at port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

connectToDatabase(databaseUrl);

//for fetching the json post reqests
app.use(express.json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res
    .status(statusCode)
    .json({ success: false, statusCode: statusCode, message: message });
});
