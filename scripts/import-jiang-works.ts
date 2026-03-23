/**
 * 江豪旭作品导入脚本
 * 将作品图片和视频数据导入到系统
 */

import * as fs from 'fs';
import * as path from 'path';

// 作品数据类型
interface WorkMedia {
  images: string[];
  videos: string[];
  videoCovers: string[];
}

interface WorkData {
  id: string;
  slug: string;
  title: string;
  titleCn: string;
  artistId: string;
  artistName: string;
  year: number;
  medium: string;
  dimensions?: string;
  price?: number;
  currency: string;
  availability: string;
  description: string;
  images: string[];
  videos: string[];
  videoCovers: string[];
  hasImage: boolean;
  hasVideo: boolean;
  isPublished: boolean;
  featured: boolean;
  tags: string[];
}

// 配置
const CONFIG = {
  imageBasePath: '/images/works/jiang-haoxu',
  videoBasePath: '/videos/works/jiang-haoxu',
  imageDir: 'd:/qoder/carveeast/public/images/works/jiang-haoxu',
  videoDir: 'd:/qoder/carveeast/public/videos/works/jiang-haoxu',
  outputFile: 'd:/qoder/carveeast/docs/jiang-haoxu-works.json',
  artistId: 'artist-11',
  artistName: '江豪旭',
};

// 作品名称映射（标准化名称）
const WORK_NAME_MAP: Record<string, string> = {
  '庵角山人-朱文1': '庵角山人',
  '庵角山人-朱文2': '庵角山人',
  '江豪旭印-白文': '江豪旭印',
  '曾嵘 松风斋': '松风斋',
  '崔子玉座右铭组印': '崔子玉座右铭',
};

// 作品描述（可选，部分作品有特殊描述）
const WORK_DESCRIPTIONS: Record<string, string> = {
  '何要浮名': '何要浮名，语出辛弃疾词句，表达淡泊名利的人生态度。此印刀法利落，布局疏朗有致。',
  '江豪旭印': '艺术家自用印，白文风格，展现古朴劲拙的个人风格。',
  '庵角山人': '艺术家号"庵角山人"，此为自用斋馆印。',
  '崔子玉座右铭': '以东汉崔瑗《座右铭》为内容，展现书法与篆刻的结合。',
  '千河晚渡': '诗意印，展现黄河晚渡的意境。',
  '闲云野鹤': '四字吉语印，表达超然物外的生活态度。',
  '养正气': '语出《孟子》"吾善养吾浩然之气"，修身励志之作。',
};

// 作品价格估算（根据复杂度和尺寸）
const PRICE_MAP: Record<string, number> = {
  '何要浮名': 2800,
  '江豪旭印': 3500,
  '庵角山人': 2200,
  '崔子玉座右铭': 4500,
  '千河晚渡': 2600,
  '闲云野鹤': 2400,
  '养正气': 2200,
  '山色有无中': 2000,
  '师竹轩': 1800,
  '芥堂': 2000,
  '墨趣': 1500,
  '天命之谓性': 2500,
  '没出息': 1800,
  '一切印社无能加入': 3000,
  '江郎才未尽': 2200,
  '只有香如故': 2000,
};

// 生成 slug
function generateSlug(name: string): string {
  const pinyinMap: Record<string, string> = {
    '庵角山人': 'anjiao-shanren',
    '何要浮名': 'he-yao-fu-ming',
    '江豪旭印': 'jiang-haoxu-yin',
    '崔子玉座右铭': 'cuizi-yu-zuoyou-ming',
    '千河晚渡': 'qian-he-wan-du',
    '闲云野鹤': 'xian-yun-ye-he',
    '养正气': 'yang-zheng-qi',
    '山色有无中': 'shan-se-you-wu-zhong',
    '师竹轩': 'shi-zhu-xuan',
    '芥堂': 'jie-tang',
    '墨趣': 'mo-qu',
    '天命之谓性': 'tian-ming-zhi-wei-xing',
    '没出息': 'mei-chu-xi',
    '一切印社无能加入': 'yi-qie-yin-she-wu-neng-jia-ru',
    '江郎才未尽': 'jiang-lang-cai-wei-jin',
    '只有香如故': 'zhi-you-xiang-ru-gu',
    '跋扈将军': 'ba-hu-jiang-jun',
    '此心光明': 'ci-xin-guang-ming',
    '观妙楼': 'guan-miao-lou',
    '江山如此多娇': 'jiang-shan-ru-ci-duo-jiao',
    '美意延年': 'mei-yi-yan-nian',
    '明心见性': 'ming-xin-jian-xing',
    '捻须一笑': 'nian-xu-yi-xiao',
    '千里之行始于足下': 'qian-li-zhi-xing-shi-yu-zu-xia',
    '孺子牛': 'ru-zi-niu',
    '蒔花': 'shi-hua',
    '听雨': 'ting-yu',
    '酌酒': 'zhuo-jiu',
  };
  return pinyinMap[name] || name.toLowerCase().replace(/\s+/g, '-');
}

