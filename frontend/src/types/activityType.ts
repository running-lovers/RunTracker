export interface ActivityType {
  id: number
  name: string
  sport_type: string
  start_date: string
  distance?: number
  elapsed_time?: number
  average_speed?: number
  user: string
  status: "planned" | "completed"
  description: string
  route?: RouteType
}

export interface NewActivityType {
  name: string,
  sport_type: string
  start_date: string,
  distance: number,
  elapsed_time: number,
  description: string
}