'use client'


import { UserType } from '@/model/userModel';
import { User } from 'lucide-react';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

interface UserContextType {
    user: UserType | null
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);   

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user')
    //     if(storedUser) {
    //         setUser(JSON.parse(storedUser))
    //     }
    //     setIsLoading(false);
    // }, [])

    // const updateUser = (newUser: UserType | null) => {
    //     setUser(newUser)
    //     if(newUser) {
    //         localStorage.setItem('user', JSON.stringify(newUser))
    //     } else {
    //         localStorage.removeItem('user')
    //     }
    // }

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