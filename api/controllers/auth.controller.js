const User = require("../modles/user.model.js");
const { errorHandler } = require("../utils/error.js");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All feilds are required!"));
  }

  let hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "res successfull" });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup };
