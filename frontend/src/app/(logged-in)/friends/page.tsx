"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { fetchAndFormatUsers, filterUsersByQuery, filterUsersByType, followUser, unfollowUser } from "@/lib/connections";
import { ConnectionUser } from "@/types/connectionUserType";
import Image from "next/image";

export default function FriendsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'searchResults' | 'following' | 'followers'>('searchResults');
  const [users, setUsers] = useState<ConnectionUser[]>([]);
  const { user: currentUser } = useUser();

  useEffect(() => {
    if (!currentUser) return;
    
    console.log('Fetching users for:', currentUser.id);
    
    fetchAndFormatUsers(currentUser.id)
        .then(users => {
            console.log('API Response Data:', users);
            setUsers(users);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
            setUsers([]);
        });
    }, [currentUser]);

  const usersForActiveTab = filterUsersByType(users, activeTab, currentUser?.id);
  const filteredUsers = filterUsersByQuery(usersForActiveTab, searchQuery);

  const handleFollowToggle = async (targetUser: ConnectionUser) => {
    if (!currentUser) return;
  
    try {
      console.log('Attempting to toggle follow for:', {
        currentUser: currentUser.id,
        targetUser: targetUser.id,
        currentStatus: targetUser.isFollowing
      });
  
      if (targetUser.isFollowing) {
        await unfollowUser(currentUser.id, targetUser.id);
      } else {
        await followUser(currentUser.id, targetUser.id);
      }
  
      setUsers(users.map(user => 
        user.id === targetUser.id 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      ));
  
    } catch (error) {
      console.error('Detailed error:', error);
      
      if (error instanceof Error) {
        alert(`Failed to ${targetUser.isFollowing ? 'unfollow' : 'follow'} user: ${error.message}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="w-2/3 p-6 bg-gray-100 rounded-lg shadow">
        {/* Header Section */}
        <h2 className="text-xl font-semibold mb-4">Friends</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs Navigation */}
        <div className="flex bg-gray-200 rounded mb-4 overflow-hidden">
          {[
            { id: 'searchResults', label: 'Search Results' },
            { id: 'following', label: 'Following' },
            { id: 'followers', label: 'Followers' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'searchResults' | 'following' | 'followers')}
              className={`flex-1 px-4 py-2 text-center transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-black font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* User List */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-4 bg-white rounded shadow hover:shadow-md transition-shadow duration-200"
              >
                {/* User Info */}
                <div 
                  className="flex items-center gap-4 cursor-pointer hover:opacity-80"
                  onClick={() => router.push(`/friends/${user.id}`)}
                >
                  {user.avatarUrl ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={user.avatarUrl}
                        alt={`${user.name}'s avatar`}
                        width={40}
                        height={40}
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to default avatar on error
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-avatar.png';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.username}</p>
                  </div>
                </div>

                {/* Follow/Unfollow Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollowToggle(user);
                  }}
                  className={`
                    px-4 py-2 rounded transition-all duration-200
                    ${user.isFollowing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                  `}
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))
          ) : (
            // Empty State
            <div className="text-center py-8 bg-white rounded shadow">
              <p className="text-gray-500">
                {searchQuery 
                  ? "No users found matching your search"
                  : `No ${
                      activeTab === 'following' 
                        ? 'following users' 
                        : activeTab === 'followers' 
                          ? 'followers' 
                          : 'users'
                    } found`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}