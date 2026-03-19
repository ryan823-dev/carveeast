// CarveEast Mock Data
// Based on docs/data-models.md with multi-authorship support

import {
  Artist,
  Work,
  WorkAuthor,
  AuthorRole,
  Auction,
  AuctionLot,
  Story,
  StoryContentBlock,
  Collection,
  CuratorialLine,
  PriceRange,
  Discipline,
  WorkAvailability,
  AuctionStatus,
  StoryCategory,
  CollectionType,
} from './types';

// ============================================================================
// PRICE RANGES
// ============================================================================

export const PRICE_RANGES: PriceRange[] = [
  {
    id: 'under-500',
    label: '入门收藏',
    labelEn: 'Entry Level',
    min: 0,
    max: 500,
    currency: 'USD',
    description: 'Perfect for first-time collectors',
  },
  {
    id: '500-1500',
    label: '进阶收藏',
    labelEn: 'Mid Range',
    min: 500,
    max: 1500,
    currency: 'USD',
    description: 'Established artists, quality works',
  },
  {
    id: '1500-3000',
    label: '资深收藏',
    labelEn: 'Upper Mid',
    min: 1500,
    max: 3000,
    currency: 'USD',
    description: 'Notable works by recognized artists',
  },
  {
    id: '3000-5000',
    label: '精品收藏',
    labelEn: 'Premium',
    min: 3000,
    max: 5000,
    currency: 'USD',
    description: 'Exceptional pieces, investment grade',
  },
  {
    id: 'above-5000',
    label: '珍稀收藏',
    labelEn: 'Rare',
    min: 5000,
    max: null,
    currency: 'USD',
    description: 'Masterworks and rare acquisitions',
  },
];

// ============================================================================
// ARTISTS
// ============================================================================

