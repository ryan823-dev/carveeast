# CarveEast Component Library

## Component Hierarchy

```
components/
├── layout/                    # Page structure
├── sections/                  # Homepage sections
├── cards/                     # Reusable cards
├── content/                   # Content display
├── forms/                     # Input elements
└── shared/                    # Utilities
```

---

## Layout Components

### Header
**File**: `components/layout/Header.tsx`
**Props**:
```typescript
interface HeaderProps {
  transparent?: boolean;      // Hero overlay mode
}
```
**Features**:
- Fixed position
- Logo + primary nav
- Search trigger
- Follow/Newsletter CTA
- Mobile hamburger menu

### Footer
**File**: `components/layout/Footer.tsx`
**Props**: None
**Features**:
- Multi-column link groups
- Social links
- Newsletter signup
- Copyright

### PageLayout
**File**: `components/layout/PageLayout.tsx`
**Props**:
```typescript
interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}
```
**Features**:
- Consistent padding
- Max-width container
- Background color

### Navigation
**File**: `components/layout/Navigation.tsx`
**Props**:
```typescript
interface NavigationProps {
  items: NavItem[];
  mobile?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
```

---

## Section Components (Homepage)

### HeroSection
**File**: `components/sections/Hero.tsx`
**Props**:
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  stats: { value: string; label: string }[];
}
```
**Layout**: Full viewport, split content/image

### FeaturedArtistsSection
**File**: `components/sections/FeaturedArtists.tsx`
**Props**:
```typescript
interface FeaturedArtistsProps {
  artists: Artist[];
  title?: string;
}
```
**Layout**: Editorial grid (1 large + 2 stacked)

### CuratorialLinesSection
**File**: `components/sections/CuratorialLines.tsx`
**Props**:
```typescript
interface CuratorialLinesProps {
  lines: CuratorialLine[];
}
```
**Layout**: 2x2 grid with Chinese character watermarks

### CurrentAuctionsSection
**File**: `components/sections/CurrentAuctions.tsx`
**Props**:
```typescript
interface CurrentAuctionsProps {
  auctions: Auction[];
}
```
**Layout**: Dark background, 2-column cards

### StoriesSection
**File**: `components/sections/Stories.tsx`
**Props**:
```typescript
interface StoriesProps {
  stories: Story[];
  layout?: 'featured' | 'grid';
}
```
**Layout**: Magazine editorial (1 large + sidebar)

### WorksByPriceSection
**File**: `components/sections/WorksByPrice.tsx`
**Props**:
```typescript
interface WorksByPriceProps {
  priceRanges: PriceRange[];
}
```
**Features**: Tabbed interface, dynamic filtering

### FeaturedWorksSection
**File**: `components/sections/FeaturedWorks.tsx`
**Props**:
```typescript
interface FeaturedWorksProps {
  works: Work[];
  title?: string;
}
```
**Layout**: Asymmetric masonry grid

### TrustSignalsSection
**File**: `components/sections/TrustSignals.tsx`
**Props**:
```typescript
interface TrustSignalsProps {
  signals: TrustSignal[];
  testimonial?: Testimonial;
}

interface TrustSignal {
  icon: LucideIcon;
  title: string;
  description: string;
}
```
**Layout**: Dark background, 2x2 grid + testimonial

### NewsletterSection
**File**: `components/sections/Newsletter.tsx`
**Props**:
```typescript
interface NewsletterProps {
  title?: string;
  benefits?: string[];
}
```
**Features**: Email form, success state, benefits list

---

## Card Components

### ArtistCard
**File**: `components/cards/ArtistCard.tsx`
**Variants**: `default` | `featured` | `compact`
**Props**:
```typescript
interface ArtistCardProps {
  artist: Artist;
  variant?: 'default' | 'featured' | 'compact';
  showFollow?: boolean;
}
```
**Elements**:
- Portrait image
- Name (EN/CN)
- Discipline
- Short bio
- Work count
- Starting price
- Follow button

### WorkCard
**File**: `components/cards/WorkCard.tsx`
**Variants**: `default` | `featured` | `auction` | `compact`
**Props**:
```typescript
interface WorkCardProps {
  work: Work;
  variant?: 'default' | 'featured' | 'auction' | 'compact';
  showPrice?: boolean;
  showArtist?: boolean;
}
```
**Elements**:
- Image
- Artist name
- Title (EN/CN)
- Year
- Medium
- Price/Bid
- Availability badge

### AuctionCard
**File**: `components/cards/AuctionCard.tsx`
**Props**:
```typescript
interface AuctionCardProps {
  auction: Auction;
  showLots?: number;
}
```
**Elements**:
- Cover image
- Status badge
- Title
- Subtitle
- Date range
- Lot count
- Featured lot thumbnails

### StoryCard
**File**: `components/cards/StoryCard.tsx`
**Variants**: `default` | `featured` | `minimal`
**Props**:
```typescript
interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'featured' | 'minimal';
}
```
**Elements**:
- Cover image
- Category badge
- Title
- Subtitle
- Excerpt
- Author
- Read time

### CollectionCard
**File**: `components/cards/CollectionCard.tsx`
**Props**:
```typescript
interface CollectionCardProps {
  collection: Collection;
  workCount?: number;
}
```

---

## Content Components

### ArtistBio
**File**: `components/content/ArtistBio.tsx`
**Props**:
```typescript
interface ArtistBioProps {
  bio: string;
  expanded?: boolean;
}
```
**Features**: Expandable, rich text

### ArtistTimeline
**File**: `components/content/ArtistTimeline.tsx`
**Props**:
```typescript
interface ArtistTimelineProps {
  events: TimelineEvent[];
}

