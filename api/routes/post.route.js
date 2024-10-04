const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const {
  create,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/post.controller.js");

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPost);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/updatePost/:postId/:userId", verifyToken, updatePost);
module.exports = router;
