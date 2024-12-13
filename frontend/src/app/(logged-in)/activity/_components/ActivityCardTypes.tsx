export type ActivityCardProps = {
    activityStatus: "planned" | "completed";
    title: string;
    Date: string;
    Time: string;
    description: string;
    distance?: number;
    duration?: string;
    AvgSpeed?: string;
};
