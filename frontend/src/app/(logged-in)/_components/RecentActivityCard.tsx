import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Activity, BarChart2, Calendar, ChevronDown, MessageCircle, Map, User, Plus, MapPin } from "lucide-react"
import { FaRegUserCircle } from "react-icons/fa";

type ActivityType = {
    id: number,
    icon: React.ReactNode
    name: string,
    startDate: string,
    distance: number,
    time: string,
    calories: number,
    mapImage: string
}

const activities: ActivityType[] = [
    { id: 1, icon: <FaRegUserCircle className="h-10 w-10" />, name: "Yasuhito Komano", startDate: "16th October, 2024 at 15:55", distance: 1, time: "1:12:22", calories: 200, mapImage: "#" },
    { id: 2, icon: <FaRegUserCircle className="h-10 w-10" />, name: "Victor Sarut", startDate: "15th October, 2024 at 10:13", distance: 1, time: "1:12:22", calories: 200, mapImage: "#" }
]

export default function RecentActivityCard() {
    return (
        <>
        <h1 className="text-2xl font-bold ml-3 mt-5">Recent Activities</h1>
            {activities.map((activity) => (
                <Card className="space-y-6 mx-3 mt-2">
                    <CardContent>
                        <div key={activity.id}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 space-y-5">
                                    <div>{activity.icon}</div>
                                    <div>
                                        <p className="font-semibold">{activity.name}</p>
                                        <p className="text-sm text-muted-foreground">{activity.startDate}</p>
                                    </div>
                                </div>
                                <Button variant='ghost' size='sm'>
                                    Follow
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                                <div>
                                    <p className="text-muted-foreground">Distance</p>
                                    <p className="font-medium">{activity.distance}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Time</p>
                                    <p className="font-medium">{activity.time}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Calories</p>
                                    <p className="font-medium">{activity.calories}</p>
                                </div>
                                <div>
                                    <img src={activity.mapImage} alt="Running route" className="h-full w-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
