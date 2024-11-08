import { Activity } from "lucide-react"
import { Button } from "../ui/Button"
import NavList from "./NavList/NavList"

export default function Sidebar() {
    return (
        <div>
            <aside className="w-64 h-screen border-r bg-[#2A2D3E]">
                <div className="flex h-16 items-center px-6">
                    <Activity className="mr-2 h-6 w-6 text-orange-500" />
                    <span className="text-lg font-bold text-white">RunTracker</span>
                </div>
                <nav>
                    <NavList />
                </nav>
            </aside>
        </div>
    )
}
