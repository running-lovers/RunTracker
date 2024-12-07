import { Request, Response } from "express"
import prisma from "../../lib/prisma";

export const getUserProfile = async(req: Request, res: Response) => {
    const {userId} = req.params;

    try {
        const profile = await prisma.userProfile.findUnique({
            where: {user_id: Number(userId)},
        })

        res.json(profile);
    } catch (error) {
        res.status(500).json({error: 'fail to get userProfile data'})
    }
}

export const postUserProfile = async(req: Request, res: Response) => {
    const {userId, firstname, lastname, city, state, country, sex, profile_medium, profile } = req.body;

    try {
        const newProfile = await prisma.userProfile.create({
           data: {
            user_id: Number(userId),
            firstname: firstname,
            lastname: lastname,
            city: city,
            state: state,
            country: country,
            sex: sex,
            profile_medium: profile_medium,
            profile: profile
           } 
        })

        res.json(newProfile);
    } catch (error) {
        res.status(500).json({error: 'fail to post profile data'})
    }
}