import express from "express";
import {
  login,
  getUserDetails,
  logoutUser,
  userRegister,
} from "../controllers/userController.js";
import {
  isUserAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();
router.post("/register", userRegister);
router.post("/login", login);
router.get("/me", isUserAuthenticated, getUserDetails);
router.get("/logout", isUserAuthenticated, logoutUser);
export default router;
