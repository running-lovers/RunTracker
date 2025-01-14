import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useUser } from "@/context/userContext";
import { ActivityCardProps } from './ActivityCardTypes';

export default function ActivityCard({ activityStatus, title, Date, Time, description, distance, duration, AvgSpeed 
}: ActivityCardProps) {
    const { user } = useUser();
    const username = user?.name || "Unknown User";
    return (
        <div >
            <Card>
                <CardHeader>
                    <div>
                    {username 
                            ? username
                                .split('')
                                .map(name => name.charAt(0).toUpperCase() + name.slice(1))
                                .join('') 
                            : 'U'}
                    </div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <div>
                            {Date} at {Time}
                        </div>
                        <div>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                activityStatus === 'completed'
                                    ? "bg-green-200 text-green-800"
                                    : "bg-blue-200 text-blue-800"
                            }`}
                        >
                            {activityStatus
                                ? activityStatus.charAt(0).toUpperCase() + activityStatus.slice(1)
                                : 'Unknown'}
                        </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>{description}</div>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <div>Distance</div>
                            <div>
                                <span>{distance} km.</span>
                            </div>
                        </div>
                        <div>
                            <div>Duration</div>
                            <div>
                                <span>{duration}</span>
                            </div>
                        </div>
                        <div>
                            <div>Average Speed</div>
                            <div>
                                <span>{AvgSpeed} m/s</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
