'use client'

import { UserType } from '@/model/userModel';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface UserContextType {
    user: UserType | null
    setUser:Dispatch<SetStateAction<null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser must be used within a UserProvider')
    }

    return context;
}