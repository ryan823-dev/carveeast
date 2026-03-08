import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { WorkCard } from '@/components/WorkCard';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { InquiryForm } from '@/components/InquiryForm';
import {
  getWorkBySlug,
  getArtistById,
  getWorksByArtist,
  getDisciplineLabel,
  getAuthorRoleLabel,
  formatPrice,
} from '@/lib/data';
import { WorkAvailability } from '@/lib/types';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { WORKS } = await import('@/lib/data');
  return WORKS.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    return { title: 'Work Not Found | CarveEast' };
  }
  return {
    title: `${work.title.en} | CarveEast`,
    description: work.description.slice(0, 160),
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  // Get authors info
  const authors = work.authors.map((author) => {
    const artist = getArtistById(author.artistId);
    return {
      ...author,
      artist,
    };
  });

  const primaryAuthor = authors.find((a) => a.isPrimary);
  const primaryArtist = primaryAuthor?.artist;

  // Get related works from same artist
  const relatedWorks = primaryArtist
    ? getWorksByArtist(primaryArtist.id)
        .filter((w) => w.id !== work.id)
        .slice(0, 4)
    : [];

  const availabilityBadge = {
    [WorkAvailability.AVAILABLE]: { text: 'Available', className: 'bg-green-100 text-green-800' },
    [WorkAvailability.SOLD]: { text: 'Sold', className: 'bg-gray-200 text-gray-600' },
    [WorkAvailability.AUCTION]: { text: 'In Auction', className: 'bg-[#B83A2F]/10 text-[#B83A2F]' },
    [WorkAvailability.RESERVED]: { text: 'Reserved', className: 'bg-amber-100 text-amber-800' },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Works', href: '/works' },
                { label: work.title.en },
              ]}
              className="mb-8"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-[#E5E4E2] overflow-hidden">
                  <PlaceholderImage
                    className="w-full h-full"
                    text={work.title.cn?.[0] || work.title.en[0]}
                  />
                </div>
                {work.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {work.images.slice(1).map((image, i) => (
                      <div key={i} className="aspect-square bg-[#E5E4E2]">
                        <PlaceholderImage className="w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Work Info */}
              <div className="lg:py-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={availabilityBadge[work.availability].className + ' px-3 py-1 text-xs font-medium'}>
                    {availabilityBadge[work.availability].text}
                  </span>
                  <span className="text-xs uppercase tracking-[0.1em] text-[#B83A2F]">
                    {getDisciplineLabel(work.discipline)}
                  </span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] leading-tight mb-2">
                  {work.title.en}
                </h1>
                {work.title.cn && (
                  <p className="text-xl text-[#7A7A78] mb-6">
                    {work.title.cn}
                  </p>
                )}

                {/* Authors */}
                <div className="mb-8">
                  <p className="text-sm text-[#7A7A78] mb-2">By</p>
                  <div className="space-y-2">
                    {authors.map((author) => (
                      <div key={author.artistId} className="flex items-center gap-2">
                        <a
                          href={`/artists/${author.artist?.slug}`}
                          className="font-medium text-[#1A1A1A] hover:text-[#B83A2F] transition-colors"
                        >
                          {author.artist?.name.en}
                        </a>
                        <span className="text-sm text-[#7A7A78]">
                          ({getAuthorRoleLabel(author.role)})
                        </span>
                        {author.contribution && (
                          <span className="text-sm text-[#9A9A98]">
                            — {author.contribution}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                {work.price && (
                  <div className="mb-8">
                    <p className="font-serif text-3xl font-semibold text-[#1A1A1A]">
                      {formatPrice(work.price.amount, work.price.currency)}
                    </p>
                    {work.price.isNegotiable && (
                      <p className="text-sm text-[#7A7A78]">Price negotiable</p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mb-12">
                  {work.availability === WorkAvailability.AVAILABLE && (
                    <>
                      <a
                        href="#inquiry"
                        className="bg-[#1A1A1A] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#4A4A48] transition-colors"
                      >
                        Inquire to Purchase
                      </a>
                      <a
                        href="#inquiry"
                        className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-white transition-colors"
                      >
                        Request More Info
                      </a>
                    </>
                  )}
                  {work.availability === WorkAvailability.AUCTION && (
                    <a
                      href={`/auctions/${work.auctionId}`}
                      className="bg-[#B83A2F] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#982A1F] transition-colors"
                    >
                      Place Bid
                    </a>
                  )}
                </div>

                {/* Details */}
                <div className="border-t border-[#E5E4E2] pt-8">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-4">
                    Details
                  </h3>
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-[#7A7A78]">Year</dt>
                      <dd className="text-[#1A1A1A] font-medium">{work.year}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7A7A78]">Medium</dt>
                      <dd className="text-[#1A1A1A] font-medium">{work.medium}</dd>
                    </div>
                    <div>
                      <dt className="text-[#7A7A78]">Dimensions</dt>
                      <dd className="text-[#1A1A1A] font-medium">
                        {work.dimensions.height && `${work.dimensions.height} `}
                        {work.dimensions.width && `× ${work.dimensions.width} `}
                        {work.dimensions.depth && `× ${work.dimensions.depth} `}
                        {work.dimensions.diameter && `⌀ ${work.dimensions.diameter} `}
                        {work.dimensions.unit}
                      </dd>
                    </div>
                    {work.lotNumber && (
                      <div>
                        <dt className="text-[#7A7A78]">Lot Number</dt>
                        <dd className="text-[#1A1A1A] font-medium">#{work.lotNumber}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">
                  About This Work
                </h2>
                <div className="prose prose-lg max-w-none text-[#4A4A48] leading-relaxed space-y-4">
                  {work.description.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {work.culturalContext && (
                  <div className="mt-8 p-6 bg-[#F5F4F2]">
                    <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-3">
                      Cultural Context
                    </h3>
                    <p className="text-[#4A4A48] leading-relaxed">
                      {work.culturalContext}
                    </p>
                  </div>
                )}

                {work.inscription && (
                  <div className="mt-8 p-6 border-l-2 border-[#B83A2F]">
                    <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-3">
                      Inscription
                    </h3>
                    <p className="text-2xl text-[#1A1A1A] font-serif mb-2">
                      {work.inscription.text}
                    </p>
                    {work.inscription.translation && (
                      <p className="text-[#7A7A78] italic">
                        &ldquo;{work.inscription.translation}&rdquo;
                      </p>
                    )}
                    {work.inscription.calligrapher && (
                      <p className="text-sm text-[#9A9A98] mt-2">
                        Calligraphy by {work.inscription.calligrapher}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                {work.provenance && work.provenance.length > 0 && (
                  <>
                    <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-4">
                      Provenance
                    </h3>
                    <div className="space-y-4 mb-8">
                      {work.provenance.map((entry, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-2 h-2 bg-[#B83A2F] rounded-full mt-2 shrink-0" />
                          <div>
                            {entry.date && (
                              <p className="text-sm text-[#7A7A78]">
                                {entry.date}
                              </p>
                            )}
                            <p className="text-[#4A4A48]">{entry.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="p-6 bg-[#F5F4F2]">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-4">
                    Authenticity
                  </h3>
                  <p className="text-sm text-[#4A4A48] mb-4">
                    This work comes with a certificate of authenticity from CarveEast and documentation of its provenance.
                  </p>
                  <button className="text-[#B83A2F] text-sm font-medium hover:underline">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Works */}
        {relatedWorks.length > 0 && (
          <section className="py-20 px-6 lg:px-12">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                More from {primaryArtist?.name.en}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedWorks.map((work) => (
                  <WorkCard key={work.id} work={work} variant="default" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Inquiry Form */}
        {work.availability === WorkAvailability.AVAILABLE && (
          <section id="inquiry" className="py-16 px-6 lg:px-12 bg-white border-t border-[#E5E4E2]">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-4">
                    Inquire About This Work
                  </h2>
                  <p className="text-[#4A4A48] mb-6">
                    Interested in acquiring this piece? Fill out the form and our team will respond within 24 hours.
                  </p>
                  <ul className="space-y-3 text-[#4A4A48]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B83A2F] rounded-full" />
                      Certificate of authenticity included
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B83A2F] rounded-full" />
                      Secure worldwide shipping
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#B83A2F] rounded-full" />
                      14-day return policy
                    </li>
                  </ul>
                </div>
                <div className="bg-[#F5F4F2] p-6 lg:p-8">
                  <InquiryForm work={work} type="inquiry" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-2xl font-semibold text-white mb-4">
              Interested in This Work?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Our team is available to answer questions, provide additional images, or arrange a viewing. We are here to help you make an informed decision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`/contact?work=${work.slug}`}
                className="bg-[#B83A2F] text-white px-8 py-3 text-sm tracking-wide hover:bg-[#982A1F] transition-colors"
              >
                Contact Us
              </a>
              <a
                href={primaryArtist ? `/artists/${primaryArtist.slug}` : '/artists'}
                className="border border-white/30 text-white px-8 py-3 text-sm tracking-wide hover:bg-white/10 transition-colors"
              >
                View Artist Profile
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
