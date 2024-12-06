import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
export const userRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, gender } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender) {
      return res
        .status(400)
        .json({ message: "filling all details is compulsory" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
    });
    generateToken(user, "user registered!", 200, res);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing Email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Missing Password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with specified email don't exists" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateToken(user, "user loggedIn!", 200, res);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getUserDetails = async (req, res, next) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    user,
  });
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("userToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now()),
      })
      .json({
        message: "User loggedOut successfully",
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
