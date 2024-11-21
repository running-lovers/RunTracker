'use client'

import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import { UserProvider, useUser } from '@/context/userContext';
import React, { useEffect } from 'react'

export default function Mainlayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const {setUser, setIsLoading} = useUser()
  return (
      <ProtectedRoute>
        <div className='flex flex-1'>
          <LeftSidebar />
          <main className='flex-grow h-screen overflow-y-auto'>{children}</main>
          <RightSidebar />
        </div>
      </ProtectedRoute>
  )
}
