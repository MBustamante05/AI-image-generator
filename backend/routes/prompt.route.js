import express from "express";
import { getHistorial, create } from '../controllers/prompt.controller.js';
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const router = express.Router();

router.post("/create", protectedRoute, create);
router.get("/historial", protectedRoute, getHistorial);

export default router;