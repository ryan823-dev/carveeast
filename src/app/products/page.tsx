// Products Page - Seal Carving Online Courses
import Link from 'next/link'
import Image from 'next/image'

// Course products data
const PRODUCTS = [
  {
    id: 'beginner-course',
    title: 'Seal Carving Beginner Essentials',
    titleCn: '篆刻入门必修课',
    description: 'Master the 6 key principles of seal carving. Perfect starting point for beginners.',
    descriptionCn: '掌握篆刻学习的六个核心原则，入门者的最佳起点',
    price: 129,
    originalPrice: 199,
    duration: '45 分钟',
    lessons: 5,
    level: 'Beginner',
    levelCn: '入门',
    thumbnail: '/images/courses/beginner.jpg',
    features: [
      '篆刻初级阶段六个更重要',
      '要把临摹当创作',
      '学王福庵要注意什么',
      '如何用好一本字典',
      '临汉印要放大吗'
    ],
    slug: 'beginner-essentials'
  },
  {
    id: 'side-inscription-course',
    title: 'Side Inscription Mastery',
    titleCn: '边款技法精讲',
    description: 'Learn the art of single-blade regular script for side inscriptions.',
    descriptionCn: '学习单刀楷书边款技法，提升篆刻艺术层次',
    price: 149,
    originalPrice: 219,
    duration: '3 小时',
    lessons: 12,
    level: 'Intermediate',
    levelCn: '进阶',
    thumbnail: '/images/courses/side-inscription.jpg',
    features: [
      '边款为什么要学单刀楷书',
      '边款与印面的相互关系',
      '单刀楷书教程（10集）',
      '刀背力量的运用',
      '边款布局与设计'
    ],
    slug: 'side-inscription-mastery'
  },
  {
    id: 'knife-technique-course',
    title: 'Advanced Knife Techniques',
    titleCn: '篆刻刀法进阶',
    description: 'Deep dive into knife control and pressure management for professional results.',
    descriptionCn: '深入学习刀法控制与力量运用，达到专业水平',
    price: 179,
    originalPrice: 259,
    duration: '4 小时',
    lessons: 8,
    level: 'Advanced',
    levelCn: '高级',
    thumbnail: '/images/courses/knife-technique.jpg',
    features: [
      '为什么入不了门',
      '什么叫模仿性创作',
      '篆刻刀法直解',
      '青田石的处理技巧',
      '刀法示范与答疑'
    ],
    slug: 'knife-techniques-advanced'
  },
  {
    id: 'live-highlights',
    title: 'Live Q&A Highlights Collection',
    titleCn: '直播答疑精华合集',
    description: 'All 12 live session highlights covering real student cases and questions.',
    descriptionCn: '12个直播答疑精华片段，覆盖真实学生案例与问题',
    price: 149,
    originalPrice: 299,
    duration: '2 小时',
    lessons: 12,
    level: 'All Levels',
    levelCn: '全级别',
    thumbnail: '/images/courses/live-highlights.jpg',
    features: [
      '12个直播答疑片段',
      '真实案例分析',
      '互动问答精选',
      '学生作品点评',
      '常见问题解答'
    ],
    slug: 'live-highlights'
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6">
            Master Chinese Seal Carving
          </h1>
          <p className="text-xl text-stone-300 text-center max-w-3xl mx-auto">
            Learn from Master Jiang Haoxu (庵角山人), founder of 金石印坊.
            <br />
            系统学习篆刻艺术，从入门到精通
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">
          Online Courses / 在线课程
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-64 bg-gradient-to-br from-amber-100 to-stone-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">印章</div>
                    <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm">
                      {product.levelCn}
                    </span>
                  </div>
                </div>
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-sm line-through ml-2 opacity-75">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{product.title}</h3>
                <p className="text-stone-600 mb-2">{product.titleCn}</p>
                <p className="text-stone-700 mb-4">{product.description}</p>
                
                {/* Meta */}
                <div className="flex gap-4 text-sm text-stone-500 mb-4">
                  <span>⏱ {product.duration}</span>
                  <span>📚 {product.lessons} lessons</span>
                  <span>📊 {product.level}</span>
                </div>

                {/* Features */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">课程内容 / Course Content:</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link 
                    href={`/products/${product.slug}`}
                    className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg transition-colors"
                  >
                    View Details / 查看详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">
            Why Choose CarveEast / 为什么选择我们
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-medium mb-2">Expert Instructor</h3>
              <p className="text-stone-600">
                江豪旭（庵角山人），金石印坊创始人
                <br />
                2006年创立，系统教学16年+
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-medium mb-2">Comprehensive Curriculum</h3>
              <p className="text-stone-600">
                从入门到进阶的完整体系
                <br />
                理论+实战+案例分析
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-medium mb-2">Global Community</h3>
              <p className="text-stone-600">
                服务全球华人艺术爱好者
                <br />
                面向海外的中国文化传播
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CarveEast. 中国篆刻艺术走向世界</p>
        </div>
      </footer>
    </div>
  )
}
