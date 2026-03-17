import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create artists
  const artists = [
    {
      slug: 'jiang-haoxu',
      name: 'Jiang Haoxu',
      nameCn: '江豪旭',
      discipline: 'Seal Engraving',
      location: 'Beijing, China',
      yearStarted: 2010,
      bio: 'Jiang Haoxu, courtesy name Ruisheng, art name Anjiao Shanren, is the founder of Jinshi Seal Studio. He specializes in traditional seal engraving and calligraphy.',
      statement: 'Seal carving is the art of condensing millennia of Chinese epigraphy into a single stone. Each stroke carries the weight of history.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&h=600&fit=crop',
      isPublished: true,
    },
    {
      slug: 'zhang-haoran',
      name: 'Zhang Haoran',
      nameCn: '张浩然',
      discipline: 'Calligraphy',
      location: 'Shanghai, China',
      yearStarted: 2008,
      bio: 'Master of contemporary calligraphy with expertise in multiple script styles.',
      statement: 'Calligraphy is the dance of ink on paper, expressing the rhythm of life.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1200&h=600&fit=crop',
      isPublished: true,
    },
  ];

  for (const artistData of artists) {
    const artist = await prisma.artist.upsert({
      where: { slug: artistData.slug },
      update: artistData,
      create: artistData,
    });
    console.log(`Created/Updated artist: ${artist.name}`);
  }

  // Create works for Jiang Haoxu
  const works = [
    {
      slug: 'serenity-seal',
      title: 'Serenity Seal',
      titleCn: '静观印',
      artistName: 'Jiang Haoxu',
      year: 2024,
      medium: 'Qingtian Stone, single-stroke carving',
      dimensions: '6.8 × 3.5 × 3.5 cm',
      price: 2800,
      currency: 'USD',
      availability: 'available',
      description: 'A masterfully carved seal featuring the phrase "Jing Guan" (静观 - serene observation).',
      images: '["https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800"]',
      isPublished: true,
    },
    {
      slug: 'dragon-phoenix-seal',
      title: 'Dragon & Phoenix Seal',
      titleCn: '龙凤呈祥印',
      artistName: 'Jiang Haoxu',
      year: 2023,
      medium: 'Shoushan Stone, relief carving',
      dimensions: '8.2 × 4.0 × 4.0 cm',
      price: 4500,
      currency: 'USD',
      availability: 'available',
      description: 'An intricate seal depicting the auspicious union of dragon and phoenix.',
      images: '["https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800"]',
      isPublished: true,
    },
  ];

  // Get Jiang Haoxu's artist ID
  const jiangArtist = await prisma.artist.findUnique({
    where: { slug: 'jiang-haoxu' },
  });

  if (jiangArtist) {
    for (const workData of works) {
      const work = await prisma.work.upsert({
        where: { slug: workData.slug },
        update: {
          ...workData,
          artistId: jiangArtist.id,
        },
        create: {
          ...workData,
          artistId: jiangArtist.id,
        },
      });
      console.log(`Created/Updated work: ${work.title}`);
    }
  }

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
