// Product Detail Page
import Link from 'next/link'
import CoursePayment from '@/components/payment/CoursePayment'
import { getCourseVideos } from '@/lib/course-videos'
import VideoPreview from '@/components/video/VideoPreview'

// Course products data
const PRODUCTS = {
  'beginner-essentials': {
    id: 'beginner-course',
    title: 'Seal Carving Beginner Essentials',
    titleCn: '篆刻入门必修课',
    description: 'Master the 6 key principles of seal carving. Perfect starting point for beginners. This comprehensive course covers everything you need to start your journey in traditional Chinese seal carving.',
    descriptionCn: '掌握篆刻学习的六个核心原则，入门者的最佳起点。这门综合课程涵盖传统中国篆刻入门所需的一切知识。',
    price: 129,
    originalPrice: 199,
    duration: '45 分钟',
    lessons: 5,
    level: 'Beginner',
    levelCn: '入门',
    instructor: '江豪旭（庵角山人）',
    thumbnail: '/images/courses/beginner.jpg',
    features: [
      '篆刻初级阶段六个更重要',
      '要把临摹当创作',
      '学王福庵要注意什么',
      '如何用好一本字典',
      '临汉印要放大吗'
    ],
    curriculum: [
      {
        title: 'Module 1: Foundations',
        titleCn: '模块一：基础',
        lessons: [
          { name: '6 Key Principles for Beginners', duration: '4:14' },
          { name: 'Why Some Never Progress', duration: '15:33' }
        ]
      },
      {
        title: 'Module 2: Learning Methods',
        titleCn: '模块二：学习方法',
        lessons: [
          { name: 'Treat Practice as Creation', duration: '2:13' },
          { name: 'Learning from Wang Fu-an', duration: '4:16' }
        ]
      },
      {
        title: 'Module 3: Practical Skills',
        titleCn: '模块三：实用技巧',
        lessons: [
          { name: 'Using Dictionary Effectively', duration: '9:53' },
          { name: 'Enlarging Han Seals', duration: '1:30' }
        ]
      }
    ]
  },
  'side-inscription-mastery': {
    id: 'side-inscription-course',
    title: 'Side Inscription Mastery',
    titleCn: '边款技法精讲',
    description: 'Learn the art of single-blade regular script for side inscriptions. This advanced course focuses on the techniques that make side inscriptions (边款) a highlight of seal carving.',
    descriptionCn: '学习单刀楷书边款技法，提升篆刻艺术层次。这门高级课程专注于使边款成为篆刻亮点的技法。',
    price: 149,
    originalPrice: 219,
    duration: '3 小时',
    lessons: 12,
    level: 'Intermediate',
    levelCn: '进阶',
    instructor: '江豪旭（庵角山人）',
    thumbnail: '/images/courses/side-inscription.jpg',
    features: [
      '边款为什么要学单刀楷书',
      '边款与印面的相互关系',
      '单刀楷书教程（10集）',
      '刀背力量的运用',
      '边款布局与设计'
    ],
    curriculum: [
      {
        title: 'Module 1: Why Single-Blade',
        titleCn: '模块一：为何要学单刀',
        lessons: [
          { name: 'Single-Blade Regular Script', duration: '1:05' },
          { name: 'How Side Inscriptions Help', duration: '2:25' }
        ]
      },
      {
        title: 'Module 2: Core Techniques',
        titleCn: '模块二：核心技法',
        lessons: [
          { name: 'Knife Back Pressure', duration: '2:46' },
          { name: 'Using Knife Tool', duration: '6:28' }
        ]
      }
    ]
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS[params.slug as keyof typeof PRODUCTS]
  const courseVideos = getCourseVideos(params.slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Course not found</h1>
          <Link href="/products" className="text-amber-600 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 to-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/products" className="text-stone-300 hover:text-white mb-4 inline-block">
            ← Back to Courses
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Video Preview */}
            <div className="relative aspect-video bg-stone-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">印章</div>
                  <button className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors">
                    <span className="text-4xl">▶</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Info */}
            <div>
              <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm">
                {product.levelCn}
              </span>
              <h1 className="text-4xl font-serif mt-4 mb-2">{product.title}</h1>
              <p className="text-stone-300 mb-4">{product.titleCn}</p>
              
              <p className="text-stone-200 mb-6">{product.description}</p>
              
              <div className="flex gap-6 text-stone-300 mb-6">
                <span>⏱ {product.duration}</span>
                <span>📚 {product.lessons} lessons</span>
                <span>👨‍🏫 {product.instructor}</span>
              </div>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-amber-400">${product.price}</span>
                <span className="text-xl text-stone-400 line-through">${product.originalPrice}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Save ${product.originalPrice - product.price}
                </span>
              </div>
              
              <CoursePayment
                courseSlug={params.slug}
                courseName={product.title}
                courseNameCn={product.titleCn}
                price={product.price * 100}
              />
              
              <p className="text-center text-stone-400 text-sm mt-4">
                Lifetime access • HD video • English subtitles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif mb-8">What You'll Learn / 你将学到</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif mb-8">Course Curriculum / 课程大纲</h2>
            
            {product.curriculum.map((module, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-medium mb-4 bg-stone-100 p-3 rounded">
                  {module.title}
                  <span className="text-stone-500 ml-2">{module.titleCn}</span>
                </h3>
                <div className="space-y-2">
                  {module.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded hover:bg-stone-100">
                      <span>{lesson.name}</span>
                      <span className="text-stone-500">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      {courseVideos && courseVideos.videos.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif mb-8">Course Previews / 课程预览</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {courseVideos.videos.slice(0, 6).map((video) => (
                  <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-stone-200">
                      {video.gifUrl ? (
                        <VideoPreview
                          src={video.gifUrl}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {/* Duration Badge */}
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    {/* Video Info */}
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2">{video.titleCn}</h3>
                      <p className="text-stone-500 text-xs mt-1">{video.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              {courseVideos.videos.length > 6 && (
                <p className="text-center text-stone-500 mt-4">
                  +{courseVideos.videos.length - 6} more lessons after enrollment
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Instructor */}
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif mb-8">About the Instructor / 导师介绍</h2>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-stone-200 rounded-full flex items-center justify-center text-4xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{product.instructor}</h3>
                  <p className="text-stone-600 mb-4">
                    Art name: 庵角山人 | Founder of 金石印坊 (since 2006)
                  </p>
                  <p className="text-stone-700">
                    江豪旭先生是中国当代著名篆刻艺术家，擅长古朴劲拙、利落大方的篆刻风格。
                    其边款艺术尤为突出，已出版多部专著和字库。2006年创立金石印坊，
                    致力于篆刻艺术的传承与教育，培养了众多优秀学生。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-serif mb-4 text-center">Ready to Start?</h2>
            <p className="text-stone-600 mb-8 text-center">
              Join thousands of students learning Chinese seal carving
            </p>
            <CoursePayment
              courseSlug={params.slug}
              courseName={product.title}
              courseNameCn={product.titleCn}
              price={product.price * 100}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
