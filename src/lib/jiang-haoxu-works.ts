// 江豪旭作品数据
// 自动生成于 2026/3/23

import { Discipline, WorkAvailability } from './types';

export interface JiangHaoxuWork {
  id: string;
  slug: string;
  title: {
    en: string;
    cn: string;
  };
  authors: { artistId: string; role: string; isPrimary: boolean }[];
  discipline: Discipline;
  year: number;
  medium: string;
  dimensions: { height: number; width: number; unit: string };
  images: { url: string; alt: string; isPrimary: boolean; order: number }[];
  videos: { url: string; cover?: string; title?: string }[];
  description: string;
  availability: string;
  price: { amount: number; currency: string };
  isFeatured: boolean;
  tags: string[];
  hasImage: boolean;
  hasVideo: boolean;
  createdAt: string;
  updatedAt: string;
}

export const JIANG_HAOXU_WORKS: JiangHaoxuWork[] = [
  {
    "id": "work-jhx-001",
    "slug": "jiang-haoxu-yi-qie-yin-she-wu-neng-jia-ru",
    "title": {
      "en": "一切印社无能加入",
      "cn": "一切印社无能加入"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/一切印社无能加入/27-1.png",
        "alt": "一切印社无能加入",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/一切印社无能加入/27-2.png",
        "alt": "一切印社无能加入",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/一切印社无能加入/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/一切印社无能加入/2 竖版封面.png",
        "title": "一切印社无能加入 创作视频"
      }
    ],
    "description": "一切印社无能加入，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 3000,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.275Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-002",
    "slug": "jiang-haoxu-he-yao-fu-ming",
    "title": {
      "en": "何要浮名",
      "cn": "何要浮名"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/何要浮名/7-1.png",
        "alt": "何要浮名",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/何要浮名/7-2.png",
        "alt": "何要浮名",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/何要浮名/2月18日 (1)-何要浮名.mp4",
        "cover": "/videos/works/jiang-haoxu/何要浮名/何要浮名.png",
        "title": "何要浮名 创作视频"
      }
    ],
    "description": "何要浮名，语出辛弃疾词句，表达淡泊名利的人生态度。此印刀法利落，布局疏朗有致。",
    "availability": "available",
    "price": {
      "amount": 2800,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-003",
    "slug": "jiang-haoxu-yang-zheng-qi",
    "title": {
      "en": "养正气",
      "cn": "养正气"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/养正气/26.png",
        "alt": "养正气",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/养正气/养正气2.mp4",
        "cover": "/videos/works/jiang-haoxu/养正气/1 横版封面.png",
        "title": "养正气 创作视频"
      }
    ],
    "description": "语出《孟子》\"吾善养吾浩然之气\"，修身励志之作。",
    "availability": "available",
    "price": {
      "amount": 2200,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-004",
    "slug": "jiang-haoxu-qian-he-wan-du",
    "title": {
      "en": "千河晚渡",
      "cn": "千河晚渡"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/千河晚渡/17.png",
        "alt": "千河晚渡",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/千河晚渡/千河晚渡.mp4",
        "cover": "/videos/works/jiang-haoxu/千河晚渡/千河晚渡.png",
        "title": "千河晚渡 创作视频"
      }
    ],
    "description": "诗意印，展现黄河晚渡的意境。",
    "availability": "available",
    "price": {
      "amount": 2600,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-005",
    "slug": "jiang-haoxu-qian-li-zhi-xing-shi-yu-zu-xia",
    "title": {
      "en": "千里之行始于足下",
      "cn": "千里之行始于足下"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/千里之行始于足下/18.png",
        "alt": "千里之行始于足下",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "千里之行始于足下，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-006",
    "slug": "jiang-haoxu-zhi-you-xiang-ru-gu",
    "title": {
      "en": "只有香如故",
      "cn": "只有香如故"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/只有香如故/28.png",
        "alt": "只有香如故",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/只有香如故/20240123 只有香如故.mp4",
        "cover": "/videos/works/jiang-haoxu/只有香如故/只有香如故1.jpg",
        "title": "只有香如故 创作视频"
      }
    ],
    "description": "只有香如故，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 2000,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-007",
    "slug": "jiang-haoxu-ting-yu",
    "title": {
      "en": "听雨",
      "cn": "听雨"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/听雨/24.png",
        "alt": "听雨",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "听雨，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-008",
    "slug": "jiang-haoxu-mo-qu",
    "title": {
      "en": "墨趣",
      "cn": "墨趣"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/墨趣/15.png",
        "alt": "墨趣",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/墨趣/墨趣-视频.mp4",
        "cover": "/videos/works/jiang-haoxu/墨趣/2 竖版封面.png",
        "title": "墨趣 创作视频"
      }
    ],
    "description": "墨趣，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-009",
    "slug": "jiang-haoxu-tian-ming-zhi-wei-xing",
    "title": {
      "en": "天命之谓性",
      "cn": "天命之谓性"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/天命之谓性/23.png",
        "alt": "天命之谓性",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/天命之谓性/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/天命之谓性/2 竖版封面.png",
        "title": "天命之谓性 创作视频"
      }
    ],
    "description": "天命之谓性，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 2500,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-010",
    "slug": "jiang-haoxu-ru-zi-niu",
    "title": {
      "en": "孺子牛",
      "cn": "孺子牛"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/孺子牛/19.png",
        "alt": "孺子牛",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "孺子牛，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": true,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-011",
    "slug": "jiang-haoxu-shan-se-you-wu-zhong",
    "title": {
      "en": "山色有无中",
      "cn": "山色有无中"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/山色有无中/20-2.png",
        "alt": "山色有无中",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/山色有无中/20.png",
        "alt": "山色有无中",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/山色有无中/山色有无中2.mp4",
        "cover": "/videos/works/jiang-haoxu/山色有无中/1 横版封面.png",
        "title": "山色有无中 创作视频"
      }
    ],
    "description": "山色有无中，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 2000,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-012",
    "slug": "jiang-haoxu-cuizi-yu-zuoyou-ming",
    "title": {
      "en": "崔子玉座右铭",
      "cn": "崔子玉座右铭"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/崔子玉座右铭/5-1.png",
        "alt": "崔子玉座右铭",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/崔子玉座右铭/5-2.png",
        "alt": "崔子玉座右铭",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/崔子玉座右铭组印/崔子玉座右铭.mp4",
        "cover": "/videos/works/jiang-haoxu/崔子玉座右铭组印/1 横版封面.png",
        "title": "崔子玉座右铭 创作视频"
      }
    ],
    "description": "以东汉崔瑗《座右铭》为内容，展现书法与篆刻的结合。",
    "availability": "available",
    "price": {
      "amount": 4500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-013",
    "slug": "jiang-haoxu-shi-zhu-xuan",
    "title": {
      "en": "师竹轩",
      "cn": "师竹轩"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/师竹轩/21.png",
        "alt": "师竹轩",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/师竹轩/篆刻三方.mp4",
        "cover": "/videos/works/jiang-haoxu/师竹轩/1 横版封面.png",
        "title": "师竹轩 创作视频"
      }
    ],
    "description": "师竹轩，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1800,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-014",
    "slug": "jiang-haoxu-anjiao-shanren",
    "title": {
      "en": "庵角山人",
      "cn": "庵角山人"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/庵角山人-朱文1/1.png",
        "alt": "庵角山人",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/庵角山人-朱文2/2.png",
        "alt": "庵角山人",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [],
    "description": "艺术家号\"庵角山人\"，此为自用斋馆印。",
    "availability": "available",
    "price": {
      "amount": 2200,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-015",
    "slug": "jiang-haoxu-nian-xu-yi-xiao",
    "title": {
      "en": "捻须一笑",
      "cn": "捻须一笑"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/捻须一笑/16.png",
        "alt": "捻须一笑",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "捻须一笑，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-016",
    "slug": "jiang-haoxu-ming-xin-jian-xing",
    "title": {
      "en": "明心见性",
      "cn": "明心见性"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/明心见性/14.png",
        "alt": "明心见性",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "明心见性，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-017",
    "slug": "jiang-haoxu-ci-xin-guang-ming",
    "title": {
      "en": "此心光明",
      "cn": "此心光明"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/此心光明/4-1.png",
        "alt": "此心光明",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/此心光明/4-2.png",
        "alt": "此心光明",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [],
    "description": "此心光明，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-018",
    "slug": "jiang-haoxu-jiang-shan-ru-ci-duo-jiao",
    "title": {
      "en": "江山如此多娇",
      "cn": "江山如此多娇"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/江山如此多娇/10.png",
        "alt": "江山如此多娇",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "江山如此多娇，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-019",
    "slug": "jiang-haoxu-jiang-haoxu-yin",
    "title": {
      "en": "江豪旭印",
      "cn": "江豪旭印"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/江豪旭印-白文/8.png",
        "alt": "江豪旭印",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/江豪旭印/江豪旭印.mp4",
        "cover": "/videos/works/jiang-haoxu/江豪旭印/1 横版封面.png",
        "title": "江豪旭印 创作视频"
      }
    ],
    "description": "艺术家自用印，白文风格，展现古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 3500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-020",
    "slug": "jiang-haoxu-jiang-lang-cai-wei-jin",
    "title": {
      "en": "江郎才未尽",
      "cn": "江郎才未尽"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/江郎才未尽/9-1.png",
        "alt": "江郎才未尽",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/江郎才未尽/9-2.png",
        "alt": "江郎才未尽",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/江郎才未尽/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/江郎才未尽/2 竖版封面.png",
        "title": "江郎才未尽 创作视频"
      }
    ],
    "description": "江郎才未尽，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 2200,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-021",
    "slug": "jiang-haoxu-mei-chu-xi",
    "title": {
      "en": "没出息",
      "cn": "没出息"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/没出息/12-1.png",
        "alt": "没出息",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/没出息/12-2.png",
        "alt": "没出息",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/没出息/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/没出息/2 竖版封面.png",
        "title": "没出息 创作视频"
      }
    ],
    "description": "没出息，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1800,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-022",
    "slug": "jiang-haoxu-mei-yi-yan-nian",
    "title": {
      "en": "美意延年",
      "cn": "美意延年"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/美意延年/13-1.png",
        "alt": "美意延年",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/美意延年/13-2.png",
        "alt": "美意延年",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [],
    "description": "美意延年，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-023",
    "slug": "jiang-haoxu-jie-tang",
    "title": {
      "en": "芥堂",
      "cn": "芥堂"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/芥堂/11-1.png",
        "alt": "芥堂",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/芥堂/11-2.png",
        "alt": "芥堂",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/芥堂/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/芥堂/2 竖版封面.png",
        "title": "芥堂 创作视频"
      }
    ],
    "description": "芥堂，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 2000,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-024",
    "slug": "jiang-haoxu-shi-hua",
    "title": {
      "en": "蒔花",
      "cn": "蒔花"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/蒔花/22.png",
        "alt": "蒔花",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "蒔花，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-025",
    "slug": "jiang-haoxu-guan-miao-lou",
    "title": {
      "en": "观妙楼",
      "cn": "观妙楼"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/观妙楼/6.png",
        "alt": "观妙楼",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [],
    "description": "观妙楼，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-026",
    "slug": "jiang-haoxu-ba-hu-jiang-jun",
    "title": {
      "en": "跋扈将军",
      "cn": "跋扈将军"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/跋扈将军/3-2.png",
        "alt": "跋扈将军",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/跋扈将军/3.png",
        "alt": "跋扈将军",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [],
    "description": "跋扈将军，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-027",
    "slug": "jiang-haoxu-zhuo-jiu",
    "title": {
      "en": "酌酒",
      "cn": "酌酒"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/酌酒/29-1.png",
        "alt": "酌酒",
        "isPrimary": true,
        "order": 0
      },
      {
        "url": "/images/works/jiang-haoxu/酌酒/29-2.png",
        "alt": "酌酒",
        "isPrimary": false,
        "order": 1
      }
    ],
    "videos": [],
    "description": "酌酒，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-028",
    "slug": "jiang-haoxu-xian-yun-ye-he",
    "title": {
      "en": "闲云野鹤",
      "cn": "闲云野鹤"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [
      {
        "url": "/images/works/jiang-haoxu/闲云野鹤/25.png",
        "alt": "闲云野鹤",
        "isPrimary": true,
        "order": 0
      }
    ],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/闲云野鹤/2月19日 (1)闲云野鹤.mp4",
        "cover": "/videos/works/jiang-haoxu/闲云野鹤/横版封面.jpg",
        "title": "闲云野鹤 创作视频"
      }
    ],
    "description": "四字吉语印，表达超然物外的生活态度。",
    "availability": "available",
    "price": {
      "amount": 2400,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": true,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-029",
    "slug": "jiang-haoxu-人书未老",
    "title": {
      "en": "人书未老",
      "cn": "人书未老"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/人书未老/人书未老.mp4",
        "cover": "/videos/works/jiang-haoxu/人书未老/1 横版封面.png",
        "title": "人书未老 创作视频"
      }
    ],
    "description": "人书未老，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-030",
    "slug": "jiang-haoxu-人间惆怅客",
    "title": {
      "en": "人间惆怅客",
      "cn": "人间惆怅客"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/人间惆怅客/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/人间惆怅客/2 竖版封面.png",
        "title": "人间惆怅客 创作视频"
      }
    ],
    "description": "人间惆怅客，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-031",
    "slug": "jiang-haoxu-出门一笑大江横",
    "title": {
      "en": "出门一笑大江横",
      "cn": "出门一笑大江横"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/出门一笑大江横/3月27日 (2).mp4",
        "cover": "/videos/works/jiang-haoxu/出门一笑大江横/出门一笑大江横.jpg",
        "title": "出门一笑大江横 创作视频"
      },
      {
        "url": "/videos/works/jiang-haoxu/出门一笑大江横/出门一笑大江横.mp4",
        "cover": "/videos/works/jiang-haoxu/出门一笑大江横/出门一笑大江横.jpg",
        "title": "出门一笑大江横 创作视频"
      }
    ],
    "description": "出门一笑大江横，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-032",
    "slug": "jiang-haoxu-刘岳兵印",
    "title": {
      "en": "刘岳兵印",
      "cn": "刘岳兵印"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/刘岳兵印/视频2.mp4",
        "cover": "/videos/works/jiang-haoxu/刘岳兵印/2 竖版封面.png",
        "title": "刘岳兵印 创作视频"
      }
    ],
    "description": "刘岳兵印，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-033",
    "slug": "jiang-haoxu-刻印乞米",
    "title": {
      "en": "刻印乞米",
      "cn": "刻印乞米"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/刻印乞米/刻印乞米.mp4",
        "cover": "/videos/works/jiang-haoxu/刻印乞米/1 横版封面.png",
        "title": "刻印乞米 创作视频"
      }
    ],
    "description": "刻印乞米，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-034",
    "slug": "jiang-haoxu-剑胆琴心",
    "title": {
      "en": "剑胆琴心",
      "cn": "剑胆琴心"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/剑胆琴心/20230123 剑胆琴心.mp4",
        "cover": "/videos/works/jiang-haoxu/剑胆琴心/剑胆琴心.jpg",
        "title": "剑胆琴心 创作视频"
      }
    ],
    "description": "剑胆琴心，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-035",
    "slug": "jiang-haoxu-印从书出",
    "title": {
      "en": "印从书出",
      "cn": "印从书出"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/印从书出/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/印从书出/2 竖版封面.png",
        "title": "印从书出 创作视频"
      }
    ],
    "description": "印从书出，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-036",
    "slug": "jiang-haoxu-印奴",
    "title": {
      "en": "印奴",
      "cn": "印奴"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/印奴/印奴0214.mp4",
        "cover": "/videos/works/jiang-haoxu/印奴/QQ图片20240211090418.jpg",
        "title": "印奴 创作视频"
      }
    ],
    "description": "印奴，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-037",
    "slug": "jiang-haoxu-古欢",
    "title": {
      "en": "古欢",
      "cn": "古欢"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/古欢/古欢.mp4",
        "cover": "/videos/works/jiang-haoxu/古欢/2 竖版封面.png",
        "title": "古欢 创作视频"
      }
    ],
    "description": "古欢，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-038",
    "slug": "jiang-haoxu-史铭",
    "title": {
      "en": "史铭",
      "cn": "史铭"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/史铭/史铭.mp4",
        "cover": "/videos/works/jiang-haoxu/史铭/封面.png",
        "title": "史铭 创作视频"
      }
    ],
    "description": "史铭，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-039",
    "slug": "jiang-haoxu-君子九雅组印",
    "title": {
      "en": "君子九雅组印",
      "cn": "君子九雅组印"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/君子九雅组印/君子九雅组印.mp4",
        "cover": "/videos/works/jiang-haoxu/君子九雅组印/横版封面.jpg",
        "title": "君子九雅组印 创作视频"
      }
    ],
    "description": "君子九雅组印，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-040",
    "slug": "jiang-haoxu-左国臻印",
    "title": {
      "en": "左国臻印",
      "cn": "左国臻印"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/左国臻印/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/左国臻印/2 竖版封面.png",
        "title": "左国臻印 创作视频"
      }
    ],
    "description": "左国臻印，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-041",
    "slug": "jiang-haoxu-平实居",
    "title": {
      "en": "平实居",
      "cn": "平实居"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/平实居/平实居.mp4",
        "cover": "/videos/works/jiang-haoxu/平实居/2 竖版封面.png",
        "title": "平实居 创作视频"
      }
    ],
    "description": "平实居，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-042",
    "slug": "jiang-haoxu-心不贪荣身不辱",
    "title": {
      "en": "心不贪荣身不辱",
      "cn": "心不贪荣身不辱"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [],
    "description": "心不贪荣身不辱，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": false,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-043",
    "slug": "jiang-haoxu-志诚过眼",
    "title": {
      "en": "志诚过眼",
      "cn": "志诚过眼"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/志诚过眼/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/志诚过眼/封面.png",
        "title": "志诚过眼 创作视频"
      }
    ],
    "description": "志诚过眼，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-044",
    "slug": "jiang-haoxu-扫地参禅",
    "title": {
      "en": "扫地参禅",
      "cn": "扫地参禅"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/扫地参禅/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/扫地参禅/2 竖版封面.png",
        "title": "扫地参禅 创作视频"
      }
    ],
    "description": "扫地参禅，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-045",
    "slug": "jiang-haoxu-更上一层楼",
    "title": {
      "en": "更上一层楼",
      "cn": "更上一层楼"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/更上一层楼/2月28日-更上一层楼2.mp4",
        "cover": "/videos/works/jiang-haoxu/更上一层楼/横版封面.png",
        "title": "更上一层楼 创作视频"
      },
      {
        "url": "/videos/works/jiang-haoxu/更上一层楼/更上一层楼 无水印.mp4",
        "cover": "/videos/works/jiang-haoxu/更上一层楼/横版封面.png",
        "title": "更上一层楼 创作视频"
      }
    ],
    "description": "更上一层楼，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-046",
    "slug": "jiang-haoxu-松风斋",
    "title": {
      "en": "松风斋",
      "cn": "松风斋"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/曾嵘 松风斋/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/曾嵘 松风斋/2 竖版封面.png",
        "title": "松风斋 创作视频"
      }
    ],
    "description": "松风斋，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-047",
    "slug": "jiang-haoxu-有恒",
    "title": {
      "en": "有恒",
      "cn": "有恒"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/有恒/有恒 短版.mp4",
        "cover": "/videos/works/jiang-haoxu/有恒/1 横版封面.png",
        "title": "有恒 创作视频"
      },
      {
        "url": "/videos/works/jiang-haoxu/有恒/有恒4.mp4",
        "cover": "/videos/works/jiang-haoxu/有恒/1 横版封面.png",
        "title": "有恒 创作视频"
      }
    ],
    "description": "有恒，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-048",
    "slug": "jiang-haoxu-梅花知己",
    "title": {
      "en": "梅花知己",
      "cn": "梅花知己"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/梅花知己/梅花知己-5.mp4",
        "cover": "/videos/works/jiang-haoxu/梅花知己/2.png",
        "title": "梅花知己 创作视频"
      }
    ],
    "description": "梅花知己，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-049",
    "slug": "jiang-haoxu-永受嘉福-竹根",
    "title": {
      "en": "永受嘉福-竹根",
      "cn": "永受嘉福-竹根"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/永受嘉福-竹根/永受嘉福.mp4",
        "cover": "/videos/works/jiang-haoxu/永受嘉福-竹根/2 竖版封面.png",
        "title": "永受嘉福-竹根 创作视频"
      }
    ],
    "description": "永受嘉福-竹根，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-050",
    "slug": "jiang-haoxu-汤泓",
    "title": {
      "en": "汤泓",
      "cn": "汤泓"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/汤泓/3月13日 (1)(1).mp4",
        "cover": "/videos/works/jiang-haoxu/汤泓/1 横版封面.png",
        "title": "汤泓 创作视频"
      }
    ],
    "description": "汤泓，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-051",
    "slug": "jiang-haoxu-活在当下",
    "title": {
      "en": "活在当下",
      "cn": "活在当下"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/活在当下/视频2.mp4",
        "cover": "/videos/works/jiang-haoxu/活在当下/2 竖版封面.png",
        "title": "活在当下 创作视频"
      }
    ],
    "description": "活在当下，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-052",
    "slug": "jiang-haoxu-浮生半日闲",
    "title": {
      "en": "浮生半日闲",
      "cn": "浮生半日闲"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/浮生半日闲/20240114-浮生半日闲.mp4",
        "cover": "/videos/works/jiang-haoxu/浮生半日闲/浮生半日闲.jpg",
        "title": "浮生半日闲 创作视频"
      },
      {
        "url": "/videos/works/jiang-haoxu/浮生半日闲/浮生半日闲.mp4",
        "cover": "/videos/works/jiang-haoxu/浮生半日闲/浮生半日闲.jpg",
        "title": "浮生半日闲 创作视频"
      }
    ],
    "description": "浮生半日闲，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-053",
    "slug": "jiang-haoxu-王利斌印",
    "title": {
      "en": "王利斌印",
      "cn": "王利斌印"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/王利斌印/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/王利斌印/2 竖版封面.png",
        "title": "王利斌印 创作视频"
      }
    ],
    "description": "王利斌印，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-054",
    "slug": "jiang-haoxu-王娟印信",
    "title": {
      "en": "王娟印信",
      "cn": "王娟印信"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/王娟印信/王娟印信3.mp4",
        "cover": "/videos/works/jiang-haoxu/王娟印信/2 竖版封面.png",
        "title": "王娟印信 创作视频"
      }
    ],
    "description": "王娟印信，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-055",
    "slug": "jiang-haoxu-程秦超印",
    "title": {
      "en": "程秦超印",
      "cn": "程秦超印"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/程秦超印/程秦超印.mp4",
        "cover": "/videos/works/jiang-haoxu/程秦超印/1 横版封面.png",
        "title": "程秦超印 创作视频"
      }
    ],
    "description": "程秦超印，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-056",
    "slug": "jiang-haoxu-紫云居士",
    "title": {
      "en": "紫云居士",
      "cn": "紫云居士"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/紫云居士/4月8日.mp4",
        "cover": "/videos/works/jiang-haoxu/紫云居士/1 横版封面.png",
        "title": "紫云居士 创作视频"
      }
    ],
    "description": "紫云居士，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-057",
    "slug": "jiang-haoxu-花香蝶自来",
    "title": {
      "en": "花香蝶自来",
      "cn": "花香蝶自来"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/花香蝶自来/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/花香蝶自来/2 竖版封面.png",
        "title": "花香蝶自来 创作视频"
      }
    ],
    "description": "花香蝶自来，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-058",
    "slug": "jiang-haoxu-苏海强",
    "title": {
      "en": "苏海强",
      "cn": "苏海强"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/苏海强/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/苏海强/2 竖版封面.png",
        "title": "苏海强 创作视频"
      }
    ],
    "description": "苏海强，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-059",
    "slug": "jiang-haoxu-豩盦",
    "title": {
      "en": "豩盦",
      "cn": "豩盦"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/豩盦/豩盫.mp4",
        "cover": "/videos/works/jiang-haoxu/豩盦/1 横版封面.png",
        "title": "豩盦 创作视频"
      }
    ],
    "description": "豩盦，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-060",
    "slug": "jiang-haoxu-道不远人",
    "title": {
      "en": "道不远人",
      "cn": "道不远人"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/道不远人/道不远人.mp4",
        "cover": "/videos/works/jiang-haoxu/道不远人/2 竖版封面.png",
        "title": "道不远人 创作视频"
      }
    ],
    "description": "道不远人，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-061",
    "slug": "jiang-haoxu-郑志诚",
    "title": {
      "en": "郑志诚",
      "cn": "郑志诚"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/郑志诚/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/郑志诚/封面.png",
        "title": "郑志诚 创作视频"
      }
    ],
    "description": "郑志诚，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-062",
    "slug": "jiang-haoxu-长相思",
    "title": {
      "en": "长相思",
      "cn": "长相思"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/长相思/10月9日.mp4",
        "cover": "/videos/works/jiang-haoxu/长相思/1 横版封面.png",
        "title": "长相思 创作视频"
      }
    ],
    "description": "长相思，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-063",
    "slug": "jiang-haoxu-雪泥鸿爪",
    "title": {
      "en": "雪泥鸿爪",
      "cn": "雪泥鸿爪"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/雪泥鸿爪/雪泥鸿爪.mp4",
        "cover": "/videos/works/jiang-haoxu/雪泥鸿爪/雪泥鸿爪1.jpg",
        "title": "雪泥鸿爪 创作视频"
      }
    ],
    "description": "雪泥鸿爪，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-064",
    "slug": "jiang-haoxu-饮马长城",
    "title": {
      "en": "饮马长城",
      "cn": "饮马长城"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/饮马长城/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/饮马长城/饮马长城1.png",
        "title": "饮马长城 创作视频"
      }
    ],
    "description": "饮马长城，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  },
  {
    "id": "work-jhx-065",
    "slug": "jiang-haoxu-马到成功",
    "title": {
      "en": "马到成功",
      "cn": "马到成功"
    },
    "authors": [
      {
        "artistId": "artist-11",
        "role": "primary",
        "isPrimary": true
      }
    ],
    "discipline": "seal_engraving",
    "year": 2023,
    "medium": "寿山石/青田石篆刻",
    "dimensions": {
      "height": 3,
      "width": 3,
      "unit": "cm"
    },
    "images": [],
    "videos": [
      {
        "url": "/videos/works/jiang-haoxu/马到成功/视频.mp4",
        "cover": "/videos/works/jiang-haoxu/马到成功/2 竖版封面.png",
        "title": "马到成功 创作视频"
      }
    ],
    "description": "马到成功，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。",
    "availability": "available",
    "price": {
      "amount": 1500,
      "currency": "CNY"
    },
    "isFeatured": false,
    "tags": [
      "篆刻",
      "江豪旭",
      "庵角山人",
      "金石印坊"
    ],
    "hasImage": false,
    "hasVideo": true,
    "createdAt": "2026-03-23T08:55:44.276Z",
    "updatedAt": "2026-03-23T08:55:44.276Z"
  }
];

export const JIANG_HAOXU_STATS = {
  "total": 65,
  "withImages": 28,
  "withVideos": 51,
  "withBoth": 15
};
