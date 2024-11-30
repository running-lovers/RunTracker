"use client";

import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
}

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("searchResults");
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Runner", username: "@alicerunner", isFollowing: true },
    { id: 2, name: "Bob Jogger", username: "@bobjogger", isFollowing: false },
    { id: 3, name: "Charlie Sprinter", username: "@charliesprinter", isFollowing: true },
    { id: 4, name: "Diana Marathon", username: "@dianamarathon", isFollowing: false },
  ]);

  // 検索結果のフィルタリング
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex gap-6 p-6">
      {/* Left Section: Friends Management */}
      <div className="w-2/3 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Friends</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 mb-4 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Tabs */}
        <div className="flex bg-gray-200 rounded mb-4 overflow-hidden">
          <button
            className={`flex-1 px-4 py-2 text-center ${
              activeTab === "searchResults"
                ? "bg-white text-black font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("searchResults")}
          >
            Search Results
          </button>
          <button
            className={`flex-1 px-4 py-2 text-center ${
              activeTab === "following"
                ? "bg-white text-black font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
          <button
            className={`flex-1 px-4 py-2 text-center ${
              activeTab === "followers"
                ? "bg-white text-black font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
        </div>

        {/* Search Results */}
        {activeTab === "searchResults" && (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {user.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-gray-500">{user.username}</p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded ${
                    user.isFollowing
                      ? "bg-gray-200 text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}