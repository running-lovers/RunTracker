import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import React from 'react'

export default function Mainlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex flex-1'>
        <LeftSidebar />
        <main className='flex-grow h-screen overflow-y-auto'>{children}</main>
        <RightSidebar />
    </div>
  )
}
