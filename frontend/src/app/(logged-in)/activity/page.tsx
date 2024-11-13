'use client'

import { Activity } from '@/types/activityType'
import React, { useState } from 'react'
import Header from './_components/Header'
import ActivityCard from './_components/ActivityCard'

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

    return (
        <div className='flex-1 flex flex-col'>
            <div className='flex-1'>
                <div className='max-w-6xl mx-auto p-6'>
                    <Header />
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
        </div>
    )
}
