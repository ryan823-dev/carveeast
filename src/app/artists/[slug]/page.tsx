import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { WorkCard } from '@/components/WorkCard';
import { StoryCard } from '@/components/StoryCard';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { FollowButton } from '@/components/FollowButton';
import {
  getArtistBySlug,
  getWorksByArtist,
  getFeaturedStories,
  getDisciplineLabel,
  formatPrice,
} from '@/lib/data';
import { Discipline } from '@/lib/types';

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { ARTISTS } = await import('@/lib/data');
  return ARTISTS.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) {
    return { title: 'Artist Not Found | CarveEast' };
  }
  return {
    title: `${artist.name.en} | CarveEast`,
    description: artist.shortBio,
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const works = getWorksByArtist(artist.id);
  const availableWorks = works.filter((w) => w.availability === 'available');
  const featuredStories = getFeaturedStories().filter(
    (s) => s.featuredArtistIds?.includes(artist.id)
  );

  // Group works by discipline
  const worksByDiscipline = works.reduce((acc, work) => {
    if (!acc[work.discipline]) {
      acc[work.discipline] = [];
    }
    acc[work.discipline].push(work);
    return acc;
  }, {} as Record<Discipline, typeof works>);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Artists', href: '/artists' },
                { label: artist.name.en },
              ]}
              className="mb-8"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Portrait */}
              <div className="aspect-[3/4] bg-[#E5E4E2] overflow-hidden">
                <PlaceholderImage
                  text={artist.name.cn?.[0] || artist.name.en[0]}
                  className="w-full h-full"
                />
              </div>
              {/* Info */}
              <div className="lg:py-12">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B83A2F] mb-4">
                  {getDisciplineLabel(artist.primaryDiscipline)}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight mb-4">
                  {artist.name.en}
                </h1>
                {artist.name.cn && (
                  <p className="text-2xl text-[#7A7A78] mb-6">
                    {artist.name.cn}
                  </p>
                )}
                <p className="text-xl text-[#4A4A48] leading-relaxed mb-8">
                  {artist.shortBio}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-[#7A7A78] mb-8">
                  <div>
                    <span className="block text-[#1A1A1A] font-medium">
                      {artist.location.city}, {artist.location.country}
                    </span>
                    <span>Location</span>
                  </div>
                  {artist.yearStarted && (
                    <div>
                      <span className="block text-[#1A1A1A] font-medium">
                        {artist.yearStarted}
                      </span>
                      <span>Started</span>
                    </div>
                  )}
                  <div>
                    <span className="block text-[#1A1A1A] font-medium">
                      {artist.stats.totalWorks}
                    </span>
                    <span>Works</span>
                  </div>
                  <div>
                    <span className="block text-[#1A1A1A] font-medium">
                      {formatPrice(artist.stats.priceRange.min, artist.stats.priceRange.currency)} - {formatPrice(artist.stats.priceRange.max, artist.stats.priceRange.currency)}
                    </span>
                    <span>Price Range</span>
                  </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {artist.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#F5F4F2] text-[#4A4A48] text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <FollowButton
                    artistId={artist.id}
                    artistName={artist.name.en}
                    variant="default"
                  />
                  <a
                    href={`/contact?artist=${artist.slug}`}
                    className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">
                  About the Artist
                </h2>
                <div className="prose prose-lg max-w-none text-[#4A4A48] leading-relaxed space-y-4">
                  {artist.bio.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                {artist.statement && (
                  <blockquote className="mt-8 pl-6 border-l-2 border-[#B83A2F]">
                    <p className="font-serif text-xl text-[#1A1A1A] italic">
                      &ldquo;{artist.statement}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-4">
                  Disciplines
                </h3>
                <div className="space-y-2 mb-8">
                  {artist.disciplines.map((discipline) => (
                    <div
                      key={discipline}
                      className="flex items-center justify-between py-2 border-b border-[#E5E4E2]"
                    >
                      <span className="text-[#4A4A48]">
                        {getDisciplineLabel(discipline)}
                      </span>
                      {discipline === artist.primaryDiscipline && (
                        <span className="text-xs text-[#B83A2F]">Primary</span>
                      )}
                    </div>
                  ))}
                </div>
                {artist.socialLinks && (
                  <>
                    <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-4">
                      Connect
                    </h3>
                    <div className="space-y-2">
                      {artist.socialLinks.website && (
                        <a
                          href={artist.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[#B83A2F] hover:underline"
                        >
                          Website
                        </a>
                      )}
                      {artist.socialLinks.instagram && (
                        <a
                          href={artist.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[#B83A2F] hover:underline"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Available Works */}
        {availableWorks.length > 0 && (
          <section className="py-20 px-6 lg:px-12">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B83A2F] mb-2">
                    Collect
                  </p>
                  <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A]">
                    Available Works
                  </h2>
                </div>
                <span className="text-[#7A7A78]">
                  {availableWorks.length} works
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {availableWorks.map((work) => (
                  <WorkCard key={work.id} work={work} variant="default" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Works by Discipline */}
        {Object.keys(worksByDiscipline).length > 0 && (
          <section className="py-20 px-6 lg:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-12">
                Complete Works
              </h2>
              <div className="space-y-16">
                {Object.entries(worksByDiscipline).map(([discipline, disciplineWorks]) => (
                  <div key={discipline}>
                    <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-6 pb-2 border-b border-[#E5E4E2]">
                      {getDisciplineLabel(discipline as Discipline)}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {disciplineWorks.map((work) => (
                        <WorkCard key={work.id} work={work} variant="default" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Stories */}
        {featuredStories.length > 0 && (
          <section className="py-20 px-6 lg:px-12">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-8">
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredStories.map((story) => (
                  <StoryCard key={story.id} story={story} variant="default" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Collect This Artist */}
        <section className="py-20 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B83A2F] mb-4">
                  Curatorial Perspective
                </p>
                <h2 className="font-serif text-3xl font-semibold text-white mb-6">
                  Why Collect {artist.name.en}?
                </h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    {artist.name.en} represents the best of contemporary {getDisciplineLabel(artist.primaryDiscipline).toLowerCase()}. 
                    With {artist.yearsActive || 'years of'} practice, they have developed a distinctive voice that honors tradition while pushing boundaries.
                  </p>
                  <p>
                    Their work has been recognized for its technical excellence and artistic vision. 
                    As their reputation continues to grow, early acquisitions represent both aesthetic and investment value.
                  </p>
                  <p>
                    We recommend {artist.name.en} to collectors who appreciate {artist.tags.slice(0, 3).join(', ')} 
                    and are looking to build a meaningful collection of contemporary Chinese art.
                  </p>
                </div>
              </div>
              <div className="bg-white/5 p-8">
                <h3 className="font-serif text-xl font-medium text-white mb-6">
                  Collecting Timeline
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-[#B83A2F] rounded-full mt-2 shrink-0" />
                    <div>
                      <p className="text-white font-medium">{artist.yearStarted || 'Early career'}</p>
                      <p className="text-white/60 text-sm">Began formal training and early works</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-[#B83A2F] rounded-full mt-2 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Established Practice</p>
                      <p className="text-white/60 text-sm">Developed distinctive style and technique</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-[#B83A2F] rounded-full mt-2 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Present</p>
                      <p className="text-white/60 text-sm">Creating masterworks at peak of career</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
