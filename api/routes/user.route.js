const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  deleteOtherUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/test", verifyToken, test);

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/sign-out", signOut);
router.get("/users", verifyToken, getUsers);
router.delete(
  "/deleteUser/:userDeleteId/:AdminId",
  verifyToken,
  deleteOtherUser
);
module.exports = router;
