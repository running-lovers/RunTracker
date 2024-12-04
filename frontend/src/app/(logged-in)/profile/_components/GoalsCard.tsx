'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { useActivities } from '@/context/activitiesContext'
import { useGoals } from '@/context/goalsContext'
import { GoalsType } from '@/types/goalType'

export default function GoalsCard() {
    const {activitiesOfThisMonth} = useActivities();
    const {goals} = useGoals();
    const now = new Date()
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString() //12
    const [month, setMonth] = useState<string>(currentMonth);
    const [goalOfEachMonth, setGoalOfEachMonth] = useState<GoalsType>();
      
    useEffect(() => {
        const goal = goals.find((g) => Number(g.year) === currentYear && Number(g.month) === Number(month))
        setGoalOfEachMonth(goal);
    }, [month])
    
    return (
        <div className='mt-5'>
            <h1 className='text-3xl font-bold'>Monthly Goals</h1>
            <Card className='flex flex-col space-y-5 px-5'>
                    <div className='flex mt-3 justify-between'>
                        <Select onValueChange={(value) => setMonth(value)}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="absolute top-full mt-1 max-h-[200px] overflow-auto">
                                <SelectItem value="1">January</SelectItem>
                                <SelectItem value="2">February</SelectItem>
                                <SelectItem value="3">March</SelectItem>
                                <SelectItem value="4">April</SelectItem>
                                <SelectItem value="5">May</SelectItem>
                                <SelectItem value="6">June</SelectItem>
                                <SelectItem value="7">July</SelectItem>
                                <SelectItem value="8">August</SelectItem>
                                <SelectItem value="9">September</SelectItem>
                                <SelectItem value="10">October</SelectItem>
                                <SelectItem value="11">November</SelectItem>
                                <SelectItem value="12">December</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant='ghost' size='icon'>
                            <Edit className='w-4 h-4' />
                        </Button>
                    </div>
                <CardContent className='space-y-5'>
                        <div>
                            <div className='mb-2 flex items-center justify-between '>
                                <span className='text-md font-medium'>Total Distance</span>
                                <span className='text-sm text-muted-foreground'>56.7/{goalOfEachMonth ? goalOfEachMonth.total_distance : ' -- '}km</span>
                            </div>
                            <Progress value={70} className='h-2' />
                        </div>
                        <div>
                            <div className='mb-2 flex items-center justify-between '>
                                <span className='text-md font-medium'>Average Pace</span>
                                <span className='text-sm text-muted-foreground'>5'30"/{goalOfEachMonth ? goalOfEachMonth.average_pace : ' -- '}km</span>
                            </div>
                            <Progress value={85} className='h-2' />
                        </div>
                    </CardContent>
            </Card>
        </div>
    )
}
