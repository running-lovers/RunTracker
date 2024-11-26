'use client'

import { copyTracedFiles } from "next/dist/build/utils";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ClientDataContextType {
    clientId: string
    setClientId: Dispatch<SetStateAction<string>>
    clientSecret: string
    setClientSecret: Dispatch<SetStateAction<string>>
}

const ClientDataContext = createContext<ClientDataContextType | undefined>(undefined);

export const ClientDataProvider = ({ children }: { children: ReactNode }) => {
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    return (
        <ClientDataContext.Provider value={{ clientId, setClientId, clientSecret, setClientSecret }}>
            {children}
        </ ClientDataContext.Provider>
    )
}

export const useClientData = () => {
    const context = useContext(ClientDataContext)
    if(!context) {
        throw new Error('useContext must be used within a ClientDataProvider')
    }

    return context;
}