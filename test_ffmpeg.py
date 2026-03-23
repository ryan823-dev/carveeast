# -*- coding: utf-8 -*-
import os
import imageio_ffmpeg
import subprocess

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
video = r"D:/文化出海/004 直播答疑切片/012 篆刻初级阶段六个更重要/篆刻初级阶段六个更重要.mp4"

print("=" * 60)
print("FFmpeg Test")
print("=" * 60)
print("FFmpeg:", FFMPEG)
print("Exists:", os.path.exists(FFMPEG))
print("Video:", os.path.exists(video))
print("Size:", round(os.path.getsize(video) / 1024 / 1024, 2), "MB")

# Get duration
result = subprocess.run([FFMPEG, "-i", video], capture_output=True, text=True)
for line in result.stderr.split("\n"):
    if "Duration:" in line:
        print("\nVideo Duration:", line.strip())
        break

print("\n[OK] FFmpeg is working!")
