const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  deleteOtherUser,
  getUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/test", verifyToken, test);

router.get("/users", verifyToken, getUsers);
router.get("/:userId", getUser);

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/sign-out", signOut);
router.delete(
  "/deleteUser/:userDeleteId/:AdminId",
  verifyToken,
  deleteOtherUser
);
module.exports = router;
