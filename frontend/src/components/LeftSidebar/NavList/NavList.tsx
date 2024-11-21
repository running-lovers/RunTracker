import React from 'react'
import NavItem from './NavItem/NavItem'
import { Activity, MessageSquare, Map, User, Heart, Users, Layout, Dumbbell } from "lucide-react"

type NavItemType = {
    id: number,
    label: string,
    link: string,
    icon: React.ReactNode
}

export default function NavList() {
    const navList: NavItemType[] = [
        {id: 1, label: 'Dashboard', link:'/', icon:<Layout/>},
        {id: 2, label: 'Activity', link: '/activity', icon:<Dumbbell />},
        {id: 3, label: 'Chat', link: '/chat', icon:<MessageSquare />},
        {id: 4, label: 'Route', link: '/routes', icon:<Map />},
        {id: 5, label: 'Friends', link: '/friends', icon:<Users />},
        {id: 6, label: 'Profile', link: '/profile', icon:<User />}
    ]

  return (
    <nav className='flex flex-col'>{navList.map((item) => (
        <NavItem key={item.id} label={item.label} link={item.link} icon={item.icon}/>
    ))}</nav>
  )
}
