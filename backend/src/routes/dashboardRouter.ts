import { Router } from "express";
import { getRecentActivities } from "../controllers/dashboardController";

export const router = Router();

router.get('/:userId', getRecentActivities)