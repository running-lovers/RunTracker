import { Router } from "express";
import {router as activitiesRouter} from "./activitiesRouter"
import {router as stravaRouter} from "./stravaAuthRouter"
import {router as goalsRouter} from "./goalsRouter"

export const router = Router();

router.use('/activities', activitiesRouter);
router.use('/strava', stravaRouter)
router.use('/goals', goalsRouter)