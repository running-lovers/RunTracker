import { Request, Response, Router } from "express";
import { deleteActivity, getActivities, getActivitiesByUserId, createActivity, updateActivity } from "../controllers/activitiesController";

export const router = Router();

router.get('/', getActivities)
router.get('/:userId', getActivitiesByUserId)
router.post('/', createActivity)
router.put('/:activityId', updateActivity)
router.delete('/:activityId', deleteActivity)