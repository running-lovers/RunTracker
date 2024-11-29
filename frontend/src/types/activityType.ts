interface Map {
  id: string,
  polyline: string,
  resource_state: number,
  summary_polyline: string 
}

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
    route?: string
  }