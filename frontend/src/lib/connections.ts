interface RawUserConnection {
  id: number;
  name: string;
  strava_id?: string | null;
  relationship?: 'following' | 'follower';
  isFollowing?: boolean;
  isFollower?: boolean;
  userProfile?: {
    profile_medium?: string | null;
    profile?: string | null;
  } | null;
}

import { ConnectionUser } from "@/types/connectionUserType";

export const fetchUserConnections = async (userId: number) => {
  const response = await fetch(`http://localhost:8080/api/connections/${userId}/all`, {
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
      }
  });

  if (!response.ok) {
      throw new Error('Failed to fetch users');
  }

  return response.json();
};

export const formatUserConnections = (connections: RawUserConnection[]): ConnectionUser[] => {
  return connections.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.strava_id ? `@${user.strava_id}` : '',
      isFollowing: user.relationship === 'following',
      isFollower: user.relationship === 'follower'
  }));
};

export const filterUsersByType = (
  users: ConnectionUser[], 
  type: 'searchResults' | 'following' | 'followers',
  currentUserId?: number
) => {
  console.log('Filtering users:', {
      totalUsers: users.length,
      type,
      currentUserId
  });

  const uniqueUsers = Array.from(
      new Map(users.map(user => [user.id, user])).values()
  );

  console.log('Unique users:', uniqueUsers.length);

  let filteredUsers;
  switch (type) {
      case 'following':
          filteredUsers = uniqueUsers.filter(user => user.isFollowing);
          break;
      case 'followers':
          filteredUsers = uniqueUsers.filter(user => user.isFollower);
          break;
      case 'searchResults':
          filteredUsers = uniqueUsers;
          break;
      default:
          filteredUsers = uniqueUsers;
  }

  console.log('Filtered users:', filteredUsers.length);
  return filteredUsers;
};

export const filterUsersByQuery = (users: ConnectionUser[], query: string) => {
  if (!query) return users;
  
  const lowerQuery = query.toLowerCase();
  return users.filter(user => 
      user.name.toLowerCase().includes(lowerQuery) ||
      (user.username && user.username.toLowerCase().includes(lowerQuery))
  );
};

export const fetchAndFormatUsers = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/connections/${userId}/all`);
    const data = await response.json();

    const formattedUsers = data.map((user: RawUserConnection) => {
      let avatarUrl = user.userProfile?.profile_medium;
      
      // Add error handling for avatar URL
      if (avatarUrl && !avatarUrl.startsWith('http')) {
        avatarUrl = `https://dgalywyr863hv.cloudfront.net/${avatarUrl}`;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.strava_id?.toString() || '',
        isFollowing: user.isFollowing || false,
        isFollower: user.isFollower || false,
        avatarUrl: avatarUrl || '/default-avatar.png', // Provide a default avatar
      };
    });

    return formattedUsers;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const unfollowUser = async (userId: number, followingUserId: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/connections/unfollow/${userId}/${followingUserId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to unfollow user');
    }

    return response.json();
  } catch (error) {
    console.error('Unfollow error:', error);
    throw error;
  }
};

export const followUser = async (userId: number, followingUserId: number) => {
  try {
    const requestBody = {
      userId,
      followingUserId
    };
    console.log('Follow request:', {
      url: 'http://localhost:8080/api/connections/follow',
      method: 'POST',
      body: requestBody
    });

    const response = await fetch(`http://localhost:8080/api/connections/follow`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Follow error response:', errorData);
      throw new Error(errorData.error || 'Failed to follow user');
    }

    const data = await response.json();
    console.log('Follow success response:', data);
    return data;

  } catch (error) {
    console.error('Follow error:', error);
    throw error;
  }
};