import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { StoryCard } from '@/components/StoryCard';
import { STORIES, getFeaturedStories } from '@/lib/data';
import { StoryCategory } from '@/lib/types';

export const metadata = {
  title: 'Stories | CarveEast',
  description: 'Editorial features, artist interviews, collecting guides, and cultural insights about Chinese art and craft.',
};

export default function StoriesPage() {
  const featuredStories = getFeaturedStories();
  const regularStories = STORIES.filter((s) => !s.isFeatured);

  // Group stories by category
  const storiesByCategory = regularStories.reduce((acc, story) => {
    if (!acc[story.category]) {
      acc[story.category] = [];
    }
    acc[story.category].push(story);
    return acc;
  }, {} as Record<StoryCategory, typeof regularStories>);

  const categoryLabels: Record<StoryCategory, string> = {
    [StoryCategory.ARTIST_INTERVIEW]: 'Artist Interviews',
    [StoryCategory.STUDIO_VISIT]: 'Studio Visits',
    [StoryCategory.TECHNIQUE_GUIDE]: 'Technique Guides',
    [StoryCategory.COLLECTING_GUIDE]: 'Collecting Guides',
    [StoryCategory.CURATORIAL_ESSAY]: 'Curatorial Essays',
    [StoryCategory.CULTURE_HISTORY]: 'Culture & History',
    [StoryCategory.MARKET_INSIGHT]: 'Market Insights',
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs items={[{ label: 'Stories' }]} className="mb-8" />
            <SectionHeader
              title="Stories"
              subtitle="Editorial"
              description="Dive deeper into the world of Chinese art with our curated editorial content. From artist interviews to collecting guides, discover the stories behind the works."
            />
          </div>
        </section>

        {/* Featured Stories */}
        {featuredStories.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredStories.slice(0, 1).map((story) => (
                  <StoryCard key={story.id} story={story} variant="featured" className="lg:col-span-2" />
                ))}
                <div className="space-y-8">
                  {featuredStories.slice(1, 3).map((story) => (
                    <StoryCard key={story.id} story={story} variant="compact" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Stories by Category */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-12">
              Browse by Category
            </h2>
            <div className="space-y-16">
              {Object.entries(storiesByCategory).map(([category, stories]) => (
                <div key={category}>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                      {categoryLabels[category as StoryCategory]}
                    </h3>
                    <div className="flex-1 h-px bg-[#E5E4E2]" />
                    <span className="text-sm text-[#7A7A78]">
                      {stories.length} stories
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                      <StoryCard key={story.id} story={story} variant="default" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for the latest stories, artist features, and collecting insights delivered to your inbox.
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
