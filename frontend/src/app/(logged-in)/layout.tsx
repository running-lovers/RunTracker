'use client'

import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import { ActivitiesProvider } from '@/context/activitiesContext';
import { GoalsProvider } from '@/context/goalsContext';
import React, { useEffect } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Mainlayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  // const user = localStorage.getItem('user');
  // const parsedUser = JSON.parse(user!);
  // console.log(parsedUser);
  // const userId = parsedUser.id;
  // console.log('userId:', userId)

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
