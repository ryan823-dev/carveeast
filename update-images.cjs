const fs = require('fs');

// 读取文件
let content = fs.readFileSync('src/lib/data.ts', 'utf8');

// Unsplash 图片 ID 列表（艺术品相关）
const unsplashIds = [
  '1610348725531-843dff563e2c',  // 印章/石头
  '1578749556920-d1e643848e91',  // 陶瓷
  '1516961642265-531546e84af2',  // 书法卷轴
  '1533038590840-1cde6e668a91',  // 水墨画
  '1463453091185-61582044d556',  // 艺术品
  '1556157382-97eda2d62296',  // 工作室
  '1519834785169-98be25ec3f84',  // 艺术品
  '1579787934380-4886a2f5469f',  // 传统艺术
  '1565624098498-5c12a960f929',  // 中国画
  '1536654098498-a9880a292713',  // 艺术品展示
  '1561157340-75f2590dc730',  // 艺术工作室
  '1452860606245-08befc0ff44b',  // 艺术创作
  '1456094865871-e35451a92e38',  // 艺术品
  '1518709766631-a6a7f45921c3',  // 传统工艺
  '1544005313-94ddf0286df2',  // 艺术作品
  '1500648767791-00dcc994a43e',  // 艺术品
  '1472099645785-5658abf4ff4e',  // 艺术创作
  '1554188248-986b70e163d4',  // 艺术
  '1542596594-649edbc13630',  // 艺术
  '1507003211169-0a1dd7228f2d',  // 艺术材料
  '1516961642265-531546e84af2',  // 书法
  '1533038590840-1cde6e668a91',  // 水墨
  '1578749556920-d1e643848e91',  // 陶瓷
  '1610348725531-843dff563e2c',  // 印章
  '1519834785169-98be25ec3f84',  // 艺术品
  '1579787934380-4886a2f5469f',  // 传统
];

let counter = 0;

// 替换所有 /images/works/ 路径
content = content.replace(/url:\s*'\/images\/works\/[^']+'/g, (match) => {
  const imgId = unsplashIds[counter % unsplashIds.length];
  counter++;
  return `url: 'https://images.unsplash.com/photo-${imgId}?w=800&h=800&fit=crop'`;
});

// 写回文件
fs.writeFileSync('src/lib/data.ts', content, 'utf8');

console.log(`✅ 已替换 ${counter} 个作品图片路径`);
