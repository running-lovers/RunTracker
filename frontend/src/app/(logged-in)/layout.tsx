import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react'

export default function Mainlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex'>
        <Sidebar />
        <main>{children}</main>
    </div>
  )
}
