'use client'

import { ActivityType } from "@/types/activityType";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { getActivitiesFromDb, getActivitiesFromStrava, postActivities } from "@/lib/activity";

interface ActivitiesContextType {
    activities: ActivityType[],
    setActivities: Dispatch<SetStateAction<ActivityType[]>>,
    activitiesOfThisMonth: ActivityType[]
}

interface ActivitiesProviderProps {
    children: ReactNode;
    onLoad?: () => void;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export const ActivitiesProvider = ({children, onLoad}: ActivitiesProviderProps) => {
    const [activities, setActivities] = useState<ActivityType[]>([])
    const [activitiesOfThisMonth, setActivitiesOfThisMonth] = useState<ActivityType[]>([])
    const now = new Date()
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth()+1;

    useEffect(() => {
        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user!);
        const accessToken= parsedUser.accessToken
        const userId = parsedUser.id

        const fetchAndSaveActivities = async() => {
            try {
                const activities:ActivityType[] = await getActivitiesFromStrava(accessToken);
                if(!activities) {
                    throw new Error('fail to get activities from strava')
                }
                console.log('activitiesfromstrava:', activities);
                const RunActivities = activities.filter(activity => activity.sport_type === "Run");
                
                await postActivities(RunActivities, userId);

                const activitiesFromDb = await getActivitiesFromDb(userId);
                console.log('activitiesFromDb:', activitiesFromDb);
                setActivities(activitiesFromDb);
            } catch (error) {
                console.log('error message:', error);
                throw new Error('fail to get activities from strava')
            } finally{
                onLoad?.()
            }
        }

        fetchAndSaveActivities();
    }, [])

    useEffect(() => {
        const res = activities.filter((activity) => {
            const activityDate = new Date(activity.start_time);
            return activityDate.getMonth() === currentMonth - 1; 
        })
        setActivitiesOfThisMonth(res);
    }, [activities, currentMonth])

    // const activitiesOfThisMonth = useMemo(() => {      
    //     return activities.filter((activity) => {
    //         const activityDate = new Date(activity.start_time);            
            
    //         return activityDate.getMonth() === currentMonth - 1;
    //     })
    // }, [activities, currentMonth])  

    return (
        <ActivitiesContext.Provider value={{activities, setActivities, activitiesOfThisMonth}}>
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