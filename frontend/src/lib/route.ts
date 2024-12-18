import { ActivityType } from "@/types/activityType"

const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL

export const postRouteData = async(userId: number, activities: ActivityType[]) => {
    if(!userId) {
        throw new Error("UserId is required")
    }

    console.log('postRouteData:', userId, activities);
    

    try {
        const body = {
            userId: userId,
            activities: activities
        }
        const res = await fetch(`${apiUrl}/api/routes`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if(!res.ok) {
            throw new Error('fail to save route data to DB')
        }
    } catch (error) {
        throw new Error('fail to access backendAPI of RouteModel')
    }
}