'use client'

import { Button } from "@/components/ui/Button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useUser } from "@/context/userContext"
import { fetchUserProfileFromDb, fetchUserProfileFromStrava } from "@/lib/userProfile"
import { UserProfileType } from "@/types/useProfileType"
import { Edit } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa"

export default function ProfileCard() {
    const [userProfile, setUserProfile] = useState<UserProfileType>();
    const { user } = useUser();
    const userId = user?.id
    const DEFAULT_IMAGE_URL = "avatar/athlete/large.png";

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId) {
                throw new Error('can not get UserId from context')
            }
            try {
                const userProfileData = await fetchUserProfileFromDb(userId)
                if(!userProfileData) {
                    throw new Error('No response from fetchUserProfileFromDb')
                }
                setUserProfile(userProfileData);
                return userProfileData
            } catch (error) {
                throw new Error('fail to get userProfile data from database')
            }
        }
        fetchUserProfile();
    }, [])

    console.log('userProfileData: ', userProfile);


    return (
        <div className="mt-5">
            <h1 className="text-3xl font-bold">Information</h1>
                <Card className="relative max-w-[800px] mx-auto px-5">
                    <CardContent className="w-full mt-5">
                        <div className="flex items-center space-x-6 mb-10">
                            {userProfile?.profile !== DEFAULT_IMAGE_URL ? (
                                <img src={userProfile?.profile} alt="User Profile" referrerPolicy="no-referrer" className="w-[50px] h-[50px] rounded-full"/>
                            ) : (
                                <FaRegUserCircle className="w-[50px] h-[50px]" />
                            )
                            }
                            <div className="text-2xl font-bold">{userProfile?.firstname ? userProfile?.firstname : '-'} {userProfile ? userProfile?.lastname : '-'} </div>
                            <Button variant='ghost' size='icon' className="absolute right-5">
                                <Edit className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Country</p>
                                <p>{userProfile?.country ? userProfile?.country : '--'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">State</p>
                                <p>{userProfile?.state ? userProfile?.state : '--'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">City</p>
                                <p>{userProfile?.city ? userProfile?.city : '--'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Gender</p>
                                <p>{userProfile?.sex ? userProfile?.sex : '--'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
        </div>
    )
}
