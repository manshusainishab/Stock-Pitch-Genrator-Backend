import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    console.log(req.user)
    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
