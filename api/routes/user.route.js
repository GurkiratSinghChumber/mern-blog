const express = require("express");
const { test, updateUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/test", (req, res) => {
  test(req, res);
});

router.put("/update/:userId", verifyToken, updateUser);
module.exports = router;
