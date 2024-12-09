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

//get activities of specific user from db
export const getActivitiesFromDb = async(userId: number) => {
    const res = await fetch(`${apiUrl}/api/activities/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!res.ok) {
        throw new Error('fail to get activities data from server')
    }

    const data = await res.json();    

    return data;
}

//get all activities from db
export const getAllActivitiesFromDb = async() => {
    const res = await fetch(`${apiUrl}/api/activities`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!res.ok) {
        throw new Error('fail to get Activities from Server')
    }

    const data = await res.json()
    return data
}

export const getActivityCardData = async(id: number) => {
    const res = await fetch(`${apiUrl}/api/dashboard/${id}`, {
        headers: {
            "Content-Type": "applicaiton/json"
        }
    })
    if(!res.ok) {
        throw new Error('fail to fetch acitivity card data')
    }

    const data = await res.json();
    return data;
} 