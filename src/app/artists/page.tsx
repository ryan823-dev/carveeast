import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { ArtistCard } from '@/components/ArtistCard';
import { ARTISTS, getDisciplineLabel } from '@/lib/data';
import { Discipline } from '@/lib/types';

export const metadata = {
  title: 'Artists | CarveEast',
  description: 'Discover exceptional Chinese artists working in seal engraving, calligraphy, ink painting, and inscribed ceramics.',
};

export default function ArtistsPage() {
  // Group artists by discipline
  const artistsByDiscipline = ARTISTS.reduce((acc, artist) => {
    const discipline = artist.primaryDiscipline;
    if (!acc[discipline]) {
      acc[discipline] = [];
    }
    acc[discipline].push(artist);
    return acc;
  }, {} as Record<Discipline, typeof ARTISTS>);

  const disciplineOrder = [
    Discipline.SEAL_ENGRAVING,
    Discipline.CALLIGRAPHY,
    Discipline.INK_PAINTING,
    Discipline.INSCRIBED_CERAMICS,
    Discipline.OIL_PAINTING,
    Discipline.PRINTMAKING,
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs items={[{ label: 'Artists' }]} className="mb-8" />
            <SectionHeader
              title="Our Artists"
              subtitle="Discover"
              description="Meet the master craftspeople and contemporary artists who define the CarveEast collection. Each artist has been carefully selected for their technical excellence, artistic vision, and commitment to their craft."
            />
          </div>
        </section>

        {/* Featured Artists */}
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
              Featured Artists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ARTISTS.filter((a) => a.isFeatured).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* All Artists by Discipline */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-12">
              Browse by Discipline
            </h2>
            <div className="space-y-20">
              {disciplineOrder.map((discipline) => {
                const artists = artistsByDiscipline[discipline];
                if (!artists || artists.length === 0) return null;

                return (
                  <div key={discipline}>
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
                        {getDisciplineLabel(discipline)}
                      </h3>
                      <div className="flex-1 h-px bg-[#E5E4E2]" />
                      <span className="text-sm text-[#7A7A78]">
                        {artists.length} artists
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                      {artists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} variant="default" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Are You an Artist?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              We are always looking for exceptional artists working in traditional Chinese media. If you would like to be considered for the CarveEast collection, we would love to hear from you.
            </p>
            <a
              href="/contact?type=artist-submission"
              className="inline-flex items-center bg-[#B83A2F] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#982A1F] transition-colors duration-300"
            >
              Submit Your Work
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
