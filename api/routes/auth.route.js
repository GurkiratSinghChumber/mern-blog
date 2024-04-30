const express = require("express");
const { signup, signin, google } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/sign-up", (req, res, next) => {
  signup(req, res, next);
});
router.post("/sign-in", (req, res, next) => {
  signin(req, res, next);
});

router.post("/google", (req, res, next) => {
  google(req, res, next);
});

module.exports = router;
