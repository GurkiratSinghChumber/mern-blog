const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  addComment,
  getComments,
  addLike,
  editComment,
  deleteComment,
  getAllComments,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post(`/addComment`, verifyToken, addComment);
router.get(`/getComments`, verifyToken, getAllComments);
router.get(`/getComments/:postId`, getComments);
router.put(`/addLike/:commentId`, verifyToken, addLike);
router.put(`/editComment/:commentId`, verifyToken, editComment);
router.delete(`/deleteComment/:commentId`, verifyToken, deleteComment);

module.exports = router;
