// Inquiry and bidding system for CarveEast
// Manages inquiries and bids using localStorage

const INQUIRY_STORAGE_KEY = 'carve-east-inquiries';
const BID_STORAGE_KEY = 'carve-east-bids';

export interface Inquiry {
  id: string;
  workId: string;
  type: 'inquiry' | 'purchase' | 'auction';
  name: string;
  email: string;
  phone?: string;
  message: string;
  proposedPrice?: number;
  currency?: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  lotId: string;
  amount: number;
  currency: string;
  bidderName: string;
  bidderEmail: string;
  bidderPhone?: string;
  maxBid?: number; // For auto-bidding
  status: 'active' | 'outbid' | 'won' | 'lost';
  createdAt: string;
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get all inquiries
export function getInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(INQUIRY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Create new inquiry
export function createInquiry(
  data: Omit<Inquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Inquiry {
  const inquiries = getInquiries();
  
  const inquiry: Inquiry = {
    ...data,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  inquiries.push(inquiry);
  localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
  
  return inquiry;
}

// Get inquiries for a specific work
export function getInquiriesForWork(workId: string): Inquiry[] {
  return getInquiries().filter((i) => i.workId === workId);
}

// Get inquiry by ID
export function getInquiryById(id: string): Inquiry | null {
  return getInquiries().find((i) => i.id === id) || null;
}

// Update inquiry status
export function updateInquiryStatus(
  id: string,
  status: Inquiry['status']
): Inquiry | null {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  
  if (index >= 0) {
    inquiries[index] = {
      ...inquiries[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
    return inquiries[index];
  }
  
  return null;
}

// Get all bids
export function getBids(): Bid[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(BID_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Create new bid
export function createBid(
  data: Omit<Bid, 'id' | 'status' | 'createdAt'>
): Bid {
  const bids = getBids();
  
  const bid: Bid = {
    ...data,
    id: generateId(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  
  bids.push(bid);
  localStorage.setItem(BID_STORAGE_KEY, JSON.stringify(bids));
  
  return bid;
}

// Get bids for a specific lot
export function getBidsForLot(lotId: string): Bid[] {
  return getBids()
    .filter((b) => b.lotId === lotId)
    .sort((a, b) => b.amount - a.amount);
}

// Get highest bid for a lot
export function getHighestBid(lotId: string): Bid | null {
  const bids = getBidsForLot(lotId);
  return bids[0] || null;
}

// Get current bid amount (highest + increment)
export function getCurrentBidAmount(lotId: string, startingBid: number): number {
  const highestBid = getHighestBid(lotId);
  if (!highestBid) return startingBid;
  
  // Standard bid increment
  const increment = highestBid.amount < 1000 ? 50 : highestBid.amount < 5000 ? 100 : 250;
  return highestBid.amount + increment;
}

// Check if user has bid on a lot
export function hasUserBid(lotId: string, email: string): boolean {
  return getBidsForLot(lotId).some((b) => b.bidderEmail === email);
}

// Get user's bids
export function getUserBids(email: string): Bid[] {
  return getBids()
    .filter((b) => b.bidderEmail === email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Validate bid amount
export function validateBidAmount(amount: number, lotId: string, startingBid: number): {
  valid: boolean;
  error?: string;
  minimumBid?: number;
} {
  const minimumBid = getCurrentBidAmount(lotId, startingBid);
  
  if (amount < minimumBid) {
    return {
      valid: false,
      error: `Bid must be at least ${minimumBid}`,
      minimumBid,
    };
  }
  
  return { valid: true, minimumBid };
}

// Format bid for display
export function formatBidAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
