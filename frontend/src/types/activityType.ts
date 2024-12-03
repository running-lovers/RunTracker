export interface ActivityType {
    id: number
    sport_type: string
    start_time: Date
    distance?: number
    duration?: string
    calories?: number
    user: string
    status: "planned" | "completed"
    description: string
    route?: RouteType
  }