import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import prisma from "../../lib/prisma";

dotenv.config();

// const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
// const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';

export const getAuthURL = (req: Request, res: Response) => {
    const {clientId}= req.body;

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=read,activity:read,activity:write&approval_prompt=force`;
    res.json({ authUrl });
}

export const logoutUser = async(req: Request, res: Response) => {
    const {strava_id} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {strava_id},
            select: {accessToken: true}
        });

        if(user && user.accessToken) {
            await fetch ('https://www.strava.com/oauth/deauthorize',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    access_token: user.accessToken,
                }),
            });
        }

        await prisma.user.update({
            where: {strava_id},
            data: {
                accessToken: null,
                refreshToken: null,
                TokenExpiresAt: null,
            },
        });

        res.json({message: 'User successfully logged out'})
    } catch (error) {
        console.log(`Error during logout`, error);
        res.status(500).json({error: 'failed to log out user'})       
    }
}

export const postToken = async(req: Request, res: Response) => {
    const {code, parsedClientId, parsedClientSecret} = req.body;
    try {
        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: parsedClientId,
                client_secret: parsedClientSecret,
                code: code,
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

export const checkAuth = async (req: Request, res: Response) => {
    const strava_id = req.headers['x-strava-id'];

    if (!strava_id) {
        res.status(401).json({ authenticated: false });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { strava_id: Number(strava_id) },
        });

        if (user && user.accessToken) {
            res.json({ authenticated: true, user });
        } else {
            res.status(401).json({ authenticated: false });
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}