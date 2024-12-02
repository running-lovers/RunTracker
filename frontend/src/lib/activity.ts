import { useUser } from "@/context/userContext"
import { ActivityType } from "@/types/activityType";

// type PostActivityParams = {
//     userId: number;
//     activityType: string;
//     distance: number;
//     duration: number; 
//     description?: string;
//     time: Date; 
//   };

const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL

export const getActivitiesFromStrava = async(access_token: string) => {
    const res = await fetch("https://www.strava.com/api/v3/athlete/activities", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        }
    }) 

    const activitiesData = await res.json();
    return activitiesData;
}

export const postActivities = async(params: ActivityType[], userId: number) => {
    const body = {
        userId,
        activities: params,
    }
    const res = await fetch(`${apiUrl}/api/activities/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        ,},
        body: JSON.stringify(body)
    })

    if(!res) {
        throw new Error('fail to post activities')
    }
}

export const getActivitiesFromDb = async(userId: number) => {
    const res = await fetch(`${apiUrl}/api/activities/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!res.ok) {
        throw new Error('fail to get activities data from database')
    }

    const data = await res.json();    

    return data;
}