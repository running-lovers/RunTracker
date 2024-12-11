'use client'

import { ActivityType, NewActivityType } from '@/types/activityType'
import React, { useState } from 'react'
import Header from './_components/Header'
import ActivityCard from './_components/ActivityCard'
import { useUser } from "@/context/userContext";
import { useActivities } from '@/context/activitiesContext'
import { getActivitiesFromStrava, postActivities } from '@/lib/activity'

export default function Activitypage() {
    const { activities, setActivities } = useActivities();
    const { user } = useUser();
    const access_token= user?.accessToken
    const userId = user?.id

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

        const postNewActivityToStrava = async () => {
            const res = await fetch("https://www.strava.com/api/v3/activities", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formattedActivity.name,
                    type: formattedActivity.sport_type,
                    start_date: formattedActivity.start_date,
                    distance: formattedActivity.distance,
                    elapsed_time: formattedActivity.elapsed_time,
                    description: formattedActivity.description
                })
            })

            if(!res.ok) {
                throw new Error('fail to post new activity to strava')
            }

            const data = await res.json();
            return data
        }

        const postedData = await postNewActivityToStrava()

        const data = await getActivitiesFromStrava(access_token!);
        const newData = await postActivities(data, userId!); 
        const newActivityFromStrava = await getActivitiesFromStrava(access_token!);
        

        setActivities(newActivityFromStrava)
        setIsModalOpen(false);
    };

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
                    {activities?.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activityStatus={activity.sport_type === 'Run' ? 'completed' : 'planned'}
                            // username={activity.athlete?.id.toString() || 'Unknown'}
                            title={activity.name}
                            Date={new Date(activity.start_date).toLocaleDateString()}
                            Time={new Date(activity.start_date).toLocaleTimeString()}
                            description={`Description: ${activity.description ?? 'none'}`}
                            distance={activity.distance ? (activity.distance / 1000) : 0}
                            duration={`${Math.floor(activity.elapsed_time! / 60)}m ${activity.elapsed_time! % 60}s`}
                            AvgSpeed={
                                activity.average_speed !== undefined
                                    ? activity.average_speed.toFixed(2)
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
