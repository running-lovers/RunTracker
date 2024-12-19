"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import RouteCard from "./_components/routeCard";
import { fetchRoutesFromDb, toggleIsFavorite } from "@/lib/route";
import { useUser } from "@/context/userContext";
import { RouteType } from "@/types/routeType";

const MyRoutes: React.FC = () => {
  const {user} = useUser();
  const userId = user!.id;
  const [routeData, setRouteData] = useState<RouteType[]>([])

  useEffect(() => {
    const getRouteData = async() => {
      const routeData = await fetchRoutesFromDb(userId);
      setRouteData(routeData);
    }

    getRouteData();
  }, [])

  const handleFavoriteToggle = async(routeId: number) => {
    const updatedRoute = await toggleIsFavorite(routeId, routeData.find((route) => route.id === routeId)!.is_favorite)

    setRouteData((prevData) => {
      return prevData.map((route) => (route.id === routeId ? {...route, is_favorite: updatedRoute.is_favorite}: route))
    })
  }

  const onRouteUpdate = (updatedRoute: RouteType) => {
    setRouteData((prevRouteData) => prevRouteData.map((route) => (route.id === updatedRoute.id ? updatedRoute : route)))
  }

  console.log("favorite:", routeData);
  

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">My Routes</h1>

      {/* Routes List */}
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="favorite">Favorite</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="space-y-4">
          {routeData.map((route) => (
            <RouteCard key={route.id} route={route} onFavoriteToggle={handleFavoriteToggle}  onRouteUpdate={onRouteUpdate}/>
          ))}
        </TabsContent>
        <TabsContent value="favorite">
          {routeData.filter(route => route.is_favorite).map((route) => (
            <RouteCard key={route.id} route={route} onFavoriteToggle={handleFavoriteToggle} onRouteUpdate={onRouteUpdate} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyRoutes;

