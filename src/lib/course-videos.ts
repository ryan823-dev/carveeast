/**
 * 课程视频数据
 * 视频上传到 OSS 后更新此文件
 */

export interface CourseVideo {
  id: string;
  title: string;
  titleCn: string;
  duration: string;
  videoUrl?: string;
  gifUrl?: string;
  thumbnailUrl?: string;
  description: string;
  descriptionCn: string;
}

export interface CourseVideos {
  courseSlug: string;
  courseName: string;
  videos: CourseVideo[];
}

// 课程视频数据（视频上传后更新 URL）
export const COURSE_VIDEOS: Record<string, CourseVideos> = {
  'beginner-essentials': {
    courseSlug: 'beginner-essentials',
    courseName: 'Seal Carving Beginner Essentials',
    videos: [
      {
        id: '1',
        title: '6 Key Principles for Beginners',
        titleCn: '篆刻入门六原则',
        duration: '4:14',
        description: 'Learn the 6 fundamental principles that guide your seal carving journey.',
        descriptionCn: '学习篆刻学习的六个核心原则，为你的篆刻之路打下坚实基础。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/beginner-essentials/001_篆刻入门六原则.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/beginner-essentials/001_篆刻入门六原则.gif',
      },
      {
        id: '2',
        title: 'Enlarging Han Seals',
        titleCn: '临汉印放大',
        duration: '1:30',
        description: 'Should you enlarge Han dynasty seals when practicing? Master Jiang explains.',
        descriptionCn: '临汉印需要放大吗？江豪旭老师为你解答。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/beginner-essentials/006_临汉印放大.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/beginner-essentials/006_临汉印放大.gif',
      },
      {
        id: '3',
        title: 'Using Dictionary Effectively',
        titleCn: '字典使用技巧',
        duration: '9:53',
        description: 'Master the art of using seal carving dictionaries for character selection.',
        descriptionCn: '掌握使用篆刻字典选字的艺术。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/beginner-essentials/007_字典使用.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/beginner-essentials/007_字典使用.gif',
      },
      {
        id: '4',
        title: 'Learning from Wang Fu-an',
        titleCn: '学王福庵',
        duration: '4:16',
        description: 'What to pay attention to when studying Wang Fu-an style seals.',
        descriptionCn: '学习王福庵风格篆刻时需要注意什么。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/beginner-essentials/008_学王福庵.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/beginner-essentials/008_学王福庵.gif',
      },
      {
        id: '5',
        title: 'Treat Practice as Creation',
        titleCn: '临摹当创作',
        duration: '2:13',
        description: 'The mindset shift that will accelerate your seal carving progress.',
        descriptionCn: '心态转变，让你的篆刻进步更快。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/beginner-essentials/011_临摹当创作.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/beginner-essentials/011_临摹当创作.gif',
      },
    ],
  },
  'side-inscription-mastery': {
    courseSlug: 'side-inscription-mastery',
    courseName: 'Side Inscription Mastery',
    videos: [
      {
        id: '1',
        title: 'Why Single-Blade Regular Script',
        titleCn: '边款为什么要学单刀楷书',
        duration: '1:05',
        description: 'Understand why single-blade regular script is essential for side inscriptions.',
        descriptionCn: '理解为什么单刀楷书是边款的基础。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/side-inscription-mastery/002_边款单刀楷书.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/side-inscription-mastery/002_边款单刀楷书.gif',
      },
      {
        id: '2',
        title: 'Side Inscriptions and Seal Face',
        titleCn: '边款与印面关系',
        duration: '2:25',
        description: 'How side inscriptions can enhance and complement your seal face designs.',
        descriptionCn: '边款如何提升和配合印面设计。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/side-inscription-mastery/003_边款与印面关系.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/side-inscription-mastery/003_边款与印面关系.gif',
      },
      {
        id: '3',
        title: 'Single-Blade Tutorial Part 1',
        titleCn: '单刀楷书教程第一集',
        duration: '6:28',
        description: 'Hands-on tutorial for single-blade regular script carving techniques.',
        descriptionCn: '单刀楷书刻法实操教程第一集。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/side-inscription-mastery/004_单刀楷书教程第一集.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/side-inscription-mastery/004_单刀楷书教程第一集.gif',
      },
    ],
  },
  'knife-techniques-advanced': {
    courseSlug: 'knife-techniques-advanced',
    courseName: 'Advanced Knife Techniques',
    videos: [
      {
        id: '1',
        title: 'Knife Back Pressure',
        titleCn: '刀背力量运用',
        duration: '2:46',
        description: 'Learn to use the back of your knife for unique effects in seal carving.',
        descriptionCn: '学习使用刀背在篆刻中创造独特效果。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/knife-techniques-advanced/005_刀背力量运用.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/knife-techniques-advanced/005_刀背力量运用.gif',
      },
      {
        id: '2',
        title: 'What is Imitative Creation',
        titleCn: '什么叫模仿性创作',
        duration: '9:00',
        description: 'Understanding the concept of imitative creation in seal art.',
        descriptionCn: '理解印刻艺术中的模仿性创作概念。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/knife-techniques-advanced/009_模仿性创作.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/knife-techniques-advanced/009_模仿性创作.gif',
      },
      {
        id: '3',
        title: 'Dealing with Qingtian Stone',
        titleCn: '青田石处理',
        duration: '1:46',
        description: 'Tips for working with Qingtian stone that tends to chip easily.',
        descriptionCn: '处理易崩裂的青田石的技巧。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/knife-techniques-advanced/010_青田石处理.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/knife-techniques-advanced/010_青田石处理.gif',
      },
    ],
  },
  'live-highlights': {
    courseSlug: 'live-highlights',
    courseName: 'Live Q&A Highlights',
    videos: [
      {
        id: '1',
        title: 'Seal Stone Appreciation',
        titleCn: '印石欣赏鉴别',
        duration: '9:00',
        description: 'How to appreciate and identify quality seal stones.',
        descriptionCn: '如何欣赏和鉴别优质印石。',
        // videoUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/videos/live-highlights/012_印石鉴别.mp4',
        // gifUrl: 'https://vertax.oss-cn-hangzhou.aliyuncs.com/courses/gifs/live-highlights/012_印石鉴别.gif',
      },
    ],
  },
};

// Helper function to get course videos
export function getCourseVideos(courseSlug: string): CourseVideos | null {
  return COURSE_VIDEOS[courseSlug] || null;
}

// Helper function to check if a course has video content
export function hasVideoContent(courseSlug: string): boolean {
  const course = COURSE_VIDEOS[courseSlug];
  return course?.videos.some(v => v.videoUrl) || false;
}
