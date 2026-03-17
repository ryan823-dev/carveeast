import re

# 读取文件
with open('src/lib/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 替换所有 /images/works/ 路径为 Unsplash 图片
# 使用不同的 Unsplash 图片 ID 来获得多样性
unsplash_ids = [
    '1610348725531-843dff563e2c',  # 印章/石头
    '1578749556920-d1e643848e91',  # 陶瓷
    '1516961642265-531546e84af2',  # 书法
    '1533038590840-1cde6e668a91',  # 水墨画
    '1463453091185-61582044d556',  # 艺术
    '1556157382-97eda2d62296',  # 工作室
    '1519834785169-98be25ec3f84',  # 艺术品
    '1579787934380-4886a2f5469f',  # 传统艺术
    '1565624491636-5c12a960f929',  # 中国画
    '1536654098498-a9880a292713',  # 艺术品展示
    '1561157340-75f2590dc730',  # 艺术工作室
    '1452860606245-08befc0ff44b',  # 艺术创作
    '1456094865871-e35451a92e38',  # 艺术品
    '1518709766631-a6a7f45921c3',  # 传统工艺
    '1507003211169-0a1dd7228f2d',  # 艺术材料
    '1544005313-94ddf0286df2',  # 艺术作品
    '1500648767791-00dcc994a43e',  # 艺术品
    '1472099645785-5658abf4ff4e',  # 艺术创作
    '1500648767791-00dcc994a43e',  # 艺术品
    '1542596594-649edbc13630',  # 艺术
    '1463453091185-61582044d556',  # 艺术品
    '1554188248-986b70e163d4',  # 艺术
    '1578749556920-d1e643848e91',  # 陶瓷
]

counter = 0

# 匹配 images 数组中的 url 字段
def replace_url(match):
    global counter
    url_type = match.group(1)
    if url_type.startswith('/images/works/'):
        # 从文件名提取作品标识
        work_name = url_type.split('/')[-1].split('.')[0]
        # 使用不同的 Unsplash 图片
        img_id = unsplash_ids[counter % len(unsplash_ids)]
        counter += 1
        return f'https://images.unsplash.com/photo-{img_id}?w=800&h=800&fit=crop'
    return url_type

# 替换所有 url: '...' 的值
content = re.sub(r"url:\s*'([^']+)'", lambda m: f"url: '{replace_url(m)}'", content)

# 写回文件
with open('src/lib/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'已替换 {counter} 个图片路径')
