import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { WorkCard } from '@/components/WorkCard';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { BidForm } from '@/components/BidForm';
import {
  getAuctionBySlug,
  getLotsForAuction,
  getWorkById,
  formatPrice,
} from '@/lib/data';
import { AuctionStatus } from '@/lib/types';

interface AuctionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { AUCTIONS } = await import('@/lib/data');
  return AUCTIONS.map((auction) => ({
    slug: auction.slug,
  }));
}

export async function generateMetadata({ params }: AuctionPageProps) {
  const { slug } = await params;
  const auction = getAuctionBySlug(slug);
  if (!auction) {
    return { title: 'Auction Not Found | CarveEast' };
  }
  return {
    title: `${auction.title} | CarveEast`,
    description: auction.description,
  };
}

function getStatusBadge(status: AuctionStatus) {
  const badges = {
    [AuctionStatus.UPCOMING]: { text: 'Upcoming', className: 'bg-blue-100 text-blue-800' },
    [AuctionStatus.LIVE]: { text: 'Live Now', className: 'bg-green-100 text-green-800' },
    [AuctionStatus.CLOSING]: { text: 'Closing Soon', className: 'bg-amber-100 text-amber-800' },
    [AuctionStatus.ENDED]: { text: 'Ended', className: 'bg-gray-200 text-gray-600' },
  };
  return badges[status];
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  };
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
}

function getTimeRemaining(endDate: string): string {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Auction ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''} left`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''} left`;
}

export default async function AuctionPage({ params }: AuctionPageProps) {
  const { slug } = await params;
  const auction = getAuctionBySlug(slug);

  if (!auction) {
    notFound();
  }

  const lots = getLotsForAuction(auction.id);
  const works = lots
    .map((lot) => getWorkById(lot.workId))
    .filter(Boolean);

  const statusBadge = getStatusBadge(auction.status);
  const isLive = auction.status === AuctionStatus.LIVE || auction.status === AuctionStatus.CLOSING;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-[21/9] bg-[#E5E4E2]">
            <PlaceholderImage className="w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
            <div className="max-w-[1440px] mx-auto">
              <Breadcrumbs
                items={[
                  { label: 'Auctions', href: '/auctions' },
                  { label: auction.title },
                ]}
                className="mb-6 text-white/80"
              />
              <div className="flex items-center gap-4 mb-4">
                <span className={statusBadge.className + ' px-3 py-1 text-xs font-medium'}>
                  {statusBadge.text}
                </span>
                {isLive && (
                  <span className="text-white/80 text-sm">
                    {getTimeRemaining(auction.endDate)}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-2">
                {auction.title}
              </h1>
              {auction.subtitle && (
                <p className="text-xl text-white/80">
                  {auction.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Auction Info */}
        <section className="py-12 px-6 lg:px-12 bg-white border-b border-[#E5E4E2]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#7A7A78] mb-1">
                    Dates
                  </p>
                  <p className="text-[#1A1A1A] font-medium">
                    {formatDateRange(auction.startDate, auction.endDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#7A7A78] mb-1">
                    Lots
                  </p>
                  <p className="text-[#1A1A1A] font-medium">
                    {works.length} works
                  </p>
                </div>
                {auction.curator && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#7A7A78] mb-1">
                      Curated By
                    </p>
                    <p className="text-[#1A1A1A] font-medium">
                      {auction.curator}
                    </p>
                  </div>
                )}
              </div>
              {isLive && (
                <button className="bg-[#B83A2F] text-white px-8 py-3 text-sm tracking-wide hover:bg-[#982A1F] transition-colors">
                  Register to Bid
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">
                  About This Auction
                </h2>
                <div className="prose prose-lg max-w-none text-[#4A4A48] leading-relaxed space-y-4">
                  {auction.description.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                {auction.curatorialEssay && (
                  <div className="mt-8 p-6 bg-[#F5F4F2] border-l-2 border-[#B83A2F]">
                    <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-3">
                      Curatorial Essay
                    </h3>
                    <p className="text-[#4A4A48] leading-relaxed italic">
                      &ldquo;{auction.curatorialEssay}&rdquo;
                    </p>
                  </div>
                )}
              </div>
              <div>
                <div className="p-6 bg-[#F5F4F2] sticky top-24">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-4">
                    How to Bid
                  </h3>
                  <ol className="space-y-4 text-sm text-[#4A4A48]">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-[#B83A2F] text-white rounded-full flex items-center justify-center text-xs shrink-0">
                        1
                      </span>
                      <span>Register for the auction with your email and phone number</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-[#B83A2F] text-white rounded-full flex items-center justify-center text-xs shrink-0">
                        2
                      </span>
                      <span>Browse lots and place bids online or by phone</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-[#B83A2F] text-white rounded-full flex items-center justify-center text-xs shrink-0">
                        3
                      </span>
                      <span>Winning bidders receive invoice and shipping information</span>
                    </li>
                  </ol>
                  {isLive && (
                    <button className="w-full mt-6 bg-[#1A1A1A] text-white py-3 text-sm tracking-wide hover:bg-[#4A4A48] transition-colors">
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lots */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B83A2F] mb-2">
                  Browse
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A]">
                  Auction Lots
                </h2>
              </div>
              <span className="text-[#7A7A78]">
                {works.length} works
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {lots.map((lot) => {
                const work = getWorkById(lot.workId);
                if (!work) return null;
                return (
                  <div key={lot.id} className="bg-[#F5F4F2] p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Work Info */}
                      <div>
                        <div className="aspect-square bg-[#E5E4E2] mb-4 overflow-hidden">
                          <PlaceholderImage className="w-full h-full" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-white px-2 py-1 text-sm font-medium">
                            Lot {lot.lotNumber}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                          {work.title.en}
                        </h3>
                        {lot.estimate && (
                          <p className="text-sm text-[#7A7A78] mt-1">
                            Estimate: {formatPrice(lot.estimate.low, lot.estimate.currency)} - {formatPrice(lot.estimate.high, lot.estimate.currency)}
                          </p>
                        )}
                      </div>

                      {/* Bid Form */}
                      <div>
                        {isLive ? (
                          <BidForm
                            auction={auction}
                            lot={lot}
                            className="bg-white p-4"
                          />
                        ) : (
                          <div className="bg-white p-6 text-center">
                            <p className="text-[#7A7A78] mb-4">
                              {auction.status === AuctionStatus.UPCOMING
                                ? 'Bidding opens soon'
                                : 'This auction has ended'}
                            </p>
                            <a
                              href={`/works/${work.slug}`}
                              className="text-[#B83A2F] hover:underline"
                            >
                              View Work Details
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="py-16 px-6 lg:px-12 bg-[#F5F4F2]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
              Auction Terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[#4A4A48]">
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-2">Buyer&apos;s Premium</h3>
                <p>A 20% buyer&apos;s premium will be added to the hammer price of each lot.</p>
              </div>
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-2">Payment</h3>
                <p>Payment is due within 5 business days of the auction close. We accept wire transfer and major credit cards.</p>
              </div>
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-2">Shipping</h3>
                <p>All items are shipped fully insured. International shipping available. Costs calculated after auction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Questions About This Auction?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Our team is available to answer questions about specific lots, condition reports, or the bidding process.
            </p>
            <a
              href="/contact?type=auction"
              className="inline-flex items-center bg-[#B83A2F] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#982A1F] transition-colors"
            >
              Contact Auction Team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
