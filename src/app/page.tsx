import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/artwork-data';

export default async function HomePage() {
  // Fetch works for display
  const works = await prisma.work.findMany({
    where: { isPublished: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-amber-500 text-sm uppercase tracking-widest mb-6">Chinese Seal Carving Art</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            CarveEast
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 mb-4">
            篆刻艺术 / Seal Carving
          </p>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto mb-10">
            Discover exquisite seal carvings by master artisans. Each piece carries centuries of Chinese cultural heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/works" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-medium transition-colors">
              Explore Works
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/artists/jiang-haoxu" className="inline-flex items-center gap-2 border border-stone-500 hover:border-white px-8 py-4 rounded-lg font-medium transition-colors">
              Meet the Artist
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-stone-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-stone-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-600 text-xs uppercase tracking-widest mb-4">Featured</p>
              <h2 className="font-serif text-4xl font-semibold text-stone-900">Master Works</h2>
            </div>
            <Link href="/works" className="text-stone-600 hover:text-stone-900 text-sm flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {works.map((work) => {
              const images = JSON.parse(work.images || '[]');
              const primaryImage = images[0];

              return (
                <Link key={work.id} href={`/works/${work.slug}`} className="group">
                  <div className="bg-stone-100 mb-4 rounded-xl overflow-hidden aspect-square relative">
                    {primaryImage ? (
                      <Image src={primaryImage.url} alt={work.titleCn || work.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-stone-300">印</div>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">{work.artistName}</p>
                  <h3 className="font-medium text-stone-900 group-hover:text-amber-700">{work.titleCn || work.title}</h3>
                  {work.price && <p className="font-semibold text-stone-900 mt-1">{formatPrice(work.price, work.currency)}</p>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-600 text-xs uppercase tracking-widest mb-4">The Art of Seal Carving</p>
              <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-6">篆刻之美</h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-6">
                Seal carving, or 篆刻 (zhuanke), is one of the highest art forms in Chinese culture. 
                Dating back over 2,000 years, it combines calligraphy and carving skills to create 
                unique works of art that serve both aesthetic and practical purposes.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Each seal tells a story — of the artist, the collector, and the enduring legacy 
                of Chinese artistic tradition. Our platform connects master craftsmen with 
                collectors who appreciate the beauty and significance of these extraordinary pieces.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-amber-700 font-medium">
                Learn More About Seal Carving <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-100 rounded-xl aspect-square flex items-center justify-center text-8xl text-stone-300">印</div>
              <div className="bg-stone-100 rounded-xl aspect-square flex items-center justify-center text-8xl text-stone-300">石</div>
              <div className="bg-stone-100 rounded-xl aspect-square flex items-center justify-center text-8xl text-stone-300">書</div>
              <div className="bg-stone-100 rounded-xl aspect-square flex items-center justify-center text-8xl text-stone-300">刻</div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-amber-500 text-xs uppercase tracking-widest mb-4">Featured Artist</p>
              <h2 className="font-serif text-4xl font-semibold mb-2">Jiang Haoxu</h2>
              <p className="text-amber-500 mb-6">江豪旭 / 庵角山人</p>
              <p className="text-stone-300 leading-relaxed mb-6">
                Jiang Haoxu, also known by his artist name Anjiao Shanren (庵角山人), 
                is a contemporary master of Chinese seal carving. Trained in the Yishan 
                school tradition, his work bridges classical techniques with modern sensibilities.
              </p>
              <p className="text-stone-400 leading-relaxed mb-8">
                With years of dedication to the craft, Master Jiang has created hundreds 
                of seals for collectors worldwide. His pieces are characterized by their 
                precision, elegance, and deep understanding of Chinese cultural traditions.
              </p>
              <Link href="/artists/jiang-haoxu" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg font-medium transition-colors">
                View Artist Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-stone-800 rounded-2xl aspect-square flex items-center justify-center text-9xl text-stone-600">
                印
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs uppercase tracking-widest mb-4">Learn</p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-4">Online Courses</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Master the art of seal carving with our comprehensive online courses, 
              designed for both beginners and intermediate practitioners.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Seal Carving Beginner Essentials', titleCn: '篆刻入门必修课', price: 129 },
              { title: 'Side Inscription Mastery', titleCn: '边款技法精讲', price: 149 },
              { title: 'Advanced Knife Techniques', titleCn: '篆刻刀法进阶', price: 179 },
              { title: 'Live Q&A Highlights', titleCn: '直播答疑精华', price: 149 },
            ].map((course) => (
              <Link key={course.title} href={`/products/${course.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="font-medium text-stone-900 group-hover:text-amber-700 mb-2">{course.titleCn}</h3>
                <p className="text-sm text-stone-500 mb-4">{course.title}</p>
                <p className="font-semibold text-stone-900">${course.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-serif text-xl mb-4">CarveEast</h3>
              <p className="text-sm">Chinese Seal Carving Art Marketplace</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Works</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/works" className="hover:text-white">All Works</Link></li>
                <li><Link href="/works?medium=qingtian" className="hover:text-white">Qingtian Stone</Link></li>
                <li><Link href="/works?medium=shoushan" className="hover:text-white">Shoushan Stone</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="hover:text-white">Online Courses</Link></li>
                <li><Link href="/about" className="hover:text-white">About Seal Carving</Link></li>
                <li><Link href="/artists" className="hover:text-white">Artists</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-sm">
            <p>&copy; 2024 CarveEast. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
