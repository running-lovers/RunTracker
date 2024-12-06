'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { useActivities } from '@/context/activitiesContext'
import { useGoals } from '@/context/goalsContext'
import { GoalsType } from '@/types/goalType'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { useUser } from '@/context/userContext'
import { ActivityType } from '@/types/activityType'
import { calculateAverageSpeed, calculateTotalDistance } from '@/lib/goal/goals'

const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL 

export default function GoalsCard() {
    const { activities } = useActivities();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { goals, setGoals } = useGoals();
    const now = new Date()
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString() //12
    const [month, setMonth] = useState<string>(currentMonth);
    const [goalOfEachMonth, setGoalOfEachMonth] = useState<GoalsType>();
    const [activitiesOfEachMonth, setActivitiesOfEachMonth] = useState<ActivityType[]>([])
    const {user} = useUser();
    const userId = user?.id;
    const [selectedYearAndMonth, setSelectedYearAndMonth] = useState<string>("");
    const [newDistance, setNewDistance] = useState<string>("");
    const [newAverageSpeed, setNewAverageSpeed] = useState<string>("");
    
    const handleSaveNewGoal = async() => {
        try {
            const [selectedYear, selectedMonth] = selectedYearAndMonth.split('-');
            const goalOfSelectedMonth = (y: string, m: string) => {
                const goal = goals.find((g) =>  Number(g.year) === Number(y) && Number(g.month) === Number(m))
                return goal;
            }
            const body = JSON.stringify({
                userId: userId,
                year: selectedYear || currentYear,
                month: selectedMonth || currentMonth,
                total_distance: newDistance || goalOfSelectedMonth(selectedYear, selectedMonth)?.total_distance,
                average_speed: newAverageSpeed || goalOfSelectedMonth(selectedYear, selectedMonth)?.average_speed
            });

            const res = await fetch(`${apiUrl}/api/goals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            })

            if(!res.ok) {
                throw new Error('fail to save new goal')
            }

            const newGoal: GoalsType = await res.json();

            setGoals((prevGoals: GoalsType[]) => {
                const updatedGoals = prevGoals.filter(
                    (g) => !(Number(g.year) === Number(newGoal.year) && Number(g.month) === Number(newGoal.month))
                );
                return [...updatedGoals, newGoal];
            });

            setSelectedYearAndMonth("");
            setNewDistance("");
            setNewAverageSpeed("");
            setIsEditModalOpen(false);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const goal = goals.find((g) => Number(g.year) === currentYear && Number(g.month) === Number(month))
        setGoalOfEachMonth(goal);
        const res = activities.filter((activity) => {
            const activityDate = new Date(activity.start_time);
            return (activityDate.getMonth() + 1).toString() === month;
        })
        setActivitiesOfEachMonth(res);
    }, [month, goals, currentYear])    

    const totalDistance = useMemo(() => {
        if(!activitiesOfEachMonth) {
            return 0;
        }
        return calculateTotalDistance(activitiesOfEachMonth);
    }, [activitiesOfEachMonth])

    const averageSpeed =  useMemo(() => {
        return calculateAverageSpeed(activitiesOfEachMonth);
    }, [activitiesOfEachMonth])    


    return (
        <div className='mt-5 mb-5'>
            <h1 className='text-3xl font-bold'>Monthly Goals</h1>
            <Card className='flex flex-col px-5'>
                <CardHeader>
                    <div className='flex justify-between'>
                        <Select onValueChange={(value) => setMonth(value)}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="absolute top-full max-h-[140px] overflow-auto">
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
                        <Dialog > 
                            <DialogTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                    <Edit className='w-4 h-4' />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className='m-auto'>
                                    <DialogTitle>Set Goals</DialogTitle>
                                </DialogHeader>
                                <div className='flex flex-col gap-3'>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='yearMonth' className='text-right'>Month</Label>
                                        <input
                                            id='yearMonth'
                                            type="month"
                                            value={selectedYearAndMonth}
                                            className='col-span-3 border border-gray-500 rounded-sm pl-1'
                                            onChange={(e) => setSelectedYearAndMonth(e.target.value)}
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='distance' className='text-right'>Distance(km)</Label>
                                        <input
                                            id='distance'
                                            placeholder='0km'
                                            value={newDistance}
                                            type="text"
                                            className='col-span-3 border border-gray-500 rounded-sm pl-1'
                                            onChange={(e) => setNewDistance(e.target.value)}
                                        />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='speed' className='text-right'>Average Speed(km/h)</Label>
                                        <input
                                            id='speed'
                                            placeholder='0km/h'
                                            type="text"
                                            value={newAverageSpeed}
                                            className='col-span-3 border border-gray-500 rounded-sm pl-1'
                                            onChange={(e) => setNewAverageSpeed(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSaveNewGoal} className='m-auto'>Save change</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className='space-y-5'>
                    <div>
                        <div className='mb-2 flex items-center justify-between '>
                            <span className='text-md font-medium'>Total Distance</span>
                            <span className='text-sm text-muted-foreground'>{totalDistance}/{goalOfEachMonth ? goalOfEachMonth.total_distance : ' -- '}km</span>
                        </div>
                        <Progress value={Math.min((totalDistance / (goalOfEachMonth?.total_distance || 1)) * 100, 100)} className='h-2' />
                    </div>
                    <div>
                        <div className='mb-2 flex items-center justify-between '>
                            <span className='text-md font-medium'>Average Pace</span>
                            <span className='text-sm text-muted-foreground'>{averageSpeed}/{goalOfEachMonth ? goalOfEachMonth.average_speed : ' -- '}km/h</span>
                        </div>
                        <Progress value={Math.min((averageSpeed / (goalOfEachMonth?.average_speed || 1)) * 100, 100)} className='h-2' />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
