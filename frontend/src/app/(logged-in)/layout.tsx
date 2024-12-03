'use client'

import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import { ActivitiesProvider } from '@/context/activitiesContext';
import { GoalsProvider } from '@/context/goalsContext';
import React from 'react'

export default function Mainlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <ActivitiesProvider>
        <GoalsProvider>
          <div className='flex flex-1'>
            <LeftSidebar />
            <main className='flex-grow h-screen overflow-y-auto'>{children}</main>
            <RightSidebar />
          </div>
        </GoalsProvider>
      </ActivitiesProvider>
    </ProtectedRoute>
  )
}
