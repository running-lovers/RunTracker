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
import { getActivitiesFromDb } from '@/lib/activity'
import { useActivities } from '@/context/activitiesContext'

export default function MonthlyGoal() {
    const {goals} = useGoals();
    const now = new Date()
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth()+1;
    const{activities} = useActivities();

    const ActivitiesOfThisMonth = useMemo(() => {      
        return activities.filter((activity) => {
            const activityDate = new Date(activity.start_time);            
            
            return activityDate.getMonth() === currentMonth - 2;
        })
    }, [activities]) 
    
    console.log('Activity of this month:', ActivitiesOfThisMonth);
    
    
    const goalOfThisMonth = goals.find(
        (g) => Number(g.year) === currentYear && Number(g.month) === currentMonth
    )  
    
    return (
        <Card className='bg-white mr-4 mt-5'>
            <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div>
                    <div className='mb-2 flex items-center justify-between '>
                        <span className='text-sm font-medium'>Total Distance</span>
                        <span className='text-sm text-muted-foreground'>56.7/{goalOfThisMonth?.total_distance}km</span>
                    </div>
                        <Progress value={70} className='h-2' />
                </div>
                <div>
                    <div className='mb-2 flex items-center justify-between '>
                        <span className='text-sm font-medium'>Average Pace</span>
                        <span className='text-sm text-muted-foreground'>{goalOfThisMonth?.average_pace}km/h</span>
                    </div>
                        <Progress value={85} className='h-2' />
                </div>
                <div>
                    <div className='mb-2 flex items-center justify-between '>
                        <span className='text-sm font-medium'>Calories Burned</span>
                        <span className='text-sm text-muted-foreground'>2200/{goalOfThisMonth?.calories_burned}kcal</span>
                    </div>
                        <Progress value={40} className='h-2' />
                </div>
            </CardContent>
        </Card>
    )
}