// 扫描目录获取媒体文件
function scanMediaFiles(): Map<string, WorkMedia> {
  const worksMap = new Map<string, WorkMedia>();

  // 扫描图片目录
  if (fs.existsSync(CONFIG.imageDir)) {
    const imageDirs = fs.readdirSync(CONFIG.imageDir);
    for (const dir of imageDirs) {
      const dirPath = path.join(CONFIG.imageDir, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const standardName = WORK_NAME_MAP[dir] || dir;
        const files = fs.readdirSync(dirPath);
        const images = files
          .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
          .map(f => `${CONFIG.imageBasePath}/${dir}/${f}`);

        if (!worksMap.has(standardName)) {
          worksMap.set(standardName, { images: [], videos: [], videoCovers: [] });
        }
        worksMap.get(standardName)!.images.push(...images);
      }
    }
  }

  // 扫描视频目录
  if (fs.existsSync(CONFIG.videoDir)) {
    const videoDirs = fs.readdirSync(CONFIG.videoDir);
    for (const dir of videoDirs) {
      const dirPath = path.join(CONFIG.videoDir, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const standardName = WORK_NAME_MAP[dir] || dir;
        const files = fs.readdirSync(dirPath);
        const videos = files
          .filter(f => /\.(mp4|mov|avi)$/i.test(f))
          .map(f => `${CONFIG.videoBasePath}/${dir}/${f}`);
        const covers = files
          .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
          .map(f => `${CONFIG.videoBasePath}/${dir}/${f}`);

        if (!worksMap.has(standardName)) {
          worksMap.set(standardName, { images: [], videos: [], videoCovers: [] });
        }
        worksMap.get(standardName)!.videos.push(...videos);
        worksMap.get(standardName)!.videoCovers.push(...covers);
      }
    }
  }

  return worksMap;
}

// 生成作品数据
function generateWorksData(worksMap: Map<string, WorkMedia>): WorkData[] {
  const works: WorkData[] = [];
  let index = 1;

  worksMap.forEach((media, name) => {
    const slug = generateSlug(name);
    const basePrice = PRICE_MAP[name] || 1500;

    const work: WorkData = {
      id: `work-jhx-${String(index).padStart(3, '0')}`,
      slug: `jiang-haoxu-${slug}`,
      title: name,
      titleCn: name,
      artistId: CONFIG.artistId,
      artistName: CONFIG.artistName,
      year: 2023,
      medium: '寿山石/青田石篆刻',
      dimensions: '约3×3cm',
      price: basePrice,
      currency: 'CNY',
      availability: 'available',
      description: WORK_DESCRIPTIONS[name] || `${name}，江豪旭（庵角山人）篆刻作品，展现其古朴劲拙的个人风格。`,
      images: media.images,
      videos: media.videos,
      videoCovers: media.videoCovers,
      hasImage: media.images.length > 0,
      hasVideo: media.videos.length > 0,
      isPublished: true,
      featured: index <= 10,
      tags: ['篆刻', '江豪旭', '庵角山人', '金石印坊'],
    };

    works.push(work);
    index++;
  });

  return works;
}

// 主函数
function main() {
  console.log('=== 江豪旭作品导入脚本 ===\n');

  // 扫描媒体文件
  console.log('1. 扫描媒体文件...');
  const worksMap = scanMediaFiles();
  console.log(`   找到 ${worksMap.size} 个作品\n`);

  // 生成作品数据
  console.log('2. 生成作品数据...');
  const works = generateWorksData(worksMap);

  // 统计
  const withImages = works.filter(w => w.hasImage).length;
  const withVideos = works.filter(w => w.hasVideo).length;
  const withBoth = works.filter(w => w.hasImage && w.hasVideo).length;

  console.log(`   - 有图片: ${withImages}`);
  console.log(`   - 有视频: ${withVideos}`);
  console.log(`   - 图片+视频: ${withBoth}\n`);

  // 输出JSON
  console.log('3. 保存数据文件...');
  const output = {
    artist: {
      id: CONFIG.artistId,
      name: CONFIG.artistName,
      slug: 'jiang-haoxu',
    },
    statistics: {
      total: works.length,
      withImages,
      withVideos,
      withBoth,
    },
    works,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`   已保存到: ${CONFIG.outputFile}\n`);

  // 输出预览
  console.log('=== 作品列表预览 ===');
  works.slice(0, 10).forEach((w, i) => {
    const media = [];
    if (w.hasImage) media.push(`📷${w.images.length}`);
    if (w.hasVideo) media.push(`🎬${w.videos.length}`);
    console.log(`${i + 1}. ${w.titleCn} - ¥${w.price} [${media.join(' ')}]`);
  });
  if (works.length > 10) {
    console.log(`... 还有 ${works.length - 10} 个作品`);
  }

  console.log('\n✅ 导入完成！');
}

main();