'use client'

import { ActivityType } from "@/types/activityType";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { getActivitiesFromStrava } from "@/lib/activity";

interface ActivitiesContextType {
    activities: ActivityType[],
    setActivities: Dispatch<SetStateAction<ActivityType[]>>
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export const ActivitiesProvider = ({children}: {children: ReactNode}) => {
    const [activities, setActivities] = useState<ActivityType[]>([])

    useEffect(() => {

        try {
            const fetchActivities = async() => {
                const activities = await getActivitiesFromStrava();
                setActivities(activities);
                console.log('activityFromStrava:', activities);
                
            }
    
            fetchActivities();
        } catch (error) {
            throw new Error('fail to get activities from strava')
        }
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