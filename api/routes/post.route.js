const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const { create, getPost } = require("../controllers/post.controller.js");

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPost);

module.exports = router;
