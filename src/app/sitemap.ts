import { MetadataRoute } from 'next';
import { ARTISTS, WORKS, STORIES, AUCTIONS } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://carveeast.com';

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/artists`, priority: 0.9 },
    { url: `${baseUrl}/works`, priority: 0.9 },
    { url: `${baseUrl}/stories`, priority: 0.8 },
    { url: `${baseUrl}/auctions`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/search`, priority: 0.6 },
  ];

  // Artist pages
  const artistPages = ARTISTS.map((artist) => ({
    url: `${baseUrl}/artists/${artist.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Work pages
  const workPages = WORKS.map((work) => ({
    url: `${baseUrl}/works/${work.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Story pages
  const storyPages = STORIES.map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: new Date(story.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Auction pages
  const auctionPages = AUCTIONS.map((auction) => ({
    url: `${baseUrl}/auctions/${auction.slug}`,
    lastModified: new Date(auction.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: page.priority,
    })),
    ...artistPages,
    ...workPages,
    ...storyPages,
    ...auctionPages,
  ];
}
