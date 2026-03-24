/**
 * 更新江豪旭作品的视频URL（从OSS）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取OSS视频URL数据
const videoUrlsPath = path.join(__dirname, '../docs/jiang-haoxu-video-urls.json');
const worksDataPath = path.join(__dirname, '../docs/jiang-haoxu-works.json');

const videoUrls = JSON.parse(fs.readFileSync(videoUrlsPath, 'utf-8'));
const worksData = JSON.parse(fs.readFileSync(worksDataPath, 'utf-8'));

console.log('=== 更新作品视频URL ===\n');

// 作品名称映射
const nameMapping = {
  '江豪旭印-白文': '江豪旭印',
  '崔子玉座右铭组印': '崔子玉座右铭',
  '曾嵘 松风斋': '松风斋',
};

let updated = 0;

worksData.works.forEach(work => {
  // 查找对应的视频数据
  let videoData = videoUrls[work.titleCn];
  
  // 尝试映射名称
  if (!videoData) {
    const mappedName = nameMapping[work.titleCn];
    if (mappedName) {
      videoData = videoUrls[mappedName];
    }
  }
  
  if (videoData && videoData.videos && videoData.videos.length > 0) {
    work.videos = videoData.videos.map(v => v.url);
    work.videoCovers = videoData.covers ? videoData.covers.map(c => c.url) : [];
    work.hasVideo = true;
    updated++;
    console.log(`✓ ${work.titleCn}: ${videoData.videos.length} 视频`);
  } else {
    work.hasVideo = work.videos && work.videos.length > 0;
  }
});

// 更新统计
worksData.statistics.withVideos = worksData.works.filter(w => w.hasVideo).length;
worksData.statistics.withBoth = worksData.works.filter(w => w.hasImage && w.hasVideo).length;

// 保存更新后的数据
fs.writeFileSync(worksDataPath, JSON.stringify(worksData, null, 2), 'utf-8');

console.log(`\n✅ 更新完成！`);
console.log(`   更新作品: ${updated}`);
console.log(`   有视频: ${worksData.statistics.withVideos}`);
console.log(`   图片+视频: ${worksData.statistics.withBoth}`);