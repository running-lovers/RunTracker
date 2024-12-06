import { Router } from "express";
import {  createAndUpdateGoal, deleteGoal, getGoals, updateGoal } from "../controllers/goalsController";

export const router = Router();

router.post('/', createAndUpdateGoal);
router.get('/:userId', getGoals);
router.put('/:goalId', updateGoal);
router.delete('/:goalId', deleteGoal);