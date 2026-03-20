/**
 * 篆刻作品数据管理
 * Artwork Data Management for Seal Carving
 */

export interface SealCarvingWork {
  // Basic Info
  id: string;
  slug: string;
  title: string;
  titleCn?: string;
  artistId?: string;
  artistName: string;
  year: number;

  // Artwork Details
  medium: string; // 石料材质: 青田石, 寿山石, 昌化石, 巴林石, 印度红等
  stoneColor?: string; // 石料颜色: 白色, 黄色, 红色, 青色, 灰色等
  dimensions: string; // 尺寸: 2.5x2.5x5.0cm
  weight?: string; // 重量
  carvingStyle?: string; // 篆刻风格: 黟山派, 浙派, 皖派, 京派等

  // Seal Info
  sealStyle?: string; // 印风: 工整一路, 写意一路, 巨印, 细朱等
  scriptType?: string; // 字体: 篆书, 隶书, 楷书等
  characterCount?: number; // 字数
  layout?: string; // 章法: 回文, 满白, 粗文, 细文等

  // Price & Availability
  price?: number;
  currency: string;
  availability: 'available' | 'sold' | 'reserved' | 'in_auction' | 'not_for_sale';
  certification?: string; // 鉴定证书
  provenance?: string; // 流传经历

  // Images
  images: ArtworkImage[];

  // Description
  description?: string;
  descriptionCn?: string;

  // SEO
  tags?: string[];
  isPublished: boolean;
  featured?: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface ArtworkImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  captionCn?: string;
  isPrimary: boolean;
  sortOrder: number;
}

// 预定义选项
export const STONE_MATERIALS = [
  { value: 'qingtian', label: '青田石', labelEn: 'Qingtian Stone' },
  { value: 'shoushan', label: '寿山石', labelEn: 'Shoushan Stone' },
  { value: 'changhua', label: '昌化石', labelEn: 'Changhua Stone' },
  { value: 'balin', label: '巴林石', labelEn: 'Balin Stone' },
  { value: 'india_red', label: '印度红', labelEn: 'India Red' },
  { value: 'laizhou', label: '莱州玉', labelEn: 'Laizhou Jade' },
  { value: 'hetian', label: '和田玉', labelEn: 'Hetian Jade' },
  { value: 'jade', label: '翡翠', labelEn: 'Jadeite' },
  { value: 'other', label: '其他', labelEn: 'Other' },
] as const;

export const CARVING_STYLES = [
  { value: 'yishan', label: '黟山派', labelEn: 'Yishan School' },
  { value: 'zhe', label: '浙派', labelEn: 'Zhe School' },
  { value: 'wan', label: '皖派', labelEn: 'Wan School' },
  { value: 'jing', label: '京派', labelEn: 'Jing School' },
  { value: 'min', label: '闽派', labelEn: 'Min School' },
  { value: 'lu', label: '鲁派', labelEn: 'Lu School' },
  { value: 'traditional', label: '传统一路', labelEn: 'Traditional' },
  { value: 'contemporary', label: '当代一路', labelEn: 'Contemporary' },
] as const;

export const SEAL_LAYOUTS = [
  { value: 'huiwen', label: '回文', labelEn: 'Circular Layout' },
  { value: 'manbai', label: '满白', labelEn: 'Solid Layout' },
  { value: 'cuwen', label: '粗文', labelEn: 'Bold Layout' },
  { value: 'xiwen', label: '细文', labelEn: 'Fine Layout' },
  { value: 'chouhe', label: '丑荷', labelEn: 'Chouhe' },
  { value: 'free', label: '自由章法', labelEn: 'Free Layout' },
] as const;

export const AVAILABILITY_LABELS = {
  'available': { label: '可售', labelEn: 'Available', color: 'green' },
  'sold': { label: '已售', labelEn: 'Sold', color: 'red' },
  'reserved': { label: '预留', labelEn: 'Reserved', color: 'yellow' },
  'in_auction': { label: '拍卖中', labelEn: 'In Auction', color: 'blue' },
  'not_for_sale': { label: '非卖品', labelEn: 'Not For Sale', color: 'gray' },
} as const;

// Helper functions
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDimensions(dimensions: string): string {
  // Parse format like "2.5x2.5x5.0cm" to readable format
  return dimensions.replace(/x/g, ' × ') + 'cm';
}

export function generateWorkSlug(title: string, artistName: string): string {
  const base = `${artistName}-${title}`.toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base;
}

