// CarveEast Type Definitions
// Based on docs/data-models.md

// ============================================================================
// ENUMS
// ============================================================================

export enum Discipline {
  // CORE - Primary focus
  SEAL_ENGRAVING = 'seal_engraving',
  CALLIGRAPHY = 'calligraphy',
  INK_PAINTING = 'ink_painting',
  INSCRIBED_CERAMICS = 'inscribed_ceramics',
  // EXTENSION - Secondary focus
  OIL_PAINTING = 'oil_painting',
  PRINTMAKING = 'printmaking',
  SCULPTURE = 'sculpture',
  MIXED_MEDIA = 'mixed_media',
}

export enum AuthorRole {
  PRIMARY = 'primary',
  POTTERY = 'pottery',
  CARVING = 'carving',
  CALLIGRAPHY = 'calligraphy',
  INSCRIPTION = 'inscription',
  FIRING = 'firing',
  DESIGN = 'design',
  COLLABORATION = 'collaboration',
}

export enum WorkAvailability {
  AVAILABLE = 'available',
  SOLD = 'sold',
  AUCTION = 'auction',
  RESERVED = 'reserved',
}

export enum AuctionStatus {
  UPCOMING = 'upcoming',
  LIVE = 'live',
  CLOSING = 'closing',
  ENDED = 'ended',
}

export enum StoryCategory {
  ARTIST_INTERVIEW = 'artist_interview',
  STUDIO_VISIT = 'studio_visit',
  TECHNIQUE_GUIDE = 'technique_guide',
  COLLECTING_GUIDE = 'collecting_guide',
  CURATORIAL_ESSAY = 'curatorial_essay',
  CULTURE_HISTORY = 'culture_history',
  MARKET_INSIGHT = 'market_insight',
}

export enum CollectionType {
  CORE = 'core',
  THEME = 'theme',
  ENTRY = 'entry',
  DISCOVERY = 'discovery',
}

// ============================================================================
// BASE TYPES
// ============================================================================

export interface LocalizedContent {
  en: string;
  cn?: string;
}

export interface PriceRange {
  id: string;
  label: string;
  labelEn: string;
  min: number;
  max: number | null;
  currency: string;
  description: string;
}

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Artist {
  id: string;
  slug: string;
  name: {
    en: string;
    cn?: string;
    pinyin?: string;
  };
  primaryDiscipline: Discipline;
  disciplines: Discipline[];
  bio: string;
  shortBio: string;
  statement?: string;
  portraitImage?: string;
  studioImages?: string[];
  location: {
    city: string;
    province?: string;
    country: string;
  };
  yearStarted?: number;
  yearsActive?: string;
  tags: string[];
  isFeatured: boolean;
  featuredOrder?: number;
  stats: {
    totalWorks: number;
    availableWorks: number;
    priceRange: {
      min: number;
      max: number;
      currency: string;
    };
  };
  socialLinks?: {
    website?: string;
    instagram?: string;
    weibo?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Multi-authorship support
export interface WorkAuthor {
  artistId: string;
  role: AuthorRole;
  contribution?: string;
  isPrimary: boolean;
}

export interface Work {
  id: string;
  slug: string;
  title: {
    en: string;
    cn?: string;
  };
  authors: WorkAuthor[];
  discipline: Discipline;
  year: number;
  medium: string;
  dimensions: {
    height?: number;
    width?: number;
    depth?: number;
    diameter?: number;
    unit: 'cm' | 'in';
  };
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
  }[];
  videos?: {
    url: string;
    cover?: string;
    title?: string;
    duration?: number;
  }[];
  description: string;
  culturalContext?: string;
  inscription?: {
    text: string;
    translation?: string;
    calligrapher?: string;
  };
  provenance?: ProvenanceEntry[];
  availability: WorkAvailability;
  price?: {
    amount: number;
    currency: string;
    isNegotiable?: boolean;
  };
  priceRangeId?: string;
  auctionId?: string;
  lotNumber?: number;
  isFeatured: boolean;
  collectionIds?: string[];
  tags: string[];
  relatedWorkIds?: string[];
  relatedStoryIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProvenanceEntry {
  date?: string;
  description: string;
  source?: string;
}

export interface Auction {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  status: AuctionStatus;
  startDate: string;
  endDate: string;
  coverImage?: string;
  curator?: string;
  curatorialEssay?: string;
  featuredLotIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuctionLot {
  id: string;
  lotNumber: number;
  workId: string;
  startingBid: number;
  currentBid?: number;
  bidIncrement: number;
  reserveMet: boolean;
  bidCount: number;
  currency: string;
  estimate?: {
    low: number;
    high: number;
    currency: string;
  };
  status: 'open' | 'sold' | 'passed' | 'withdrawn';
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: StoryContentBlock[];
  coverImage: string;
  heroImage?: string;
  gallery?: string[];
  category: StoryCategory;
  tags: string[];
  author: {
    name: string;
    title?: string;
    avatar?: string;
  };
  readTime: number;
  featuredArtistIds?: string[];
  featuredWorkIds?: string[];
  relatedStoryIds?: string[];
  isFeatured: boolean;
  featuredOrder?: number;
  publishedAt: string;
  updatedAt: string;
}

export type StoryContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 2 | 3 | 4; content: string }
  | { type: 'image'; url: string; caption?: string; alt: string }
  | { type: 'quote'; content: string; attribution?: string }
  | { type: 'artist-reference'; artistId: string }
  | { type: 'work-reference'; workId: string }
  | { type: 'gallery'; images: string[] }
  | { type: 'divider' };

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  type: CollectionType;
  curatorialEssay?: string;
  heroImage?: string;
  workIds: string[];
  workCount: number;
  featuredArtistIds?: string[];
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  isFeatured: boolean;
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CuratorialLine {
  id: string;
  slug: string;
  discipline: Discipline;
  name: {
    en: string;
    cn: string;
  };
  description: string;
  image: string;
  workCount: number;
  artistCount: number;
  isCore: boolean;
}

// ============================================================================
// NAVIGATION & UI TYPES
// ============================================================================

export interface NavItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

// ============================================================================
// LEGACY TYPES (for backward compatibility during migration)
// ============================================================================

// Old Work type - will be deprecated
export interface LegacyWork {
  id: string;
  slug: string;
  title: string;
  titleZh?: string;
  artistId: string;
  artistName: string;
  artistSlug: string;
  images: string[];
  medium: string;
  dimensions: string;
  year: number;
  price: number;
  priceRange: 'entry' | 'mid' | 'established' | 'premium';
  description: string;
  availability: 'available' | 'reserved' | 'sold';
  featured: boolean;
}
