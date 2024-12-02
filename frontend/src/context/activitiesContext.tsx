'use client'

import { ActivityType } from "@/types/activityType";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { getActivitiesFromDb, getActivitiesFromStrava, postActivities } from "@/lib/activity";

interface ActivitiesContextType {
    activities: ActivityType[],
    setActivities: Dispatch<SetStateAction<ActivityType[]>>
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export const ActivitiesProvider = ({children}: {children: ReactNode}) => {
    const [activities, setActivities] = useState<ActivityType[]>([])

    useEffect(() => {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user!);
        const accessToken= parsedUser.accessToken
        const userId = parsedUser.id

        const fetchAndSaveActivities = async() => {
            try {
                const activities = await getActivitiesFromStrava(accessToken);
                console.log('activitiesfromstrava:', activities);
                if(!activities) {
                    throw new Error('fail to get activities from strava')
                }
                
                await postActivities(activities, userId);

                const activitiesFromDb = await getActivitiesFromDb(userId);
                console.log('activitiesFromDb:', activitiesFromDb);
                setActivities(activitiesFromDb);
            } catch (error) {
                throw new Error('fail to get activities from strava')
            }
        }

        fetchAndSaveActivities();
    }, [])

    return (
        <ActivitiesContext.Provider value={{activities, setActivities}}>
            {children}
        </ActivitiesContext.Provider>
    )
}

export const useActivities = () => {
    const context = useContext(ActivitiesContext);
    if(!context) {
        throw new Error('useActivities must be used within a UserProvider')
    }

    return context;
}