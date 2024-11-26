'use client'


import { handleStravaCallback } from '@/lib/handleStravaCallback';
import { UserType } from '@/model/userModel';
import { User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useClientData } from './clientDataContext';

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
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const checkUserAuthentication = async() => {
            try {
                const storedUser = localStorage.getItem('user');
                if(storedUser) {
                    const parsedUser = JSON.parse(storedUser)
                    setUser(parsedUser);
                }

                const storedClientId = localStorage.getItem('clientId')
                const storedClientSecret = localStorage.getItem('clientSecret')
                
                if(storedClientId && storedClientSecret) {
                    const parsedClientId = JSON.parse(storedClientId)
                    const parsedClientSecret = JSON.parse(storedClientSecret)
                    const stravaCode = searchParams.get('code')
                    if(stravaCode) {
                        await handleStravaCallback(stravaCode, setUser, setIsLoading, parsedClientId, parsedClientSecret )
                        router.push('/')
                    } 
                }

            } catch (error) {
                console.log('Authentication error:', error);
                localStorage.removeItem('user')
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkUserAuthentication()
    }, [])

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