export interface ActivityType {
  id: number
  name: string
  sport_type: string
  start_time: string
  Distance?: number
  elapsed_time?: string
  average_speed: number
  user: string
  status: "planned" | "completed"
  description: string
  route?: RouteType
}

export interface ActivityCardType {
  activity_type: string
  average_speed: number
  duration: number
  distance: number
  start_time: string
  route_data: RouteType
}