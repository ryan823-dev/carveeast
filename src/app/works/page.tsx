import { prisma } from '@/lib/prisma';
import { SealWorkCard } from '@/components/works/SealWorkCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';

// Server component - fetches data directly
async function getWorks() {
  try {
    const works = await prisma.work.findMany({
      where: {
        isPublished: true,
      },
      include: {
        artist: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse images JSON
    return works.map(work => ({
      ...work,
      images: JSON.parse(work.images || '[]'),
      tags: work.tags ? JSON.parse(work.tags) : [],
    }));
  } catch (error) {
    console.error('Error fetching works:', error);
    return [];
  }
}

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
            <a href="/" className="hover:text-stone-700">Home</a>
            <span>/</span>
            <span>Works</span>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-4">Collect</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-900 mb-4">
              Available Works
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover exquisite seal carvings by master artisans. Each piece is a unique work of art, carrying centuries of Chinese cultural heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {works.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">印</div>
              <h3 className="font-serif text-2xl text-stone-900 mb-2">
                No Works Available Yet
              </h3>
              <p className="text-stone-600">
                New artworks coming soon. Please check back later.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Works */}
              {works.filter(w => (w as any).featured).length > 0 && (
                <div className="mb-16">
                  <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-8">
                    Featured Works / 精选作品
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {works
                      .filter(w => (w as any).featured)
                      .slice(0, 4)
                      .map((work) => (
                        <SealWorkCard
                          key={work.id}
                          work={{
                            slug: work.slug,
                            title: work.title,
                            titleCn: work.titleCn || undefined,
                            artistName: work.artistName,
                            year: work.year,
                            medium: work.medium,
                            stoneColor: (work as any).stoneColor,
                            price: work.price || undefined,
                            currency: work.currency,
                            availability: work.availability,
                            images: work.images,
                          }}
                          variant="featured"
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* All Works */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-8">
                  All Works / 全部作品
                  <span className="text-stone-400 font-normal text-lg ml-3">
                    ({works.length} {works.length === 1 ? 'piece' : 'pieces'})
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {works.map((work) => (
                    <SealWorkCard
                      key={work.id}
                      work={{
                        slug: work.slug,
                        title: work.title,
                        titleCn: work.titleCn || undefined,
                        artistName: work.artistName,
                        year: work.year,
                        medium: work.medium,
                        stoneColor: (work as any).stoneColor,
                        price: work.price || undefined,
                        currency: work.currency,
                        availability: work.availability,
                        images: work.images,
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-800 text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl mb-4">Looking for Something Special?</h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            We also accept custom commissions. Contact us to discuss your personalized seal carving request.
          </p>
          <a
            href="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Commission a Work
          </a>
        </div>
      </section>
    </main>
  );
}
