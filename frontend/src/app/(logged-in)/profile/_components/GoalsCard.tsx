import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'


export default function GoalsCard() {
    return (
        <div className='mt-5'>
            <h1 className='text-3xl font-bold'>Monthly Goals</h1>
            <Card className='flex flex-col space-y-5 px-5'>
                    <div className='flex mt-3 justify-between'>
                        <Select>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="absolute top-full mt-1 max-h-[200px] overflow-auto">
                                <SelectItem value="January">January</SelectItem>
                                <SelectItem value="February">February</SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">September</SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">November</SelectItem>
                                <SelectItem value="December">December</SelectItem>
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
                                <span className='text-sm text-muted-foreground'>56.7/80km</span>
                            </div>
                            <Progress value={70} className='h-2' />
                        </div>
                        <div>
                            <div className='mb-2 flex items-center justify-between '>
                                <span className='text-md font-medium'>Average Pace</span>
                                <span className='text-sm text-muted-foreground'>5'30"/km</span>
                            </div>
                            <Progress value={85} className='h-2' />
                        </div>
                        <div>
                            <div className='mb-2 flex items-center justify-between '>
                                <span className='text-md font-medium'>Calories Burned</span>
                                <span className='text-sm text-muted-foreground'>2200/5500kcal</span>
                            </div>
                            <Progress value={40} className='h-2' />
                        </div>
                    </CardContent>
            </Card>
        </div>
    )
}
