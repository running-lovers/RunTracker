"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { followUser, unfollowUser } from "@/lib/connections";
import Image from 'next/image';
import { getActivitiesFromDb } from "@/lib/activity";

interface FriendProfile {
  id: number;
  name: string;
  strava_id: string;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
  avatarUrl?: string;
}

interface FollowingUser {
  id: number;
}

interface ActivitySummary {
  distance: string;
  pace: string;
  time: string;
  calories: string;
}

interface Activity {
  id: number;
  name: string;
  title: string;
  distance: number;
  time: string;
  pace: string;
  date: string;
  duration: number;
  calories?: number;
  start_time: string;
}

const FriendProfile: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useUser();
  const [friend, setFriend] = useState<FriendProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitySummary, setActivitySummary] = useState<ActivitySummary>({
    distance: "0 km",
    pace: "0'00\"/km",
    time: "0h 00m",
    calories: "0 kcal"
  });
  const [displayLimit, setDisplayLimit] = useState<number>(5); // Show first 5 activities by default
  const [stravaStatus, setStravaStatus] = useState<'connected' | 'private' | 'loading'>('loading');

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

  // Add function to calculate summary stats
  const calculateActivitySummary = (activities: Activity[]) => {
    if (activities.length === 0) return;

    const totalDistance = activities.reduce((sum, activity) => sum + activity.distance, 0);
    const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
    const totalCalories = activities.reduce((sum, activity) => sum + (activity.calories || 0), 0);
    
    let avgPaceSeconds = 0;
    if (totalDistance > 0) {
      avgPaceSeconds = (totalDuration / (totalDistance / 1000));
      
      if (avgPaceSeconds < 180 || avgPaceSeconds > 900) {
        avgPaceSeconds = 0;
      }
    }

    const formattedStats = {
      distance: `${(totalDistance / 1000).toFixed(1)} km`,
      pace: avgPaceSeconds > 0 
        ? `${Math.floor(avgPaceSeconds / 60)}'${Math.floor(avgPaceSeconds % 60).toString().padStart(2, '0')}" min/km` 
        : 'N/A',
      time: `${Math.floor(totalDuration / 3600)}:${Math.floor((totalDuration % 3600) / 60).toString().padStart(2, '0')} hours`,
      calories: `${totalCalories.toLocaleString()} kcal`
    };

    setActivitySummary(formattedStats);
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

        if (!params.userId || typeof params.userId !== 'string') return;
        const activitiesData = await getActivitiesFromDb(parseInt(params.userId));
        
        // Check if Strava data is accessible
        if (!activitiesData || activitiesData.length === 0) {
          setActivities([]);
          setActivitySummary({
            distance: "Private",
            pace: "Private",
            time: "Private",
            calories: "Private"
          });
          setStravaStatus('private');
          return;
        }

        setStravaStatus('connected');

        const filteredActivities = activitiesData.filter((activity: Activity) => 
          new Date(activity.start_time) <= new Date()
        );

        // Calculate summary before formatting activities for display
        calculateActivitySummary(filteredActivities);

        const formattedActivities = filteredActivities
          .sort((a: Activity, b: Activity) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
          .map((activity: Activity) => {
            const distanceKm = (activity.distance / 1000).toFixed(2);
            const hours = Math.floor(activity.duration / 3600);
            const minutes = Math.floor((activity.duration % 3600) / 60);
            const timeFormatted = `${hours}:${minutes.toString().padStart(2, '0')}`;
            const paceSeconds = (activity.duration / (activity.distance / 1000));
            const paceMinutes = Math.floor(paceSeconds / 60);
            const paceRemainingSeconds = Math.floor(paceSeconds % 60);
            const paceFormatted = `${paceMinutes}'${paceRemainingSeconds.toString().padStart(2, '0')}"`;
            const daysAgo = Math.floor((new Date().getTime() - new Date(activity.start_time).getTime()) / (1000 * 60 * 60 * 24));
            return {
              id: activity.id,
              title: activity.name || 'Untitled Activity',
              distance: `${distanceKm} km`,
              time: timeFormatted,
              pace: paceFormatted,
              date: `${daysAgo} days ago`
            };
          });

        setActivities(formattedActivities);

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
        <div className="flex items-center space-x-4">
          {friend?.avatarUrl ? (
            // For users with public Strava profiles and valid avatar URL
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={friend.avatarUrl}
                alt={`${friend.name}'s profile`}
                width={64}
                height={64}
                className="object-cover"
                onError={(e) => {
                  // If image fails to load, show default SVG icon
                  const target = e.target as HTMLImageElement;
                  target.parentElement!.innerHTML = `
                    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg 
                        class="w-8 h-8 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
          ) : (
            // Default SVG icon for users without valid avatar URL
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{friend?.name}</h2>
            <div className="mt-2 flex gap-4 text-gray-500">
              <div>
                <span className="font-semibold">{friend?.followersCount}</span> followers
              </div>
              <div>
                <span className="font-semibold">{friend?.followingCount}</span> following
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-xl font-semibold">Activity Summary</h3>
        {stravaStatus === 'private' ? (
          <div className="text-center py-6">
            <div className="text-gray-500">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-medium mb-2">Private Strava Profile</h4>
              <p className="text-sm">This user&apos;s Strava activities are currently private</p>
              <p className="text-xs mt-2 text-gray-400">Activities will appear here when made public in Strava settings</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Distance</p>
              <p className="text-2xl font-bold">{activitySummary.distance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Pace</p>
              <p className="text-2xl font-bold">{activitySummary.pace}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Time</p>
              <p className="text-2xl font-bold">{activitySummary.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Calories Burned</p>
              <p className="text-2xl font-bold">{activitySummary.calories}</p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activities */}
      <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-xl font-semibold">Recent Activities</h3>
        <p className="text-xs text-gray-500 mt-1 mb-3">
          Distance • Pace (min/km) • Duration (hours)
        </p>
        <ul className="mt-4 space-y-4">
          {stravaStatus === 'private' ? (
            // Private Strava profile message
            <div className="text-center py-6">
              <div className="text-gray-500">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Private Strava Profile</h4>
                <p className="text-sm">This user&apos;s Strava activities are currently private</p>
                <p className="text-xs mt-2 text-gray-400">Activities will appear here when made public in Strava settings</p>
              </div>
            </div>
          ) : activities.length > 0 ? (
            // Show activities if available
            <>
              {activities.slice(0, displayLimit).map((activity) => (
                <li key={activity.id} className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{activity.title}</h4>
                    <p className="text-gray-500">
                      {activity.distance} • {activity.pace}/km • {activity.time} hours
                    </p>
                  </div>
                  <p className="text-gray-500">{activity.date}</p>
                </li>
              ))}
              {activities.length > displayLimit && (
                <button
                  onClick={() => setDisplayLimit(prev => prev + 5)}
                  className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Show More Activities
                </button>
              )}
            </>
          ) : (
            // No activities found message
            <p className="text-gray-500 text-center">No activities found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FriendProfile;