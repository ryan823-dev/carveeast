// Internationalization for CarveEast
// Supports English and Chinese (Simplified)

export type Locale = 'en' | 'zh';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'zh'];

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      artists: 'Artists',
      works: 'Works',
      auctions: 'Auctions',
      stories: 'Stories',
      about: 'About',
      contact: 'Contact',
      search: 'Search',
      following: 'Following',
      inquiries: 'My Inquiries',
    },

    // Common
    common: {
      loading: 'Loading...',
      readMore: 'Read More',
      viewAll: 'View All',
      learnMore: 'Learn More',
      discover: 'Discover',
      explore: 'Explore',
      follow: 'Follow',
      following: 'Following',
      unfollow: 'Unfollow',
      share: 'Share',
      print: 'Print',
      copy: 'Copy',
      copied: 'Copied',
      save: 'Save',
      saved: 'Saved',
      cancel: 'Cancel',
      submit: 'Submit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      filter: 'Filter',
      sort: 'Sort',
      search: 'Search',
      results: 'Results',
      noResults: 'No results found',
      seeAll: 'See All',
      viewDetails: 'View Details',
      inquire: 'Inquire',
      bid: 'Bid',
      buy: 'Buy',
      sold: 'Sold',
      available: 'Available',
      reserved: 'Reserved',
      auction: 'Auction',
    },

    // Home
    home: {
      hero: {
        title: 'Discover Contemporary Chinese Art',
        subtitle: 'Where tradition meets expression',
        cta: 'Explore Artists',
      },
      featured: {
        artists: 'Featured Artists',
        works: 'Featured Works',
        stories: 'Latest Stories',
      },
      newsletter: {
        title: 'Stay Updated',
        subtitle: 'Get the latest on new works, auctions, and stories',
        placeholder: 'Enter your email',
        button: 'Subscribe',
      },
    },

    // Artists
    artists: {
      title: 'Artists',
      subtitle: 'Discover exceptional Chinese artists',
      disciplines: 'Disciplines',
      location: 'Location',
      yearStarted: 'Started',
      works: 'Works',
      priceRange: 'Price Range',
      followArtist: 'Follow Artist',
      unfollowArtist: 'Unfollow Artist',
      viewProfile: 'View Profile',
      about: 'About',
      statement: 'Artist Statement',
      availableWorks: 'Available Works',
      completeWorks: 'Complete Works',
      whyCollect: 'Why Collect This Artist?',
    },

    // Works
    works: {
      title: 'Works',
      subtitle: 'Browse our curated collection',
      filterBy: 'Filter by',
      discipline: 'Discipline',
      priceRange: 'Price Range',
      availability: 'Availability',
      year: 'Year',
      medium: 'Medium',
      dimensions: 'Dimensions',
      description: 'Description',
      provenance: 'Provenance',
      authenticity: 'Authenticity',
      inquireNow: 'Inquire Now',
      makeOffer: 'Make an Offer',
      relatedWorks: 'Related Works',
    },

    // Auctions
    auctions: {
      title: 'Auctions',
      subtitle: 'Bid on exceptional works',
      current: 'Current Auctions',
      upcoming: 'Upcoming',
      live: 'Live Now',
      ended: 'Ended',
      lots: 'Lots',
      estimate: 'Estimate',
      currentBid: 'Current Bid',
      startingBid: 'Starting Bid',
      bidNow: 'Bid Now',
      register: 'Register to Bid',
      howToBid: 'How to Bid',
      terms: 'Auction Terms',
    },

    // Stories
    stories: {
      title: 'Stories',
      subtitle: 'Insights into Chinese art and culture',
      readTime: 'min read',
      by: 'By',
      category: 'Category',
      tags: 'Tags',
      shareStory: 'Share Story',
      relatedStories: 'Related Stories',
    },

    // Search
    search: {
      title: 'Search',
      placeholder: 'Search artists, works, stories...',
      filters: 'Filters',
      type: 'Type',
      popular: 'Popular Searches',
      try: 'Try',
      checkSpelling: 'Checking your spelling',
      generalKeywords: 'Using more general keywords',
      differentCategory: 'Trying a different category',
    },

    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      success: 'Thank you for your message. We\'ll respond within 24 hours.',
    },

    // Footer
    footer: {
      tagline: 'A curated platform connecting discerning collectors with exceptional Chinese artists.',
      discover: 'Discover',
      learn: 'Learn',
      connect: 'Connect',
      newsletter: 'Newsletter',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },

  zh: {
    // Navigation
    nav: {
      home: '首页',
      artists: '艺术家',
      works: '作品',
      auctions: '拍卖',
      stories: '故事',
      about: '关于',
      contact: '联系',
      search: '搜索',
      following: '关注',
      inquiries: '我的询价',
    },

    // Common
    common: {
      loading: '加载中...',
      readMore: '阅读更多',
      viewAll: '查看全部',
      learnMore: '了解更多',
      discover: '发现',
      explore: '探索',
      follow: '关注',
      following: '已关注',
      unfollow: '取消关注',
      share: '分享',
      print: '打印',
      copy: '复制',
      copied: '已复制',
      save: '收藏',
      saved: '已收藏',
      cancel: '取消',
      submit: '提交',
      close: '关闭',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      filter: '筛选',
      sort: '排序',
      search: '搜索',
      results: '结果',
      noResults: '未找到结果',
      seeAll: '查看全部',
      viewDetails: '查看详情',
      inquire: '询价',
      bid: '出价',
      buy: '购买',
      sold: '已售',
      available: '可售',
      reserved: '预留',
      auction: '拍卖',
    },

    // Home
    home: {
      hero: {
        title: '发现当代中国艺术',
        subtitle: '传统与表达的交汇',
        cta: '探索艺术家',
      },
      featured: {
        artists: '精选艺术家',
        works: '精选作品',
        stories: '最新故事',
      },
      newsletter: {
        title: '保持更新',
        subtitle: '获取新作、拍卖和故事的最新资讯',
        placeholder: '输入您的邮箱',
        button: '订阅',
      },
    },

    // Artists
    artists: {
      title: '艺术家',
      subtitle: '发现杰出的中国艺术家',
      disciplines: '门类',
      location: '所在地',
      yearStarted: '起始年份',
      works: '作品',
      priceRange: '价格区间',
      followArtist: '关注艺术家',
      unfollowArtist: '取消关注',
      viewProfile: '查看资料',
      about: '关于',
      statement: '艺术家陈述',
      availableWorks: '可售作品',
      completeWorks: '全部作品',
      whyCollect: '为何收藏这位艺术家？',
    },

    // Works
    works: {
      title: '作品',
      subtitle: '浏览我们的精选收藏',
      filterBy: '筛选条件',
      discipline: '门类',
      priceRange: '价格区间',
      availability: '可售状态',
      year: '年份',
      medium: '媒介',
      dimensions: '尺寸',
      description: '描述',
      provenance: '来源',
      authenticity: '真伪认证',
      inquireNow: '立即询价',
      makeOffer: '出价',
      relatedWorks: '相关作品',
    },

    // Auctions
    auctions: {
      title: '拍卖',
      subtitle: '竞拍杰出作品',
      current: '当前拍卖',
      upcoming: '即将开始',
      live: '正在进行',
      ended: '已结束',
      lots: '拍品',
      estimate: '估价',
      currentBid: '当前出价',
      startingBid: '起拍价',
      bidNow: '立即出价',
      register: '注册竞拍',
      howToBid: '如何竞拍',
      terms: '拍卖条款',
    },

    // Stories
    stories: {
      title: '故事',
      subtitle: '中国艺术与文化洞察',
      readTime: '分钟阅读',
      by: '作者',
      category: '分类',
      tags: '标签',
      shareStory: '分享故事',
      relatedStories: '相关故事',
    },

    // Search
    search: {
      title: '搜索',
      placeholder: '搜索艺术家、作品、故事...',
      filters: '筛选',
      type: '类型',
      popular: '热门搜索',
      try: '尝试',
      checkSpelling: '检查拼写',
      generalKeywords: '使用更通用的关键词',
      differentCategory: '尝试不同的分类',
    },

    // Contact
    contact: {
      title: '联系我们',
      subtitle: '我们期待您的来信',
      name: '姓名',
      email: '邮箱',
      subject: '主题',
      message: '留言',
      send: '发送消息',
      success: '感谢您的留言。我们将在24小时内回复。',
    },

    // Footer
    footer: {
      tagline: '一个精心策划的平台，将有眼光的收藏家与杰出的中国艺术家联系起来。',
      discover: '发现',
      learn: '学习',
      connect: '联系',
      newsletter: '订阅通讯',
      rights: '版权所有。',
      privacy: '隐私政策',
      terms: '服务条款',
    },
  },
};

export type Translations = typeof translations.en;

export function getTranslation(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}

export function t(key: string, locale: Locale = defaultLocale): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations[defaultLocale];
      for (const fk of keys) {
        if (value && typeof value === 'object' && fk in value) {
          value = value[fk];
        } else {
          return key; // Return key if translation not found
        }
      }
      return typeof value === 'string' ? value : key;
    }
  }

  return typeof value === 'string' ? value : key;
}
