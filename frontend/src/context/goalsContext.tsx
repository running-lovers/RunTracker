    import { getMonthlyGoals } from "@/lib/goal/goals";
    import { GoalsType } from "@/types/goalType";
    import { createContext, ReactNode, useContext, useEffect, useState } from "react";
    import { useUser } from "./userContext";

    interface GoalsContextType {
        goals: GoalsType[],
        setGoals: React.Dispatch<React.SetStateAction<GoalsType[]>>
    }

    interface GoalsProviderProps {
        children: ReactNode
        onLoad?: () => void
    }

    const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

    export const GoalsProvider = ({children, onLoad}: GoalsProviderProps) => {
        const [goals, setGoals] = useState<GoalsType[]>([]);
        const {user} = useUser();
        const userId= user!.id;
        useEffect(() => {
            if(!userId) {
                throw new Error('userId is required')
            }

            const fetchGoals = async () => {
                try {
                    const goals = await getMonthlyGoals(userId);
                    setGoals(goals)
                } catch (error) {
                    console.error('Error fetching goals:', error )
                }
                finally{
                    onLoad?.()
                }
            }
            fetchGoals();
        },[onLoad])
        

        return (
            <GoalsContext.Provider value={{goals, setGoals}}>
                {children}
            </GoalsContext.Provider>
        )
    }

    export const useGoals = () => {
        const context = useContext(GoalsContext);
        if(!context) {
            throw new Error('useGoals must be used within a GoalsProvider')
        }

        return context;
    }
