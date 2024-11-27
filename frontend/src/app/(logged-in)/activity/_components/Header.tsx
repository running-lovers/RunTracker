import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    function setIsModalOpen(arg0: boolean): void {
        throw new Error('Function not implemented.')
    }

    return (
        <div className='flex flex-wrap gap-2 sm:gap-4'>
            <Select>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
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
            <Select>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Route" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Route1">Route1</SelectItem>
                    <SelectItem value="Route2">Route2</SelectItem>
                </SelectContent>
            </Select>
            {/* <Button className='bg-orange-500 hover:bg-orange-600 w-full sm:w-auto'>
                <Link href={'activity/create'}>
                <Plus className="mr-2 h-4 w-4" /> New Activity
                </Link>
            </Button> */}
            {/* <button
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(true)} // เพิ่มปุ่มเปิด Modal
                >
                + New Activity
            </button> */}
        </div>
    )
}
