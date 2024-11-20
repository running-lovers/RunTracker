"use client";

import React from "react";

interface Route {
  id: number;
  name: string;
  distance: string;
  elevationGain: string;
  difficulty: string;
  estTime: string;
  imageUrl: string | null;
}

const routes: Route[] = [
  {
    id: 1,
    name: "Route1",
    distance: "5.2km",
    elevationGain: "127m",
    difficulty: "Moderate",
    estTime: "30min",
    imageUrl: null,
  },
  {
    id: 2,
    name: "Morning Run",
    distance: "10.5km",
    elevationGain: "250m",
    difficulty: "Hard",
    estTime: "1h",
    imageUrl: "https://via.placeholder.com/300",  //test
  },
];

const MyRoutes: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">My Routes</h1>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div
            key={route.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* Route Name */}
            <h2 className="text-lg font-semibold mb-2">{route.name}</h2>

            {/* Route Image */}
            <div className="mb-4">
              {route.imageUrl ? (
                <img
                  src={route.imageUrl}
                  alt={route.name}
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            {/* Route Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Distance</p>
                <p className="font-semibold">{route.distance}</p>
              </div>
              <div>
                <p className="text-gray-500">Elevation Gain</p>
                <p className="font-semibold">{route.elevationGain}</p>
              </div>
              <div>
                <p className="text-gray-500">Difficulty</p>
                <p className="font-semibold">{route.difficulty}</p>
              </div>
              <div>
                <p className="text-gray-500">Est Time</p>
                <p className="font-semibold">{route.estTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRoutes;

