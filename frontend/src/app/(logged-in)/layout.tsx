import LeftSidebar from '@/components/Sidebar/LeftSidebar';
import React from 'react'

export default function Mainlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex'>
        <LeftSidebar />
        <main>{children}</main>
    </div>
  )
}
