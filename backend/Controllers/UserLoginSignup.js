import assignJWT from "../MiddleWears/AssignJWT.js";
import Users from "../Models/UserModel.js";
import bcrypt from "bcryptjs";


// user registration
export const userRegistraion = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "user alredy exists,Please sign in" });
  }
  const newUser = await Users.create({
    name,
    email,
    password,
  });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  res.status(200).json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: assignJWT(newUser._id),
  });
};

// user login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "user not found,please login" });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ error: "invalid credentials" });
  }
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: assignJWT(user._id),
  });
};
