import express from "express";
import { signup, login, getUser } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/user", protectedRoute, getUser);

export default router;