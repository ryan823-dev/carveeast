# -*- coding: utf-8 -*-
"""
视频剪辑优化脚本
功能：
1. 提取关键帧作为预览图
2. 生成 GIF 预览
3. 优化视频格式（720p）
4. 批量处理
"""
import os
import sys
import imageio_ffmpeg
import subprocess
import json
from pathlib import Path

# 设置 UTF-8 编码
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# FFmpeg 路径
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FFPROBE = FFMPEG.replace('ffmpeg', 'ffprobe')

# 输出目录
OUTPUT_BASE = Path("D:/文化出海/优化输出")
OUTPUT_BASE.mkdir(exist_ok=True)

# 12 个 Priority 1 视频
VIDEOS = [
    {
        "name": "001_篆刻入门六原则",
        "path": r"D:/文化出海/004 直播答疑切片/012 篆刻初级阶段六个更重要/篆刻初级阶段六个更重要.mp4",
        "duration": 254,
        "start": 30,
        "end": 180
    },
    {
        "name": "002_边款单刀楷书",
        "path": r"D:/文化出海/004 直播答疑切片/008 边款为什么要学单刀楷书/单刀楷书是底层代码.mp4",
        "duration": 65,
        "start": 5,
        "end": 60
    },
    {
        "name": "003_边款与印面关系",
        "path": r"D:/文化出海/004 直播答疑切片/007 刻边款与刻印面能相互滋养否/边款可以促进印面和篆书吗.mp4",
        "duration": 145,
        "start": 10,
        "end": 135
    },
    {
        "name": "004_单刀楷书教程第一集",
        "path": r"D:/文化出海/001 单刀楷书边款刻法教程/001 单刀楷书（一）/第一集.mp4",
        "duration": 388,
        "start": 60,
        "end": 300
    },
    {
        "name": "005_刀背力量运用",
        "path": r"D:/文化出海/003 篆刻刀法教学/003 印面用刀如果用上刀背的力量/用刀.mp4",
        "duration": 166,
        "start": 10,
        "end": 156
    },
    {
        "name": "006_临汉印放大",
        "path": r"D:/文化出海/004 直播答疑切片/006 临汉印要放大吗/4月9日直播片段-临汉印也要放大画吗.mp4",
        "duration": 90,
        "start": 10,
        "end": 85
    },
    {
        "name": "007_字典使用",
        "path": r"D:/文化出海/004 直播答疑切片/011 如何用好一本字典/无码.mp4",
        "duration": 593,
        "start": 30,
        "end": 300
    },
    {
        "name": "008_学王福庵",
        "path": r"D:/文化出海/004 直播答疑切片/003 学王福庵篆刻要注意什么/4月9日直播片段-学王福庵要注意什么.mp4",
        "duration": 256,
        "start": 20,
        "end": 240
    },
    {
        "name": "009_模仿性创作",
        "path": r"D:/文化出海/004 直播答疑切片/009 什么叫模仿性创作/5月11日.mp4",
        "duration": 1255,
        "start": 60,
        "end": 600
    },
    {
        "name": "010_青田石处理",
        "path": r"D:/文化出海/004 直播答疑切片/005 青田石脆下刀崩得厉害怎么办/4月9日直播片段-青田石脆下刀崩得厉害怎么办.mp4",
        "duration": 111,
        "start": 5,
        "end": 106
    },
    {
        "name": "011_临摹当创作",
        "path": r"D:/文化出海/004 直播答疑切片/001 要把临摹当创作/6月3日-第四版.mp4",
        "duration": 133,
        "start": 10,
        "end": 128
    },
    {
        "name": "012_印石鉴别",
        "path": r"D:/文化出海/004 直播答疑切片/010 印石欣赏鉴别/5月15日 (1).mp4",
        "duration": 1878,
        "start": 60,
        "end": 600
    }
]

def extract_frames(video_path, output_dir, num_frames=5):
    """提取关键帧"""
    frames = []
    duration = get_duration(video_path)
    
    if duration <= 0:
        print("  [WARN] Cannot get duration, using first frame")
        timestamps = [1]
    else:
        interval = duration / (num_frames + 1)
        timestamps = [interval * (i + 1) for i in range(num_frames)]
    
    for i, ts in enumerate(timestamps):
        output_path = os.path.join(output_dir, f"frame_{i:02d}.jpg")
        try:
            cmd = [FFMPEG, "-y", "-ss", str(ts), "-i", video_path,
                   "-vframes", "1", "-q:v", "2", "-frames:v", "1", output_path]
            result = subprocess.run(cmd, capture_output=True, text=True,
                                  encoding='utf-8', errors='replace')
            if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
                frames.append(output_path)
                print(f"    Frame {i+1}: {ts:.1f}s -> {output_path}")
        except Exception as e:
            print(f"  [ERROR] Frame {i+1}: {e}")
    
    return frames

