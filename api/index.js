let express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const databaseUrl = process.env.DATABASEURL;

const port = process.env.PORT;

const app = express();

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
