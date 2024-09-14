import express from "express";
import { signup,  login,  logout,  getUserProfile,} from "../controllers/user.controller.js";
import secureRoute from "../middlewares/secure.route.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile", secureRoute, getUserProfile);

export default router;
