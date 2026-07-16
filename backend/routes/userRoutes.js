import express from "express";
import checkAuth, { checknotRegularUser } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getCurrentUser,
  login,
  logout,
  logoutAll,
  register,
  deleteUser,
  deleteUserhard,
  getDeletedUsers
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/user", checkAuth, getCurrentUser);

router.get("/users", checkAuth , checknotRegularUser);
router.get("/user/deletedUsers" , getDeletedUsers)
// this route is for admin so that he can logout any user forcefully
router.post("/user/:userId/logout" , checkAuth, checknotRegularUser , )
router.post("/user/logout", logout);
router.post("/user/logout-all", logoutAll)
router.delete("/users/:userId", checkAuth, checknotRegularUser, deleteUser);
router.delete("/users/:userId/hard", checkAuth, checknotRegularUser, deleteUserhard);

export default router;
