import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import React from 'react'
import { MessageSquare, Map, User, Heart, Users, Layout, Dumbbell } from "lucide-react"

interface NavItemProps {
    label: string;
    link: string;
    icon: React.ReactNode
}

export default function NavItem({ label, link, icon }: NavItemProps) {
    return (
            <Link
                href={link}
                className=' flex w-full justify-start text-gray-300  hover:bg-white/10 hover:text-white rounded-md py-2'>
                <span className='pl-4'>{icon}</span>
                <span className='pl-4'>{label}</span>
            </Link>
    )
}
