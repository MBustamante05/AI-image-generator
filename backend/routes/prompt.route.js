import express from "express";
import { getHistorial, create } from '../controllers/prompt.controller.js';
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { optionalAuth } from "../middlewares/optionalAuth.js";

const router = express.Router();

router.get("/create", optionalAuth ,create);
router.get("/historial", protectedRoute, getHistorial);

export default router;