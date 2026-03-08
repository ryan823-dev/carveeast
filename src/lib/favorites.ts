// Favorites/Wishlist system for CarveEast
// Uses localStorage for persistence

import { Work } from './types';

export interface FavoriteItem {
  workId: string;
  addedAt: string;
  notes?: string;
}

const STORAGE_KEY = 'carve-east-favorites';

// Get all favorites
export function getFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

// Add work to favorites
export function addToFavorites(workId: string, notes?: string): FavoriteItem {
  const favorites = getFavorites();

  // Check if already in favorites
  const existing = favorites.find((f) => f.workId === workId);
  if (existing) {
    // Update notes if provided
    if (notes !== undefined) {
      existing.notes = notes;
      saveFavorites(favorites);
    }
    return existing;
  }

  const newFavorite: FavoriteItem = {
    workId,
    addedAt: new Date().toISOString(),
    notes,
  };

  favorites.push(newFavorite);
  saveFavorites(favorites);

  return newFavorite;
}

// Remove work from favorites
export function removeFromFavorites(workId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.findIndex((f) => f.workId === workId);

  if (index === -1) return false;

  favorites.splice(index, 1);
  saveFavorites(favorites);

  return true;
}

// Check if work is in favorites
export function isFavorite(workId: string): boolean {
  const favorites = getFavorites();
  return favorites.some((f) => f.workId === workId);
}

// Toggle favorite status
export function toggleFavorite(workId: string, notes?: string): boolean {
  if (isFavorite(workId)) {
    removeFromFavorites(workId);
    return false; // Now not favorite
  } else {
    addToFavorites(workId, notes);
    return true; // Now favorite
  }
}

// Update favorite notes
export function updateFavoriteNotes(workId: string, notes: string): boolean {
  const favorites = getFavorites();
  const favorite = favorites.find((f) => f.workId === workId);

  if (!favorite) return false;

  favorite.notes = notes;
  saveFavorites(favorites);

  return true;
}

// Clear all favorites
export function clearFavorites(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// Get favorites count
export function getFavoritesCount(): number {
  return getFavorites().length;
}

// Get favorite work IDs
export function getFavoriteWorkIds(): string[] {
  return getFavorites().map((f) => f.workId);
}

// Save favorites to localStorage
function saveFavorites(favorites: FavoriteItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}

// Export favorites as JSON
export function exportFavorites(): string {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
}

// Import favorites from JSON
export function importFavorites(json: string): FavoriteItem[] {
  try {
    const favorites: FavoriteItem[] = JSON.parse(json);
    saveFavorites(favorites);
    return favorites;
  } catch (error) {
    console.error('Error importing favorites:', error);
    return [];
  }
}

// Compare favorites (for sharing)
export function compareFavorites(otherFavorites: FavoriteItem[]): {
  common: string[];
  onlyInMine: string[];
  onlyInTheirs: string[];
} {
  const mine = new Set(getFavoriteWorkIds());
  const theirs = new Set(otherFavorites.map((f) => f.workId));

  const common: string[] = [];
  const onlyInMine: string[] = [];
  const onlyInTheirs: string[] = [];

  mine.forEach((id) => {
    if (theirs.has(id)) {
      common.push(id);
    } else {
      onlyInMine.push(id);
    }
  });

  theirs.forEach((id) => {
    if (!mine.has(id)) {
      onlyInTheirs.push(id);
    }
  });

  return { common, onlyInMine, onlyInTheirs };
}
