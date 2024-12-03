"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { followUser, unfollowUser } from "@/lib/connections";

const STATIC_DATA = {
  stats: {
    weekly: { distance: "●●● km", pace: "●'●●\"/km", time: "●h ●●m", calories: "●,●●● kcal" },
    monthly: { distance: "XXX km", pace: "X'XX\"/km", time: "XXh XXm", calories: "XX,XXX kcal" },
    yearly: { distance: "■■■ km", pace: "■'■■\"/km", time: "■■■h ■■m", calories: "■■■,■■■ kcal" },
  },
  activities: [
    { id: 1, title: "Sample Activity A", distance: "●●.● km", time: "●●:●●", pace: "●'●●\"/km", date: "X days ago" },
    { id: 2, title: "Sample Activity B", distance: "■■.■ km", time: "■■:■■", pace: "■'■■\"/km", date: "X days ago" },
  ],
};

interface FriendProfile {
  id: number;
  name: string;
  strava_id: string;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
}

interface FollowingUser {
  id: number;
}

const FriendProfile: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useUser();
  const [activeTab] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [friend, setFriend] = useState<FriendProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFollowToggle = async () => {
    if (!currentUser || !friend) return;

    try {
      if (friend.isFollowing) {
        await unfollowUser(currentUser.id, friend.id);
      } else {
        await followUser(currentUser.id, friend.id);
      }

      setFriend(prev => prev ? {
        ...prev,
        isFollowing: !prev.isFollowing,
        followersCount: prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
      } : null);

    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        alert(`Failed to ${friend.isFollowing ? 'unfollow' : 'follow'} user: ${error.message}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchFriendDetail = async () => {
      try {
        console.log('Fetching friend detail for userId:', params.userId);
        const response = await fetch(`http://localhost:8080/api/connections/friend/${params.userId}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server response:', errorData);
          throw new Error('Failed to fetch friend detail');
        }
        const data = await response.json();

        const followStatusResponse = await fetch(`http://localhost:8080/api/connections/${currentUser?.id}/following`);
        const followingUsers = await followStatusResponse.json() as FollowingUser[];
        const isFollowing = followingUsers.some((u) => u.id === parseInt(params.userId as string));

        setFriend({ ...data, isFollowing });
      } catch (error) {
        console.error('Error details:', error);
        setError('Failed to load friend details');
      } finally {
        setLoading(false);
      }
    };

    if (params.userId && currentUser) {
      fetchFriendDetail();
    }
  }, [params.userId, currentUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!friend) return <div>Friend not found</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.push("/friends")} className="text-gray-600">
          ← Back to friends
        </button>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded">Start Chat</button>
          <button
            onClick={handleFollowToggle}
            className={`
              px-4 py-2 rounded transition-all duration-200
              ${friend?.isFollowing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
            `}
          >
            {friend?.isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>

      {/* Friend Info */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold">{friend.name}</h2>
        <div className="mt-4 flex gap-4 text-gray-500">
          <div>
            <span className="font-semibold">{friend.followersCount}</span> followers
          </div>
          <div>
            <span className="font-semibold">{friend.followingCount}</span> following
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-xl font-semibold">Activity Summary</h3>
        {/* ... タブ部分 ... */}
        <div className="mt-6 grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Distance</p>
            <p className="text-2xl font-bold">{STATIC_DATA.stats[activeTab].distance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Pace</p>
            <p className="text-2xl font-bold">{STATIC_DATA.stats[activeTab].pace}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Time</p>
            <p className="text-2xl font-bold">{STATIC_DATA.stats[activeTab].time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Calories Burned</p>
            <p className="text-2xl font-bold">{STATIC_DATA.stats[activeTab].calories}</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-xl font-semibold">Recent Activities</h3>
        <ul className="mt-4 space-y-4">
          {STATIC_DATA.activities.map((activity) => (
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