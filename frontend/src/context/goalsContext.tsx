import { getMonthlyGoals } from "@/lib/goal/goals";
import { GoalsType } from "@/types/goalType";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./userContext";

interface GoalsContextType {
    goals: GoalsType[],
    setGoals: React.Dispatch<React.SetStateAction<GoalsType[]>>,
    goalOfThisMonth: GoalsType | undefined
}

interface GoalsProviderProps {
    children: ReactNode
    onLoad?: () => void
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children, onLoad }: GoalsProviderProps) => {
    const [goals, setGoals] = useState<GoalsType[]>([]);
    const [goalOfThisMonth, setGoalOfThisMonth] = useState<GoalsType>();
    const { user } = useUser();
    const userId = user!.id;
    const now = new Date()
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    useEffect(() => {
        if (!userId) {
            throw new Error('userId is required')
        }

        const fetchGoals = async () => {
            try {
                const goals = await getMonthlyGoals(userId);
                console.log('goalsfromDB:', goals);
                
                setGoals(goals)
            } catch (error) {
                console.error('Error fetching goals:', error)
            }
            finally {
                onLoad?.()
            }
        }

        fetchGoals();
    }, [])

    useEffect(() => {
        if (goals.length > 0) {
            const goal = goals.find(
                (g) => Number(g.year) === currentYear && Number(g.month) === currentMonth
            );
            setGoalOfThisMonth(goal);            
        }
    }, [goals, currentMonth]);
    
    
    // const goalOfThisMonth = useMemo(() => {
    //     const goal = goals.find((g) => Number(g.year) === currentYear && Number(g.month) === currentMonth)
    //     return goal;
    // }, [goals, currentMonth])

    return (
        <GoalsContext.Provider value={{ goals, setGoals, goalOfThisMonth }}>
            {children}
        </GoalsContext.Provider>
    )
}

export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (!context) {
        throw new Error('useGoals must be used within a GoalsProvider')
    }

    return context;
}
