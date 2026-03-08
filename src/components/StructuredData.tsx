// Structured Data / JSON-LD for SEO
// Provides rich snippets for Google search results

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Artist' | 'VisualArtwork' | 'Article' | 'Product' | 'Event';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Pre-configured structured data generators
export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: 'CarveEast',
        alternateName: '刻画东方',
        url: 'https://carveeast.com',
        logo: 'https://carveeast.com/logo.png',
        description: 'Discover and collect authentic works by contemporary Chinese artists—seal engravings, calligraphy, ink paintings, and inscribed ceramics.',
        foundingDate: '2024',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
        sameAs: [
          'https://instagram.com/carveeast',
          'https://twitter.com/carveeast',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'hello@carveeast.com',
        },
      }}
    />
  );
}

export function WebSiteStructuredData() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: 'CarveEast',
        url: 'https://carveeast.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://carveeast.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function ArtistStructuredData(artist: {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image?: string;
  birthDate?: string;
  birthPlace?: string;
  jobTitle?: string;
}) {
  return (
    <StructuredData
      type="Artist"
      data={{
        name: artist.name,
        alternateName: artist.alternateName,
        description: artist.description,
        url: `https://carveeast.com${artist.url}`,
        image: artist.image,
        birthDate: artist.birthDate,
        birthPlace: artist.birthPlace
          ? {
              '@type': 'Place',
              name: artist.birthPlace,
            }
          : undefined,
        jobTitle: artist.jobTitle || 'Artist',
        knowsAbout: ['Chinese Art', 'Seal Engraving', 'Calligraphy', 'Ink Painting'],
      }}
    />
  );
}

export function VisualArtworkStructuredData(artwork: {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image?: string;
  artist: { name: string; url?: string };
  dateCreated?: string;
  artMedium?: string;
  artform?: string;
  size?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: string;
  };
}) {
  return (
    <StructuredData
      type="VisualArtwork"
      data={{
        name: artwork.name,
        alternateName: artwork.alternateName,
        description: artwork.description,
        url: `https://carveeast.com${artwork.url}`,
        image: artwork.image,
        creator: {
          '@type': 'Person',
          name: artwork.artist.name,
          url: artwork.artist.url
            ? `https://carveeast.com${artwork.artist.url}`
            : undefined,
        },
        dateCreated: artwork.dateCreated,
        artMedium: artwork.artMedium,
        artform: artwork.artform,
        size: artwork.size,
        offers: artwork.offers
          ? {
              '@type': 'Offer',
              price: artwork.offers.price,
              priceCurrency: artwork.offers.priceCurrency,
              availability: artwork.offers.availability,
              url: `https://carveeast.com${artwork.url}`,
              seller: {
                '@type': 'Organization',
                name: 'CarveEast',
              },
            }
          : undefined,
      }}
    />
  );
}

export function ArticleStructuredData(article: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string };
  keywords?: string[];
}) {
  return (
    <StructuredData
      type="Article"
      data={{
        headline: article.headline,
        description: article.description,
        url: `https://carveeast.com${article.url}`,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
          '@type': 'Person',
          name: article.author.name,
          url: article.author.url,
        },
        publisher: {
          '@type': 'Organization',
          name: 'CarveEast',
          logo: {
            '@type': 'ImageObject',
            url: 'https://carveeast.com/logo.png',
          },
        },
        keywords: article.keywords?.join(', '),
      }}
    />
  );
}

export function BreadcrumbStructuredData(items: { name: string; url?: string }[]) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `https://carveeast.com${item.url}` : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
