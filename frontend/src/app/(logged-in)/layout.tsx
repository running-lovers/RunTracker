import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import { UserProvider } from '@/context/userContext';
import React from 'react'

export default function Mainlayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <ProtectedRoute>
        <div className='flex flex-1'>
          <LeftSidebar />
          <main className='flex-grow h-screen overflow-y-auto'>{children}</main>
          <RightSidebar />
        </div>
      </ProtectedRoute>
    </UserProvider>
  )
}
