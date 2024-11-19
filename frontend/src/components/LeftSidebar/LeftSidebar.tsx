'use client'

import { Activity } from "lucide-react"
import { FaRegUserCircle } from "react-icons/fa";
import NavList from "./NavList/NavList"
import { Button } from "../ui/Button";
import { useUser } from "@/context/userContext";
import { log } from "util";

export default function LeftSidebar() {

    const { user, setUser } = useUser();
    console.log('stravaId:', user);

    const handleLogout = async () => {
        
        if (!user?.strava_id) {
            console.error('Strava ID is missing');
            return;
        }
        const res = await fetch('http://localhost:8080/api/strava/logout', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ strava_id: user?.strava_id })
        })
        if (res.ok) {
            setUser(null); // ログアウト後のユーザー情報をクリア
            window.location.href = 'http://localhost:3000/home'; // リダイレクト
        } else {
            console.error('Failed to log out user');
        }
    }

    return (
        <div>
            <aside className="w-60 h-screen border-r bg-[#2A2D3E] flex flex-col">
                <div className="flex h-16 items-center px-6 flex-shrink-0">
                    <Activity className="mr-2 h-6 w-6 text-orange-500" />
                    <span className="text-lg font-bold text-white">RunTracker</span>
                </div>
                <nav>
                    <NavList />
                </nav>
                <Button onClick={handleLogout}>Logout</Button>
                <div className="flex items-center absolute bottom-4 left-4">
                    <FaRegUserCircle className="text-gray-300 text-3xl" />
                    <div className="ml-2 text-gray-300 text-xl">{user?.name}</div>
                </div>
            </aside>
        </div>
    )
}
