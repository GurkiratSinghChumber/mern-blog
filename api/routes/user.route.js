const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/test", (req, res) => {
  test(req, res);
});

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
module.exports = router;
