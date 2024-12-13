import { ActivityType } from "@/types/activityType";

const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL

export const getMonthlyGoals = async(userId: number) => {
    const res = await fetch(`${apiUrl}/api/goals/${userId}`)
    if(!res.ok) {
      throw new Error('failed to get response from getGoals')
    }
    const data = await res.json();
    return data;
}

export const calculateTotalDistance = (activities: ActivityType[]) => {
  return Math.round(activities.reduce((sum, activity) => sum + activity.distance!, 0) / 1000)
}

export const calculateAverageSpeed = (activities: ActivityType[]) => {
  const speed = activities.reduce((sum, activity) => sum + activity.average_speed!, 0) / activities.length;
  return Math.round(speed * 100) / 100;
}