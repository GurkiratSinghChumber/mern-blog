const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  addComment,
  getComments,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post(`/addComment`, verifyToken, addComment);
router.get(`/getComments/:postId`, getComments);

module.exports = router;