export const ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    slug: 'wang-mingde',
    name: {
      en: 'Wang Mingde',
      cn: '王明德',
      pinyin: 'Wáng Míngdé',
    },
    primaryDiscipline: Discipline.SEAL_ENGRAVING,
    disciplines: [Discipline.SEAL_ENGRAVING, Discipline.CALLIGRAPHY],
    bio: 'Wang Mingde is a master seal engraver from Suzhou with over 30 years of experience. His work bridges classical seal carving traditions with contemporary artistic expression, creating pieces that resonate with both traditional collectors and modern art enthusiasts. He studied under the renowned seal carver Chen Hongshou and has exhibited internationally in Tokyo, Paris, and New York.',
    shortBio: 'Master seal engraver bridging classical tradition with contemporary expression',
    statement: 'Every seal is a conversation between the carver and the stone. The stone speaks its own language—I merely listen and respond.',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=faces',
    studioImages: [
      'https://images.unsplash.com/photo-1456094865871-e35451a92e38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=600&fit=crop'
    ],
    location: {
      city: 'Suzhou',
      province: 'Jiangsu',
      country: 'China',
    },
    yearStarted: 1990,
    yearsActive: '1990-present',
    tags: ['Classical Style', 'Literati Tradition', 'Stone Carving', 'Contemporary Interpretation'],
    isFeatured: true,
    featuredOrder: 1,
    stats: {
      totalWorks: 48,
      availableWorks: 12,
      priceRange: {
        min: 800,
        max: 4800,
        currency: 'USD',
      },
    },
    socialLinks: {
      website: 'https://wangmingde.example.com',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'artist-2',
    slug: 'lin-yuqing',
    name: {
      en: 'Lin Yuqing',
      cn: '林雨晴',
      pinyin: 'Lín Yǔqíng',
    },
    primaryDiscipline: Discipline.INSCRIBED_CERAMICS,
    disciplines: [Discipline.INSCRIBED_CERAMICS, Discipline.CALLIGRAPHY],
    bio: 'Lin Yuqing is a ceramic artist specializing in Yixing zisha teaware with inscribed calligraphy. Her unique approach combines traditional pottery techniques with literary inscriptions, often collaborating with calligraphers and poets to create works that exist at the intersection of craft and poetry. She is one of the few female artists working in this traditionally male-dominated field.',
    shortBio: 'Ceramic artist creating inscribed Yixing teaware at the intersection of craft and poetry',
    statement: 'Clay remembers every touch. When I inscribe a poem into a teapot, I am creating a vessel that will hold both tea and meaning for generations.',
    portraitImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=faces',
    studioImages: ['https://images.unsplash.com/photo-1615529182904-14819c00239d?w=800&h=600&fit=crop'],
    location: {
      city: 'Yixing',
      province: 'Jiangsu',
      country: 'China',
    },
    yearStarted: 2005,
    yearsActive: '2005-present',
    tags: ['Yixing Clay', 'Inscribed Ceramics', 'Female Artist', 'Poetic Inscriptions'],
    isFeatured: true,
    featuredOrder: 2,
    stats: {
      totalWorks: 36,
      availableWorks: 8,
      priceRange: {
        min: 1200,
        max: 5200,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'artist-3',
    slug: 'chen-zhiting',
    name: {
      en: 'Chen Zhiting',
      cn: '陈之庭',
      pinyin: 'Chén Zhītíng',
    },
    primaryDiscipline: Discipline.CALLIGRAPHY,
    disciplines: [Discipline.CALLIGRAPHY, Discipline.INK_PAINTING],
    bio: 'Chen Zhiting is a calligrapher and ink painter known for his bold, expressive brushwork. Trained in both classical Chinese calligraphy and modern abstract expressionism, his work challenges traditional boundaries while maintaining deep respect for the masters. His pieces are held in private collections across Asia, Europe, and North America.',
    shortBio: 'Calligrapher and ink painter blending classical mastery with bold expression',
    portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=faces',
    location: {
      city: 'Hangzhou',
      province: 'Zhejiang',
      country: 'China',
    },
    yearStarted: 2000,
    yearsActive: '2000-present',
    tags: ['Expressive Calligraphy', 'Ink Painting', 'Contemporary Brushwork', 'Cross-cultural'],
    isFeatured: true,
    featuredOrder: 3,
    stats: {
      totalWorks: 64,
      availableWorks: 18,
      priceRange: {
        min: 600,
        max: 3800,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'artist-4',
    slug: 'zhang-shiyuan',
    name: {
      en: 'Zhang Shiyuan',
      cn: '张石原',
      pinyin: 'Zhāng Shíyuán',
    },
    primaryDiscipline: Discipline.INK_PAINTING,
    disciplines: [Discipline.INK_PAINTING, Discipline.SEAL_ENGRAVING],
    bio: 'Zhang Shiyuan is a landscape painter in the literati tradition, creating small-format works that capture the essence of mountains and water with minimal brushstrokes. His paintings often incorporate his own seal carvings, creating a complete artistic statement that unites image, poetry, and signature seal.',
    shortBio: 'Literati painter capturing mountain essence through minimal brushwork',
    portraitImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=faces',
    location: {
      city: 'Nanjing',
      province: 'Jiangsu',
      country: 'China',
    },
    yearStarted: 1995,
    yearsActive: '1995-present',
    tags: ['Literati Painting', 'Landscape', 'Minimalist', 'Seal Integration'],
    isFeatured: false,
    stats: {
      totalWorks: 42,
      availableWorks: 9,
      priceRange: {
        min: 900,
        max: 4200,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'artist-5',
    slug: 'liu-weifang',
    name: {
      en: 'Liu Weifang',
      cn: '刘伟方',
      pinyin: 'Liú Wěifāng',
    },
    primaryDiscipline: Discipline.SEAL_ENGRAVING,
    disciplines: [Discipline.SEAL_ENGRAVING],
    bio: 'Liu Weifang specializes in archaistic seal styles, reviving ancient Han and Qin dynasty carving techniques. His seals are prized by scholars and collectors for their historical authenticity and technical precision. He is also a respected authority on seal history and has published extensively on the subject.',
    shortBio: 'Specialist in archaistic seal styles reviving ancient Han and Qin techniques',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=faces',
    location: {
      city: 'Beijing',
      country: 'China',
    },
    yearStarted: 1988,
    yearsActive: '1988-present',
    tags: ['Archaistic Style', 'Han Dynasty', 'Qin Dynasty', 'Scholarly', 'Historical'],
    isFeatured: false,
    stats: {
      totalWorks: 56,
      availableWorks: 14,
      priceRange: {
        min: 700,
        max: 3500,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'artist-6',
    slug: 'wu-xiaoyun',
    name: {
      en: 'Wu Xiaoyun',
      cn: '吴晓云',
      pinyin: 'Wú Xiǎoyún',
    },
    primaryDiscipline: Discipline.OIL_PAINTING,
    disciplines: [Discipline.OIL_PAINTING, Discipline.PRINTMAKING],
    bio: 'Wu Xiaoyun is a contemporary painter and printmaker whose work explores the intersection of Chinese aesthetic philosophy and Western oil painting techniques. Her abstract compositions evoke landscapes and calligraphic gestures while using the medium of oil on canvas. She represents the expansion of CarveEast into contemporary painting.',
    shortBio: 'Contemporary painter exploring Chinese philosophy through Western oil techniques',
    portraitImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=faces',
    location: {
      city: 'Shanghai',
      country: 'China',
    },
    yearStarted: 2010,
    yearsActive: '2010-present',
    tags: ['Contemporary', 'Oil Painting', 'Abstract', 'Cross-cultural', 'Emerging'],
    isFeatured: true,
    featuredOrder: 4,
    stats: {
      totalWorks: 28,
      availableWorks: 11,
      priceRange: {
        min: 1500,
        max: 6500,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Artist 7 - Master seal carver from Shanghai
  {
    id: 'artist-7',
    slug: 'zhang-haoran',
    name: {
      en: 'Zhang Haoran',
      cn: '张浩然',
      pinyin: 'Zhāng Hàorán',
    },
    primaryDiscipline: Discipline.SEAL_ENGRAVING,
    disciplines: [Discipline.SEAL_ENGRAVING, Discipline.CALLIGRAPHY],
    bio: 'Zhang Haoran is a Shanghai-based seal engraver known for his innovative approach to traditional Han Dynasty seal carving. His work combines the bold, angular style of ancient bronze seals with contemporary design sensibilities. He has won multiple national awards for seal carving and his works are collected by institutions including the Shanghai Museum.',
    shortBio: 'Award-winning seal engraver specializing in Han Dynasty revival style',
    statement: 'The seal is the artist\'s soul carved in stone. Each cut must be decisive, each line must breathe.',
    portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=faces',
    studioImages: ['/images/artists/zhang-haoran-studio-1.jpg'],
    location: {
      city: 'Shanghai',
      country: 'China',
    },
    yearStarted: 2003,
    yearsActive: '2003-present',
    tags: ['Han Dynasty Style', 'Bronze Seals', 'Award Winner', 'Traditional Technique'],
    isFeatured: true,
    featuredOrder: 5,
    stats: {
      totalWorks: 42,
      availableWorks: 15,
      priceRange: {
        min: 1000,
        max: 5500,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Artist 8 - Ink painter from Beijing
  {
    id: 'artist-8',
    slug: 'li-xuefeng',
    name: {
      en: 'Li Xuefeng',
      cn: '李雪峰',
      pinyin: 'Lǐ Xuěfēng',
    },
    primaryDiscipline: Discipline.INK_PAINTING,
    disciplines: [Discipline.INK_PAINTING, Discipline.CALLIGRAPHY],
    bio: 'Li Xuefeng is a Beijing-based ink painter specializing in traditional shanshui (mountain-water) landscapes. Trained in the classical traditions of the Song and Yuan dynasties, his work captures the spiritual essence of Chinese landscape painting while incorporating subtle contemporary elements. He teaches at the Central Academy of Fine Arts.',
    shortBio: 'Master of traditional shanshui landscape painting',
    statement: 'Ink painting is not about reproducing nature, but about expressing the artist\'s inner landscape through brush and ink.',
    portraitImage: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=400&h=600&fit=crop&crop=faces',
    studioImages: ['/images/artists/li-xuefeng-studio-1.jpg', '/images/artists/li-xuefeng-studio-2.jpg'],
    location: {
      city: 'Beijing',
      country: 'China',
    },
    yearStarted: 1998,
    yearsActive: '1998-present',
    tags: ['Shanshui', 'Landscape', 'Song Dynasty Style', 'Academic'],
    isFeatured: true,
    featuredOrder: 6,
    stats: {
      totalWorks: 55,
      availableWorks: 18,
      priceRange: {
        min: 2000,
        max: 12000,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Artist 9 - Calligrapher from Xi'an
  {
    id: 'artist-9',
    slug: 'zhao-jianjun',
    name: {
      en: 'Zhao Jianjun',
      cn: '赵建军',
      pinyin: 'Zhào Jiànjūn',
    },
    primaryDiscipline: Discipline.CALLIGRAPHY,
    disciplines: [Discipline.CALLIGRAPHY],
    bio: 'Zhao Jianjun is a master calligrapher from Xi\'an, renowned for his mastery of all five script types: seal, clerical, cursive, running, and standard. His work is deeply rooted in the stele tradition of the Tang Dynasty, and he has spent decades studying ancient inscriptions. His calligraphy adorns temples and public buildings throughout China.',
    shortBio: 'Master calligrapher specializing in Tang Dynasty stele tradition',
    statement: 'Calligraphy is the highest art form in Chinese culture. Each stroke carries the weight of tradition and the spirit of the moment.',
    portraitImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop&crop=faces',
    location: {
      city: "Xi'an",
      province: 'Shaanxi',
      country: 'China',
    },
    yearStarted: 1985,
    yearsActive: '1985-present',
    tags: ['Five Scripts', 'Stele Tradition', 'Tang Dynasty', 'Master'],
    isFeatured: true,
    featuredOrder: 7,
    stats: {
      totalWorks: 68,
      availableWorks: 22,
      priceRange: {
        min: 1500,
        max: 15000,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Artist 10 - Ceramic artist from Jingdezhen
  {
    id: 'artist-10',
    slug: 'huang-mei',
    name: {
      en: 'Huang Mei',
      cn: '黄梅',
      pinyin: 'Huáng Méi',
    },
    primaryDiscipline: Discipline.INSCRIBED_CERAMICS,
    disciplines: [Discipline.INSCRIBED_CERAMICS],
    bio: 'Huang Mei is a ceramic artist from Jingdezhen, the "Porcelain Capital" of China. She specializes in blue and white porcelain with delicate inscribed poetry. Her family has been producing ceramics for five generations, and she combines traditional techniques with contemporary aesthetic sensibilities. Her work has been exhibited internationally.',
    shortBio: 'Jingdezhen ceramic artist specializing in blue and white porcelain',
    statement: 'Porcelain is clay transformed by fire into something eternal. When I inscribe poetry onto a vessel, I am giving voice to both earth and flame.',
    portraitImage: 'https://images.unsplash.com/photo-1554188248-986b70e163d4?w=400&h=600&fit=crop&crop=faces',
    studioImages: ['/images/artists/huang-mei-studio-1.jpg'],
    location: {
      city: 'Jingdezhen',
      province: 'Jiangxi',
      country: 'China',
    },
    yearStarted: 2008,
    yearsActive: '2008-present',
    tags: ['Blue and White', 'Jingdezhen', 'Porcelain', 'Fifth Generation'],
    isFeatured: true,
    featuredOrder: 8,
    stats: {
      totalWorks: 32,
      availableWorks: 14,
      priceRange: {
        min: 800,
        max: 4200,
        currency: 'USD',
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Artist 11 - Jiang Haoxu (Contemporary Seal Carving Educator)
  {
    id: 'artist-11',
    slug: 'jiang-haoxu',
    name: {
      en: 'Jiang Haoxu',
      cn: '江豪旭',
      pinyin: 'Jiāng Háoxù',
    },
    primaryDiscipline: Discipline.SEAL_ENGRAVING,
    disciplines: [Discipline.SEAL_ENGRAVING, Discipline.CALLIGRAPHY],
    bio: 'Jiang Haoxu (江豪旭), courtesy name Ruisheng (字瑞昇), art name Anjiao Shanren (号庵角山人), is a distinguished seal carving artist and educator whose work exemplifies both artistic mastery and pedagogical excellence. In 2006, he founded Jinshi Seal Studio (金石印坊), which has become one of the most influential seal carving education institutions in China.\n\n**Seal Carving Artistry:**\nWith over 30 years of dedication to seal art, Jiang has developed a highly distinctive personal style in seal carving. His work is characterized by a primitive simplicity (古朴) combined with powerful, unadorned strength (劲拙). The cuts are decisive and clean (利落), creating compositions that are generous and dignified (大方). His seals demonstrate deep understanding of ancient Han dynasty seal traditions while maintaining a contemporary sensibility. The knife work shows remarkable confidence—each cut is final and expressive, revealing decades of disciplined practice. His seal designs balance the density and spacing of characters with exceptional spatial awareness, creating harmonious compositions that feel both timeless and fresh.\n\n**Border Inscriptions (边款):**\nJiang is particularly renowned for his single-stroke border inscriptions (单刀边款), where his楷书 (regular script) demonstrates elegant structure and precise knife control. This mastery led to his collaboration with Founder Type (方正字库) to create the "Haoxu Single-Stroke Regular Script" (方正字迹 - 豪旭单刀楷) font family—the first time a seal carving border inscription style has been digitized for modern typography.\n\n**Educational Contributions:**\nJiang is the author of "Single-Stroke Regular Script Border Inscriptions: Techniques and Creation" (《单刀楷书边款刻法与创作》), a comprehensive textbook that has become essential reading for seal carving students. He regularly conducts lectures and workshops across China, including the prestigious "Han Seal Appreciation and Creation" lecture series. His teaching methodology emphasizes both technical precision and artistic expression, training students to understand seal carving as a living art form rooted in three millennia of tradition.\n\n**Artistic Philosophy:**\nJiang believes that seal carving is a dialogue between the artist, the stone, and three thousand years of cultural heritage. His work as an educator, artist, and cultural transmitter reflects his commitment to ensuring this ancient art continues to flourish in contemporary contexts.',
    shortBio: 'Master seal carver and educator, founder of Jinshi Seal Studio (2006), renowned for primitive and powerful style (古朴劲拙) and single-stroke border inscriptions',
    statement: 'A seal is born from the dialogue between knife and stone—primitive, powerful, and unrepeatable. In teaching, I pass on not just technique, but a living tradition that has endured for three thousand years.',
    portraitImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=600&fit=crop&crop=faces',
    studioImages: ['/images/artists/jiang-haoxu-studio-1.jpg', '/images/artists/jiang-haoxu-teaching.jpg'],
    location: {
      city: 'Nanjing',
      province: 'Jiangsu',
      country: 'China',
    },
    yearStarted: 1993,
    yearsActive: '1993-present',
    tags: ['Seal Education', 'Single-Stroke Style', 'Border Inscriptions', 'Cultural Transmission', 'Founder Type Collaboration', 'Jinshi Seal Studio Founder', 'Anjiao Shanren'],
    isFeatured: true,
    featuredOrder: 9,
    stats: {
      totalWorks: 120,
      availableWorks: 25,
      priceRange: {
        min: 600,
        max: 8000,
        currency: 'USD',
      },
    },
    socialLinks: {
      website: 'https://www.godseal.com',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================================================
// WORKS (with multi-authorship examples)
// ============================================================================

export const WORKS: Work[] = [
  // Wang Mingde - Seal Engraving
  {
    id: 'work-1',
    slug: 'tranquility-seal',
    title: {
      en: 'Tranquility Seal',
      cn: '静观',
    },
    authors: [
      { artistId: 'artist-1', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2023,
    medium: 'Shoushan Stone, carved and polished',
    dimensions: {
      height: 6,
      width: 2.5,
      depth: 2.5,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=800&fit=crop', alt: 'Tranquility Seal - side view', isPrimary: true, order: 0 },
      { url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=600&fit=crop', alt: 'Tranquility Seal - impression', isPrimary: false, order: 1 },
    ],
    description: 'A contemplative seal carved from premium Shoushan stone. The characters "静观" (Jìng Guān) mean "Tranquil Observation"—a state of mindful awareness prized in literati culture. The stone exhibits natural veining that the artist incorporated into the design, creating a dialogue between human intention and natural form.',
    culturalContext: 'The concept of "tranquil observation" has deep roots in Chinese philosophy, appearing in Buddhist, Daoist, and Confucian texts. A scholar would use such a seal to mark ownership of books or to sign paintings, making it both a practical tool and a statement of personal values.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1200,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: true,
    tags: ['Shoushan Stone', 'Literati', 'Contemplative', 'Small Format'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'work-2',
    slug: 'mountain-dream-seal',
    title: {
      en: 'Mountain Dream Seal',
      cn: '山梦',
    },
    authors: [
      { artistId: 'artist-1', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2022,
    medium: 'Qingtian Stone, hand-carved',
    dimensions: {
      height: 4,
      width: 3,
      depth: 3,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=800&fit=crop', alt: 'Mountain Dream Seal', isPrimary: true, order: 0 },
    ],
    description: 'This smaller seal captures the essence of mountain retreat—a recurring theme in Chinese art. The characters "山梦" (Shān Mèng) evoke the dreamlike quality of mist-shrouded peaks. The stone is a warm caramel color with natural inclusions that suggest cloud formations.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 850,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: false,
    tags: ['Qingtian Stone', 'Landscape Theme', 'Small Format'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Lin Yuqing - Inscribed Ceramics (multi-author example)
  {
    id: 'work-3',
    slug: 'moonlit-mountain-teapot',
    title: {
      en: 'Moonlit Mountain Teapot',
      cn: '山月壶',
    },
    // MULTI-AUTHOR: Lin Yuqing made the pot, Chen Zhiting did the inscription
    authors: [
      { artistId: 'artist-2', role: AuthorRole.POTTERY, isPrimary: true, contribution: 'Teapot body and form' },
      { artistId: 'artist-3', role: AuthorRole.CALLIGRAPHY, isPrimary: false, contribution: 'Landscape inscription' },
    ],
    discipline: Discipline.INSCRIBED_CERAMICS,
    year: 2023,
    medium: 'Yixing Zisha Clay, carved and fired',
    dimensions: {
      height: 9,
      width: 16,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1578749556920-d1e643848e91?w=800&h=800&fit=crop', alt: 'Moonlit Mountain Teapot - main view', isPrimary: true, order: 0 },
      { url: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&h=800&fit=crop', alt: 'Inscription detail', isPrimary: false, order: 1 },
      { url: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&h=800&fit=crop', alt: 'Teapot from above', isPrimary: false, order: 2 },
    ],
    description: 'A masterful collaboration between ceramic artist Lin Yuqing and calligrapher Chen Zhiting. The teapot form is classic Yixing style with a refined, balanced proportion. The body features a carved landscape depicting mountains under moonlight, with calligraphic inscriptions that complement the imagery. This piece exemplifies the literati ideal of uniting poetry, calligraphy, and craft.',
    culturalContext: 'Collaborative works like this have a long history in Chinese art culture. The teapot serves as a canvas for calligraphic expression, transforming a functional object into a complete artistic statement. Such pieces are highly prized by collectors who appreciate the intersection of multiple art forms.',
    inscription: {
      text: '山月随人归',
      translation: 'The mountain moon follows me home',
      calligrapher: 'Chen Zhiting',
    },
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 2800,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '1500-3000',
    isFeatured: true,
    tags: ['Yixing', 'Collaboration', 'Landscape', 'Calligraphy', 'Functional Art'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'work-4',
    slug: 'bamboo-whisper-teacup-set',
    title: {
      en: 'Bamboo Whisper Teacup Set',
      cn: '竹语杯组',
    },
    authors: [
      { artistId: 'artist-2', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.INSCRIBED_CERAMICS,
    year: 2023,
    medium: 'Yixing Zisha Clay, four cups',
    dimensions: {
      height: 4,
      diameter: 6,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&h=800&fit=crop', alt: 'Bamboo Whisper Teacup Set', isPrimary: true, order: 0 },
    ],
    description: 'A set of four teacups, each carved with bamboo motifs and poetic inscriptions. The bamboo symbolizes resilience and integrity in Chinese culture. Each cup bears a different inscription related to the seasons, creating a complete experience when used together.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 650,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: false,
    tags: ['Yixing', 'Bamboo', 'Set', 'Seasonal', 'Functional Art'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Chen Zhiting - Calligraphy
  {
    id: 'work-5',
    slug: 'wild-cursive-poem',
    title: {
      en: 'Wild Cursive: Mountain Poem',
      cn: '狂草山诗',
    },
    authors: [
      { artistId: 'artist-3', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.CALLIGRAPHY,
    year: 2023,
    medium: 'Ink on Xuan paper, mounted as hanging scroll',
    dimensions: {
      height: 120,
      width: 45,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=800&fit=crop', alt: 'Wild Cursive calligraphy scroll', isPrimary: true, order: 0 },
      { url: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=800&fit=crop', alt: 'Detail of brushwork', isPrimary: false, order: 1 },
    ],
    description: 'An explosive work in wild cursive script (caoshu), this piece pushes the boundaries of legibility while maintaining the rhythmic energy that defines great calligraphy. The text is a Tang dynasty poem about mountain solitude, but the visual impact transcends the literal meaning—viewers feel the energy of wind through pines even without reading the characters.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1800,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '1500-3000',
    isFeatured: true,
    tags: ['Wild Cursive', 'Expressive', 'Large Format', 'Hanging Scroll'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'work-6',
    slug: 'running-script-quotation',
    title: {
      en: 'Running Script: Zhuangzi Quotation',
      cn: '行书庄子语',
    },
    authors: [
      { artistId: 'artist-3', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.CALLIGRAPHY,
    year: 2022,
    medium: 'Ink on paper, album leaf',
    dimensions: {
      height: 35,
      width: 45,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1579787934380-4886a2f5469f?w=800&h=800&fit=crop', alt: 'Running Script album leaf', isPrimary: true, order: 0 },
    ],
    description: 'A refined work in running script (xingshu), displaying the elegant flow that bridges regular and cursive scripts. The text is a famous passage from the Zhuangzi about the butterfly dream—a philosophical meditation on reality and illusion. The brushwork is controlled yet spontaneous, demonstrating years of disciplined practice.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 950,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: false,
    tags: ['Running Script', 'Philosophical', 'Album Leaf', 'Zhuangzi'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Zhang Shiyuan - Ink Painting
  {
    id: 'work-7',
    slug: 'misty-valley',
    title: {
      en: 'Misty Valley',
      cn: '幽谷',
    },
    authors: [
      { artistId: 'artist-4', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.INK_PAINTING,
    year: 2023,
    medium: 'Ink and light color on paper, mounted',
    dimensions: {
      height: 45,
      width: 35,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1565624098498-5c12a960f929?w=800&h=800&fit=crop', alt: 'Misty Valley painting', isPrimary: true, order: 0 },
    ],
    description: 'A small-format landscape capturing the essence of mist-shrouded mountains with minimal brushstrokes. The composition draws the eye deep into the valley, where a solitary pavilion suggests human presence within vast nature. The painting includes the artist\'s own seal carving, creating a complete literati statement.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1400,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: false,
    tags: ['Landscape', 'Minimalist', 'Small Format', 'Literati'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Liu Weifang - Archaistic Seal
  {
    id: 'work-8',
    slug: 'han-style-official-seal',
    title: {
      en: 'Han-Style Official Seal',
      cn: '汉官印',
    },
    authors: [
      { artistId: 'artist-5', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2023,
    medium: 'Bronze, cast and carved',
    dimensions: {
      height: 3,
      width: 2.5,
      depth: 2.5,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1536654098498-a9880a292713?w=800&h=800&fit=crop', alt: 'Han-Style Official Seal', isPrimary: true, order: 0 },
      { url: 'https://images.unsplash.com/photo-1561157340-75f2590dc730?w=800&h=800&fit=crop', alt: 'Seal impression', isPrimary: false, order: 1 },
    ],
    description: 'A faithful recreation of Han dynasty official seal style, characterized by bold, squared characters and a sense of imperial authority. The artist has studied hundreds of museum-quality Han seals to perfect the technique. The bronze has been artificially aged to achieve a patina consistent with ancient pieces.',
    culturalContext: 'Han dynasty seals (206 BCE - 220 CE) represent the golden age of Chinese seal carving. Official seals were symbols of bureaucratic authority, and their style influenced all subsequent seal carving. Modern collectors value archaistic works for their historical resonance and technical mastery.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1100,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: false,
    tags: ['Archaistic', 'Han Style', 'Bronze', 'Historical'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Wu Xiaoyun - Oil Painting (Extension category)
  {
    id: 'work-9',
    slug: 'ink-dream-no-5',
    title: {
      en: 'Ink Dream No. 5',
      cn: '墨梦之五',
    },
    authors: [
      { artistId: 'artist-6', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.OIL_PAINTING,
    year: 2023,
    medium: 'Oil on canvas',
    dimensions: {
      height: 80,
      width: 100,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=800&fit=crop', alt: 'Ink Dream No. 5 painting', isPrimary: true, order: 0 },
    ],
    description: 'An abstract composition that evokes the spirit of ink wash painting through the medium of oil. Layers of translucent gray and black suggest mist and water, while gestural marks recall calligraphic brushwork. This piece represents the expansion of CarveEast into contemporary painting while maintaining our focus on Chinese aesthetic principles.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 4200,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '3000-5000',
    isFeatured: true,
    tags: ['Contemporary', 'Oil Painting', 'Abstract', 'Ink-inspired'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // AUCTION LOTS
  {
    id: 'work-10',
    slug: 'dragon-phoenix-seal',
    title: {
      en: 'Dragon Phoenix Seal',
      cn: '龙凤印',
    },
    authors: [
      { artistId: 'artist-1', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2022,
    medium: 'Tianhuang Stone, master grade',
    dimensions: {
      height: 8,
      width: 4,
      depth: 4,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1456094865871-e35451a92e38?w=800&h=800&fit=crop', alt: 'Dragon Phoenix Seal', isPrimary: true, order: 0 },
    ],
    description: 'A masterwork carved from premium Tianhuang stone, featuring intricate dragon and phoenix motifs on the sides. The seal face bears an auspicious inscription suitable for a collector\'s personal mark. This piece represents Wang Mingde\'s highest level of craftsmanship.',
    availability: WorkAvailability.AUCTION,
    auctionId: 'auction-1',
    lotNumber: 1,
    isFeatured: true,
    tags: ['Tianhuang', 'Masterwork', 'Dragon', 'Phoenix', 'Auction'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'work-11',
    slug: 'autumn-mountain-scroll',
    title: {
      en: 'Autumn Mountain Scroll',
      cn: '秋山图卷',
    },
    authors: [
      { artistId: 'artist-4', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.INK_PAINTING,
    year: 2021,
    medium: 'Ink and color on silk, handscroll',
    dimensions: {
      height: 30,
      width: 180,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&h=800&fit=crop', alt: 'Autumn Mountain Scroll', isPrimary: true, order: 0 },
    ],
    description: 'A handscroll depicting an autumn mountain journey, with travelers crossing a bridge and temples nestled in the peaks. The work demonstrates Zhang Shiyuan\'s mastery of the handscroll format, where the narrative unfolds as the viewer unrolls the painting section by section.',
    availability: WorkAvailability.AUCTION,
    auctionId: 'auction-1',
    lotNumber: 2,
    isFeatured: true,
    tags: ['Handscroll', 'Landscape', 'Autumn', 'Narrative', 'Auction'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Zhang Haoran - Seal Engraving
  {
    id: 'work-12',
    slug: 'four-divine-creatures-seal',
    title: {
      en: 'Four Divine Creatures Seal',
      cn: '四灵印',
    },
    authors: [
      { artistId: 'artist-7', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2023,
    medium: 'Qingtian Stone',
    dimensions: {
      height: 6.5,
      width: 3.2,
      depth: 3.2,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop', alt: 'Four Divine Creatures Seal', isPrimary: true, order: 0 },
    ],
    description: 'A magnificent seal featuring the Four Divine Creatures (Azure Dragon, White Tiger, Vermilion Bird, Black Tortoise) carved in relief on the four sides. The seal face bears a powerful inscription in Han Dynasty style. This work showcases Zhang Haoran\'s mastery of both figural and calligraphic carving.',
    culturalContext: 'The Four Divine Creatures are ancient Chinese cosmological symbols representing the four cardinal directions and four seasons. They have been used in Chinese art since the Han Dynasty as protective emblems.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 2800,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '2500-5000',
    isFeatured: true,
    tags: ['Four Creatures', 'Han Style', 'Qingtian Stone', 'Figural Carving'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Li Xuefeng - Ink Painting
  {
    id: 'work-13',
    slug: 'spring-dawn-over-lake',
    title: {
      en: 'Spring Dawn Over Lake',
      cn: '湖上春晓',
    },
    authors: [
      { artistId: 'artist-8', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.INK_PAINTING,
    year: 2022,
    medium: 'Ink and color on paper, hanging scroll',
    dimensions: {
      height: 138,
      width: 68,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop', alt: 'Spring Dawn Over Lake', isPrimary: true, order: 0 },
    ],
    description: 'A large hanging scroll depicting a serene lake scene at dawn. Willows frame the composition while distant mountains emerge from morning mist. A lone fisherman in a small boat provides human scale against the vast landscape. The work demonstrates Li Xuefeng\'s mastery of traditional shanshui composition and ink wash techniques.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 5800,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '5000-10000',
    isFeatured: true,
    tags: ['Shanshui', 'Hanging Scroll', 'Landscape', 'Spring'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Zhao Jianjun - Calligraphy
  {
    id: 'work-14',
    slug: 'heart-sutra-scroll',
    title: {
      en: 'Heart Sutra in Small Standard Script',
      cn: '小楷心经',
    },
    authors: [
      { artistId: 'artist-9', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.CALLIGRAPHY,
    year: 2021,
    medium: 'Ink on gold-flecked paper, handscroll',
    dimensions: {
      height: 28,
      width: 420,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop', alt: 'Heart Sutra Scroll', isPrimary: true, order: 0 },
    ],
    description: 'A complete transcription of the Heart Sutra (Prajnaparamita Hrdaya Sutra) in exquisite small standard script (xiaokai). The 260-character Buddhist text is written with meticulous precision, each character perfectly balanced. This work represents over three months of daily practice and meditation before execution.',
    culturalContext: 'The Heart Sutra is one of the most important Buddhist texts in East Asian Buddhism. Calligraphers have copied it for centuries as both spiritual practice and artistic expression.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 8500,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '5000-10000',
    isFeatured: true,
    tags: ['Heart Sutra', 'Small Standard', 'Buddhist', 'Handscroll'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Huang Mei - Ceramics
  {
    id: 'work-15',
    slug: 'blue-white-teapot-plum-blossom',
    title: {
      en: 'Blue and White Teapot with Plum Blossom',
      cn: '青花梅花茶壶',
    },
    authors: [
      { artistId: 'artist-10', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.INSCRIBED_CERAMICS,
    year: 2023,
    medium: 'Porcelain with underglaze blue decoration',
    dimensions: {
      height: 12,
      width: 18,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1554188248-986b70e163d4?w=800&h=800&fit=crop', alt: 'Blue and White Teapot', isPrimary: true, order: 0 },
    ],
    description: 'A classic Yixing-style teapot executed in Jingdezhen blue and white porcelain. The body is decorated with delicate plum blossoms, symbolizing resilience and perseverance. The spout and handle are ergonomically designed for comfortable pouring. Includes a poem inscribed on the base.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1680,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '1500-3000',
    isFeatured: false,
    tags: ['Blue and White', 'Teapot', 'Plum Blossom', 'Jingdezhen'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Wang Mingde - Seal Engraving (High-end)
  {
    id: 'work-16',
    slug: 'scholarly-retreat-seal',
    title: {
      en: 'Scholarly Retreat Seal',
      cn: '文人雅集印',
    },
    authors: [
      { artistId: 'artist-1', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2023,
    medium: 'Shoushan Stone, furong variety',
    dimensions: {
      height: 7.2,
      width: 3.8,
      depth: 3.8,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=800&h=800&fit=crop', alt: 'Scholarly Retreat Seal', isPrimary: true, order: 0 },
    ],
    description: 'An elegant seal carved from premium Shoushan furong stone, known for its warm coloration and fine grain. The top features a carved chi-dragon knob. The seal inscription reads "Studio of Literary Gathering" and is executed in the refined Yuan Dynasty style.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 3200,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '2500-5000',
    isFeatured: false,
    tags: ['Shoushan Stone', 'Dragon Knob', 'Studio Seal', 'Yuan Style'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Lin Yuqing - Ceramics
  {
    id: 'work-17',
    slug: 'scholar-rock-incense-burner',
    title: {
      en: 'Scholar Rock Incense Burner',
      cn: '赏石香炉',
    },
    authors: [
      { artistId: 'artist-2', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.INSCRIBED_CERAMICS,
    year: 2022,
    medium: 'Zisha clay, unglazed',
    dimensions: {
      height: 15,
      width: 12,
      depth: 10,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop', alt: 'Scholar Rock Incense Burner', isPrimary: true, order: 0 },
    ],
    description: 'An incense burner shaped like a scholar\'s rock (gongshi), with naturalistic perforations and textured surface. The body is inscribed with a Tang Dynasty poem about mountain retreats. The unglazed zisha clay develops a rich patina with use.',
    culturalContext: 'Scholar rocks have been collected by Chinese literati since the Tang Dynasty as objects of contemplation. They represent the beauty of natural forms and the Taoist ideal of wuwei (non-action).',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 2400,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '2000-3500',
    isFeatured: false,
    tags: ['Scholar Rock', 'Incense Burner', 'Zisha', 'Inscribed'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Chen Zhiting - Calligraphy
  {
    id: 'work-18',
    slug: 'dao-de-jing-couplets',
    title: {
      en: 'Dao De Jing Couplets in Cursive Script',
      cn: '道德经草书对联',
    },
    authors: [
      { artistId: 'artist-3', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.CALLIGRAPHY,
    year: 2023,
    medium: 'Ink on paper, pair of hanging scrolls',
    dimensions: {
      height: 180,
      width: 35,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&h=800&fit=crop', alt: 'Dao De Jing Couplets', isPrimary: true, order: 0 },
    ],
    description: 'A pair of hanging scrolls featuring excerpts from the Dao De Jing in expressive cursive script (caoshu). The dynamic brushwork captures the spontaneous energy of the Taoist philosophy. These large-format works are suitable for display in a modern interior.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 4200,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '3500-6000',
    isFeatured: false,
    tags: ['Dao De Jing', 'Cursive Script', 'Couplets', 'Taoist'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Jiang Haoxu - Seal Engraving (Single-Stroke Border Style)
  {
    id: 'work-19',
    slug: 'an-jiao-shan-ren-studio-seal',
    title: {
      en: 'Anjiao Shanren Studio Seal',
      cn: '庵角山人斋馆印',
    },
    authors: [
      { artistId: 'artist-11', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2023,
    medium: 'Qingtian Stone, single-stroke carving',
    dimensions: {
      height: 6.8,
      width: 3.5,
      depth: 3.5,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&h=800&fit=crop', alt: 'Anjiao Shanren Studio Seal', isPrimary: true, order: 0 },
    ],
    description: 'A personal studio seal of the artist, carved in his signature single-stroke style. The four-character inscription "Anjiao Shanren" (Mountain Dweller of An Corner) reflects his artistic identity. The border inscriptions demonstrate his innovative single-stroke regular script technique, developed over three decades of practice.',
    culturalContext: 'Studio seals (斋馆印) are personal seals used by artists and scholars to mark their creative works. They often bear poetic or philosophical names chosen by the artist.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 2800,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '2500-5000',
    isFeatured: true,
    tags: ['Studio Seal', 'Single-Stroke', 'Border Inscription', 'Personal Style'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Jiang Haoxu - Seal Engraving (Educational Work)
  {
    id: 'work-20',
    slug: 'jinshi-seal-studio-founder-seal',
    title: {
      en: 'Jinshi Seal Studio Founder Seal',
      cn: '金石印坊创始人印',
    },
    authors: [
      { artistId: 'artist-11', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2022,
    medium: 'Shoushan Stone',
    dimensions: {
      height: 7.5,
      width: 4,
      depth: 4,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1578749556920-d1e643848e91?w=800&h=800&fit=crop', alt: 'Jinshi Seal Studio Founder Seal', isPrimary: true, order: 0 },
    ],
    description: 'This seal commemorates the founding of Jinshi Seal Studio, which has trained hundreds of students in traditional seal carving. The inscription combines classical Han Dynasty style with contemporary design sensibilities. The border features a lengthy inscription describing the studio\'s educational mission.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 3500,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '2500-5000',
    isFeatured: false,
    tags: ['Founder Seal', 'Educational', 'Han Style', 'Commemorative'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Jiang Haoxu - Seal Engraving (Han Style)
  {
    id: 'work-21',
    slug: 'tranquility-longevity-seal',
    title: {
      en: 'Tranquility and Longevity Seal',
      cn: '静寿印',
    },
    authors: [
      { artistId: 'artist-11', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2021,
    medium: 'Shoushan Furong Stone',
    dimensions: {
      height: 5.2,
      width: 2.8,
      depth: 2.8,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=800&fit=crop', alt: 'Tranquility and Longevity Seal', isPrimary: true, order: 0 },
    ],
    description: 'A two-character seal bearing the auspicious phrase "Tranquility and Longevity" (静寿). The carving demonstrates the artist\'s deep understanding of Han Dynasty seal aesthetics, with bold, squared characters and balanced composition. The stone is a warm-colored Shoushan furong variety.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1800,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '1500-3000',
    isFeatured: false,
    tags: ['Han Style', 'Auspicious Phrase', 'Two-Character Seal', 'Furong Stone'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Jiang Haoxu - Calligraphy (Single-Stroke Regular Script)
  {
    id: 'work-22',
    slug: 'single-stroke-regular-script-couplets',
    title: {
      en: 'Single-Stroke Regular Script Couplets',
      cn: '单刀楷书对联',
    },
    authors: [
      { artistId: 'artist-11', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.CALLIGRAPHY,
    year: 2023,
    medium: 'Ink on paper, pair of hanging scrolls',
    dimensions: {
      height: 138,
      width: 32,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=800&fit=crop', alt: 'Single-Stroke Regular Script Couplets', isPrimary: true, order: 0 },
    ],
    description: 'A pair of calligraphic couplets executed in the artist\'s signature single-stroke regular script style. This technique, which Jiang developed over decades, creates bold, expressive characters using minimal strokes. The text is a classical couplet about scholarly pursuits and artistic dedication.',
    culturalContext: 'Single-stroke calligraphy (单刀楷) is a technique where each stroke is carved or written in one decisive motion, requiring years of practice to master. Jiang Haoxu\'s single-stroke style has been recognized by Founder Type and released as a digital font.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 4200,
      currency: 'USD',
      isNegotiable: true,
    },
    priceRangeId: '3500-6000',
    isFeatured: true,
    tags: ['Single-Stroke', 'Regular Script', 'Couplets', 'Signature Style'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Jiang Haoxu - Seal Engraving (Educational Example)
  {
    id: 'work-23',
    slug: 'student-practice-seal-set',
    title: {
      en: 'Student Practice Seal Set',
      cn: '学生练习印谱',
    },
    authors: [
      { artistId: 'artist-11', role: AuthorRole.PRIMARY, isPrimary: true },
    ],
    discipline: Discipline.SEAL_ENGRAVING,
    year: 2023,
    medium: 'Set of 6 seals, various stones',
    dimensions: {
      height: 4.5,
      width: 2.5,
      depth: 2.5,
      unit: 'cm',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1579787934380-4886a2f5469f?w=800&h=800&fit=crop', alt: 'Student Practice Seal Set', isPrimary: true, order: 0 },
    ],
    description: 'A set of six seals created as teaching examples for Jiang\'s students. Each seal demonstrates a different classical style: Han Dynasty, Yuan Dynasty, Ming-Qing literati style, and contemporary interpretations. This set exemplifies the comprehensive approach of Jinshi Seal Studio\'s curriculum.',
    availability: WorkAvailability.AVAILABLE,
    price: {
      amount: 1200,
      currency: 'USD',
      isNegotiable: false,
    },
    priceRangeId: '500-1500',
    isFeatured: false,
    tags: ['Educational', 'Seal Set', 'Teaching Example', 'Multiple Styles'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================================================
// AUCTIONS
// ============================================================================

export const AUCTIONS: Auction[] = [
  {
    id: 'auction-1',
    slug: 'winter-2023-fine-works',
    title: 'Winter 2023: Fine Works',
    subtitle: 'Selected Masterpieces from CarveEast Artists',
    description: 'Our Winter 2023 auction features exceptional works from our most established artists, including rare masterworks by Wang Mingde and Zhang Shiyuan. These pieces represent the pinnacle of contemporary Chinese craft and painting.',
    status: AuctionStatus.LIVE,
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-02-15T23:59:59Z',
    coverImage: 'https://images.unsplash.com/photo-1615529182904-14819c00239d?w=1200&h=600&fit=crop',
    curator: 'CarveEast Editorial Team',
    curatorialEssay: 'This season\'s auction focuses on the theme of mastery—the moment when technical skill becomes artistic expression. Each work in this collection represents years of disciplined practice transformed into objects of contemplation and beauty.',
    featuredLotIds: ['lot-1', 'lot-2'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'auction-2',
    slug: 'spring-2024-emerging',
    title: 'Spring 2024: Emerging Voices',
    subtitle: 'New Artists Under $2,000',
    description: 'Discover the next generation of Chinese artists with our curated selection of accessible works. Perfect for beginning collectors, these pieces offer exceptional quality at entry-level prices.',
    status: AuctionStatus.UPCOMING,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    coverImage: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=1200&h=600&fit=crop',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'auction-3',
    slug: 'autumn-2024-ink-painting',
    title: 'Autumn 2024: Contemporary Ink',
    subtitle: 'Innovation in Traditional Ink Painting',
    description: 'This special auction focuses on contemporary ink painting, showcasing how modern artists are reinterpreting the thousand-year-old tradition of shanshui (mountain-water) painting. Features works by Li Xuefeng, Zhang Shiyuan, and emerging ink artists.',
    status: AuctionStatus.LIVE,
    startDate: '2024-09-01T00:00:00Z',
    endDate: '2024-09-30T23:59:59Z',
    coverImage: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=1200&h=600&fit=crop',
    curator: 'Dr. Wang Lixia, Independent Curator',
    curatorialEssay: 'Contemporary ink painting stands at a fascinating crossroads. Artists today must honor the weight of tradition while finding their own voice. The works in this auction demonstrate that the ink tradition is not a burden but a living language that continues to evolve.',
    featuredLotIds: ['lot-5', 'lot-6'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'auction-4',
    slug: 'winter-2024-calligraphy-masters',
    title: 'Winter 2024: Masters of Calligraphy',
    subtitle: 'Exceptional Works from Established Calligraphers',
    description: 'A curated selection of calligraphic masterworks spanning all five script types. This auction features pieces by Zhao Jianjun, Chen Zhiting, and other renowned calligraphers, offering collectors a chance to acquire museum-quality works.',
    status: AuctionStatus.UPCOMING,
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-20T23:59:59Z',
    coverImage: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=1200&h=600&fit=crop',
    curator: 'CarveEast Editorial Team',
    curatorialEssay: 'Calligraphy remains the highest art form in Chinese culture. These works represent the pinnacle of contemporary practice, each stroke carrying both the weight of tradition and the spontaneity of the moment.',
    featuredLotIds: ['lot-7'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const AUCTION_LOTS: AuctionLot[] = [
  {
    id: 'lot-1',
    lotNumber: 1,
    workId: 'work-10',
    startingBid: 2500,
    currentBid: 3200,
    bidIncrement: 100,
    reserveMet: true,
    bidCount: 8,
    currency: 'USD',
    estimate: {
      low: 3000,
      high: 4500,
      currency: 'USD',
    },
    status: 'open',
  },
  {
    id: 'lot-2',
    lotNumber: 2,
    workId: 'work-11',
    startingBid: 1800,
    currentBid: 2100,
    bidIncrement: 100,
    reserveMet: true,
    bidCount: 5,
    currency: 'USD',
    estimate: {
      low: 2500,
      high: 3800,
      currency: 'USD',
    },
    status: 'open',
  },
  {
    id: 'lot-3',
    lotNumber: 3,
    workId: 'work-12',
    startingBid: 2000,
    currentBid: 2000,
    bidIncrement: 150,
    reserveMet: false,
    bidCount: 0,
    currency: 'USD',
    estimate: {
      low: 2500,
      high: 3500,
      currency: 'USD',
    },
    status: 'open',
  },
  {
    id: 'lot-4',
    lotNumber: 4,
    workId: 'work-13',
    startingBid: 4000,
    currentBid: 4000,
    bidIncrement: 300,
    reserveMet: false,
    bidCount: 0,
    currency: 'USD',
    estimate: {
      low: 5000,
      high: 7000,
      currency: 'USD',
    },
    status: 'open',
  },
  {
    id: 'lot-5',
    lotNumber: 5,
    workId: 'work-13',
    startingBid: 4500,
    currentBid: 5200,
    bidIncrement: 300,
    reserveMet: true,
    bidCount: 6,
    currency: 'USD',
    estimate: {
      low: 5000,
      high: 7000,
      currency: 'USD',
    },
    status: 'open',
  },
  {
    id: 'lot-6',
    lotNumber: 6,
    workId: 'work-7',
    startingBid: 1000,
    currentBid: 1350,
    bidIncrement: 100,
    reserveMet: true,
    bidCount: 4,
    currency: 'USD',
    estimate: {
      low: 1200,
      high: 1800,
      currency: 'USD',
    },
    status: 'open',
  },
  {
    id: 'lot-7',
    lotNumber: 7,
    workId: 'work-14',
    startingBid: 6000,
    currentBid: 6000,
    bidIncrement: 500,
    reserveMet: false,
    bidCount: 0,
    currency: 'USD',
    estimate: {
      low: 7000,
      high: 10000,
      currency: 'USD',
    },
    status: 'open',
  },
];

// ============================================================================
// STORIES
// ============================================================================

export const STORIES: Story[] = [
  {
    id: 'story-1',
    slug: 'understanding-seal-engraving',
    title: 'Understanding Seal Engraving: A Collector\'s Guide',
    subtitle: 'From Stone Selection to Authentication',
    excerpt: 'Everything you need to know about collecting Chinese seal engravings, from understanding different stone types to evaluating carving quality and provenance.',
    content: [
      { type: 'paragraph', content: 'Seal engraving (篆刻, zhuànkè) is one of China\'s oldest art forms, with a history stretching back over three thousand years. For collectors, understanding this tradition is essential for building a meaningful collection.' },
      { type: 'heading', level: 2, content: 'The Four Treasures of Seal Carving' },
      { type: 'paragraph', content: 'Just as painting has its "four treasures" (brush, ink, paper, inkstone), seal carving has its essential materials: the stone, the knife, the design, and the impression.' },
      { type: 'heading', level: 3, content: 'Stone Types' },
      { type: 'paragraph', content: 'The most prized seal stones come from Shoushan in Fujian province and Qingtian in Zhejiang. Shoushan stones are known for their warm colors and fine texture, while Qingtian stones offer excellent workability and a distinctive waxy luster.' },
      { type: 'image', url: '/images/stories/seal-stones.jpg', alt: 'Various seal stones', caption: 'A selection of seal stones showing the variety of colors and textures' },
      { type: 'heading', level: 2, content: 'Evaluating Quality' },
      { type: 'paragraph', content: 'When evaluating a seal, consider three aspects: the stone quality, the carving technique, and the artistic conception. The best seals excel in all three areas.' },
      { type: 'quote', content: 'A seal should be like a poem—every element essential, nothing superfluous.', attribution: 'Wang Mingde' },
      { type: 'heading', level: 2, content: 'Authentication' },
      { type: 'paragraph', content: 'Provenance is crucial in seal collecting. Look for documentation of the artist\'s signature, exhibition history, and previous ownership. Reputable dealers like CarveEast provide certificates of authenticity with every purchase.' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1615529182904-14819c00239d?w=800&h=600&fit=crop',
    category: StoryCategory.COLLECTING_GUIDE,
    tags: ['Seal Engraving', 'Collecting Guide', 'Authentication', 'Beginner'],
    author: {
      name: 'CarveEast Editorial',
      title: 'Curatorial Team',
    },
    readTime: 12,
    featuredArtistIds: ['artist-1', 'artist-5'],
    isFeatured: true,
    featuredOrder: 1,
    publishedAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'story-2',
    slug: 'lin-yuqing-studio-visit',
    title: 'In the Studio: Lin Yuqing',
    subtitle: 'Where Clay Meets Poetry',
    excerpt: 'A visit to ceramic artist Lin Yuqing\'s studio in Yixing, exploring her process of creating inscribed teaware and her collaborations with poets and calligraphers.',
    content: [
      { type: 'paragraph', content: 'The town of Yixing has been synonymous with fine teaware for over five centuries. Here, in a modest studio lined with shelves of clay pieces at various stages of completion, Lin Yuqing practices her unique art.' },
      { type: 'image', url: '/images/stories/lin-studio-1.jpg', alt: 'Lin Yuqing in her studio', caption: 'Lin Yuqing at her carving station' },
      { type: 'paragraph', content: 'Lin\'s process begins not with clay, but with words. She collects poems, aphorisms, and fragments of classical texts that resonate with her. Only when she has found the right words does she begin to form the vessel that will carry them.' },
      { type: 'heading', level: 2, content: 'Collaboration as Craft' },
      { type: 'paragraph', content: 'Unlike many ceramic artists who inscribe their own work, Lin frequently collaborates with calligraphers. "My training is in clay," she explains. "Their training is in brushwork. Together we create something neither could achieve alone."' },
      { type: 'artist-reference', artistId: 'artist-2' },
      { type: 'paragraph', content: 'Her collaboration with calligrapher Chen Zhiting has produced some of her most celebrated works. The teapot featured in our Winter collection represents their third collaboration.' },
      { type: 'heading', level: 2, content: 'The Firing' },
      { type: 'paragraph', content: 'The final stage is the most uncertain. Yixing clay responds unpredictably to the kiln\'s heat, and the carved inscriptions can be damaged if the temperature fluctuates. Lin fires her pieces in small batches, watching the kiln through the night.' },
      { type: 'quote', content: 'Every firing is a conversation with the elements. Sometimes they cooperate, sometimes they teach you humility.', attribution: 'Lin Yuqing' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1578749556920-d1e643848e91?w=800&h=600&fit=crop',
    category: StoryCategory.STUDIO_VISIT,
    tags: ['Studio Visit', 'Yixing', 'Ceramics', 'Collaboration', 'Female Artist'],
    author: {
      name: 'Mei Chen',
      title: 'Contributing Editor',
    },
    readTime: 8,
    featuredArtistIds: ['artist-2'],
    featuredWorkIds: ['work-3'],
    isFeatured: true,
    featuredOrder: 2,
    publishedAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'story-3',
    slug: 'first-collection-under-500',
    title: 'Start Your Collection: Works Under $500',
    subtitle: 'Entry Points for New Collectors',
    excerpt: 'You don\'t need a fortune to begin collecting Chinese art. Our curators select exceptional works under $500 that offer both artistic merit and value.',
    content: [
      { type: 'paragraph', content: 'The myth that art collecting requires vast wealth persists, but it\'s simply not true—especially in the realm of Chinese craft. Many exceptional artists produce smaller works, studies, and editions that are accessible to beginning collectors.' },
      { type: 'heading', level: 2, content: 'Where to Begin' },
      { type: 'paragraph', content: 'For first-time collectors, we recommend starting with seal engravings or small-format calligraphy. These works are authentic expressions of the artist\'s vision, just in a more intimate scale.' },
      { type: 'heading', level: 3, content: 'Seals Under $500' },
      { type: 'paragraph', content: 'Entry-level seals from established artists typically range from $300-$500. These are often smaller pieces or works in more common stone types, but they carry the same artistic integrity as masterworks.' },
      { type: 'work-reference', workId: 'work-2' },
      { type: 'heading', level: 3, content: 'Calligraphy and Painting' },
      { type: 'paragraph', content: 'Small album leaves and single-character calligraphy pieces offer an affordable entry point. Look for works on paper rather than silk, and pieces that may be studies or sketches rather than finished exhibition works.' },
      { type: 'heading', level: 2, content: 'Building Relationships' },
      { type: 'paragraph', content: 'Perhaps more valuable than any single purchase is the relationship you build with artists and dealers. Follow artists whose work resonates with you. Attend exhibitions. Ask questions. The knowledge you gain will serve your collection for decades.' },
    ],
    coverImage: '/images/stories/entry-collection-cover.jpg',
    category: StoryCategory.COLLECTING_GUIDE,
    tags: ['Collecting Guide', 'Entry Level', 'Under $500', 'Beginner', 'Value'],
    author: {
      name: 'CarveEast Editorial',
      title: 'Curatorial Team',
    },
    readTime: 10,
    isFeatured: true,
    featuredOrder: 3,
    publishedAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    id: 'story-4',
    slug: 'chen-zhiting-interview',
    title: 'Chen Zhiting: Breaking Boundaries',
    subtitle: 'An Interview with the Calligrapher',
    excerpt: 'We speak with Chen Zhiting about his journey from traditional training to contemporary expression, and why calligraphy matters in the digital age.',
    content: [
      { type: 'paragraph', content: 'In a sunlit studio in Hangzhou, Chen Zhiting prepares his ink with the same method used for a thousand years. But what emerges from his brush challenges tradition in unexpected ways.' },
      { type: 'heading', level: 2, content: 'The Path to the Brush' },
      { type: 'paragraph', content: 'Chen began studying calligraphy at age seven, as many Chinese children do. But while others abandoned the practice, he pursued it with increasing intensity through his teenage years and into art school.' },
      { type: 'quote', content: 'I spent ten years learning the rules. I\'ve spent twenty years learning when to break them.', attribution: 'Chen Zhiting' },
      { type: 'heading', level: 2, content: 'Tradition and Innovation' },
      { type: 'paragraph', content: 'Chen\'s work exists in a productive tension between reverence and rebellion. His wild cursive pieces push legibility to its limits, yet they demonstrate deep understanding of the classical tradition they appear to reject.' },
      { type: 'artist-reference', artistId: 'artist-3' },
      { type: 'heading', level: 2, content: 'Calligraphy in the Digital Age' },
      { type: 'paragraph', content: 'Why does hand-written calligraphy matter when we can generate infinite fonts digitally? Chen\'s answer is immediate: "Because it\'s alive. Every stroke records a moment of breath, decision, risk. You can\'t fake that."' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&h=600&fit=crop',
    category: StoryCategory.ARTIST_INTERVIEW,
    tags: ['Artist Interview', 'Calligraphy', 'Contemporary', 'Innovation'],
    author: {
      name: 'David Park',
      title: 'Senior Editor',
    },
    readTime: 15,
    featuredArtistIds: ['artist-3'],
    isFeatured: false,
    publishedAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  // Story 5 - Artist Profile
  {
    id: 'story-5',
    slug: 'zhao-jianjun-master-calligrapher',
    title: 'Master Profile: Zhao Jianjun',
    subtitle: 'Guardian of the Stele Tradition',
    excerpt: 'A profile of master calligrapher Zhao Jianjun, exploring his dedication to Tang Dynasty stele tradition and his role in preserving classical calligraphy.',
    content: [
      { type: 'paragraph', content: 'In the ancient city of Xi\'an, where the great Tang Dynasty once flourished, Zhao Jianjun practices an art form that has remained largely unchanged for over a thousand years. His studio is filled with rubbings of ancient steles, each one a teacher from the past.' },
      { type: 'image', url: '/images/stories/zhao-studio.jpg', alt: 'Zhao Jianjun\'s studio with stele rubbings', caption: 'Zhao Jianjun\'s studio walls are covered with rubbings of Tang Dynasty steles' },
      { type: 'heading', level: 2, content: 'The Five Scripts' },
      { type: 'paragraph', content: 'Zhao is one of the few contemporary calligraphers who has mastered all five script types: seal script (zhuanshu), clerical script (lishu), cursive script (caoshu), running script (xingshu), and standard script (kaishu). Each requires years of dedicated practice.' },
      { type: 'quote', content: 'To learn calligraphy is to learn patience. Each stroke is a lifetime of practice condensed into a moment.', attribution: 'Zhao Jianjun' },
      { type: 'heading', level: 2, content: 'Teaching the Next Generation' },
      { type: 'paragraph', content: 'As a professor at the Xi\'an Academy of Fine Arts, Zhao trains young calligraphers in the classical methods. His students learn not just technique but the philosophy and history behind each stroke.' },
      { type: 'artist-reference', artistId: 'artist-9' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&h=600&fit=crop',
    category: StoryCategory.ARTIST_INTERVIEW,
    tags: ['Artist Profile', 'Calligraphy', 'Master', 'Tang Dynasty', 'Education'],
    author: {
      name: 'Li Wei',
      title: 'Art Historian',
    },
    readTime: 10,
    featuredArtistIds: ['artist-9'],
    isFeatured: true,
    featuredOrder: 4,
    publishedAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  // Story 6 - Cultural Essay
  {
    id: 'story-6',
    slug: 'philosophy-of-ink',
    title: 'The Philosophy of Ink',
    subtitle: 'Understanding Wuwei in Chinese Painting',
    excerpt: 'How Taoist philosophy shapes the practice of ink painting, from brush technique to compositional choices.',
    content: [
      { type: 'paragraph', content: 'The concept of wuwei (无为), often translated as "non-action" or "effortless action," lies at the heart of Chinese ink painting. It describes a state where the artist\'s hand moves without conscious intention, guided by years of practice and deep understanding.' },
      { type: 'heading', level: 2, content: 'The Empty Space' },
      { type: 'paragraph', content: 'In Western painting, the canvas is typically filled. In Chinese ink painting, the empty spaces (liubai, 留白) are as important as the painted areas. These voids are not absences but presences—mist, water, sky, or the infinite.' },
      { type: 'quote', content: 'The void is not empty. It is where the viewer\'s imagination enters the painting.', attribution: 'Li Xuefeng' },
      { type: 'heading', level: 2, content: 'One Stroke, One Thought' },
      { type: 'paragraph', content: 'Unlike oil painting, ink on paper cannot be corrected. Each stroke is final, a record of the artist\'s state of mind at that exact moment. This irreversibility is not a limitation but the essence of the art.' },
      { type: 'image', url: '/images/stories/ink-philosophy.jpg', alt: 'Detail of ink painting showing brushwork', caption: 'Each brushstroke captures a moment of concentrated awareness' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&h=600&fit=crop',
    category: StoryCategory.CURATORIAL_ESSAY,
    tags: ['Philosophy', 'Taoism', 'Ink Painting', 'Aesthetics', 'Wuwei'],
    author: {
      name: 'Dr. Zhang Min',
      title: 'Professor of Chinese Philosophy',
    },
    readTime: 8,
    featuredArtistIds: ['artist-8'],
    featuredWorkIds: ['work-13'],
    isFeatured: false,
    publishedAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Story 7 - Jiang Haoxu Studio Visit
  {
    id: 'story-7',
    slug: 'jiang-haoxu-single-stroke-mastery',
    title: 'The Single-Stroke Master: Jiang Haoxu',
    subtitle: 'Thirty Years of Seal Carving Education',
    excerpt: 'A profile of Jiang Haoxu (Anjiao Shanren), the educator behind Jinshi Seal Studio who has trained hundreds of students and developed a signature single-stroke regular script style now recognized by Founder Type.',
    content: [
      { type: 'paragraph', content: 'In a studio in Nanjing, Jiang Haoxu picks up a carving knife and approaches a piece of Qingtian stone. In thirty years, his hand has never lost its steadiness. Each cut is decisive, each line breathes with the confidence that only comes from decades of daily practice.' },
      { type: 'image', url: '/images/stories/jiang-carving.jpg', alt: 'Jiang Haoxu carving a seal', caption: 'Jiang Haoxu at work in his Nanjing studio' },
      { type: 'heading', level: 2, content: 'The Birth of a Style' },
      { type: 'paragraph', content: 'Jiang\'s signature single-stroke regular script (单刀楷书) style emerged from years of experimentation. "I wanted to find a way to make each stroke carry maximum expression with minimum movement," he explains. The result is a bold, distinctive style that has been recognized by Founder Type and released as a digital font—the "Haoxu Single-Stroke Regular Script" (方正字迹 - 豪旭单刀楷).' },
      { type: 'quote', content: 'The single stroke is not about speed—it is about certainty. When you know exactly what you want to say, you do not hesitate.', attribution: 'Jiang Haoxu' },
      { type: 'heading', level: 2, content: 'Jinshi Seal Studio' },
      { type: 'paragraph', content: 'In 2006, Jiang founded Jinshi Seal Studio (金石印坊) with a mission: to make traditional seal carving accessible to contemporary students. The studio has since trained hundreds of students, from complete beginners to advanced practitioners. Jiang\'s teaching method emphasizes both technical mastery and cultural understanding.' },
      { type: 'artist-reference', artistId: 'artist-11' },
      { type: 'heading', level: 2, content: 'Teaching Philosophy' },
      { type: 'paragraph', content: 'Jiang\'s approach to education is comprehensive. Students learn not just carving technique, but also seal history, inscription reading, and the cultural context that makes seal art meaningful. "Every student I teach carries this tradition forward," he says. "That is my greatest achievement."' },
      { type: 'paragraph', content: 'His book "Single-Stroke Regular Script Border Inscriptions: Techniques and Creation" has become an important reference for seal carving students. Jiang regularly travels across China to conduct lectures and workshops, spreading knowledge of this ancient art form.' },
      { type: 'heading', level: 2, content: 'The Future of Seal Art' },
      { type: 'paragraph', content: 'Despite the challenges of preserving traditional arts in the digital age, Jiang remains optimistic. "Young people are rediscovering the beauty of hand-crafted work. They understand that seal carving offers something that machines cannot—the presence of the human hand, the trace of the artist\'s spirit."' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=600&fit=crop',
    category: StoryCategory.ARTIST_INTERVIEW,
    tags: ['Artist Profile', 'Seal Engraving', 'Education', 'Single-Stroke Style', 'Jinshi Seal Studio'],
    author: {
      name: 'CarveEast Editorial',
      title: 'Curatorial Team',
    },
    readTime: 12,
    featuredArtistIds: ['artist-11'],
    featuredWorkIds: ['work-19', 'work-22'],
    isFeatured: true,
    featuredOrder: 5,
    publishedAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================================================
// COLLECTIONS
// ============================================================================

export const COLLECTIONS: Collection[] = [
  {
    id: 'collection-1',
    slug: 'seal-literati',
    title: 'Seal & Literati',
    subtitle: 'The Scholar\'s Art',
    description: 'Seal engraving has been called "the scholar\'s art"—a practice that combines poetry, calligraphy, and carving into a single expressive form. This collection features works by masters who continue the literati tradition.',
    type: CollectionType.CORE,
    curatorialEssay: 'The literati tradition holds that a complete scholar should excel in four arts: music, chess (strategy), calligraphy, and painting. To these, many added seal carving as a fifth essential skill. A personal seal was not merely a signature tool but a statement of identity and values.',
    heroImage: '/images/collections/seal-literati-hero.jpg',
    workIds: ['work-1', 'work-2', 'work-8'],
    workCount: 3,
    featuredArtistIds: ['artist-1', 'artist-5'],
    isFeatured: true,
    displayOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'collection-2',
    slug: 'first-collecting',
    title: 'First Collecting',
    subtitle: 'Works Under $500',
    description: 'Begin your collecting journey with these accessible works. Each piece represents exceptional value and offers an entry point into the world of Chinese art.',
    type: CollectionType.ENTRY,
    heroImage: '/images/collections/first-collecting-hero.jpg',
    workIds: ['work-2', 'work-4', 'work-6'],
    workCount: 3,
    featuredArtistIds: ['artist-1', 'artist-2', 'artist-3'],
    priceRange: {
      min: 0,
      max: 500,
      currency: 'USD',
    },
    isFeatured: true,
    displayOrder: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'collection-3',
    slug: 'inscribed-ceramics',
    title: 'Inscribed Ceramics',
    subtitle: 'Poetry in Clay',
    description: 'Yixing teaware inscribed with calligraphy represents the perfect union of craft and poetry. These functional artworks transform daily tea drinking into an aesthetic experience.',
    type: CollectionType.CORE,
    curatorialEssay: 'The practice of inscribing ceramics dates back centuries, but it reached its highest expression in Yixing during the Ming dynasty. Today\'s artists continue this tradition, creating works that honor the past while speaking to contemporary sensibilities.',
    heroImage: '/images/collections/ceramics-hero.jpg',
    workIds: ['work-3', 'work-4'],
    workCount: 2,
    featuredArtistIds: ['artist-2'],
    isFeatured: true,
    displayOrder: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'collection-4',
    slug: 'contemporary-ink',
    title: 'Contemporary Ink',
    subtitle: 'Tradition Reimagined',
    description: 'Contemporary artists who honor the ink tradition while pushing its boundaries. From abstract compositions to cross-cultural experiments, these works show ink\'s continued vitality.',
    type: CollectionType.DISCOVERY,
    heroImage: '/images/collections/contemporary-ink-hero.jpg',
    workIds: ['work-5', 'work-7', 'work-9'],
    workCount: 3,
    featuredArtistIds: ['artist-3', 'artist-4', 'artist-6'],
    isFeatured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================================================
// CURATORIAL LINES (for homepage)
// ============================================================================

export const CURATORIAL_LINES: CuratorialLine[] = [
  {
    id: 'line-1',
    slug: 'seal-engraving',
    discipline: Discipline.SEAL_ENGRAVING,
    name: {
      en: 'Seal Engraving',
      cn: '篆刻',
    },
    description: 'The scholar\'s art—where poetry meets stone. Explore master carvers working in classical and contemporary styles.',
    image: '/images/lines/seal-engraving.jpg',
    workCount: 48,
    artistCount: 8,
    isCore: true,
  },
  {
    id: 'line-2',
    slug: 'calligraphy',
    discipline: Discipline.CALLIGRAPHY,
    name: {
      en: 'Calligraphy',
      cn: '书法',
    },
    description: 'The living art of the brush. From classical regular script to wild cursive expression.',
    image: '/images/lines/calligraphy.jpg',
    workCount: 72,
    artistCount: 12,
    isCore: true,
  },
  {
    id: 'line-3',
    slug: 'ink-painting',
    discipline: Discipline.INK_PAINTING,
    name: {
      en: 'Ink Painting',
      cn: '水墨',
    },
    description: 'Landscape, bird-and-flower, and abstract works in the literati tradition.',
    image: '/images/lines/ink-painting.jpg',
    workCount: 56,
    artistCount: 10,
    isCore: true,
  },
  {
    id: 'line-4',
    slug: 'inscribed-ceramics',
    discipline: Discipline.INSCRIBED_CERAMICS,
    name: {
      en: 'Inscribed Ceramics',
      cn: '刻铭陶瓷',
    },
    description: 'Yixing teaware and ceramics inscribed with poetry and calligraphy.',
    image: '/images/lines/inscribed-ceramics.jpg',
    workCount: 34,
    artistCount: 6,
    isCore: true,
  },
  {
    id: 'line-5',
    slug: 'oil-painting',
    discipline: Discipline.OIL_PAINTING,
    name: {
      en: 'Oil Painting',
      cn: '油画',
    },
    description: 'Contemporary Chinese painters exploring new media while honoring traditional aesthetics.',
    image: '/images/lines/oil-painting.jpg',
    workCount: 28,
    artistCount: 5,
    isCore: false,
  },
  {
    id: 'line-6',
    slug: 'printmaking',
    discipline: Discipline.PRINTMAKING,
    name: {
      en: 'Printmaking',
      cn: '版画',
    },
    description: 'Woodblock, etching, and contemporary print techniques from Chinese artists.',
    image: '/images/lines/printmaking.jpg',
    workCount: 18,
    artistCount: 4,
    isCore: false,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getArtistBySlug(slug: string): Artist | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}

export function getArtistById(id: string): Artist | undefined {
  return ARTISTS.find((a) => a.id === id);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export function getWorkById(id: string): Work | undefined {
  return WORKS.find((w) => w.id === id);
}

export function getWorksByArtist(artistId: string): Work[] {
  return WORKS.filter((w) => w.authors.some((a) => a.artistId === artistId));
}

export function getPrimaryAuthor(work: Work): WorkAuthor | undefined {
  return work.authors.find((a) => a.isPrimary);
}

export function getWorkDisplayAuthors(work: Work): string {
  const authors = work.authors
    .map((a) => {
      const artist = getArtistById(a.artistId);
      return artist?.name.en;
    })
    .filter(Boolean);

  if (authors.length === 0) return 'Unknown';
  if (authors.length === 1) return authors[0]!;
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return `${authors[0]} et al.`;
}

export function getWorksByPriceRange(rangeId: string): Work[] {
  return WORKS.filter((w) => w.priceRangeId === rangeId && w.availability === WorkAvailability.AVAILABLE);
}

export function getFeaturedArtists(): Artist[] {
  return ARTISTS.filter((a) => a.isFeatured).sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));
}

export function getFeaturedWorks(): Work[] {
  return WORKS.filter((w) => w.isFeatured);
}

export function getFeaturedStories(): Story[] {
  return STORIES.filter((s) => s.isFeatured).sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));
}

export function getAuctionBySlug(slug: string): Auction | undefined {
  return AUCTIONS.find((a) => a.slug === slug);
}

export function getLotsForAuction(auctionId: string): AuctionLot[] {
  return AUCTION_LOTS.filter((l) => {
    const work = getWorkById(l.workId);
    return work?.auctionId === auctionId;
  });
}

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getWorksForCollection(collectionId: string): Work[] {
  const collection = COLLECTIONS.find((c) => c.id === collectionId);
  if (!collection) return [];
  return WORKS.filter((w) => collection.workIds.includes(w.id));
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPriceRangeLabel(rangeId: string): string {
  const range = PRICE_RANGES.find((r) => r.id === rangeId);
  return range?.labelEn || rangeId;
}

export function getDisciplineLabel(discipline: Discipline): string {
  const labels: Record<Discipline, string> = {
    [Discipline.SEAL_ENGRAVING]: 'Seal Engraving',
    [Discipline.CALLIGRAPHY]: 'Calligraphy',
    [Discipline.INK_PAINTING]: 'Ink Painting',
    [Discipline.INSCRIBED_CERAMICS]: 'Inscribed Ceramics',
    [Discipline.OIL_PAINTING]: 'Oil Painting',
    [Discipline.PRINTMAKING]: 'Printmaking',
    [Discipline.SCULPTURE]: 'Sculpture',
    [Discipline.MIXED_MEDIA]: 'Mixed Media',
  };
  return labels[discipline] || discipline;
}

export function getAuthorRoleLabel(role: AuthorRole): string {
  const labels: Record<AuthorRole, string> = {
    [AuthorRole.PRIMARY]: 'Artist',
    [AuthorRole.POTTERY]: 'Pottery',
    [AuthorRole.CARVING]: 'Carving',
    [AuthorRole.CALLIGRAPHY]: 'Calligraphy',
    [AuthorRole.INSCRIPTION]: 'Inscription',
    [AuthorRole.FIRING]: 'Firing',
    [AuthorRole.DESIGN]: 'Design',
    [AuthorRole.COLLABORATION]: 'Collaboration',
  };
  return labels[role] || role;
}
