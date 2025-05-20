const Users = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {
  const data = req.body;

  const user = await Users.findOne({ email: data.email });
  if (user) {
    return res.status(400).json({ error: "User already exists! Please Signin" });
  }

  const hashedPassword = bcryptjs.hashSync(data.password, 10);

  const newUser = await Users.create({ ...data, password: hashedPassword });

  try {
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
   next(error);
  }
};

const signin = async(req,res, next)=>{
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
    const
     token = jwt.sign({id:existingUser._id} ,process.env.JWT_SECRET );

    const {password:pass, ...userData}=existingUser._doc;

    res.cookie('access_token',token, {httpOnly:true}).status(200).json({userData,token})
  } catch (error) {
    next(error)
  }
}

module.exports = {signup,signin};
