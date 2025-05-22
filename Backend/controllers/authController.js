const Users = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const data = req.body;

  const user = await Users.findOne({ email: data.email });
  if (user) {
    return res
      .status(400)
      .json({ error: "User already exists! Please Signin" });
  }

  const hashedPassword = bcryptjs.hashSync(data.password, 10);

  const newUser = await Users.create({ ...data, password: hashedPassword });

  try {
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const data = req.body;

  try {
    const existingUser = await Users.findOne({ email: data.email });
    if (!existingUser) {
      return next(errorHandler(404, "User not found! Please SignUp"));
    }

    const validPassword = await bcryptjs.compareSync(
      data.password,
      existingUser.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password!"));
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...userData } = existingUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ userData, token });
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...userData } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ userData});
    }

    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(generatedPassword,10);

    const newUser = new Users({username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email:req.body.email, password:hashedPassword, photo:req.body.image});

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...userData } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ userData });

  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, google };
