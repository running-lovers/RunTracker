export interface ActivityType {
  id: number
  name: string
  activity_type: string
  start_date: string
  start_time: string
  distance?: number
  elapsed_time?: string
  average_speed: number
  user: string
  status: "planned" | "completed"
  description: string
  route?: RouteType
  date?: string;
  time?: string;
  sport_type?: string;
}