// Simple authentication system for CarveEast
// Uses localStorage for demo purposes
// In production, this would connect to a backend service

// Artist profile extension for artist users
export interface ArtistProfile {
  bio?: string;
  shortBio?: string;
  statement?: string;
  disciplines: string[];
  location?: {
    city?: string;
    province?: string;
    country?: string;
  };
  yearStarted?: number;
  website?: string;
  socialLinks?: {
    weibo?: string;
    instagram?: string;
    website?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'collector' | 'artist' | 'admin';
  artistProfile?: ArtistProfile; // Only for artist role
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: {
    newWorks: boolean;
    auctions: boolean;
    priceDrops: boolean;
    artistUpdates: boolean;
  };
  currency: 'USD' | 'EUR' | 'GBP' | 'CNY';
  language: 'en' | 'zh';
}

const STORAGE_KEY = 'carve-east-user';
const SESSION_KEY = 'carve-east-session';

// Demo users for testing
const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    email: 'collector@example.com',
    name: 'Art Collector',
    role: 'collector',
    createdAt: new Date().toISOString(),
    preferences: {
      newsletter: true,
      notifications: {
        newWorks: true,
        auctions: true,
        priceDrops: false,
        artistUpdates: true,
      },
      currency: 'USD',
      language: 'en',
    },
  },
  // Artist account for Jiang Haoxu
  {
    id: 'artist-jiang',
    email: 'jiang@godseal.com',
    name: '江豪旭',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=600&fit=crop&crop=faces',
    role: 'artist',
    artistProfile: {
      bio: '江豪旭，字瑞昇，号庵角山人，金石印坊创始人。从事篆刻教育三十余年，致力于玺印篆刻文化的传承与创新。',
      shortBio: '金石印坊创始人，篆刻教育家',
      statement: '篆刻不仅是刻石，更是传承三千年的文化。',
      disciplines: ['seal_engraving', 'calligraphy'],
      location: {
        city: 'Nanjing',
        province: 'Jiangsu',
        country: 'China',
      },
      yearStarted: 1993,
      website: 'https://www.godseal.com',
    },
    createdAt: new Date().toISOString(),
    preferences: {
      newsletter: true,
      notifications: {
        newWorks: true,
        auctions: true,
        priceDrops: true,
        artistUpdates: true,
      },
      currency: 'USD',
      language: 'zh',
    },
  },
];

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading user:', error);
    return null;
  }
}

// Check if user is logged in
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Login (demo implementation)
export function login(email: string, password: string, rememberMe = false): User | null {
  // In production, this would validate against a backend
  const demoUser = DEMO_USERS.find((u) => u.email === email);

  if (demoUser) {
    saveUser(demoUser, rememberMe);
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      userId: demoUser.id,
      loggedInAt: new Date().toISOString(),
    }));
    return demoUser;
  }

  // For demo: create a new user if email doesn't exist
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name: email.split('@')[0],
    role: 'collector',
    createdAt: new Date().toISOString(),
    preferences: {
      newsletter: true,
      notifications: {
        newWorks: true,
        auctions: true,
        priceDrops: true,
        artistUpdates: true,
      },
      currency: 'USD',
      language: 'en',
    },
  };

  saveUser(newUser, rememberMe);
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    userId: newUser.id,
    loggedInAt: new Date().toISOString(),
  }));

  return newUser;
}

// Register new user
export function register(email: string, name: string, password: string): User {
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    role: 'collector',
    createdAt: new Date().toISOString(),
    preferences: {
      newsletter: true,
      notifications: {
        newWorks: true,
        auctions: true,
        priceDrops: true,
        artistUpdates: true,
      },
      currency: 'USD',
      language: 'en',
    },
  };

  saveUser(newUser);
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    userId: newUser.id,
    loggedInAt: new Date().toISOString(),
  }));

  return newUser;
}

// Logout
export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
}

// Update user profile
export function updateUserProfile(updates: Partial<User>): User | null {
  const user = getCurrentUser();
  if (!user) return null;

  const updatedUser = { ...user, ...updates };
  saveUser(updatedUser);
  return updatedUser;
}

// Update user preferences
export function updateUserPreferences(preferences: Partial<UserPreferences>): User | null {
  const user = getCurrentUser();
  if (!user) return null;

  const updatedUser = {
    ...user,
    preferences: { ...user.preferences, ...preferences },
  };
  saveUser(updatedUser);
  return updatedUser;
}

// Change password (demo - just validates current password)
export function changePassword(currentPassword: string, newPassword: string): boolean {
  // In production, this would validate and update in backend
  return true;
}

// Request password reset
export function requestPasswordReset(email: string): boolean {
  // In production, this would send an email
  console.log(`Password reset requested for ${email}`);
  return true;
}

// Get user activity (demo data)
export function getUserActivity(): {
  inquiries: number;
  bids: number;
  favorites: number;
  following: number;
  views: number;
} {
  const user = getCurrentUser();
  if (!user) {
    return { inquiries: 0, bids: 0, favorites: 0, following: 0, views: 0 };
  }

  // In production, this would fetch from backend
  return {
    inquiries: 3,
    bids: 1,
    favorites: 5,
    following: 4,
    views: 42,
  };
}

// Save user to localStorage
function saveUser(user: User, rememberMe = true): void {
  if (typeof window === 'undefined') return;

  try {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}
