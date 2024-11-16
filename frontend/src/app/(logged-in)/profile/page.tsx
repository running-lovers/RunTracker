import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileCard from './_components/ProfileCard'
import GoalsCard from './_components/GoalsCard'

export default function page() {
  return (
    <div className='mx-5'>
      <ProfileCard />
      <GoalsCard />
    </div>
  )
}