interface TimelineEvent {
  year: number;
  title: string;
  description?: string;
}
```

### WorkGallery
**File**: `components/content/WorkGallery.tsx`
**Props**:
```typescript
interface WorkGalleryProps {
  images: string[];
  alt: string;
  enableZoom?: boolean;
}
```
**Features**: Thumbnail strip, main image, zoom

### WorkMeta
**File**: `components/content/WorkMeta.tsx`
**Props**:
```typescript
interface WorkMetaProps {
  work: Work;
  showPrice?: boolean;
  showProvenance?: boolean;
}
```
**Elements**:
- Title (EN/CN)
- Artist
- Year
- Medium
- Dimensions
- Price/Bid
- Availability

### WorkProvenance
**File**: `components/content/WorkProvenance.tsx`
**Props**:
```typescript
interface WorkProvenanceProps {
  provenance: ProvenanceEntry[];
  authenticityDocs?: string[];
}
```

### MultiAuthor
**File**: `components/content/MultiAuthor.tsx`
**Props**:
```typescript
interface MultiAuthorProps {
  authors: WorkAuthor[];
}

interface WorkAuthor {
  role: 'primary' | 'inscription' | 'calligraphy' | 'pottery' | 'carving' | 'firing';
  artist: Artist;
  contribution?: string;
}
```
**For ceramics**: Shows multiple contributors with roles

### StoryContent
**File**: `components/content/StoryContent.tsx`
**Props**:
```typescript
interface StoryContentProps {
  content: string; // Markdown or rich text
  linkedArtists?: Artist[];
  linkedWorks?: Work[];
}
```
**Features**: Inline links to artists/works

---

## Form Components

### FollowButton
**File**: `components/forms/FollowButton.tsx`
**Props**:
```typescript
interface FollowButtonProps {
  artistId: string;
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}
```
**States**: Follow → Following → Loading

### NewsletterForm
**File**: `components/forms/NewsletterForm.tsx`
**Props**:
```typescript
interface NewsletterFormProps {
  onSuccess?: () => void;
  showPreferences?: boolean;
}
```

### PriceRangeTabs
**File**: `components/forms/PriceRangeTabs.tsx`
**Props**:
```typescript
interface PriceRangeTabsProps {
  ranges: PriceRange[];
  activeRange: string;
  onChange: (rangeId: string) => void;
}
```

### FilterBar
**File**: `components/forms/FilterBar.tsx`
**Props**:
```typescript
interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
}
```

---

## Shared/Utility Components

### Image
**File**: `components/shared/Image.tsx`
**Props**:
```typescript
interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'video';
  objectFit?: 'cover' | 'contain';
  priority?: boolean;
  placeholder?: 'blur' | 'color';
}
```
**Features**: Lazy loading, aspect ratio container, placeholder

### Price
**File**: `components/shared/Price.tsx`
**Props**:
```typescript
interface PriceProps {
  amount: number;
  currency?: string;
  format?: 'short' | 'full';
  showRange?: boolean;
}
```
**Formats**: "$2,500" / "$2.5K" / "From $2,500"

### Badge
**File**: `components/shared/Badge.tsx`
**Props**:
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}
```
**Uses**: Availability, Status, Category

### Button
**File**: `components/shared/Button.tsx`
**Props**:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}
```

### SectionHeader
**File**: `components/shared/SectionHeader.tsx`
**Props**:
```typescript
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  align?: 'left' | 'center';
}
```

### Breadcrumbs
**File**: `components/shared/Breadcrumbs.tsx`
**Props**:
```typescript
interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}
```

### ShareButtons
**File**: `components/shared/ShareButtons.tsx`
**Props**:
```typescript
interface ShareButtonsProps {
  url: string;
  title: string;
  platforms?: ('twitter' | 'facebook' | 'email' | 'copy')[];
}
```

---

## Component Compositions

### ArtistPageComposition
```
PageLayout
├── Header
├── ArtistHero (portrait + name + stats)
├── ArtistStatement (curatorial "why")
├── ArtistBio (expandable)
├── ArtistTimeline
├── SelectedWorks (WorkCard grid)
├── AvailableWorks (WorkCard grid with prices)
├── ArtistStories (StoryCard minimal)
├── RelatedArtists (ArtistCard compact)
└── Footer
```

### WorkPageComposition
```
PageLayout
├── Header
├── Breadcrumbs
├── WorkGallery
├── WorkMeta
├── WorkDescription
├── CulturalContext
├── MultiAuthor (if applicable)
├── Provenance
├── RelatedWorks
├── ArtistContent
└── Footer
```

---

## Design Tokens Integration

All components use:
- **Colors**: From `lib/design-tokens.ts`
- **Typography**: Playfair Display (serif), Inter (sans)
- **Spacing**: 4px base unit, generous whitespace
- **Shadows**: Minimal, subtle
- **Borders**: Hairline, stone colors
- **Animation**: 300ms ease, subtle transforms

---

## Responsive Behavior

### Cards
- **Mobile**: Stack vertically, full width
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns, asymmetric layouts

### Sections
- **Mobile**: Single column, reduced padding
- **Tablet**: 2 columns where appropriate
- **Desktop**: Full layouts, max-width containers

### Navigation
- **Mobile**: Hamburger menu, full-screen overlay
- **Desktop**: Horizontal nav, dropdowns

---

## Accessibility Requirements

- All images have alt text
- Color contrast meets WCAG AA
- Focus states visible
- Keyboard navigation support
- Screen reader friendly markup
- Reduced motion support
