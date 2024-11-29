import { ActivityType } from "@/types/activityType";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useUser } from "./userContext";
import { getActivitiesFromStrava } from "@/lib/activity";

interface ActivitiesContextType {
    activities: ActivityType[],
    setActivities: Dispatch<SetStateAction<ActivityType[]>>
}

export const ActivitiesProvider = ({children}: {children: ReactNode}) => {
    const [activities, setActivities] = useState<ActivityType[]>([])
    const {user} = useUser();
    const userId = user!.id;

    useEffect(() => {
        if(!userId) {
            throw new Error('userId is required')
        }

        const fetchActivities = async() => {
            const activities = await getActivitiesFromStrava();
            setActivities(activities);
        }

        fetchActivities();
    }, [])
}