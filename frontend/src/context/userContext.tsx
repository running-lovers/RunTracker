'use client'

import { UserType } from '@/model/userModel';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface UserContextType {
    user: UserType | null
    setUser: Dispatch<SetStateAction<null>>
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context;
}