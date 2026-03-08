# CarveEast Data Models

## Overview

This document defines the complete data schema for CarveEast, including:
- Multi-authorship support for complex works (especially ceramics)
- Core/Extension category hierarchy
- Editorial content structure
- Auction and bidding system

---

## Core Entities

### Artist (艺术家)

```typescript
interface Artist {
  id: string;                          // Unique identifier
  slug: string;                        // URL-friendly name
  
  // Names
  name: {
    en: string;                        // English name (primary)
    cn?: string;                       // Chinese name
    pinyin?: string;                   // For pronunciation
  };
  
  // Identity
  primaryDiscipline: Discipline;       // Main artistic focus
  disciplines: Discipline[];           // All disciplines practiced
  
  // Profile
  bio: LocalizedContent;               // Full biography
  shortBio: string;                    // One-line description
  statement?: string;                  // Artist statement
  
  // Media
  portraitImage?: string;              // Primary portrait
  studioImages?: string[];             // Studio/process photos
  
  // Metadata
  location: {
    city: string;
    province?: string;
    country: string;
  };
  
  // Career
  yearStarted?: number;                // When began practicing
  yearsActive?: string;                // e.g., "2010-present"
  
  // Curation
  tags: string[];                      // Style tags, techniques
  isFeatured: boolean;                 // Homepage featured
  featuredOrder?: number;              // Display order
  
  // Stats
  stats: {
    totalWorks: number;
    availableWorks: number;
    priceRange: {
      min: number;
      max: number;
      currency: string;
    };
  };
  
  // Social/Contact
  socialLinks?: {
    website?: string;
    instagram?: string;
    weibo?: string;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

---

### Work (作品)

```typescript
interface Work {
  id: string;
  slug: string;
  
  // Identification
  title: {
    en: string;
    cn?: string;
  };
  
  // Authorship - SUPPORTS MULTI-AUTHOR
  authors: WorkAuthor[];               // Array of contributors
  
  // Classification
  discipline: Discipline;
  category: WorkCategory;
  
  // Physical attributes
  year: number;
  medium: string;                      // e.g., "Yixing clay, carved"
  dimensions: {
    height?: number;
    width?: number;
    depth?: number;
    diameter?: number;
    unit: 'cm' | 'in';
  };
  weight?: {
    value: number;
    unit: 'g' | 'kg';
  };
  
  // Images
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
  }[];
  
  // Description
  description: LocalizedContent;       // Full description
  culturalContext?: string;            // Cultural significance
  inscription?: {                      // For inscribed works
    text: string;
    translation?: string;
    calligrapher?: string;             // If different from author
  };
  
  // Provenance
  provenance: ProvenanceEntry[];
  authenticityDocs?: string[];         // Certificates, etc.
  
  // Availability & Pricing
  availability: 'available' | 'sold' | 'auction' | 'reserved';
  price?: {
    amount: number;
    currency: string;
    isNegotiable?: boolean;
  };
  priceRange?: PriceRangeId;           // For filtering
  
  // Auction info (if applicable)
  auctionId?: string;
  lotNumber?: number;
  
  // Curation
  isFeatured: boolean;
  collections?: string[];              // Collection IDs
  tags: string[];
  
  // Associations
  relatedWorks?: string[];             // Work IDs
  relatedStories?: string[];           // Story IDs
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Multi-authorship support
interface WorkAuthor {
  artistId: string;
  role: AuthorRole;
  contribution?: string;               // Description of contribution
  isPrimary: boolean;                  // Main attribution
}

type AuthorRole = 
  | 'primary'           // Main artist
  | 'pottery'           // Made the ceramic piece
  | 'carving'           // Carved/inscribed the piece
  | 'calligraphy'       // Wrote the inscription
  | 'inscription'       // Created the inscription content
  | 'firing'            // Fired the piece
  | 'design'            // Designed but didn't execute
  | 'collaboration';    // Equal collaboration
```

**Multi-Author Example (Yixing Teapot)**:
```typescript
authors: [
  { artistId: "artist-1", role: "pottery", isPrimary: true, contribution: "Teapot body" },
  { artistId: "artist-2", role: "carving", isPrimary: false, contribution: "Landscape carving" },
  { artistId: "artist-3", role: "calligraphy", isPrimary: false, contribution: "Inscription" }
]
```

---

### Auction (拍卖)

```typescript
interface Auction {
  id: string;
  slug: string;
  
  // Basic info
  title: string;
  subtitle?: string;
  description: LocalizedContent;
  
  // Timing
  status: 'upcoming' | 'live' | 'closing' | 'ended';
  startDate: Date;
  endDate: Date;
  
  // Cover
  coverImage?: string;
  
  // Lots
  lots: AuctionLot[];
  totalLots: number;
  
