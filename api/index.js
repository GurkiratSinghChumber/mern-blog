const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route.js");
require("dotenv").config();

const databaseUrl = process.env.DATABASEURL;
const port = process.env.PORT;

const app = express();

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

//routes
app.use("/api/user", userRoutes);
