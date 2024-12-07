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
    const{activitiesOfThisMonth} = useActivities();

    const totalDistance = useMemo(() => {
        return calculateTotalDistance(activitiesOfThisMonth);
    }, [activitiesOfThisMonth])

    const averageSpeed = useMemo(() => {
        return calculateAverageSpeed(activitiesOfThisMonth);
    }, [activitiesOfThisMonth])
    
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
                        <Progress value={70} className='h-2' />
                </div>
                <div>
                    <div className='mb-2 flex items-center justify-between '>
                        <span className='text-sm font-medium'>Average Pace</span>
                        <span className='text-sm text-muted-foreground'>{averageSpeed}/{goalOfThisMonth ? goalOfThisMonth.average_pace : ' -- '}km/h</span>
                    </div>
                        <Progress value={85} className='h-2' />
                </div>
            </CardContent>
        </Card>
    )
}
