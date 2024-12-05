export interface ConnectionUser {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
  isFollower?: boolean;
}