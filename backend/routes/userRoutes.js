import express from "express";
import checkAuth, { checknotRegularUser } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getCurrentUser,
  login,
  logout,
  logoutAll,
  register,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/user", checkAuth, getCurrentUser);

router.get("/users", checkAuth , checknotRegularUser);
// this route is for admin so that he can logout any user forcefully
router.post("/user/:userId/logout" , checkAuth, checknotRegularUser , )
router.post("/user/logout", logout);
router.post("/user/logout-all", logoutAll)

export default router;
