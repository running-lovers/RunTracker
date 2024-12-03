import { Request, Response, Router } from "express";
import { deleteActivity, getActivities, getActivitiesByUserId, createActivity, updateActivity, saveNewActivity } from "../controllers/activitiesController";

export const router = Router();

router.get('/', getActivities)
router.get('/:userId', getActivitiesByUserId)
router.post('/', createActivity)
router.post('/save', saveNewActivity)
router.put('/:activityId', updateActivity)
router.delete('/:activityId', deleteActivity)