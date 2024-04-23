let express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();

let port = process.env.PORT;

let app = express();

app.listen(port, () => {
  console.log(`Listening at port number ${port}`);
});
