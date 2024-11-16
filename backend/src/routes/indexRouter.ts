import { Router } from "express";
import {router as activitiesRouter} from "./activitiesRouter"

export const router = Router();

router.use('/activities', activitiesRouter);