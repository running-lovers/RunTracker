"use client";

import React, { useState } from "react";

const FriendManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("searchResults");
  const [search, setSearch] = useState("");
  const friends = [
    { id: 1, name: "Alice Runner", username: "@alicerunner", isFollowing: true },
    { id: 2, name: "Bob Jogger", username: "@bobjogger", isFollowing: false },
    { id: 3, name: "Charlie Sprinter", username: "@charliesprinter", isFollowing: true },
    { id: 4, name: "Diana Marathon", username: "@dianamarathon", isFollowing: false },
  ];

  const suggestions = [
    { id: 1, name: "Alice Runner", username: "@alicerunner" },
    { id: 2, name: "Bob Jogger", username: "@bobjogger" },
    { id: 3, name: "Charlie Sprinter", username: "@charliesprinter" },
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

        {/* Tab Content */}
        <div>
          {activeTab === "searchResults" && (
            <ul>
              {filteredFriends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center justify-between p-2 mb-2 bg-white rounded shadow"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 text-center rounded-full flex items-center justify-center mr-4">
                      {friend.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{friend.name}</p>
                      <p className="text-gray-500">{friend.username}</p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded ${
                      friend.isFollowing
                        ? "bg-gray-200 text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    {friend.isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {activeTab === "following" && (
            <div className="p-4 bg-white rounded shadow">
              <p className="text-gray-700">Showing Following List...</p>
            </div>
          )}
          {activeTab === "followers" && (
            <div className="p-4 bg-white rounded shadow">
              <p className="text-gray-700">Showing Followers List...</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Friend Suggestions */}
      <div className="w-1/3 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Friend Suggestions</h2>
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 text-center rounded-full flex items-center justify-center mr-4">
                {suggestion.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{suggestion.name}</p>
                <p className="text-gray-500">{suggestion.username}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendManagement;
