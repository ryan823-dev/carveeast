// Follow system for CarveEast
// Manages user follows using localStorage

import { Artist } from './types';

const STORAGE_KEY = 'carve-east-follows';

export interface FollowedArtist {
  artistId: string;
  followedAt: string;
  notifyNewWorks: boolean;
  notifyAuctions: boolean;
}

// Get all followed artists from localStorage
export function getFollowedArtists(): FollowedArtist[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Check if an artist is followed
export function isFollowing(artistId: string): boolean {
  const follows = getFollowedArtists();
  return follows.some((f) => f.artistId === artistId);
}

// Follow an artist
export function followArtist(
  artistId: string,
  options: { notifyNewWorks?: boolean; notifyAuctions?: boolean } = {}
): FollowedArtist {
  const follows = getFollowedArtists();
  
  // Check if already following
  const existingIndex = follows.findIndex((f) => f.artistId === artistId);
  
  const followData: FollowedArtist = {
    artistId,
    followedAt: new Date().toISOString(),
    notifyNewWorks: options.notifyNewWorks ?? true,
    notifyAuctions: options.notifyAuctions ?? true,
  };
  
  if (existingIndex >= 0) {
    // Update existing follow
    follows[existingIndex] = {
      ...follows[existingIndex],
      ...followData,
    };
  } else {
    // Add new follow
    follows.push(followData);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(follows));
  return followData;
}

// Unfollow an artist
export function unfollowArtist(artistId: string): void {
  const follows = getFollowedArtists();
  const filtered = follows.filter((f) => f.artistId !== artistId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Toggle follow status
export function toggleFollow(
  artistId: string,
  options?: { notifyNewWorks?: boolean; notifyAuctions?: boolean }
): boolean {
  if (isFollowing(artistId)) {
    unfollowArtist(artistId);
    return false;
  } else {
    followArtist(artistId, options);
    return true;
  }
}

// Update notification preferences
export function updateNotificationPreferences(
  artistId: string,
  preferences: { notifyNewWorks?: boolean; notifyAuctions?: boolean }
): FollowedArtist | null {
  const follows = getFollowedArtists();
  const index = follows.findIndex((f) => f.artistId === artistId);
  
  if (index >= 0) {
    follows[index] = {
      ...follows[index],
      ...preferences,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(follows));
    return follows[index];
  }
  
  return null;
}

// Get follow count
export function getFollowCount(): number {
  return getFollowedArtists().length;
}

// Get followed artist IDs
export function getFollowedArtistIds(): string[] {
  return getFollowedArtists().map((f) => f.artistId);
}

// Get notification settings for an artist
export function getArtistNotificationSettings(artistId: string): {
  notifyNewWorks: boolean;
  notifyAuctions: boolean;
} | null {
  const follows = getFollowedArtists();
  const follow = follows.find((f) => f.artistId === artistId);
  
  if (follow) {
    return {
      notifyNewWorks: follow.notifyNewWorks,
      notifyAuctions: follow.notifyAuctions,
    };
  }
  
  return null;
}
