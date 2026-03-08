import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/following',
        '/inquiries',
      ],
    },
    sitemap: 'https://carveeast.com/sitemap.xml',
  };
}
