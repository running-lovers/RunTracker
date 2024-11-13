import { Button } from "@/components/ui/Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Edit, Ghost } from "lucide-react"
import React from 'react'
import { FaRegUserCircle } from "react-icons/fa"

export default function ProfileCard() {
    return (
        <div className="mx-5">
            <Card className="max-w-[600px] mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Information</CardTitle>
                    <Button variant='ghost' size='icon'><Edit className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-6 mb-10">
                        <FaRegUserCircle className="text-3xl" />
                        <div className="text-2xl font-bold">Yasuhito Komano</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Country</p>
                            <p>Japan</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">State</p>
                            <p>Hyogo</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">City</p>
                            <p>Nishinomiya</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Gender</p>
                            <p>Male</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
