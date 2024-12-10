'use client'

import { ActivityType } from '@/types/activityType'
import React, { useState } from 'react'
import Header from './_components/Header'
import ActivityCard from './_components/ActivityCard'
import { useUser } from "@/context/userContext";
import { useActivities } from '@/context/activitiesContext'

export default function Activitypage() {
    const { activities, setActivities } = useActivities();
    const { user } = useUser();

    // state Modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newActivity, setNewActivity] = useState<ActivityType>({
        id: 0,
        name: '',
        activity_type: '',
        start_date: '',
        start_time: '',
        distance: 0,
        average_speed: 0,
        elapsed_time: '',
        user: user?.name || "Unknown",
        status: 'planned',
        description: '',
        date:'',
        time:'',
        sport_type: "Run",
    })

    const parseDuration = (duration: string): number => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
    };


    const handleSaveActivity = () => {
        const formattedActivity = {
            id: activities.length + 1,
            name: newActivity.name || 'Untitled Activity',
            activity_type: newActivity.activity_type || 'Unknown',
            start_date: `${newActivity.date || '2024-01-01'}T${newActivity.time || '00:00'}`,
            distance: (newActivity.distance || 0) * 1000,
            elapsed_time: parseDuration(newActivity.elapsed_time || '00:00:00'),
            average_speed:
                newActivity.distance && newActivity.elapsed_time
                    ? (newActivity.distance / (parseDuration(newActivity.elapsed_time) / 3600))
                    : 0,
            user: user?.name || "Unknown",
            status: newActivity.status || 'planned',
            description: newActivity.description || '',
        };

        setActivities([...activities, formattedActivity]);
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
                            username={activity.athlete?.id.toString() || 'Unknown'}
                            title={activity.name}
                            Date={new Date(activity.start_date).toLocaleDateString()}
                            Time={new Date(activity.start_date).toLocaleTimeString()}
                            description={`Description: ${activity.description ?? 'none'}`}
                            distance={activity.distance ? (activity.distance / 1000).toFixed(2) : '0.00'}
                            duration={`${Math.floor(activity.elapsed_time / 60)}m ${activity.elapsed_time % 60}s`}
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

                            <p className='font-semibold'>Distance (km)</p>
                            <input
                                type="text"
                                placeholder="Distance (km)"
                                className="border p-2 rounded"
                                value={newActivity.distance}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, distance: parseFloat(e.target.value) })
                                }
                            />
                            <p className='font-semibold'>Duration</p>
                            <input
                                type="text"
                                placeholder="Duration (HH:MM:SS)"
                                className="border p-2 rounded"
                                value={newActivity.elapsed_time}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, elapsed_time: e.target.value })
                                }
                            />
                            <p className='font-semibold'>Date</p>
                            <input
                                type="date"
                                className="border p-2 rounded"
                                value={newActivity.date}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, date: e.target.value })
                                }
                            />
                            <p className='font-semibold'>Start Time</p>
                            <input
                                type="time"
                                className="border p-2 rounded"
                                value={newActivity.time}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, time: e.target.value })
                                }
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
