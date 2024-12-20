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
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import RouteMap from "../../../components/RouteMap";

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
            const cardData: MergedDataType[] = await getActivityCardData(userId);

            const addAverageSpeed = cardData.map((data) => ({
                ...data,
                average_speed: data.distance && data.duration ? (data.distance / data.duration) * 3.6 : 0,
            }))
            setActivityCards(addAverageSpeed);
        }

        activityCard()
    }, [user])

    const convertDurationTime = (seconds: number) => {
        const hours = Math.floor(seconds/3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h${minutes}min`
    }

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
                                        <img src={data.user.userProfile.profile} alt='User Profile' className="w-[30px] h-[30px] rounded-full" referrerPolicy="no-referrer" />
                                    ) : (
                                        <FaRegUserCircle className="w-[30px] h-[30px]"/>
                                    )}
                                    <div>
                                        <p className="font-semibold">{data.user.userProfile.firstname}{data.user.userProfile.lastname}</p>
                                        <p className="text-sm text-muted-foreground">{data.start_time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-evenly text-sm mt-2">
                                <div>
                                    <p className="text-muted-foreground">Distance</p>
                                    <p className="font-medium">{((data.distance) / 1000).toFixed(2)}km</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Time</p>
                                    <p className="font-medium">{convertDurationTime(data.duration)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Average Speed</p>
                                    <p className="font-medium">{data.average_speed ? (data.average_speed).toFixed(2) : "--"}km/h</p>
                                </div>
                            </div>
                            <div className="w-full mt-3">
                                {data.route_data && data.route_data.summary_polyline !== "" ? <RouteMap encodedPolyline={data.route_data.summary_polyline} /> : <div>no map data</div>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
