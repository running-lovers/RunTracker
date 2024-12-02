'use client'

import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import { ActivitiesProvider } from '@/context/activitiesContext';
import { GoalsProvider } from '@/context/goalsContext';
import React, { useEffect, useState } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Mainlayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  const [activitiesLoaded, setActivitiesLoaded] = useState(false)
  const [goalsLoaded, setGoalsLoaded] = useState(false)

  return (
    <ProtectedRoute>
      <ActivitiesProvider onLoad={() => setActivitiesLoaded(true)}>
        <GoalsProvider onLoad={() => setGoalsLoaded(true)}>
          <div className='flex flex-1'>
            <LeftSidebar />
            <main className='flex-grow h-screen overflow-y-auto'>{children}</main>
            {activitiesLoaded && goalsLoaded && <RightSidebar />}
          </div>
        </GoalsProvider>
      </ActivitiesProvider>
    </ProtectedRoute>
  )
}
