'use client'

import { Activity } from '@/types/activityType'
import React, { useState } from 'react'
import Header from './_components/Header'
import ActivityCard from './_components/ActivityCard'
import { useUser } from "@/context/userContext";

export default function page() {
    const [activities, setActivities] = useState<Activity[]>([
        {
            id: 1,
            title: "Morning Run",
            date: "16 October 2024",
            time: "15:55",
            Distance: 8.53,
            Duration: "01:15:38",
            Calories: 234,
            user: "Yasuhito Komano",
            status: "completed",
            description: "A refreshing morning run through the local park."
        },
        {
            id: 2,
            title: "Evening Jog",
            date: "11/12",
            time: "11:00",
            Distance: 5,
            Duration: "00:30:00",
            Calories: 150,
            user: "Yasuhito Komano",
            status: "planned",
            description: "An easy jog to wind down after work."
        },
        {
            id: 3,
            title: "Afternoon Run",
            date: "18 October 2024",
            time: "14:30",
            Distance: 7.2,
            Duration: "00:47:22",
            Calories: 210,
            user: "Yasuhito Komano",
            status: "completed",
            description: "A challenging run on hilly terrain."
        }
    ])

    // state Modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user } = useUser();
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

    const handleSaveActivity = () => { 
        setActivities([ 
            ...activities,
            { ...newActivity, id: activities.length + 1 } 
        ])
        setIsModalOpen(false)
    }

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
                    {activities.map((activity) => (
                        <ActivityCard
                            key={activity.id} 
                            activityStatus={activity.status} 
                            username={activity.user} 
                            title={activity.title}
                            Date={activity.date} 
                            Time={activity.time} 
                            description={activity.description}
                            distance={activity.Distance}
                            duration={activity.Duration}
                            calories={activity.Calories}
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
