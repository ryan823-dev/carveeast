# CarveEast Page Map & Information Architecture

## Sitemap

```
/
├── / (Home)
├── /artists
│   └── /artists/[slug] (Artist Detail)
├── /works
│   └── /works/[slug] (Work Detail)
├── /auctions
│   └── /auctions/[slug] (Auction Detail)
├── /stories
│   └── /stories/[slug] (Story Detail)
├── /collections
│   └── /collections/[slug] (Collection Detail)
├── /about
└── /follow (Newsletter/Follow Artists)
```

---

## Page Specifications

### 1. Home (首页)
**Purpose**: First impression, communicate core value proposition
**User Journey Stage**: Discovery

**Content Sections**:
1. **Hero** - Brand statement, editorial imagery, dual CTAs
2. **Featured Artists** - 3 curated artists, editorial layout
3. **Core Curatorial Lines** - 4 lines with Chinese names, work counts
4. **Current Auctions** - Live/upcoming auctions, featured lots preview
5. **Stories/Editorial** - Magazine-style content grid
6. **Works by Price Range** - Entry/Mid/Established tabs
7. **Featured Works** - Curator's selection
8. **Trust Signals** - Why collect here (authentication, shipping, etc.)
9. **Newsletter** - Follow artists, early access

**Key Metrics to Track**:
- CTA click rates (Explore Artists vs Current Auctions)
- Scroll depth
- Newsletter signup rate

---

### 2. Artists List (艺术家列表)
**Purpose**: Browse and discover artists
**User Journey Stage**: Discovery → Understanding

**Layout**: Editorial grid, not e-commerce catalog

**Filters**:
- By Medium (Seal Engraving, Calligraphy, Ink, Clay, Painting, Print)
- By Price Entry Point (Under $500, $500-1500, etc.)
- By Location
- Sort: Featured, Newest, A-Z

**Artist Card Elements**:
- Portrait/Studio image
- Name (EN + CN)
- Primary discipline
- Short bio (1 line)
- Work count
- Starting price hint
- "Follow" button

---

### 3. Artist Detail (艺术家详情) ⭐ MOST IMPORTANT
**Purpose**: Deep understanding of artist, build connection
**User Journey Stage**: Understanding → Following

**Sections**:
1. **Hero** - Large portrait, name (EN/CN), primary discipline, location
2. **Quick Stats** - Work count, price range, years active
3. **Artist Statement** - Curatorial "Why this artist"
4. **Biography** - Full bio with timeline
5. **Artistic Focus** - Tags, techniques, philosophy
6. **Selected Works** - 6-8 featured works
7. **Available Works** - All available with prices
8. **Stories/Interviews** - Related editorial content
9. **Studio/Process** - Behind the scenes content
10. **Follow CTA** - Prominent follow button
11. **Related Artists** - Similar artists to discover

**Special Feature**: Multi-media association display
- Seal Engraving works
- Calligraphy works
- Ink paintings
- Inscribed ceramics
- etc.

---

### 4. Works List (作品列表)
**Purpose**: Browse collectible works
**User Journey Stage**: Discovery → Collecting intent

**Layout**: Curated grid, editorial feel

**Filters**:
- Medium
- Price Range
- Artist
- Availability (Auction / Direct Buy)
- Collection/Theme

**Work Card Elements**:
- Image
- Artist name
- Title (EN/CN)
- Year
- Medium
- Price / Current bid
- Availability badge
- Quick view option

---

### 5. Work Detail (作品详情)
**Purpose**: Full work information, drive purchase/bid intent
**User Journey Stage**: Collecting decision

**Sections**:
1. **Image Gallery** - High-res images, zoom, details
2. **Work Meta** - Title (EN/CN), Artist, Year, Medium, Dimensions
3. **Price/Bid Info** - Current price/bid, availability
4. **Curatorial Description** - Story behind the work
5. **Cultural Context** - Interpretation, significance
6. **Signature/Marks** - Inscription details, seals
7. **Provenance** - Authenticity documentation
8. **Related Works** - Same artist, similar works
9. **Artist Content** - Link to artist page, stories
10. **CTAs** - Follow artist / Bid / Buy / Inquire

**Special for Ceramics**:
- Multiple authorship display:
  - Potter/Maker
  - Inscription artist
  - Calligraphy artist
  - Carving artist
  - Kiln/Studio

---

### 6. Auctions List (拍卖列表)
**Purpose**: Browse active and upcoming auctions
**User Journey Stage**: Collecting opportunity

