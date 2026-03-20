import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, MapPin, Calendar, BookOpen } from 'lucide-react';
import { ARTISTS, WORKS } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { formatPrice } from '@/lib/artwork-data';

// Get Jiang Haoxu's data
const artist = ARTISTS.find((a) => a.slug === 'jiang-haoxu')!;
const artistWorks = WORKS.filter((w) =>
  w.authors.some((a) => a.artistId === 'artist-11')
).slice(0, 6);

export const metadata = {
  title: `${artist.name.cn || artist.name.en} | ${artist.name.en} - CarveEast`,
  description: artist.shortBio,
};

export default function JiangHaoxuPage() {
  const artistName = artist.name.cn || artist.name.en;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: 'Artists', href: '/artists' },
              { label: artistName }
            ]}
            className="mb-8 !text-stone-400"
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-500 text-xs uppercase tracking-widest mb-4">
                Featured Artist
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
                {artistName}
              </h1>
              <p className="text-amber-500 text-xl mb-2">{artist.name.pinyin}</p>
              <p className="text-stone-400 mb-6">庵角山人 / Anjiao Shanren</p>

              <p className="text-stone-300 leading-relaxed mb-6">
                {artist.shortBio}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-stone-400 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{artist.location.city}, {artist.location.province}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{artist.yearsActive}</span>
                </div>
              </div>

              {artist.socialLinks?.website && (
                <a
                  href={artist.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Website: godseal.com</span>
                </a>
              )}
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-800">
              {artist.portraitImage ? (
                <Image
                  src={artist.portraitImage}
                  alt={artist.name.en}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-9xl text-stone-600">
                  印
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
              Artist Statement
            </h2>
          </div>
          <blockquote className="text-xl md:text-2xl text-stone-700 leading-relaxed text-center font-serif italic">
            {artist.statement}
          </blockquote>
        </div>
      </section>

      {/* Biography */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold text-stone-900 mb-8">
            About the Artist
          </h2>
          <div className="prose prose-stone max-w-none">
            <p className="text-stone-600 leading-relaxed mb-6">
              Jiang Haoxu (江豪旭), courtesy name Ruisheng (字瑞昇), art name Anjiao Shanren (号庵角山人),
              is a distinguished seal carving artist and educator whose work exemplifies both artistic mastery
              and pedagogical excellence. In 2006, he founded Jinshi Seal Studio (金石印坊), which has become
              one of the most influential seal carving education institutions in China.
            </p>

            <h3 className="font-serif text-xl font-semibold text-stone-900 mt-8 mb-4">
              Seal Carving Artistry
            </h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              With over 30 years of dedication to seal art, Jiang has developed a highly distinctive personal
              style characterized by primitive simplicity (古朴) combined with powerful, unadorned strength (劲拙).
              The cuts are decisive and clean (利落), creating compositions that are generous and dignified (大方).
              His seals demonstrate deep understanding of ancient Han dynasty seal traditions while maintaining
              a contemporary sensibility.
            </p>

            <h3 className="font-serif text-xl font-semibold text-stone-900 mt-8 mb-4">
              Border Inscriptions (边款)
            </h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              Jiang is particularly renowned for his single-stroke border inscriptions (单刀边款), where his
              楷书 (regular script) demonstrates elegant structure and precise knife control. This mastery led
              to his collaboration with Founder Type (方正字库) to create the &quot;Haoxu Single-Stroke Regular Script&quot;
              (方正字迹 - 豪旭单刀楷) font family—the first time a seal carving border inscription style has
              been digitized for modern typography.
            </p>

            <h3 className="font-serif text-xl font-semibold text-stone-900 mt-8 mb-4">
              Educational Contributions
            </h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              Jiang is the author of &quot;Single-Stroke Regular Script Border Inscriptions: Techniques and Creation&quot;
              (《单刀楷书边款刻法与创作》), a comprehensive textbook that has become essential reading for seal
              carving students. He regularly conducts lectures and workshops across China, including the prestigious
              Shanghai International Seal Art Exhibition.
            </p>
          </div>
        </div>
      </section>

      {/* Works Gallery */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-600 text-xs uppercase tracking-widest mb-4">Gallery</p>
              <h2 className="font-serif text-3xl font-semibold text-stone-900">
                Selected Works
              </h2>
            </div>
            <Link
              href="/works?artist=jiang-haoxu"
              className="text-stone-600 hover:text-stone-900 text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistWorks.map((work) => {
              const images = work.images.filter((img) => img.isPrimary);
              const primaryImage = images[0]?.url || work.images[0]?.url;
              const workTitle = work.title.cn || work.title.en;

              return (
                <Link
                  key={work.id}
                  href={`/works/${work.slug}`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-4">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={workTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-stone-300">
                        印
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-stone-900 group-hover:text-amber-700">
                    {workTitle}
                  </h3>
                  <p className="text-sm text-stone-500">{work.title.en}</p>
                  {work.price && (
                    <p className="font-semibold text-stone-900 mt-1">
                      {formatPrice(work.price.amount, work.price.currency)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold mb-4">
            Interested in Jiang Haoxu&apos;s Work?
          </h2>
          <p className="text-stone-300 mb-8">
            Contact us to inquire about available works, commissioned seals,
            or upcoming exhibitions featuring this artist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/works?artist=jiang-haoxu"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Works <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-stone-500 hover:border-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
