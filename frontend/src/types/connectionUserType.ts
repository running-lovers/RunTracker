export interface ConnectionUser {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
  avatarUrl?: string; // Add avatar URL field
}