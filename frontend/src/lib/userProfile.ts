import { UserProfileType } from "@/types/useProfileType";

const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL

export const fetchUserProfileFromStrava = async(acceess_token: string | null) => {
    if(!acceess_token) {
        throw new Error('access_token is required')
    }

    const res = await fetch(`https://www.strava.com/api/v3/athlete`, {
        method: 'GET',
        headers : {
            Authorization: `Bearer ${acceess_token}`,
            "Content-Type": "application/json",
        }
    })

    if(!res.ok) {
        throw new Error("fail to fetch profile data from strava")
    }
    const data = await res.json();
    return data;
}

export const fetchUserProfileFromDb = async(userId: number) => {
    if(!userId) {
        throw new Error ('userId is required')
    }

    const res = await fetch(`${apiUrl}/api/userProfile/${userId}`,{
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json();
    return data;
}

export const postUserProfile = async(id: number, data: UserProfileType) => {
    const body = {
        userId: id,
        firstname: data.firstname,
        lastname: data.lastname,
        city: data.city,
        state: data.state,
        country: data.country,
        sex: data.sex,
        profile_medium: data.profile_medium,
        profile: data.profile
    }
    const res = await fetch(`${apiUrl}/api/userProfile`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if(!res.ok) {
        throw new Error('fail to post user profiledata to db')
    }

    const newProfile = await res.json()
    return newProfile;
}