**Layout**: Editorial cards, countdown emphasis

**Auction Card Elements**:
- Cover image
- Title
- Subtitle
- Status (Live / Upcoming / Closing)
- Date range
- Lot count
- Featured lots preview (3 thumbnails)

---

### 7. Auction Detail (拍卖详情)
**Purpose**: Browse and bid on auction lots
**User Journey Stage**: Bidding

**Sections**:
1. **Hero** - Cover image, title, date, status
2. **Countdown** - Time remaining (if live)
3. **Description** - Curatorial essay about the auction
4. **Lots Grid** - All lots with current bids
5. **Featured Lots** - Highlighted items
6. **Bidding Info** - Terms, shipping, payment

**MVP Note**: Bidding flow can be placeholder, focus on presentation

---

### 8. Stories List (故事列表)
**Purpose**: Content discovery, education, engagement
**User Journey Stage**: Understanding / Engagement

**Layout**: Magazine-style grid

**Categories**:
- Artist Interviews
- Studio Visits
- How to Understand [Medium]
- Collecting Guides
- Curatorial Essays
- Culture & History

**Story Card Elements**:
- Cover image
- Category badge
- Title
- Subtitle
- Excerpt
- Author
- Read time
- Date

---

### 9. Story Detail (故事详情)
**Purpose**: Deep content consumption
**User Journey Stage**: Understanding

**Sections**:
1. **Hero** - Full-bleed image, title, subtitle
2. **Meta** - Author, date, read time, category
3. **Content** - Rich text with inline images
4. **Artist/Work Links** - Inline references to artists and works
5. **Related Stories** - More content
6. **Share/Follow** - Social sharing, newsletter signup

---

### 10. Collections/Themes (策展集合)
**Purpose**: Thematic discovery, bridge core and extended categories
**User Journey Stage**: Discovery

**Example Collections**:
- Seal & Literati (核心)
- Inscribed Clay (核心)
- First Collecting Under $500 (入门)
- New Chinese Artists to Discover (发现)
- Ink & Brush (延伸)
- Contemporary Prints (延伸)

**Collection Page Elements**:
- Hero with curatorial essay
- Thematic description
- Featured works grid
- Artist spotlights
- Related stories

---

### 11. About (关于)
**Purpose**: Platform credibility, mission explanation
**User Journey Stage**: Trust building

**Sections**:
1. **Mission** - Core purpose
2. **Approach** - Artist-first, content-first philosophy
3. **Curatorial Logic** - Core line vs extended categories
4. **Team** - Curators, founders
5. **Trust & Authenticity** - Verification process
6. **Press/Recognition**
7. **Contact**

---

### 12. Follow/Newsletter (关注)
**Purpose**: User retention, ongoing engagement
**User Journey Stage**: Long-term relationship

**Features**:
- Email signup
- Artist following (MVP: email-based, future: account-based)
- Preferences (mediums, price ranges, artists)
- Early access promises

---

## Navigation Structure

### Primary Nav
- Artists
- Works
- Auctions
- Stories
- About

### Secondary Nav (Footer)
- Collections
- Contact
- FAQ
- Shipping
- Authenticity
- Press
- Careers

### Utility Nav
- Search
- Follow/Newsletter
- Language (future)
- Account (future)

---

## URL Structure

| Page | URL | Notes |
|------|-----|-------|
| Home | `/` | |
| Artists | `/artists` | Query params for filters |
| Artist Detail | `/artists/[slug]` | Slug: artist-name |
| Works | `/works` | Query params for filters |
| Work Detail | `/works/[slug]` | Slug: work-title |
| Auctions | `/auctions` | |
| Auction Detail | `/auctions/[slug]` | Slug: auction-name |
| Stories | `/stories` | Query params for category |
| Story Detail | `/stories/[slug]` | Slug: story-title |
| Collections | `/collections` | |
| Collection Detail | `/collections/[slug]` | Slug: collection-name |
| About | `/about` | |
| Follow | `/follow` | Newsletter signup |

---

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: > 1440px

## Key Design Principles

1. **Author First**: Artist pages get most design attention
2. **Editorial Not E-commerce**: Magazine layout, not catalog
3. **Content Rich**: Stories integrated throughout
4. **Trust Signals**: Authenticity, provenance prominently displayed
5. **Price Accessibility**: Under $5,000 positioning clear
6. **Chinese Cultural Context**: Names in CN/EN, cultural explanations
