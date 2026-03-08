import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StoryCard } from '@/components/StoryCard';
import { ArtistCard } from '@/components/ArtistCard';
import { WorkCard } from '@/components/WorkCard';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import {
  getStoryBySlug,
  getArtistById,
  getWorkById,
  getFeaturedStories,
} from '@/lib/data';
import { StoryContentBlock } from '@/lib/types';

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { STORIES } = await import('@/lib/data');
  return STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) {
    return { title: 'Story Not Found | CarveEast' };
  }
  return {
    title: `${story.title} | CarveEast`,
    description: story.excerpt,
  };
}

function renderContentBlock(block: StoryContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-[#4A4A48] leading-relaxed mb-6">
          {block.content}
        </p>
      );
    case 'heading':
      const HeadingTag = `h${block.level}` as 'h2' | 'h3' | 'h4';
      const headingClasses = {
        2: 'text-2xl font-semibold mt-12 mb-6',
        3: 'text-xl font-semibold mt-10 mb-4',
        4: 'text-lg font-semibold mt-8 mb-3',
      };
      return (
        <HeadingTag
          key={index}
          className={`font-serif text-[#1A1A1A] ${headingClasses[block.level]}`}
        >
          {block.content}
        </HeadingTag>
      );
    case 'image':
      return (
        <figure key={index} className="my-8">
          <div className="aspect-[16/10] bg-[#E5E4E2] overflow-hidden">
            <PlaceholderImage className="w-full h-full" />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-[#7A7A78] mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 pl-6 border-l-2 border-[#B83A2F] py-2"
        >
          <p className="font-serif text-xl text-[#1A1A1A] italic mb-2">
            &ldquo;{block.content}&rdquo;
          </p>
          {block.attribution && (
            <cite className="text-sm text-[#7A7A78] not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case 'artist-reference':
      const artist = getArtistById(block.artistId);
      if (!artist) return null;
      return (
        <div key={index} className="my-8 p-6 bg-[#F5F4F2]">
          <p className="text-xs uppercase tracking-[0.1em] text-[#B83A2F] mb-3">
            Featured Artist
          </p>
          <ArtistCard artist={artist} variant="compact" />
        </div>
      );
    case 'work-reference':
      const work = getWorkById(block.workId);
      if (!work) return null;
      return (
        <div key={index} className="my-8 p-6 bg-[#F5F4F2]">
          <p className="text-xs uppercase tracking-[0.1em] text-[#B83A2F] mb-3">
            Featured Work
          </p>
          <WorkCard work={work} variant="compact" />
        </div>
      );
    case 'gallery':
      return (
        <div key={index} className="my-8 grid grid-cols-2 gap-4">
          {block.images.map((image, i) => (
            <div key={i} className="aspect-square bg-[#E5E4E2]">
              <PlaceholderImage className="w-full h-full" />
            </div>
          ))}
        </div>
      );
    case 'divider':
      return <hr key={index} className="my-12 border-[#E5E4E2]" />;
    default:
      return null;
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedStories = getFeaturedStories()
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  const featuredArtists = story.featuredArtistIds
    ?.map((id) => getArtistById(id))
    .filter(Boolean) || [];

  const featuredWorks = story.featuredWorkIds
    ?.map((id) => getWorkById(id))
    .filter(Boolean) || [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Stories', href: '/stories' },
                { label: story.title },
              ]}
              className="mb-8"
            />
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-[0.15em] text-[#B83A2F]">
                  {story.category.replace(/-/g, ' ')}
                </span>
                <span className="text-[#D5D4D2]">|</span>
                <span className="text-sm text-[#7A7A78]">
                  {story.readTime} min read
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight mb-4">
                {story.title}
              </h1>
              {story.subtitle && (
                <p className="text-xl md:text-2xl text-[#4A4A48] mb-6">
                  {story.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E5E4E2] rounded-full overflow-hidden">
                  <PlaceholderImage className="w-full h-full" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">{story.author.name}</p>
                  {story.author.title && (
                    <p className="text-sm text-[#7A7A78]">{story.author.title}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {story.heroImage && (
          <section className="px-6 lg:px-12 mb-16">
            <div className="max-w-[1440px] mx-auto">
              <div className="aspect-[21/9] bg-[#E5E4E2] overflow-hidden">
                <PlaceholderImage className="w-full h-full" />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-8 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-8 lg:col-start-3">
                <div className="prose prose-lg max-w-none">
                  {story.content.map((block, index) => renderContentBlock(block, index))}
                </div>

                {/* Tags */}
                {story.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-[#E5E4E2]">
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#F5F4F2] text-[#4A4A48] text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="mt-12 p-6 bg-[#F5F4F2]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#E5E4E2] rounded-full overflow-hidden">
                      <PlaceholderImage className="w-full h-full" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{story.author.name}</p>
                      {story.author.title && (
                        <p className="text-sm text-[#7A7A78]">{story.author.title}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#4A4A48]">
                    CarveEast editorial team member specializing in Chinese art and culture.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Featured Artists */}
        {featuredArtists.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                Featured Artists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredArtists.map((artist) => (
                  artist && <ArtistCard key={artist.id} artist={artist} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Works */}
        {featuredWorks.length > 0 && (
          <section className="py-16 px-6 lg:px-12">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                Featured Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredWorks.map((work) => (
                  work && <WorkCard key={work.id} work={work} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <section className="py-20 px-6 lg:px-12 bg-[#F5F4F2]">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                More Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedStories.map((relatedStory) => (
                  <StoryCard key={relatedStory.id} story={relatedStory} variant="default" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-20 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Enjoyed This Article?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for more stories, artist features, and collecting insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#B83A2F]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B83A2F] text-white font-medium hover:bg-[#982A1F] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
