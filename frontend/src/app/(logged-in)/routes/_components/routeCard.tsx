import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { RouteType } from "@/types/routeType";
import RouteMap from '@/components/RouteMap'
import { Button } from '@/components/ui/Button'
import { Star, StarOff } from 'lucide-react'

type PropsType = {
    route: RouteType
}

export default function RouteCard({ route }: PropsType) {
    
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between'>
                    <h2 className='text-lg font-semibold'>{route.route_name}</h2>
                    <Button variant="ghost" size="icon">
                        {route.isFavorite ? (<Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />) : (<StarOff className='h-4 w-4 text-gray-400' />)}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <RouteMap encodedPolyline={route.route_data.summary_polyline} />
                <div className='flex justify-evenly mt-4'>
                    <div>
                        <p className="text-gray-500">Distance</p>
                        <p className="font-semibold text-center">{(Number(route.distance) / 1000).toFixed(2)}km</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Difficulty</p>
                        <p className="font-semibold text-center">{route.difficulty ? route.difficulty : "--"}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
