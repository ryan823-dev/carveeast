import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/artwork-data';

export async function FeaturedWorks() {
  // Fetch featured works from database
  const works = await prisma.work.findMany({
    where: {
      isPublished: true,
    },
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 mb-4">Featured</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-stone-900">
              Master Seal Carvings
            </h2>
          </div>
          <Link href="/works" className="text-sm text-stone-600 hover:text-stone-900 border-b border-stone-300 hover:border-stone-900 pb-0.5 transition-colors">
            View All Works
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.slice(0, 4).map((work, index) => {
            const images = JSON.parse(work.images || '[]');
            const primaryImage = images[0];

            return (
              <Link
                key={work.id}
                href={`/works/${work.slug}`}
                className="group"
              >
                <div className="bg-stone-100 mb-4 overflow-hidden rounded-xl aspect-square relative">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={work.titleCn || work.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl text-stone-300">
                      印
                    </div>
                  )}
                </div>
                <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">
                  {work.artistName}
                </p>
                <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                  {work.titleCn || work.title}
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  {(work as any).stoneColor || work.medium} · {work.year}
                </p>
                {work.price && (
                  <p className="font-semibold text-stone-900 mt-2">
                    {formatPrice(work.price, work.currency)}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