  // Stats
  stats?: {
    lotsSold?: number;
    totalBids?: number;
    totalValue?: number;
  };
  
  // Curation
  curator?: string;
  curatorialEssay?: string;
  
  // Display
  featuredLots?: string[];             // Lot IDs to highlight
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface AuctionLot {
  id: string;
  lotNumber: number;
  workId: string;                      // Reference to Work
  
  // Bidding
  startingBid: number;
  currentBid?: number;
  bidIncrement: number;
  reserveMet: boolean;
  
  // Bids history
  bids: Bid[];
  bidCount: number;
  
  // Status
  status: 'open' | 'sold' | 'passed' | 'withdrawn';
  
  // Estimate
  estimate?: {
    low: number;
    high: number;
    currency: string;
  };
}

interface Bid {
  id: string;
  amount: number;
  bidderId: string;                    // Anonymous reference
  timestamp: Date;
  isAutoBid?: boolean;
}
```

---

### Story (故事/文章)

```typescript
interface Story {
  id: string;
  slug: string;
  
  // Content
  title: string;
  subtitle?: string;
  excerpt: string;                     // For cards/previews
  
  // Body content
  content: StoryContentBlock[];        // Rich content blocks
  
  // Media
  coverImage: string;
  heroImage?: string;                  // Full-bleed header
  gallery?: string[];
  
  // Metadata
  category: StoryCategory;
  tags: string[];
  
  // Author
  author: {
    name: string;
    title?: string;
    avatar?: string;
  };
  
  // Reading
  readTime: number;                    // Minutes
  
  // Associations
  featuredArtists?: string[];          // Artist IDs
  featuredWorks?: string[];            // Work IDs
  relatedStories?: string[];           // Story IDs
  
  // Display
  isFeatured: boolean;
  featuredOrder?: number;
  
  // Timestamps
  publishedAt: Date;
  updatedAt: Date;
}

// Rich content blocks for stories
type StoryContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 2 | 3 | 4; content: string }
  | { type: 'image'; url: string; caption?: string; alt: string }
  | { type: 'quote'; content: string; attribution?: string }
  | { type: 'artist-reference'; artistId: string }
  | { type: 'work-reference'; workId: string }
  | { type: 'gallery'; images: string[] }
  | { type: 'divider' };
```

---

### Collection (策展集合)

```typescript
interface Collection {
  id: string;
  slug: string;
  
  // Identity
  title: string;
  subtitle?: string;
  description: LocalizedContent;
  
  // Classification
  type: 'core' | 'theme' | 'entry' | 'discovery';
  // core: Core curatorial lines (Seal, Calligraphy, etc.)
  // theme: Thematic collections
  // entry: Entry-level collecting
  // discovery: New artists, trends
  
  // Content
  curatorialEssay?: string;
  heroImage?: string;
  
  // Works
  works: string[];                     // Work IDs, ordered
  workCount: number;
  
  // Artists featured
  featuredArtists?: string[];          // Artist IDs
  
