export interface ActivityType {
  id: number
  name: string
  activity_type: string
  start_time: string
  Distance?: number
  elapsed_time?: string
  average_speed: number
  user: string
  status: "planned" | "completed"
  description: string
  route?: RouteType
}