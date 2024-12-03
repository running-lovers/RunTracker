"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

  

// (hardcoded)
const friendProfile = {
  id: 1,
  name: "John Doe",
  username: "@johndoe",
  bio: "Passionate runner, always striving to improve my personal best. Love exploring new routes!",
  location: "Tokyo, Japan",
  joined: "March 2023",
  stats: {
    weekly: { distance: "42.5 km", pace: "5'20\"/km", time: "3h 45m", calories: "2,450 kcal" },
    monthly: { distance: "180.3 km", pace: "5'15\"/km", time: "15h 20m", calories: "10,500 kcal" },
    yearly: { distance: "1,500 km", pace: "5'10\"/km", time: "120h 30m", calories: "90,000 kcal" },
  },
  activities: [
    { id: 1, title: "Morning Run", distance: "10.2 km", time: "52:30", pace: "5'08\"/km", date: "2 days ago" },
    { id: 2, title: "Evening Run", distance: "8.5 km", time: "45:10", pace: "5'18\"/km", date: "3 days ago" },
  ],
};

const FriendProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly"); // สำหรับการเลือกแท็บ Activity Summary
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
      <button onClick={() => router.push("/friends")} className="text-gray-600">
          ← Back to friends
        </button>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded">Start Chat</button>
          <button className="px-4 py-2 bg-black text-white rounded">Follow</button>
        </div>
      </div>

      {/* Friend Info */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold">{friendProfile.name}</h2>
        <p className="text-gray-500">{friendProfile.username}</p>
        <p className="mt-2">{friendProfile.bio}</p>
        <p className="mt-4 text-gray-500">
          📍 {friendProfile.location} · 📅 Joined {friendProfile.joined}
        </p>
      </div>

      {/* Activity Summary */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-xl font-semibold">Activity Summary</h3>
        <div className="flex space-x-4 mt-4">
          {["weekly", "monthly", "yearly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "weekly" | "monthly" | "yearly")}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-white font-semibold" : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-y-4">
            {/* Total Distance */}
            <div>
                <p className="text-sm text-gray-500">Total Distance</p>
                <p className="text-2xl font-bold">{friendProfile.stats[activeTab].distance}</p>
            </div>

            {/* Avg. Pace */}
            <div>
                <p className="text-sm text-gray-500">Avg. Pace</p>
                <p className="text-2xl font-bold">{friendProfile.stats[activeTab].pace}</p>
            </div>

            {/* Total Time */}
            <div>
                <p className="text-sm text-gray-500">Total Time</p>
                <p className="text-2xl font-bold">{friendProfile.stats[activeTab].time}</p>
            </div>

            {/* Calories Burned */}
            <div>
                <p className="text-sm text-gray-500">Calories Burned</p>
                <p className="text-2xl font-bold">{friendProfile.stats[activeTab].calories}</p>
            </div>
        </div>

      </div>

      {/* Recent Activities */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-xl font-semibold">Recent Activities</h3>
        <ul className="mt-4 space-y-4">
          {friendProfile.activities.map((activity) => (
            <li key={activity.id} className="flex justify-between">
              <div>
                <h4 className="font-semibold">{activity.title}</h4>
                <p className="text-gray-500">
                  {activity.distance} · {activity.time} · {activity.pace}
                </p>
              </div>
              <p className="text-gray-500">{activity.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendProfile;