  // Metadata
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  
  // Display
  isFeatured: boolean;
  displayOrder?: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Enums & Types

### Discipline (艺术门类)

```typescript
enum Discipline {
  // CORE - Primary focus
  SEAL_ENGRAVING = 'seal_engraving',           // 篆刻
  CALLIGRAPHY = 'calligraphy',                 // 书法
  INK_PAINTING = 'ink_painting',               // 水墨
  INSCRIBED_CERAMICS = 'inscribed_ceramics',   // 刻铭紫砂陶瓷
  
  // EXTENSION - Secondary focus
  OIL_PAINTING = 'oil_painting',               // 油画
  PRINTMAKING = 'printmaking',                 // 版画
  SCULPTURE = 'sculpture',                     // 雕塑
  MIXED_MEDIA = 'mixed_media',                 // 综合材料
}
```

### WorkCategory (作品类别)

```typescript
enum WorkCategory {
  // Seal Engraving
  SEAL_STONE = 'seal_stone',                   // 印章
  SEAL_IMPRESSION = 'seal_impression',         // 印蜕
  
  // Calligraphy
  CALLIGRAPHY_SCROLL = 'calligraphy_scroll',   // 书法卷轴
  CALLIGRAPHY_ALBUM = 'calligraphy_album',     // 书法册页
  
  // Painting
  PAINTING_SCROLL = 'painting_scroll',         // 绘画卷轴
  PAINTING_ALBUM = 'painting_album',           // 绘画册页
  
  // Ceramics
  YIXING_TEAPOT = 'yixing_teapot',             // 紫砂壶
  YIXING_WARE = 'yixing_ware',                 // 紫砂器
  PORCELAIN = 'porcelain',                     // 瓷器
  
  // Other
  PRINT = 'print',                             // 版画
  SCULPTURE = 'sculpture',                     // 雕塑
}
```

### StoryCategory (文章类别)

```typescript
enum StoryCategory {
  ARTIST_INTERVIEW = 'artist_interview',       // 艺术家访谈
  STUDIO_VISIT = 'studio_visit',               // 工作室探访
  TECHNIQUE_GUIDE = 'technique_guide',         // 技法解读
  COLLECTING_GUIDE = 'collecting_guide',       // 收藏指南
  CURATORIAL_ESSAY = 'curatorial_essay',       // 策展文章
  CULTURE_HISTORY = 'culture_history',         // 文化历史
  MARKET_INSIGHT = 'market_insight',           // 市场观察
}
```

### PriceRange (价格区间)

```typescript
interface PriceRange {
  id: PriceRangeId;
  label: string;
  labelEn: string;
  min: number;
  max: number | null;              // null = no upper limit
  currency: string;
  description: string;             // e.g., "Entry-level collecting"
}

type PriceRangeId = 
  | 'under-500'        // Under $500
  | '500-1500'         // $500 - $1,500
  | '1500-3000'        // $1,500 - $3,000
  | '3000-5000'        // $3,000 - $5,000
  | 'above-5000';      // Above $5,000 (rare)

// Price ranges for MVP
const PRICE_RANGES: PriceRange[] = [
  {
    id: 'under-500',
    label: '入门收藏',
    labelEn: 'Entry Level',
    min: 0,
    max: 500,
    currency: 'USD',
    description: 'Perfect for first-time collectors'
  },
  {
    id: '500-1500',
    label: '进阶收藏',
    labelEn: 'Mid Range',
    min: 500,
    max: 1500,
    currency: 'USD',
    description: 'Established artists, quality works'
  },
  {
    id: '1500-3000',
    label: '资深收藏',
    labelEn: 'Upper Mid',
    min: 1500,
    max: 3000,
    currency: 'USD',
    description: 'Notable works by recognized artists'
  },
  {
    id: '3000-5000',
    label: '精品收藏',
    labelEn: 'Premium',
    min: 3000,
    max: 5000,
    currency: 'USD',
    description: 'Exceptional pieces, investment grade'
  },
  {
    id: 'above-5000',
    label: '珍稀收藏',
    labelEn: 'Rare',
    min: 5000,
    max: null,
    currency: 'USD',
    description: 'Masterworks and rare acquisitions'
  }
];
```

---

## Helper Types

```typescript
// Localized content (EN primary, CN optional)
interface LocalizedContent {
  en: string;
  cn?: string;
}

// Provenance entry
interface ProvenanceEntry {
  date?: Date;
  description: string;
  source?: string;
}

// Curatorial Line (homepage display)
interface CuratorialLine {
  id: string;
  discipline: Discipline;
  name: {
    en: string;
    cn: string;
  };
  description: string;
  image: string;
  workCount: number;
  artistCount: number;
  isCore: boolean;                     // Core vs Extension
}

// Newsletter subscriber
interface Subscriber {
  id: string;
  email: string;
  preferences: {
    mediums: Discipline[];
    priceRanges: PriceRangeId[];
    artists: string[];
  };
  subscribedAt: Date;
  isActive: boolean;
}

// Follow relationship (MVP: email-based)
interface Follow {
  id: string;
  subscriberId: string;
  artistId: string;
  followedAt: Date;
}
```

---

## Data Relationships

```
Artist
├── has many Works (as primary author)
├── has many Works (as collaborator)
├── has many Stories (featured in)
├── has many Collections (featured in)
└── has many Follows

Work
├── has many Authors (Artist + role)
├── belongs to one Auction (optional)
├── belongs to many Collections
├── has many related Works
└── featured in many Stories

Auction
├── has many Lots
├── each Lot has one Work
└── each Lot has many Bids

Story
├── has many content blocks
├── references many Artists
├── references many Works
└── has many related Stories

Collection
├── has many Works
├── features many Artists
└── has curatorial metadata
```

---

## CMS Integration Notes

Future headless CMS (e.g., Sanity, Strapi, Contentful) should support:

1. **Multi-author entries** - Array of references with metadata
2. **Rich text with inline references** - Artists/Works linked in content
3. **Asset management** - Multiple images per work, ordering
4. **Localization** - EN primary, CN secondary
5. **Draft/publish workflow** - For editorial content
6. **Relationships** - Bidirectional linking between entities

---

## Mock Data Structure

For MVP, create:
- 6-8 Artists (mix of disciplines)
- 12-16 Works (showcasing multi-authorship)
- 2-3 Auctions (1 live, 1 upcoming)
- 4-6 Stories (mix of categories)
- 4 Collections (1 per curatorial line)
- 4 Price Ranges (as defined above)
