export interface ActivityType {
    id: number
    title: string
    start_time: Date
    Distance?: number
    Duration?: string
    Calories?: number
    user: string
    status: "planned" | "completed"
    description: string
    route?: RouteType
  }