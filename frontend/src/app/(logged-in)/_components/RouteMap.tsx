'use client'

import polyline from '@mapbox/polyline'
import { LatLngTuple } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


interface RouteMapProps {
    encodedPolyline: string
}

export default function RouteMap({ encodedPolyline }: RouteMapProps) {
    const [decodedPolyline, setDecodedPolyline] = useState<LatLngTuple[]>([])

    useEffect(() => {
        const decoded = polyline.decode(encodedPolyline) as [number, number][]
        setDecodedPolyline(decoded)
    }, [encodedPolyline])

    if (decodedPolyline.length === 0) {
        return <div>Loading map...</div>
    }

    const bounds = decodedPolyline.reduce(
        ([minLat, minLng, maxLat, maxLng], [lat, lng]) => [
            Math.min(minLat, lat),
            Math.min(minLng, lng),
            Math.max(maxLat, lat),
            Math.max(maxLng, lng),
        ],
        [Infinity, Infinity, -Infinity, -Infinity]
    )
    return (
        <div className='h-[200px] w-full relative overflow-hidden rounded-md'>
            <MapContainer
                bounds={[
                    [bounds[0], bounds[1]],
                    [bounds[2], bounds[3]]
                ]}
                className='h-[200px] w-full absolute inset-0'
                zoom={13}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline positions={decodedPolyline} color='blue' />
            </MapContainer>
        </div>
    )
}
