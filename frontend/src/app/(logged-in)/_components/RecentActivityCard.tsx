'use client'

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useActivities } from "@/context/activitiesContext";
import { useUser } from "@/context/userContext";
import { getActivityCardData, getAllActivitiesFromDb } from "@/lib/activity";
import { getUserFromStrava } from "@/lib/user";
import { ActivityType } from "@/types/activityType";
import { Activity, BarChart2, Calendar, ChevronDown, MessageCircle, Map, User, Plus, MapPin } from "lucide-react"
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

type UserType = {
    country: string,
    city: string,
    firstname: string,
    lastname: string,
    id: number,
    profile: string,
    sex: string,
    state: string
}

type MergedDataType = ActivityType & {user: UserType}

const temporalyActivities = [
    { id: 1, icon: <FaRegUserCircle className="h-10 w-10" />, name: "Yasuhito Komano", startDate: "16th October, 2024 at 15:55", distance: 1, time: "1:12:22", calories: 200, mapImage: "#" },
    { id: 2, icon: <FaRegUserCircle className="h-10 w-10" />, name: "Victor Sarut", startDate: "15th October, 2024 at 10:13", distance: 1, time: "1:12:22", calories: 200, mapImage: "#" }
]

export default function RecentActivityCard() {
    const [activityCards, setActivityCards] = useState<MergedDataType[]>([]) 
    const {user} = useUser();
    const userId = user?.id;

    useEffect(() => {
        if(!userId) {
            throw new Error("userId is undefined")
        }
        const activityCard = async() => {
            const cardData = await getActivityCardData(userId);
            setActivityCards(cardData);
        }

        activityCard()
    }, [])
           
    console.log('acticityCards: ', activityCards);
    
    

    return (
        <>
            <h1 className="text-2xl font-bold ml-3 mt-5">Recent Activities</h1>
            {activityCards.map((data) => (
                <Card key={data.id} className="space-y-6 mx-3 mt-2">
                    <CardContent>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 space-y-5">
                                    <img src={data.user.profile} alt="" />
                                    <div>
                                        <p className="font-semibold">{data.user.firstname}{data.user.lastname}</p>
                                        <p className="text-sm text-muted-foreground">{data.start_time}</p>
                                    </div>
                                </div>
                                <Button variant='ghost' size='sm'>
                                    Follow
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                                <div>
                                    <p className="text-muted-foreground">Distance</p>
                                    <p className="font-medium">{data.Distance}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Time</p>
                                    <p className="font-medium">{data.elapsed_time}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Average Speed</p>
                                    <p className="font-medium">{data.Distance}</p>
                                </div>
                                <div>
                                    <img src="#" alt="Running route" className="h-full w-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
