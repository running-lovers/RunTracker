import { Router } from "express";
import {router as activitiesRouter} from "./activitiesRouter"
import {router as stravaRouter} from "./stravaAuthRouter"

export const router = Router();

router.use('/activities', activitiesRouter);
router.use('/strava', stravaRouter)