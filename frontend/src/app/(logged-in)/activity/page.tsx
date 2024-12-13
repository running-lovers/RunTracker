'use client'

import { ActivityType, NewActivityType } from '@/types/activityType'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import ActivityCard from './_components/ActivityCard'
import { useUser } from "@/context/userContext";
import { useActivities } from '@/context/activitiesContext'
import { getActivitiesFromStrava, postActivities } from '@/lib/activity'

type activityHistoryAndPlanType = {
    id: number,
    user_id: number,
    activity_type: string,
    name: string,
    distance: number,
    duration: number,
    average_speed?: number,
    start_time: string,
    description: string
}

export default function Activitypage() {
    const {activities, setActivities} = useActivities()
    const [activityHistoryAndPlan, setActivityHistoryAndPlan] = useState<activityHistoryAndPlanType[]>([])
    const { user } = useUser();
    const access_token= user?.accessToken
    const userId = user?.id


    useEffect(() => {
        const firstFetchDataFromDataBase = async () => {
            const response = await fetch(`http://localhost:8080/api/activities/${userId}`,{
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            if(!response.ok) {
                throw new Error("fail to fetch activities data from database")
            }
            const data: activityHistoryAndPlanType[] = await response.json()
            const Runactivities = data.filter(activity => activity.activity_type === "Run")

            return Runactivities
        }

        const fetchAndSetData = async () => {
            const data = await firstFetchDataFromDataBase();
            setActivityHistoryAndPlan(data); // Ensure data matches activityHistoryAndPlanType[]
        };

        fetchAndSetData();
    }, [])

    // state Modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newActivity, setNewActivity] = useState<NewActivityType>({
        name: "",
        sport_type: "Run",
        start_date: "",
        distance: 0,
        elapsed_time: 0,
        description: ""
    })

    const parseDuration = (duration: string): number => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
    };


    const handleSaveActivity = async () => { 
        
        const formattedActivity: NewActivityType = {
            name: newActivity.name || 'Untitled Activity',
            sport_type: "Run",
            start_date: newActivity.start_date,
            distance: (newActivity.distance || 0) ,
            elapsed_time: newActivity.elapsed_time,
            description: newActivity.description || '',
        };


    const postNewActivityToDb = async () => {
        const res = await fetch("http://localhost:8080/api/activities", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                name: formattedActivity.name,
                sport_type: formattedActivity.sport_type,
                start_date: formattedActivity.start_date,
                distance: formattedActivity.distance,
                elapsed_time: formattedActivity.elapsed_time,
                description: formattedActivity.description
            })
        })

        if(!res.ok) {
            throw new Error('fail to post new activity to database')
        }

        const data = await res.json();
        console.log("data;", data);
        
        return data
    }

    const postedData = await postNewActivityToDb()
    
    const fetchUpdatedActivityFromDb = async() => {
        if(!userId) {
            throw new Error('userId is required')
        }
        const res = await fetch(`http://localhost:8080/api/activities/${userId}`,{
            headers: {
                "Content-Type" : "application/json"
            }
        })

        const data = await res.json();
        console.log("datafromDB: ", data)
        return data;
    }

    const updatedActivitiesFromDb = await fetchUpdatedActivityFromDb()
    

    setActivityHistoryAndPlan(updatedActivitiesFromDb);
    setIsModalOpen(false);
}

    console.log("activitiesinActivitypage;", activityHistoryAndPlan);
    

    return (
        <div className='flex-1 flex flex-col'>
            <div className='flex-1'>
                <div className='max-w-6xl mx-auto p-6'>
                    {/* <Header /> */}
                </div>
                <div className='flex justify-start mx-5 mb-3'>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Activity
                    </button>
                </div>
                <div className='flex flex-col mx-5 gap-y-3'>
                    {activityHistoryAndPlan?.map((activity, index) => (
                        <ActivityCard
                            key={activity.id || index}
                            activityStatus={
                                new Date(activity.start_time) <= new Date()
                                    ? 'completed'
                                    : 'planned'
                            }
                            // username={activity.athlete?.id.toString() || 'Unknown'}
                            title={activity.name}
                            Date={new Date(activity.start_time).toLocaleDateString()}
                            Time={new Date(activity.start_time).toLocaleTimeString()}
                            description={`Description: ${activity.description ?? 'none'}`}
                            distance={activity.distance ? (activity.distance / 1000) : 0}
                            duration={`${Math.floor(activity.duration! / 60)}m ${activity.duration! % 60}s`}
                            AvgSpeed={
                                activity.distance && activity.duration
                                    ? (activity.distance / activity.duration).toFixed(2)
                                    : '0.00'
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded w-[30%] h-[70%] overflow-y-auto'>
                        <h2 className='text-xl font-bold mb-4'>Add New Activity</h2>
                        <p className='font-semibold'>Title</p>
                        <div className='flex flex-col gap-3'>
                            <input
                                type="text"
                                placeholder="title"
                                className="border p-2 rounded"
                                value={newActivity.name}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, name: e.target.value })
                                }
                            />

                            <p className='font-semibold'>Distance (m)</p>
                            <input
                                type="number"
                                placeholder="Distance (m)"
                                className="border p-2 rounded"
                                value={newActivity.distance}
                                onChange={(e) =>
                                    setNewActivity({
                                        ...newActivity,
                                        distance: e.target.value === "" ? 0 : parseFloat(e.target.value),
                                    })
                                }
                            />
                            <p className='font-semibold'>Duration</p>
                            <input
                                type="number"
                                placeholder="Duration (HH:MM:SS)"
                                className="border p-2 rounded"
                                value={newActivity.elapsed_time}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, elapsed_time: Number(e.target.value) })
                                }
                            />
                            <p className='font-semibold'>Date</p>
                            <input
                                type="date"
                                className="border p-2 rounded"
                                value={newActivity.start_date ? newActivity.start_date.split("T")[0] : ""}
                                onChange={(e) => {
                                    const date = e.target.value;
                                    const time = newActivity.start_date.split("T")[1] || "00:00:00";
                                    setNewActivity({ ...newActivity, start_date: `${date}T${time}` });
                                }}
                            />
                            <p className='font-semibold'>Start Time</p>
                            <input
                                type="time"
                                className="border p-2 rounded"
                                value={newActivity.start_date ? newActivity.start_date.split("T")[1]?.slice(0, 5) : ""}
                                onChange={(e) => {
                                    const time = e.target.value;
                                    const date = newActivity.start_date.split("T")[0] || "1970-01-01";
                                    setNewActivity({ ...newActivity, start_date: `${date}T${time}:00` });
                                }}
                            />
                            <p className='font-semibold'>Description</p>
                            <textarea
                                placeholder="Description"
                                className="border p-2 rounded"
                                value={newActivity.description}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, description: e.target.value })
                                }
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleSaveActivity}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
