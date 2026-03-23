#!/usr/bin/env python3
"""
批量分析篆刻教学视频
使用 video-analyze skill 提取关键信息
"""

import os
import sys
import json
import subprocess
from pathlib import Path

FOLDER = 'D:/文化出海'
OUTPUT_FILE = os.path.join(FOLDER, 'video_analysis_results.json')

# Priority 1 视频（根据文件名识别）
PRIORITY_KEYWORDS = [
    '初级', '基础', '入门', '教学', '教程',
    '边款', '刀法', '篆刻',
    '直播', '改印', '评印'
]

def is_priority_video(filename):
    """判断是否是优先分析的视频"""
    return any(kw in filename for kw in PRIORITY_KEYWORDS)

def get_video_files():
    """获取所有视频文件，按优先级排序"""
    videos = []
    for root, dirs, filenames in os.walk(FOLDER):
        for filename in filenames:
            if filename.endswith(('.mp4', '.avi', '.mov', '.mkv')):
                # 跳过正在下载的文件
                if '.baiduyun.p.downloading' in filename:
                    continue
                
                filepath = os.path.join(root, filename)
                size = os.path.getsize(filepath) / (1024*1024)  # MB
                
                # 跳过太小的文件（可能是截图）
                if size < 10:
                    continue
                
                priority = 1 if is_priority_video(filename) else 2
                
                videos.append({
                    'name': filename,
                    'path': filepath,
                    'size_mb': size,
                    'priority': priority
                })
    
    # 按优先级和大小排序
    videos.sort(key=lambda v: (v['priority'], -v['size_mb']))
    
    return videos

def analyze_video(video_path, analysis_prompt):
    """使用 video-analyze skill 分析视频"""
    skill_path = os.path.expanduser('~/.qoder/skills/video-analyze/video_analyze.py')
    
    if not os.path.exists(skill_path):
        print(f'Skill not found: {skill_path}')
        return None
    
    cmd = [
        sys.executable,
        skill_path,
        video_path,
        analysis_prompt
    ]
    
    try:
        print(f'Analyzing: {video_path}')
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 分钟超时
        )
        
        if result.returncode == 0:
            # 尝试解析 JSON 输出
            try:
                return json.loads(result.stdout)
            except:
                return {'raw_output': result.stdout}
        else:
            print(f'Error: {result.stderr}')
            return None
            
    except subprocess.TimeoutExpired:
        print('Timeout!')
        return None
    except Exception as e:
        print(f'Exception: {e}')
        return None

def main():
    print('=== 篆刻教学视频批量分析 ===\n')
    
    videos = get_video_files()
    print(f'Found {len(videos)} videos\n')
    
    results = []
    
    for i, video in enumerate(videos[:10], 1):  # 先分析前 10 个
        print(f'\n[{i}/{len(videos)}] {video["name"]}')
        print(f'Size: {video["size_mb"]:.2f} MB, Priority: {video["priority"]}')
        
        # 分析提示词
        prompt = '分析这个篆刻教学视频的内容，包括：1) 视频中的人物和场景 2) 展示的篆刻技法和步骤 3) 教学内容和要点 4) 视频质量和适用场景 5) 是否适合商业发布'
        
        result = analyze_video(video['path'], prompt)
        
        if result:
            result['video_info'] = video
            results.append(result)
            print(f'✓ Analyzed: {result.get("analysis", "N/A")[:100]}...')
        else:
            print('✗ Failed to analyze')
        
        # 保存中间结果
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f'\n=== 分析完成 ===')
    print(f'Results saved to: {OUTPUT_FILE}')
    print(f'Total analyzed: {len(results)}')

if __name__ == '__main__':
    main()
