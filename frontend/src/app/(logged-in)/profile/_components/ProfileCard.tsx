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
        <div className="mt-5">
            <h1 className="text-3xl font-bold">Information</h1>
            <Card className="relative max-w-[800px] mx-auto px-5">
                <CardContent className="w-full mt-5">
                    <div className="flex items-center space-x-6 mb-10">
                        <FaRegUserCircle className="text-3xl" />
                        <div className="text-2xl font-bold">Yasuhito Komano</div>
                        <Button variant='ghost' size='icon' className="absolute right-5">
                            <Edit className="w-4 h-4" />
                        </Button>
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
