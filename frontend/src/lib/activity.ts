import { useUser } from "@/context/userContext"

type PostActivityParams = {
    userId: number;
    activityType: string;
    distance: number;
    duration: number; 
    description?: string;
    time: Date; 
  };

const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL
const user = localStorage.getItem('user');
const parsedUser = JSON.parse(user!);
const access_token = parsedUser.accessToken;

export const getActivitiesFromStrava = async() => {
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

// export const postActivities = async(params: PostActivityParams[], userId: number) => {
//     const body = {
//         userId,
//         activities: params,
//     }
//     const res = await fetch(`${apiUrl}/api/activities/save`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         ,},
//         body: JSON.stringify(body)
//     })

//     if(!res) {
//         throw new Error('fail to post activities')
//     }

//     const data = await res.json();
// }