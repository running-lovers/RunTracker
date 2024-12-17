"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import RouteCard from "./_components/routeCard";

export interface RouteType {
  id: number;
  name: string;
  distance: string;
  difficulty: string;
  isFavorite: boolean;
  route_data: any;
}

const routes: RouteType[] = [
  {
    id: 1,
    name: "Route1",
    distance: "5.2km",
    difficulty: "Moderate",
    isFavorite: false,
    route_data: {
      "id": "a13090135700",
      "resource_state": 2,
      "summary_polyline": "ofxkHd{mnVa@c@RWGHWi@E?MOM?EK@CCGC?IMG?EGCA@IES]?AGUCm@SHSCG@BS@?ELBA@Gk@EGK@BYP_@ISDEIMCOQQKES?KEK@AESBMGWg@AIAA@A?CGIBGM[ICGKCCOOSKAGKEEMKACC@CGABEAQ@YLOFCBQIMCSMOGEAGGCEIC?AOGAEK?FFQ?KOBYP[HOACCG@GEAEBA?SBAA@AA?CXQCa@GWC@D?CG@ELJP?NSBADDADEODABPGHCICHCCAHB`@EQFYDNDWLAEXDA@EIOE^CQEL@??HEPAJEYMDAVP\\CFE?i@I?RBCGHCHHAJB@JADFFBXDAFHEP@DC?BLPHPTRFh@l@LBFHJDDLFBFTHJAFHVCJ?LDBPH^BHZJJXx@D@HNJH@A?@?ECPIBAB@UBAMPRM"
    }
  },
  {
    id: 2,
    name: "Morning Run",
    distance: "10.5km",
    difficulty: "Hard",
    isFavorite: true,
    route_data: {
      "id": "a13090135700",
      "resource_state": 2,
      "summary_polyline": "ofxkHd{mnVa@c@RWGHWi@E?MOM?EK@CCGC?IMG?EGCA@IES]?AGUCm@SHSCG@BS@?ELBA@Gk@EGK@BYP_@ISDEIMCOQQKES?KEK@AESBMGWg@AIAA@A?CGIBGM[ICGKCCOOSKAGKEEMKACC@CGABEAQ@YLOFCBQIMCSMOGEAGGCEIC?AOGAEK?FFQ?KOBYP[HOACCG@GEAEBA?SBAA@AA?CXQCa@GWC@D?CG@ELJP?NSBADDADEODABPGHCICHCCAHB`@EQFYDNDWLAEXDA@EIOE^CQEL@??HEPAJEYMDAVP\\CFE?i@I?RBCGHCHHAJB@JADFFBXDAFHEP@DC?BLPHPTRFh@l@LBFHJDDLFBFTHJAFHVCJ?LDBPH^BHZJJXx@D@HNJH@A?@?ECPIBAB@UBAMPRM"
    }
  },
];

const MyRoutes: React.FC = () => {
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
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </TabsContent>
        <TabsContent value="favorite">
          {routes.filter(route => route.isFavorite).map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default MyRoutes;