def generate_gif(video_path, output_path, duration=3):
    """生成 GIF 预览"""
    try:
        # 提取 3 秒 GIF
        cmd = [
            FFMPEG, "-y",
            "-ss", "10",
            "-i", video_path,
            "-t", str(duration),
            "-vf", "fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
            "-loop", "0",
            output_path
        ]
        result = subprocess.run(cmd, capture_output=True, text=True,
                              encoding='utf-8', errors='replace')
        if os.path.exists(output_path):
            size = os.path.getsize(output_path) / 1024
            print(f"    GIF: {output_path} ({size:.1f} KB)")
            return True
        else:
            print(f"    [WARN] GIF generation failed")
            return False
    except Exception as e:
        print(f"    [ERROR] GIF: {e}")
        return False

def get_duration(video_path):
    """获取视频时长"""
    try:
        cmd = [FFPROBE, "-v", "error", "-show_entries",
               "format=duration", "-of",
               "default=noprint_wrappers=1:nokey=1", video_path]
        result = subprocess.run(cmd, capture_output=True, text=True,
                              encoding='utf-8', errors='replace')
        return float(result.stdout.strip())
    except:
        return 0

def optimize_video(video_path, output_path, start=0, end=None, duration=None):
    """优化视频：720p"""
    try:
        if duration:
            length = duration
        elif end:
            length = end - start
        else:
            length = 600  # 默认 10 分钟
        
        cmd = [
            FFMPEG, "-y",
            "-ss", str(start),
            "-i", video_path,
            "-t", str(length),
            "-vf", "scale='min(1280,iw)':-2",
            "-c:v", "libx264",
            "-preset", "medium",
            "-crf", "23",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            output_path
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True,
                              encoding='utf-8', errors='replace')
        
        if os.path.exists(output_path):
            size = os.path.getsize(output_path) / 1024 / 1024
            print(f"    Optimized: {output_path} ({size:.1f} MB)")
            return True
        else:
            print(f"    [ERROR] Optimization failed")
            print(f"    {result.stderr[:200]}")
            return False
    except Exception as e:
        print(f"    [ERROR] {e}")
        return False

def process_video(video_info):
    """处理单个视频"""
    name = video_info["name"]
    path = video_info["path"]
    
    print(f"\n{'='*60}")
    print(f"Processing: {name}")
    print(f"{'='*60}")
    
    if not os.path.exists(path):
        print(f"[ERROR] File not found: {path}")
        return None
    
    # 创建输出目录
    output_dir = OUTPUT_BASE / name
    output_dir.mkdir(exist_ok=True)
    
    # 1. 提取帧
    print(f"\n[1/3] Extracting frames...")
    frames = extract_frames(path, str(output_dir), num_frames=5)
    
    # 2. 生成 GIF
    print(f"\n[2/3] Generating GIF...")
    gif_path = output_dir / f"{name}.gif"
    generate_gif(path, str(gif_path), duration=3)
    
    # 3. 优化视频
    print(f"\n[3/3] Optimizing video...")
    optimized_path = output_dir / f"{name}_720p.mp4"
    optimize_video(path, str(optimized_path),
                   start=video_info.get("start", 0),
                   duration=min(600, video_info.get("duration", 600)))
    
    # 保存信息
    info = {
        "name": name,
        "original": path,
        "frames": [str(f) for f in frames],
        "gif": str(gif_path),
        "optimized": str(optimized_path),
        "duration": video_info["duration"]
    }
    
    info_path = output_dir / "info.json"
    with open(info_path, 'w', encoding='utf-8') as f:
        json.dump(info, f, ensure_ascii=False, indent=2)
    
    return info

def main():
    """主函数"""
    print("=" * 60)
    print("Video Processing Pipeline")
    print("=" * 60)
    print(f"FFmpeg: {FFMPEG}")
    print(f"Output: {OUTPUT_BASE}")
    print(f"Videos to process: {len(VIDEOS)}")
    
    # 统计
    total_frames = 0
    total_gifs = 0
    total_optimized = 0
    
    # 处理每个视频
    for i, video in enumerate(VIDEOS, 1):
        print(f"\n\n[{i}/{len(VIDEOS)}]")
        result = process_video(video)
        if result:
            total_frames += len(result["frames"])
            if os.path.exists(result["gif"]):
                total_gifs += 1
            if os.path.exists(result["optimized"]):
                total_optimized += 1
    
    # 总结
    print("\n\n" + "=" * 60)
    print("PROCESSING COMPLETE")
    print("=" * 60)
    print(f"Total videos: {len(VIDEOS)}")
    print(f"Frames extracted: {total_frames}")
    print(f"GIFs generated: {total_gifs}")
    print(f"Videos optimized: {total_optimized}")
    print(f"Output directory: {OUTPUT_BASE}")
    print("\nNext steps:")
    print("1. Review extracted frames")
    print("2. Create thumbnails for course pages")
    print("3. Upload optimized videos to Vimeo")
    print("4. Start website integration")

if __name__ == "__main__":
    main()
