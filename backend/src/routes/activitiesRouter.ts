import { Request, Response, Router } from "express";
import { deleteActivity, getActivities, getActivitiesByUserId, postActivity, updateActivity } from "../controllers/activitiesController";

export const router = Router();

router.get('/', getActivities)
router.get('/:userId', getActivitiesByUserId)
router.post('/', postActivity)
router.put('/:activityId', updateActivity)
router.delete('/:activityId', deleteActivity)