'use client'

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useUser } from "@/context/userContext";
import { getActivityCardData } from "@/lib/activity";
import { fetchUserProfileFromStrava, postUserProfile } from "@/lib/userProfile";
import { ActivityCardType } from "@/types/activityType";
import { UserProfileType } from "@/types/useProfileType";
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import RouteMap from "./RouteMap";

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

type MergedDataType = ActivityCardType & { user: UserType & { userProfile: UserProfileType } }

const temporalyActivities = [
    { id: 1, icon: <FaRegUserCircle className="h-10 w-10" />, name: "Yasuhito Komano", startDate: "16th October, 2024 at 15:55", distance: 1, time: "1:12:22", calories: 200, mapImage: "#" },
    { id: 2, icon: <FaRegUserCircle className="h-10 w-10" />, name: "Victor Sarut", startDate: "15th October, 2024 at 10:13", distance: 1, time: "1:12:22", calories: 200, mapImage: "#" }
]

export default function Dashboard() {
    const [activityCards, setActivityCards] = useState<MergedDataType[]>([])
    const { user } = useUser();
    const userId = user?.id;
    const DEFAULT_IMAGE_URL = "avatar/athlete/large.png";

    useEffect(() => {
        if (!userId) {
            throw new Error("userId is undefined")
        }

        const getAndPostProfileData = async () => {
            const data = await fetchUserProfileFromStrava(user.accessToken);
            const post = await postUserProfile(userId, data);
            return post
        }
        getAndPostProfileData();

        const activityCard = async () => {
            const cardData = await getActivityCardData(userId);
            setActivityCards(cardData);
        }

        activityCard()
    }, [user])

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
                                    { data.user.userProfile.profile !== DEFAULT_IMAGE_URL ? (
                                        <img src={data.user.userProfile.profile} alt='User Profile' className="w-[30px] h-[30px] rounded-full" />
                                    ) : (
                                        <FaRegUserCircle className="w-[30px] h-[30px]"/>
                                    )}
                                    <div>
                                        <p className="font-semibold">{data.user.userProfile.firstname}{data.user.userProfile.lastname}</p>
                                        <p className="text-sm text-muted-foreground">{data.start_time}</p>
                                    </div>
                                </div>
                                <Button variant='ghost' size='sm'>
                                    Follow
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex justify-evenly text-sm mt-2">
                                <div>
                                    <p className="text-muted-foreground">Distance</p>
                                    <p className="font-medium">{data.distance}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Time</p>
                                    <p className="font-medium">{data.duration}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Average Speed</p>
                                    <p className="font-medium">{data.average_speed}</p>
                                </div>
                            </div>
                            <div className="w-full mt-3">
                                {data.route_data ? <RouteMap encodedPolyline={data.route_data.summary_polyline} /> : <div>no map</div>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
