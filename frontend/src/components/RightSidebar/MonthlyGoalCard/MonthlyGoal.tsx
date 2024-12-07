'use client'

import React, { useMemo } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGoals } from '@/context/goalsContext'
import { useActivities } from '@/context/activitiesContext'
import { calculateAverageSpeed, calculateTotalDistance } from '@/lib/goal/goals'

export default function MonthlyGoal() {
    const {goalOfThisMonth} = useGoals();
    const{activitiesOfCurrentMonth} = useActivities();

    console.log('Activity of this month:', activitiesOfCurrentMonth);

    console.log('goalOfThisMonth',goalOfThisMonth);

    const totalDistance = useMemo(() => {
        return calculateTotalDistance(activitiesOfCurrentMonth);
    }, [activitiesOfCurrentMonth])

    const averageSpeed = useMemo(() => {
        return calculateAverageSpeed(activitiesOfCurrentMonth);
    }, [activitiesOfCurrentMonth])
    
    
    return (
        <Card className='bg-white mr-4 mt-5'>
            <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div>
                    <div className='mb-2 flex items-center justify-between '>
                        <span className='text-sm font-medium'>Total Distance</span>
                        <span className='text-sm text-muted-foreground'>{totalDistance}/{goalOfThisMonth ? goalOfThisMonth.total_distance : ' -- '}km</span>
                    </div>
                        <Progress value={goalOfThisMonth && goalOfThisMonth.total_distance ? Math.min((totalDistance / goalOfThisMonth.total_distance) * 100, 100) : 0} 
                                  className='h-2'
                        />
                </div>
                <div>
                    <div className='mb-2 flex items-center justify-between '>
                        <span className='text-sm font-medium'>Average Pace</span>
                        <span className='text-sm text-muted-foreground'>{averageSpeed}/{goalOfThisMonth ? goalOfThisMonth.average_speed : ' -- '}km/h</span>
                    </div>
                        <Progress value={goalOfThisMonth && goalOfThisMonth.average_speed ? Math.min((averageSpeed / goalOfThisMonth.average_speed) * 100, 100) : 0} className='h-2' />
                </div>
            </CardContent>
        </Card>
    )
}
