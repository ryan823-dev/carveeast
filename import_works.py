# -*- coding: utf-8 -*-
"""
篆刻作品批量导入脚本
批量从 JSON/CSV 文件导入作品到数据库
"""
import os
import sys
import json
import csv
import sqlite3
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

# 数据库路径
DB_PATH = Path("d:/qoder/carveeast/prisma/dev.db")

# 作品图片目录
IMAGES_DIR = Path("d:/qoder/carveeast/public/images/works")
THUMB_DIR = Path("d:/qoder/carveeast/public/images/works/thumb")

def slugify(text):
    """生成 URL 友好的 slug"""
    import re
    text = text.lower()
    # 中文转拼音或保留中文
    text = re.sub(r'[^\w\s\u4e00-\u9fa5-]', '', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def generate_id():
    """生成简单的 ID"""
    import random
    import string
    return 'work-' + ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))


def create_works_table():
    """创建 works 表（如不存在）"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS works (
            id TEXT PRIMARY KEY,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            title_cn TEXT,
            artist_id TEXT,
            artist_name TEXT NOT NULL,
            year INTEGER,
            medium TEXT,
            stone_color TEXT,
            dimensions TEXT,
            weight TEXT,
            carving_style TEXT,
            seal_style TEXT,
            script_type TEXT,
            character_count INTEGER,
            layout TEXT,
            price REAL,
            currency TEXT DEFAULT 'USD',
            availability TEXT DEFAULT 'available',
            certification TEXT,
            provenance TEXT,
            images TEXT DEFAULT '[]',
            description TEXT,
            description_cn TEXT,
            tags TEXT DEFAULT '[]',
            is_published INTEGER DEFAULT 0,
            featured INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT
        )
    ''')

    conn.commit()
    return conn


def import_from_json(json_path):
    """从 JSON 文件导入"""
    print(f"\n从 JSON 导入: {json_path}")

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    works = data if isinstance(data, list) else [data]
    return works


def import_from_csv(csv_path):
    """从 CSV 文件导入"""
    print(f"\n从 CSV 导入: {csv_path}")

    works = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            works.append(row)

    return works


def validate_work(work):
    """验证作品数据"""
    # 支持 snake_case 和 camelCase
    title = work.get('title') or work.get('titleCn')
    artist = work.get('artist_name') or work.get('artistName')

    if not title:
        raise ValueError("Missing required field: title")
    if not artist:
        raise ValueError("Missing required field: artist_name")
    return True


def process_images(image_names, work_slug):
    """处理图片，生成图片对象数组"""
    images = []

    for i, img_name in enumerate(image_names):
        if not img_name:
            continue

        # 构建 URL
        url = f"/images/works/{img_name}"
        thumb_url = f"/images/works/thumb/{img_name}"

        images.append({
            "id": f"img-{work_slug}-{i}",
            "url": url,
            "thumbnailUrl": thumb_url,
            "caption": "",
            "isPrimary": i == 0,
            "sortOrder": i
        })

    return images


def import_works(works, conn):
    """导入作品到数据库"""
    cursor = conn.cursor()
    imported = 0
    updated = 0
    errors = 0

    for work_data in works:
        try:
            validate_work(work_data)

            # 提取字段
            title = work_data.get('title')
            artist_name = work_data.get('artist_name') or work_data.get('artistName')

            # 生成 slug
            slug = work_data.get('slug') or slugify(f"{artist_name}-{title}")

            # 处理图片
            images = process_images(work_data.get('images', []), slug)

            # 处理标签
            tags_data = work_data.get('tags', [])
            if isinstance(tags_data, str):
                tags = [t.strip() for t in tags_data.split(',') if t.strip()]
            elif isinstance(tags_data, list):
                tags = tags_data
            else:
                tags = []

            # 准备数据
            now = datetime.utcnow().isoformat()

            work_record = {
                'id': work_data.get('id', generate_id()),
                'slug': slug,
                'title': title,
                'title_cn': work_data.get('title_cn') or work_data.get('titleCn'),
                'artist_id': work_data.get('artist_id') or work_data.get('artistId'),
                'artist_name': artist_name,
                'year': int(work_data['year']) if work_data.get('year') else datetime.now().year,
                'medium': work_data.get('medium', 'other'),
                'stone_color': work_data.get('stone_color') or work_data.get('stoneColor'),
                'dimensions': work_data.get('dimensions'),
                'weight': work_data.get('weight'),
                'carving_style': work_data.get('carving_style') or work_data.get('carvingStyle'),
                'seal_style': work_data.get('seal_style') or work_data.get('sealStyle'),
                'script_type': work_data.get('script_type') or work_data.get('scriptType'),
                'character_count': int(work_data['character_count']) if work_data.get('character_count') else None,
                'layout': work_data.get('layout'),
                'price': float(work_data['price']) if work_data.get('price') else None,
                'currency': work_data.get('currency', 'USD'),
                'availability': work_data.get('availability', 'available'),
                'certification': work_data.get('certification'),
                'provenance': work_data.get('provenance'),
                'images': json.dumps(images, ensure_ascii=False),
                'description': work_data.get('description'),
                'description_cn': work_data.get('description_cn') or work_data.get('descriptionCn'),
                'tags': json.dumps(tags, ensure_ascii=False),
                'is_published': 1 if work_data.get('is_published') in [True, 'true', 'True', 1, '1'] else 0,
                'featured': 1 if work_data.get('featured') in [True, 'true', 'True', 1, '1'] else 0,
                'created_at': now,
                'updated_at': now,
            }

            # 检查是否已存在
            cursor.execute('SELECT id FROM works WHERE slug = ?', (slug,))
            existing = cursor.fetchone()

            if existing:
                # 更新
                set_clause = ', '.join([f"{k} = ?" for k in work_record.keys()])
                values = list(work_record.values()) + [slug]
                cursor.execute(f'UPDATE works SET {set_clause} WHERE slug = ?', values)
                updated += 1
            else:
                # 插入
                columns = ', '.join(work_record.keys())
                placeholders = ', '.join(['?'] * len(work_record))
                cursor.execute(
                    f'INSERT INTO works ({columns}) VALUES ({placeholders})',
                    list(work_record.values())
                )
                imported += 1

            print(f"  ✓ {work_record['title']} ({work_record['artist_name']})")

        except Exception as e:
            print(f"  ✗ Error: {e}")
            errors += 1
            continue

    conn.commit()
    return imported, updated, errors


def export_sample_csv():
    """导出示例 CSV 模板"""
    sample_file = Path("d:/qoder/carveeast/docs/works-import-template.csv")

    headers = [
        'title', 'title_cn', 'artist_name', 'artist_id', 'year',
        'medium', 'stone_color', 'dimensions', 'weight',
        'carving_style', 'seal_style', 'script_type', 'character_count', 'layout',
        'price', 'currency', 'availability',
        'certification', 'provenance',
        'images', 'description', 'description_cn', 'tags',
        'is_published', 'featured'
    ]

    # 示例数据
    sample_data = [
        {
            'title': 'Jin Shi Yin',
            'title_cn': '金石印',
            'artist_name': '江豪旭',
            'artist_id': 'artist-jiang-haoxu',
            'year': '2024',
            'medium': 'qingtian',
            'stone_color': '青色',
            'dimensions': '2.8x2.8x7.2cm',
            'weight': '85g',
            'carving_style': 'yishan',
            'seal_style': '工整',
            'script_type': '篆书',
            'character_count': '2',
            'layout': 'huiwen',
            'price': '3800',
            'currency': 'USD',
            'availability': 'available',
            'certification': '金石印坊出品',
            'provenance': '',
            'images': 'jiang-haoxu-jinshi-1.jpg,jiang-haoxu-jinshi-2.jpg',
            'description': 'A fine seal carving by Master Jiang Haoxu.',
            'description_cn': '金石印坊江豪旭先生篆刻精品，选优质青田封门青。',
            'tags': '篆刻,印章,青田石,江豪旭',
            'is_published': 'true',
            'featured': 'true'
        }
    ]

    with open(sample_file, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(sample_data)

    print(f"\n示例模板已导出: {sample_file}")


def main():
    print("=" * 60)
    print("Seal Carving Works Import Tool")
    print("篆刻作品批量导入工具")
    print("=" * 60)

    # 创建数据库表
    print("\n初始化数据库...")
    conn = create_works_table()
    print("✓ 数据库连接成功")

    # 导出示例模板
    export_sample_csv()

    # 查找导入文件
    import_dir = Path("d:/qoder/carveeast/docs/imports")
    import_dir.mkdir(exist_ok=True)

    json_files = list(import_dir.glob("*.json"))
    csv_files = list(import_dir.glob("*.csv"))

    if not json_files and not csv_files:
        print(f"\n请将导入文件放入: {import_dir}")
        print("支持的格式: .json, .csv")
        print("\n导入示例:")
        print("  python import_works.py")
        print("  python import_works.py my-works.json")
        print("  python import_works.py my-works.csv")
        conn.close()
        return

    # 处理文件
    total_imported = 0
    total_updated = 0
    total_errors = 0

    for file_path in json_files + csv_files:
        try:
            if file_path.suffix == '.json':
                works = import_from_json(file_path)
            else:
                works = import_from_csv(file_path)

            print(f"\n找到 {len(works)} 个作品")
            imported, updated, errors = import_works(works, conn)
            total_imported += imported
            total_updated += updated
            total_errors += errors

        except Exception as e:
            print(f"\n处理文件失败: {file_path}")
            print(f"错误: {e}")
            total_errors += 1

    # 总结
    print("\n" + "=" * 60)
    print("IMPORT COMPLETE")
    print("=" * 60)
    print(f"新导入: {total_imported}")
    print(f"更新: {total_updated}")
    print(f"错误: {total_errors}")

    conn.close()


if __name__ == "__main__":
    main()
