import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.$transaction([
    prisma.provenanceItem.deleteMany(),
    prisma.workDimensions.deleteMany(),
    prisma.workImage.deleteMany(),
    prisma.workAuthor.deleteMany(),
    prisma.auctionLot.deleteMany(),
    prisma.storyContentImage.deleteMany(),
    prisma.storyContentBlock.deleteMany(),
    prisma.storyArtist.deleteMany(),
    prisma.storyAuthor.deleteMany(),
    prisma.collectionWork.deleteMany(),
    prisma.artistDiscipline.deleteMany(),
    prisma.work.deleteMany(),
    prisma.artist.deleteMany(),
    prisma.auction.deleteMany(),
    prisma.story.deleteMany(),
    prisma.collection.deleteMany(),
  ]);

  console.log('Cleared existing data');

  // Create sample artists
  const artist1 = await prisma.artist.create({
    data: {
      slug: 'wang-mingde',
      nameEn: 'Wang Mingde',
      nameCn: '王明德',
      bioEn: 'Master seal engraver with over 30 years of experience, specializing in classical Chinese seal carving techniques.',
      bioCn: '拥有30多年经验的篆刻大师，专精中国传统篆刻技法。',
      location: 'Hangzhou, China',
      yearStarted: 1990,
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
      disciplines: {
        create: [{ discipline: 'SEAL_ENGRAVING' }],
      },
    },
  });

  const artist2 = await prisma.artist.create({
    data: {
      slug: 'lin-yuqing',
      nameEn: 'Lin Yuqing',
      nameCn: '林雨晴',
      bioEn: 'Contemporary ceramic artist combining traditional Yixing techniques with modern aesthetics.',
      bioCn: '当代陶艺家，将传统宜兴技法与现代美学相结合。',
      location: 'Yixing, China',
      yearStarted: 2005,
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
      disciplines: {
        create: [{ discipline: 'CERAMICS' }],
      },
    },
  });

  console.log('Created 2 artists');

  // Create sample works
  const work1 = await prisma.work.create({
    data: {
      slug: 'tranquility-seal',
      titleEn: 'Tranquility Seal',
      titleCn: '宁静之印',
      discipline: 'SEAL_ENGRAVING',
      year: 2023,
      mediumEn: 'Qingtian Stone',
      mediumCn: '青田石',
      descriptionEn: 'A masterful seal carving depicting the concept of tranquility through minimalist design.',
      availability: 'AVAILABLE',
      price: 1200,
      currency: 'USD',
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: '/images/works/tranquility-seal-1.jpg',
            altEn: 'Tranquility Seal - Front View',
            altCn: '宁静之印 - 正面',
            isPrimary: true,
            order: 0,
          },
        ],
      },
      authors: {
        create: [
          {
            artistId: artist1.id,
            role: 'PRIMARY',
            isPrimary: true,
          },
        ],
      },
      dimensions: {
        create: {
          height: 3,
          width: 3,
          depth: 5,
          unit: 'cm',
        },
      },
    },
  });

  const work2 = await prisma.work.create({
    data: {
      slug: 'moonlit-mountain-teapot',
      titleEn: 'Moonlit Mountain Teapot',
      titleCn: '月夜山景壶',
      discipline: 'CERAMICS',
      year: 2023,
      mediumEn: 'Yixing Zisha Clay',
      mediumCn: '宜兴紫砂泥',
      descriptionEn: 'An exquisite teapot featuring carved mountain landscapes under moonlight.',
      availability: 'AVAILABLE',
      price: 2800,
      currency: 'USD',
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: '/images/works/moonlit-teapot-1.jpg',
            altEn: 'Moonlit Mountain Teapot',
            altCn: '月夜山景壶',
            isPrimary: true,
            order: 0,
          },
        ],
      },
      authors: {
        create: [
          {
            artistId: artist2.id,
            role: 'PRIMARY',
            isPrimary: true,
          },
        ],
      },
      dimensions: {
        create: {
          height: 8,
          width: 15,
          unit: 'cm',
        },
      },
    },
  });

  console.log('Created 2 works');

  // Create sample auction
  const auction = await prisma.auction.create({
    data: {
      slug: 'spring-2024-emerging',
      titleEn: 'Spring 2024: Emerging Artists',
      titleCn: '2024春季：新锐艺术家',
      descriptionEn: 'A curated selection of works from emerging Chinese artists.',
      status: 'UPCOMING',
      startDate: new Date('2024-03-15T10:00:00Z'),
      endDate: new Date('2024-03-22T22:00:00Z'),
      isPublished: true,
      lots: {
        create: [
          {
            workId: work1.id,
            lotNumber: '001',
            estimateMin: 1000,
            estimateMax: 1500,
            currency: 'USD',
            startingBid: 800,
          },
        ],
      },
    },
  });

  console.log('Created 1 auction');

  // Create sample story
  const story = await prisma.story.create({
    data: {
      slug: 'understanding-seal-engraving',
      titleEn: 'Understanding Seal Engraving',
      titleCn: '了解篆刻艺术',
      excerptEn: 'An introduction to the ancient art of Chinese seal engraving.',
      excerptCn: '中国篆刻艺术入门介绍。',
      category: 'CRAFT',
      readTime: 8,
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
      content: {
        create: [
          {
            type: 'PARAGRAPH',
            contentEn: 'Seal engraving is one of China\'s most ancient art forms...',
            order: 0,
          },
          {
            type: 'HEADING',
            contentEn: 'History and Origins',
            order: 1,
          },
        ],
      },
      author: {
        create: {
          name: 'Editorial Team',
        },
      },
    },
  });

  console.log('Created 1 story');

  // Create sample collection
  const collection = await prisma.collection.create({
    data: {
      slug: 'first-collection-under-500',
      titleEn: 'First Collection Under $500',
      titleCn: '500美元以下入门收藏',
      descriptionEn: 'Perfect pieces for beginning collectors.',
      type: 'PRICE',
      isFeatured: true,
      isPublished: true,
      order: 1,
    },
  });

  console.log('Created 1 collection');

  console.log('Database seed completed successfully!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
