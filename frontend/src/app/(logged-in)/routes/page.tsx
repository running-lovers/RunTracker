"use client";

import React, { useEffect, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useActivities } from "@/context/activitiesContext";

interface Route {
  id: number;
  user_id: number;
  route_name: string;
  coordinates: {
    type: "LineString";
    coordinates: [number, number][];
  };
  distance: number;
  elevation_data: {
    gain: number;
    loss: number;
  };
  is_favorite: boolean;
  created_at: string;
}

// test data
const routes: Route[] = [
  {
    id: 1,
    user_id: 1,
    route_name: "Imperial Palace Loop",
    coordinates: {
      type: "LineString",
      coordinates: [
        [139.7513, 35.6857],  // Imperial Palace Gardens (Start Point)
        [139.7524, 35.6867],  // Towards Otemon Gate
        [139.7541, 35.6873],  // Tayasumon Intersection
        [139.7557, 35.6874],  // In front of Kitahanebashimon Gate
        [139.7573, 35.6866],  // Hanzomon Intersection
        [139.7576, 35.6851],  // In front of Hanzomon Station
        [139.7568, 35.6836],  // Sakashitamon Intersection
        [139.7558, 35.6830],  // In front of Sakuradamon Gate
        [139.7543, 35.6826],  // Hibiya Street
        [139.7530, 35.6830],  // In front of Wadakura Fountain Park
        [139.7513, 35.6857]   // Back to Start Point
      ]
    },
    distance: 5.0,
    elevation_data: {
      gain: 127,
      loss: 127
    },
    is_favorite: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    user_id: 1,
    route_name: "Yoyogi Park Circuit",
    coordinates: {
      type: "LineString",
      coordinates: [
        [139.7002, 35.6711],  // Harajuku Gate (Start Point)
        [139.6982, 35.6705],  // Yoyogi Park First Street
        [139.6963, 35.6698],  // West Gate Intersection
        [139.6947, 35.6707],  // Uehara Area
        [139.6940, 35.6721],  // Yoyogi Park West Path
        [139.6951, 35.6736],  // North West Path
        [139.6975, 35.6742],  // In front of Olympic Stadium
        [139.7001, 35.6737],  // In front of Gymnasium
        [139.7024, 35.6728],  // Towards Shibuya Gate
        [139.7021, 35.6718],  // Towards Harajuku Gate
        [139.7002, 35.6711]   // Back to Start Point
      ]
    },
    distance: 3.5,
    elevation_data: {
      gain: 250,
      loss: 250
    },
    is_favorite: false,
    created_at: new Date().toISOString()
  }
];

const MyRoutes: React.FC = () => {
  const { error, isLoading } = useActivities();
  const mapRefs = useRef<{ [key: number]: L.Map }>({});

  useEffect(() => {
    routes.forEach(route => {
      const mapId = `map-${route.id}`;
      if (!mapRefs.current[route.id]) {
        const bounds = L.latLngBounds(route.coordinates.coordinates.map(coord => [coord[1], coord[0]]));
        const map = L.map(mapId).fitBounds(bounds);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.polyline(route.coordinates.coordinates.map(coord => [coord[1], coord[0]]), {
          color: 'red',
          weight: 3
        }).addTo(map);

        mapRefs.current[route.id] = map;
      }
    });

    return () => {
      Object.values(mapRefs.current).forEach(map => map.remove());
    };
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-40">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Routes</h1>
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2">{route.route_name}</h2>
            <div className="mb-4 h-40 relative">
              <div id={`map-${route.id}`} className="w-full h-full rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Distance</p>
                <p className="font-semibold">{route.distance}km</p>
              </div>
              <div>
                <p className="text-gray-500">Elevation Gain</p>
                <p className="font-semibold">{route.elevation_data.gain}m</p>
              </div>
              <div>
                <p className="text-gray-500">Favorite</p>
                <p className="font-semibold">{route.is_favorite ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-semibold">{new Date(route.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRoutes;

