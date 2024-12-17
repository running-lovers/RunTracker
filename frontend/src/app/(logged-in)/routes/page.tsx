"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import RouteCard from "./_components/routeCard";
import { fetchRoutesFromDb } from "@/lib/route";
import { useUser } from "@/context/userContext";

export interface RouteType {
  id: number;
  route_name: string;
  distance: string;
  difficulty: string;
  isFavorite: boolean;
  route_data: any;
}

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
            <RouteCard key={route.id} route={route} />
          ))}
        </TabsContent>
        <TabsContent value="favorite">
          {routeData.filter(route => route.isFavorite).map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default MyRoutes;

