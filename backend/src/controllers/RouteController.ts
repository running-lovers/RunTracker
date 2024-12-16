import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const postRoute = async(req: Request, res: Response) => {
    const {userId} = req.params;
    const {route_name, distance, route_data} = req.body;

    try {
        const newRoute = await prisma.route.create({
            data: {
                user_id: Number(userId),
                route_name,
                distance,
                polyline: route_data,
            }
        })

        res.json(newRoute);
    } catch (error) {
        res.status(500).json({error: 'fail to save new route in database'});
    }
}