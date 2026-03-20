# -*- coding: utf-8 -*-
"""
阿里云 OSS 视频上传脚本 (使用官方 SDK)
"""
import os
import sys
import json
import urllib.parse
from pathlib import Path
import time

sys.stdout.reconfigure(encoding='utf-8')

# 导入 OSS SDK
import oss2

# OSS 配置 (从环境变量读取)
OSS_CONFIG = {
    "access_key_id": os.environ.get("OSS_ACCESS_KEY_ID", ""),
    "access_key_secret": os.environ.get("OSS_ACCESS_KEY_SECRET", ""),
    "bucket": os.environ.get("OSS_BUCKET", "vertax"),
    "region": os.environ.get("OSS_REGION", "oss-cn-hangzhou"),
}

# 验证配置
if not OSS_CONFIG["access_key_id"] or not OSS_CONFIG["access_key_secret"]:
    print("错误: 请设置环境变量 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET")
    print("示例: export OSS_ACCESS_KEY_ID=your_access_key_id")
    sys.exit(1)

# 认证
auth = oss2.Auth(OSS_CONFIG["access_key_id"], OSS_CONFIG["access_key_secret"])
# 注意：endpoint 不需要包含 bucket 名称，SDK 会自动添加
bucket = oss2.Bucket(auth, "https://oss-cn-hangzhou.aliyuncs.com", OSS_CONFIG["bucket"])

# 上传源目录
SOURCE_DIR = Path("D:/文化出海/优化输出")

# 课程映射
COURSE_MAPPING = {
    "001_篆刻入门六原则": {"course": "beginner-essentials", "lesson": "1"},
    "002_边款单刀楷书": {"course": "side-inscription-mastery", "lesson": "1"},
    "003_边款与印面关系": {"course": "side-inscription-mastery", "lesson": "2"},
    "004_单刀楷书教程第一集": {"course": "side-inscription-mastery", "lesson": "3"},
    "005_刀背力量运用": {"course": "knife-techniques-advanced", "lesson": "1"},
    "006_临汉印放大": {"course": "beginner-essentials", "lesson": "2"},
    "007_字典使用": {"course": "beginner-essentials", "lesson": "3"},
    "008_学王福庵": {"course": "beginner-essentials", "lesson": "4"},
    "009_模仿性创作": {"course": "knife-techniques-advanced", "lesson": "2"},
    "010_青田石处理": {"course": "knife-techniques-advanced", "lesson": "3"},
    "011_临摹当创作": {"course": "beginner-essentials", "lesson": "5"},
    "012_印石鉴别": {"course": "live-highlights", "lesson": "1"},
}

def upload_file(local_path, oss_key):
    """上传文件到 OSS"""
    try:
        # 确定 content type
        ext = os.path.splitext(local_path)[1].lower()
        content_type = {
            '.mp4': 'video/mp4',
            '.gif': 'image/gif',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
        }.get(ext, 'application/octet-stream')

        # 创建 headers
        headers = {'Content-Type': content_type}

        # 上传
        result = bucket.put_object(oss_key, open(local_path, 'rb'), headers=headers)

        if result.status == 200:
            print(f"  [OK] {oss_key}")
            return True
        else:
            print(f"  [FAIL] Status {result.status}: {oss_key}")
            return False

    except oss2.exceptions.RequestError as e:
        print(f"  [ERROR] RequestError: {e}")
        return False
    except Exception as e:
        print(f"  [ERROR] {type(e).__name__}: {e}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("OSS Video Upload Script (SDK Version)")
    print("=" * 60)
    print(f"Source: {SOURCE_DIR}")
    print(f"Bucket: {OSS_CONFIG['bucket']}")
    print()

    # 统计
    total_files = 0
    uploaded_files = 0
    failed_files = 0

    # 视频数据库
    video_db = {}

    # 遍历源目录
    for video_dir in sorted(SOURCE_DIR.iterdir()):
        if not video_dir.is_dir():
            continue

        video_name = video_dir.name
        mapping = COURSE_MAPPING.get(video_name, {})
        course = mapping.get("course", "uncategorized")
        lesson = mapping.get("lesson", "0")

        print(f"\n{video_name}")
        print(f"  Course: {course}, Lesson: {lesson}")

        # 查找该目录下的文件
        mp4_files = list(video_dir.glob("*.mp4"))
        gif_files = list(video_dir.glob("*.gif"))
        jpg_files = list(video_dir.glob("*.jpg"))

        # 处理 MP4 视频
        for mp4_path in mp4_files:
            oss_key = f"courses/videos/{course}/{video_name}.mp4"
            total_files += 1
            print(f"  Uploading: {mp4_path.name}")

            if upload_file(mp4_path, oss_key):
                uploaded_files += 1
                size_mb = os.path.getsize(mp4_path) / 1024 / 1024
                video_url = f"https://{OSS_CONFIG['bucket']}.{OSS_CONFIG['region']}.aliyuncs.com/{urllib.parse.quote(oss_key)}"

                if course not in video_db:
                    video_db[course] = []

                video_info = {
                    "name": video_name,
                    "lesson": lesson,
                    "url": video_url,
                    "size_mb": round(size_mb, 2),
                    "oss_key": oss_key,
                }

                # 查找对应的 GIF
                gif_name = mp4_path.stem + ".gif"
                gif_path = video_dir / gif_name
                if gif_path.exists():
                    gif_key = f"courses/gifs/{course}/{gif_name}"
                    video_info["gif_url"] = f"https://{OSS_CONFIG['bucket']}.{OSS_CONFIG['region']}.aliyuncs.com/{urllib.parse.quote(gif_key)}"
                    video_info["gif_key"] = gif_key

                # 上传缩略图 (第一帧)
                if jpg_files:
                    thumb_path = jpg_files[0]
                    thumb_key = f"courses/thumbnails/{course}/{video_name}_thumb.jpg"
                    print(f"  Uploading: {thumb_path.name}")
                    if upload_file(thumb_path, thumb_key):
                        uploaded_files += 1
                        total_files += 1
                        video_info["thumbnail_url"] = f"https://{OSS_CONFIG['bucket']}.{OSS_CONFIG['region']}.aliyuncs.com/{urllib.parse.quote(thumb_key)}"

                video_db[course].append(video_info)

                # 同时上传 GIF
                if gif_path.exists():
                    print(f"  Uploading: {gif_name}")
                    if upload_file(gif_path, gif_key):
                        uploaded_files += 1
                        total_files += 1
            else:
                failed_files += 1

            # 限速
            time.sleep(0.3)

    # 保存视频数据库
    db_path = SOURCE_DIR / "video_database.json"
    with open(db_path, 'w', encoding='utf-8') as f:
        json.dump(video_db, f, ensure_ascii=False, indent=2)
    print(f"\n[DB] Video database saved to: {db_path}")

    # 总结
    print("\n" + "=" * 60)
    print("UPLOAD COMPLETE")
    print("=" * 60)
    print(f"Total files: {total_files}")
    print(f"Uploaded: {uploaded_files}")
    print(f"Failed: {failed_files}")

    if uploaded_files > 0:
        print("\nVideo URLs:")
        for course, videos in video_db.items():
            print(f"\n  [{course}]")
            for v in videos:
                print(f"    - {v['name']}: {v['url']}")

    print("\nNext steps:")
    print("1. Copy video URLs to src/lib/course-videos.ts")
    print("2. Deploy website to Vercel")
    print("3. Test video playback")

if __name__ == "__main__":
    main()
