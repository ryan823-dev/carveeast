// Search functionality for CarveEast
// Provides full-text search across artists, works, and stories

import { ARTISTS, WORKS, STORIES, getDisciplineLabel } from './data';
import { Artist, Work, Story } from './types';

export interface SearchResult {
  id: string;
  type: 'artist' | 'work' | 'story';
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  image?: string;
  metadata: {
    [key: string]: string;
  };
}

// Build search index from all content
export function buildSearchIndex() {
  const index: SearchResult[] = [];

  // Index artists
  ARTISTS.forEach((artist) => {
    index.push({
      id: artist.id,
      type: 'artist',
      title: artist.name.en,
      subtitle: artist.name.cn,
      description: artist.shortBio,
      href: `/artists/${artist.slug}`,
      image: artist.portraitImage,
      metadata: {
        discipline: getDisciplineLabel(artist.primaryDiscipline),
        location: `${artist.location.city}, ${artist.location.country}`,
        tags: artist.tags.join(', '),
      },
    });
  });

  // Index works
  WORKS.forEach((work) => {
    const authors = work.authors
      .map((a) => {
        const artist = ARTISTS.find((art) => art.id === a.artistId);
        return artist?.name.en;
      })
      .filter(Boolean)
      .join(', ');

    index.push({
      id: work.id,
      type: 'work',
      title: work.title.en,
      subtitle: work.title.cn,
      description: work.description.slice(0, 200) + '...',
      href: `/works/${work.slug}`,
      image: work.images.find((img) => img.isPrimary)?.url,
      metadata: {
        discipline: getDisciplineLabel(work.discipline),
        artist: authors,
        year: work.year.toString(),
        medium: work.medium,
        price: work.price
          ? `${work.price.currency} ${work.price.amount}`
          : 'Price on request',
      },
    });
  });

  // Index stories
  STORIES.forEach((story) => {
    index.push({
      id: story.id,
      type: 'story',
      title: story.title,
      subtitle: story.subtitle,
      description: story.excerpt,
      href: `/stories/${story.slug}`,
      image: story.coverImage,
      metadata: {
        category: story.category.replace(/-/g, ' '),
        author: story.author.name,
        readTime: `${story.readTime} min read`,
      },
    });
  });

  return index;
}

// Search function with filtering
export function search(
  query: string,
  options?: {
    type?: 'artist' | 'work' | 'story';
    limit?: number;
  }
): SearchResult[] {
  const index = buildSearchIndex();
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (searchTerms.length === 0) {
    return [];
  }

  const results = index
    .filter((item) => {
      // Filter by type if specified
      if (options?.type && item.type !== options.type) {
        return false;
      }

      // Search in all text fields
      const searchableText = [
        item.title,
        item.subtitle,
        item.description,
        ...Object.values(item.metadata),
      ]
        .join(' ')
        .toLowerCase();

      // All search terms must match
      return searchTerms.every((term) => searchableText.includes(term));
    })
    .map((item) => {
      // Calculate relevance score
      const titleMatch = searchTerms.some((term) =>
        item.title.toLowerCase().includes(term)
      );
      const subtitleMatch = item.subtitle
        ? searchTerms.some((term) =>
            item.subtitle!.toLowerCase().includes(term)
          )
        : false;

      return {
        item,
        score: (titleMatch ? 3 : 0) + (subtitleMatch ? 2 : 0),
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);

  // Apply limit
  if (options?.limit) {
    return results.slice(0, options.limit);
  }

  return results;
}

// Get search suggestions (for autocomplete)
export function getSearchSuggestions(
  query: string,
  limit: number = 5
): SearchResult[] {
  if (query.length < 2) {
    return [];
  }

  return search(query, { limit });
}

// Get popular searches (mock data - could be based on analytics)
export function getPopularSearches(): string[] {
  return [
    'seal engraving',
    'Yixing teapot',
    'calligraphy',
    'ink painting',
    'Wang Mingde',
    'under $1000',
    'auction',
  ];
}

// Filter works by various criteria
export interface WorkFilters {
  discipline?: string;
  priceRange?: string;
  availability?: string;
  artist?: string;
  yearFrom?: number;
  yearTo?: number;
}

export function filterWorks(filters: WorkFilters): Work[] {
  return WORKS.filter((work) => {
    // Filter by discipline
    if (filters.discipline && work.discipline !== filters.discipline) {
      return false;
    }

    // Filter by price range
    if (filters.priceRange && work.priceRangeId !== filters.priceRange) {
      return false;
    }

    // Filter by availability
    if (filters.availability && work.availability !== filters.availability) {
      return false;
    }

    // Filter by artist
    if (filters.artist) {
      const hasArtist = work.authors.some(
        (a) => a.artistId === filters.artist
      );
      if (!hasArtist) return false;
    }

    // Filter by year range
    if (filters.yearFrom && work.year < filters.yearFrom) {
      return false;
    }
    if (filters.yearTo && work.year > filters.yearTo) {
      return false;
    }

    return true;
  });
}

// Get filter options
export function getFilterOptions() {
  return {
    disciplines: [
      { value: 'seal_engraving', label: 'Seal Engraving' },
      { value: 'calligraphy', label: 'Calligraphy' },
      { value: 'ink_painting', label: 'Ink Painting' },
      { value: 'inscribed_ceramics', label: 'Inscribed Ceramics' },
      { value: 'oil_painting', label: 'Oil Painting' },
      { value: 'printmaking', label: 'Printmaking' },
    ],
    priceRanges: [
      { value: 'under-500', label: 'Under $500' },
      { value: '500-1500', label: '$500 - $1,500' },
      { value: '1500-3000', label: '$1,500 - $3,000' },
      { value: '3000-5000', label: '$3,000 - $5,000' },
      { value: 'above-5000', label: 'Above $5,000' },
    ],
    availability: [
      { value: 'available', label: 'Available' },
      { value: 'auction', label: 'In Auction' },
      { value: 'sold', label: 'Sold' },
      { value: 'reserved', label: 'Reserved' },
    ],
  };
}
