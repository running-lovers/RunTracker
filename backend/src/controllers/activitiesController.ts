import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const getActivities = async (req: Request, res: Response) => {
    const activities = await prisma.activity.findMany();
    return res.json(activities);
}