// Create sample works for testing
export function createSampleWorks(): SealCarvingWork[] {
  return [
    {
      id: 'work-001',
      slug: 'jiang-haoxu-yinjingshi',
      title: '金石印',
      titleCn: '金石印',
      artistId: 'artist-jiang-haoxu',
      artistName: '江豪旭',
      year: 2024,
      medium: 'qingtian',
      stoneColor: '青色',
      dimensions: '2.8x2.8x7.2cm',
      weight: '85g',
      carvingStyle: 'yishan',
      sealStyle: '工整',
      scriptType: '篆书',
      characterCount: 2,
      layout: 'huiwen',
      price: 3800,
      currency: 'USD',
      availability: 'available',
      certification: '金石印坊出品',
      images: [
        {
          id: 'img-001',
          url: '/images/works/jiang-haoxu-yinjingshi-1.jpg',
          thumbnailUrl: '/images/works/thumb/jiang-haoxu-yinjingshi-1.jpg',
          caption: '正面全图',
          isPrimary: true,
          sortOrder: 0,
        },
        {
          id: 'img-002',
          url: '/images/works/jiang-haoxu-yinjingshi-2.jpg',
          thumbnailUrl: '/images/works/thumb/jiang-haoxu-yinjingshi-2.jpg',
          caption: '印面特写',
          isPrimary: false,
          sortOrder: 1,
        },
      ],
      description: 'A fine seal carving by Master Jiang Haoxu, featuring the characters 金石 (Gold and Stone).',
      descriptionCn: '金石印坊江豪旭先生篆刻精品，选优质青田封门青，石色青翠，印面平整，字口清晰。',
      tags: ['篆刻', '印章', '青田石', '江豪旭'],
      isPublished: true,
      featured: true,
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
    },
    {
      id: 'work-002',
      slug: 'jiang-haoxu-chengxin',
      title: '澄心',
      titleCn: '澄心',
      artistId: 'artist-jiang-haoxu',
      artistName: '江豪旭',
      year: 2024,
      medium: 'shoushan',
      stoneColor: '黄色',
      dimensions: '3.0x3.0x8.5cm',
      weight: '120g',
      carvingStyle: 'contemporary',
      sealStyle: '写意',
      scriptType: '篆书',
      characterCount: 2,
      layout: 'manbai',
      price: 5200,
      currency: 'USD',
      availability: 'available',
      certification: '金石印坊出品',
      images: [
        {
          id: 'img-003',
          url: '/images/works/jiang-haoxu-chengxin-1.jpg',
          thumbnailUrl: '/images/works/thumb/jiang-haoxu-chengxin-1.jpg',
          caption: '全印展示',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
      description: 'Elegant seal with the meaning of "clarity of heart" - a meditation on inner peace.',
      descriptionCn: '寿山田黄冻石，石质温润如凝脂，篆刻"澄心"二字，取意心灵澄澈，印风典雅。',
      tags: ['篆刻', '印章', '寿山石', '江豪旭', '田黄'],
      isPublished: true,
      featured: true,
      createdAt: '2024-03-14T10:00:00Z',
      updatedAt: '2024-03-14T10:00:00Z',
    },
    {
      id: 'work-003',
      slug: 'jiang-haoxu-yunhui',
      title: '云辉',
      titleCn: '云辉',
      artistId: 'artist-jiang-haoxu',
      artistName: '江豪旭',
      year: 2023,
      medium: 'india_red',
      stoneColor: '红色',
      dimensions: '2.5x2.5x6.0cm',
      weight: '65g',
      carvingStyle: 'traditional',
      sealStyle: '工整',
      scriptType: '篆书',
      characterCount: 2,
      layout: 'xiwen',
      price: 2800,
      currency: 'USD',
      availability: 'sold',
      certification: '金石印坊出品',
      images: [
        {
          id: 'img-004',
          url: '/images/works/jiang-haoxu-yunhui-1.jpg',
          thumbnailUrl: '/images/works/thumb/jiang-haoxu-yunhui-1.jpg',
          caption: '云辉全印',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
      description: 'Classic red stone seal with elegant characters 云辉 (Cloud Radiance).',
      descriptionCn: '印度红石，石色如朱砂，印面工整秀丽，篆刻"云辉"二字，意境悠远。',
      tags: ['篆刻', '印章', '印度红', '江豪旭'],
      isPublished: true,
      featured: false,
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2023-12-01T10:00:00Z',
    },
  ];
}
