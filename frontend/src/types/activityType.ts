export interface Activity {
    id: number
    title: string
    date: string
    time: string
    Distance?: number
    Duration?: string
    Calories?: number
    user: string
    status: "planned" | "completed"
    description: string
    route?: RouteType
  }