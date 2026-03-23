/**
 * 将江豪旭作品导入到数据库
 * 运行: npx ts-node scripts/seed-jiang-works.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// 作品数据
const worksFile = 'docs/jiang-haoxu-works.json';

function loadWorksData() {
  const filePath = path.join(process.cwd(), worksFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

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

async function main() {
  console.log('=== 导入江豪旭作品到数据库 ===\n');

  // 加载数据
  const data = loadWorksData();
  console.log(`找到 ${data.works.length} 个作品\n`);

  // 确保艺术家存在
  const artist = await prisma.artist.upsert({
    where: { slug: 'jiang-haoxu' },
    update: {
      name: '江豪旭',
      nameCn: '江豪旭',
      discipline: 'seal_engraving',
      location: '南京, 江苏',
      bio: data.works[0]?.description || '江豪旭（庵角山人），金石印坊创始人，著名篆刻艺术家和教育家。',
      isPublished: true,
    },
    create: {
      id: 'artist-11',
      slug: 'jiang-haoxu',
      name: '江豪旭',
      nameCn: '江豪旭',
      discipline: 'seal_engraving',
      location: '南京, 江苏',
      bio: '江豪旭（庵角山人），金石印坊创始人，著名篆刻艺术家和教育家。',
      isPublished: true,
    },
  });

  console.log(`✓ 艺术家: ${artist.name}\n`);

  let created = 0;
  let updated = 0;

  // 导入作品
  for (const work of data.works) {
    const slug = `jiang-haoxu-${generateSlug(work.titleCn)}`;

    // 合并所有图片
    const allImages = [...work.images, ...(work.videoCovers || [])];

    try {
      const existing = await prisma.work.findUnique({
        where: { slug },
      });

      if (existing) {
        await prisma.work.update({
          where: { slug },
          data: {
            title: work.titleCn,
            titleCn: work.titleCn,
            artistName: '江豪旭',
            year: work.year,
            medium: work.medium,
            dimensions: work.dimensions,
            price: work.price,
            currency: work.currency,
            description: work.description,
            images: JSON.stringify(allImages),
            isPublished: work.isPublished,
            featured: work.featured,
            tags: JSON.stringify(work.tags),
          },
        });
        updated++;
      } else {
        await prisma.work.create({
          data: {
            id: work.id,
            slug,
            title: work.titleCn,
            titleCn: work.titleCn,
            artistId: artist.id,
            artistName: '江豪旭',
            year: work.year,
            medium: work.medium,
            dimensions: work.dimensions,
            price: work.price,
            currency: work.currency || 'CNY',
            availability: 'available',
            description: work.description,
            images: JSON.stringify(allImages),
            isPublished: work.isPublished,
            featured: work.featured,
            tags: JSON.stringify(work.tags),
          },
        });
        created++;
      }

      // 输出进度
      if ((created + updated) % 10 === 0) {
        console.log(`  处理进度: ${created + updated}/${data.works.length}`);
      }
    } catch (error) {
      console.error(`  错误: ${work.titleCn} - ${error}`);
    }
  }

  console.log(`\n✅ 导入完成!`);
  console.log(`   新建: ${created}`);
  console.log(`   更新: ${updated}`);
  console.log(`   总计: ${created + updated}`);
}

main()
  .catch((e) => {
    console.error('导入失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });