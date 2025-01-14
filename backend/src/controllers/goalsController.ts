import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const createAndUpdateGoal = async(req: Request, res: Response) => {
    const {userId, year, month, total_distance, average_speed } = req.body;

    try {
        const existingGoal = await prisma.goal.findFirst({
            where: {
                user_id: userId,
                year: year,
                month: month,
                deleted_at: null
            }
        });

        let newGoal;
        if(existingGoal) {
            newGoal = await prisma.goal.update({
                where: {id: existingGoal.id},
                data: {
                    total_distance: Number(total_distance),
                    average_speed: Number(average_speed),
                }
            })
        }else {
            newGoal = await prisma.goal.create({
                data: {
                    user_id: userId,
                    year: year,
                    month: month,
                    total_distance: Number(total_distance),
                    average_speed: Number(average_speed),
                }
            })
        }
        res.json(newGoal);
    } catch (error) {
        console.error("Error creating goal:", error);
        res.status(500).json({error: 'Fail to create new goal'})
    }
}

export const getGoals = async(req: Request, res: Response) => {
    const {userId} = req.params

    try {
        const goals = await prisma.goal.findMany({
            where: {user_id: Number(userId), deleted_at: null},
        });

        // if (goals.length === 0) {
        //     console.error(error);
            
        //     return res.status(404).json({ error: 'No goals found for this user' });
        // }

        res.json(goals)
    } catch (error) {
        res.status(500).json({error: 'fail to fetch goals data'})
    }
}

export const updateGoal = async(req: Request, res: Response) => {
    const {goalId} = req.params
    const {total_distance, average_speed } = req.body;

    try {
        const updatedGoal = await prisma.goal.update({
            where: {id: Number(goalId)},
            data: {
                total_distance: total_distance,
                average_speed: average_speed,
            }
        });

        res.json(updatedGoal)
    } catch (error) {
        res.status(500).json({error: 'fail to update goal'})
    }
}

export const deleteGoal = async(req: Request, res: Response) => {
    const {goalId} = req.params

    try {
        const deletedGoal = await prisma.goal.delete({
            where: {id: Number(goalId)}
        })
        res.json(deletedGoal)
    } catch (error) {
        res.status(500).json({error: 'fail to delete goal'})
    }
}