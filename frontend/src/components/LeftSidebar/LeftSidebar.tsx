import { Activity } from "lucide-react"
import { FaRegUserCircle } from "react-icons/fa";
import NavList from "./NavList/NavList"

export default function LeftSidebar() {
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
                <div className="flex items-center absolute bottom-4 left-4">
                    <FaRegUserCircle className="text-gray-300 text-3xl"/>
                    <div className="ml-2 text-gray-300 text-xl">Yasuhito Komano</div>
                </div>
            </aside>
        </div>
    )
}
