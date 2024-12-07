

import { useActivities } from "@/context/activitiesContext";
import RecentActivityCard from "./_components/RecentActivityCard";
import { ActivityType } from "@/types/activityType";
import { getAllActivitiesFromDb } from "@/lib/activity";

export default async function AuthenticatedHomePage() {  
  const allActivities = await getAllActivitiesFromDb();
  

return (
  <div className='mx-5'>
    <RecentActivityCard allActivities={allActivities}/>
  </div>
)
}
