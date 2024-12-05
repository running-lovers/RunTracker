'use client'

import { Activity } from '@/types/activityType'
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
    const [newActivity, setNewActivity] = useState<Activity>({
        id: 0,
        title: '',
        date: '',
        time: '',
        Distance: 0,
        Duration: '',
        Calories: 0,
        user: user?.name || "Unknown",
        status: 'planned',
        description: ''
    })

    const parseDuration = (duration: string): number => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
    };


    const handleSaveActivity = () => {
        const formattedActivity = {
            id: activities.length + 1,
            title: newActivity.title || 'Untitled Activity',
            start_date: `${newActivity.date || '2024-01-01'}T${newActivity.time || '00:00'}`,
            distance: (newActivity.Distance || 0) * 1000,
            elapsed_time: parseDuration(newActivity.Duration || '00:00:00'),
            average_speed:
                newActivity.Distance && newActivity.Duration
                    ? (newActivity.Distance / (parseDuration(newActivity.Duration) / 3600))
                    : 0,
            athlete: { id: user?.id || 0 },
            type: newActivity.status || 'Run',
            description: newActivity.description || '',
        };

        setActivities([...activities, formattedActivity]);
        setIsModalOpen(false);
    };

    return (
        <div className='flex-1 flex flex-col'>
            <div className='flex-1'>
                <div className='max-w-6xl mx-auto p-6'>
                    <Header />
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
                            activityStatus={activity.type === 'Run' ? 'completed' : 'planned'}
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
                        <p className='font-semibold'>Activity</p>
                        <div className='flex flex-col gap-3'>
                            <select
                                className="border p-2 rounded"
                                value={newActivity.title}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, title: e.target.value })
                                }
                            >
                                <option value="">Select activity type</option>
                                <option value="Morning Run">Morning Run</option>
                                <option value="Evening Jog">Evening Jog</option>
                                <option value="Afternoon Run">Afternoon Run</option>
                            </select>
                            <p className='font-semibold'>Distance (km)</p>
                            <input
                                type="text"
                                placeholder="Distance (km)"
                                className="border p-2 rounded"
                                value={newActivity.Distance}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, Distance: parseFloat(e.target.value) })
                                }
                            />
                            <p className='font-semibold'>Duration</p>
                            <input
                                type="text"
                                placeholder="Duration (HH:MM:SS)"
                                className="border p-2 rounded"
                                value={newActivity.Duration}
                                onChange={(e) =>
                                    setNewActivity({ ...newActivity, Duration: e.target.value })
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
