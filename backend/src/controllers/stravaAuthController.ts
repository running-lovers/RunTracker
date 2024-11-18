import { Request, Response } from "express";
import dotenv from 'dotenv';

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
        const res = await fetch('https://www.strava.com/oauth/token', {
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

        if (!res.ok) {
            throw new Error('Failed to exchange token');
        }

        const data = await res.json();
        const { access_token, refresh_token, expires_at, athlete} = data;
    } catch (error) {
        
    }
}