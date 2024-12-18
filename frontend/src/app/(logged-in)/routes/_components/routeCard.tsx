import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import { RouteType } from "@/types/routeType";
import RouteMap from '@/components/RouteMap'
import { Button } from '@/components/ui/Button'
import { Edit, Star, StarOff } from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { putRouteData } from '@/lib/route';

type PropsType = {
    route: RouteType
    onFavoriteToggle: (routeId: number) => void;
    onRouteUpdate: (updateRoute: RouteType) => void;
}

export default function RouteCard({ route, onFavoriteToggle, onRouteUpdate }: PropsType) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedName, setEditedName] = useState(route.route_name);
    const [editedDifficulty, setEditedDifficulty] = useState(route.difficulty || 'Beginner');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async() => {
        setIsLoading(true);
        const body = {route_name: editedName, difficulty: editedDifficulty}
        try {
            const updatedRouteData = await putRouteData(route.id, body);
            onRouteUpdate(updatedRouteData);
            setIsEditModalOpen(false);
        } catch (error) {
            throw new Error("fail to send putRouteData function new route data")   
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between'>
                    <h2 className='text-lg font-semibold'>{route.route_name}</h2>
                    <div>
                        <Button variant="ghost" size="icon" onClick={() => onFavoriteToggle(route.id)}>
                            {route.is_favorite ? (<Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />) : (<StarOff className='h-4 w-4 text-gray-400' />)}
                        </Button>
                        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Edit className='w-4 h-4' />
                                </Button>
                            </DialogTrigger>
                            <DialogContent >
                                <DialogHeader>
                                    <DialogTitle>Edit Route</DialogTitle>
                                </DialogHeader>
                                <div>
                                    <div>
                                        <Label htmlFor='route-name'>Route Name</Label>
                                        <Input
                                            id='route-name'
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='difficulty'>Difficulty</Label>
                                    </div>
                                    <div>
                                        <Select value={editedDifficulty} onValueChange={setEditedDifficulty}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Begginer">Begginer</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter className='flex space-x-2'>
                                    <Button  onClick={() => setIsEditModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} disabled={isLoading} >
                                        {isLoading ? "Saving..." : "Save"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='relative z-0'>
                    <RouteMap encodedPolyline={route.route_data.summary_polyline} />
                </div>
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
