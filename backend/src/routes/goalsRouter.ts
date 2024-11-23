import { Request, Response, Router } from "express";
import { createNewGoal, deleteGoal, getGoals, updateGoal } from "../controllers/goalsController";

export const router = Router();

router.post('/', createNewGoal);
router.get('/:userId', getGoals);
router.put('/:goalId', updateGoal);
router.delete('/:goalId', deleteGoal);