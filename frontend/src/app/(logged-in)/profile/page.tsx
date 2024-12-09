import React from 'react'
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
