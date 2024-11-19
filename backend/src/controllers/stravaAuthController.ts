import { Request, Response } from "express";
import dotenv from 'dotenv';
import prisma from "../../lib/prisma";

dotenv.config();

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
console.log('clientId: ',STRAVA_CLIENT_ID);

const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';

export const getAuthURL = (req: Request, res: Response) => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=read,activity:read`;
    res.json({ authUrl });
}

export const postToken = async(req: Request, res: Response) => {
    const {code} = req.body;
    try {
        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: STRAVA_CLIENT_ID,
                client_secret: STRAVA_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to exchange token');
        }

        const data = await response.json();
        const { access_token, refresh_token, expires_at, athlete} = data;

        const user = await prisma.user.upsert({
            where: {strava_id: athlete.id},
            update: {
                accessToken: access_token,
                refreshToken: refresh_token,
                TokenExpiresAt: new Date(expires_at * 1000),
            },
            create: {
                strava_id: athlete.id,
                name: `${athlete.firstname} ${athlete.lastname}`,
                accessToken: access_token,
                refreshToken: refresh_token,
                TokenExpiresAt: new Date(expires_at * 1000),
            }
        });

        res.json({ user });
    } catch (error) {
        console.error('Error exchanging token:', error);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
}