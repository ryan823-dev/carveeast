import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { AuctionCard } from '@/components/AuctionCard';
import { WorkCard } from '@/components/WorkCard';
import { AUCTIONS, WORKS, getLotsForAuction } from '@/lib/data';
import { AuctionStatus, WorkAvailability } from '@/lib/types';

export const metadata = {
  title: 'Auctions | CarveEast',
  description: 'Bid on exceptional works by Chinese artists in our curated auctions.',
};

export default function AuctionsPage() {
  const liveAuctions = AUCTIONS.filter(
    (a) => a.status === AuctionStatus.LIVE || a.status === AuctionStatus.CLOSING
  );
  const upcomingAuctions = AUCTIONS.filter(
    (a) => a.status === AuctionStatus.UPCOMING
  );
  const pastAuctions = AUCTIONS.filter(
    (a) => a.status === AuctionStatus.ENDED
  );

  // Get auction works
  const auctionWorks = WORKS.filter(
    (w) => w.availability === WorkAvailability.AUCTION
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs items={[{ label: 'Auctions' }]} className="mb-8" />
            <SectionHeader
              title="Auctions"
              subtitle="Bid"
              description="Our curated auctions feature exceptional works from established and emerging Chinese artists. Each piece has been authenticated and evaluated by our expert team."
            />
          </div>
        </section>

        {/* Live Auctions */}
        {liveAuctions.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                Live Auctions
              </h2>
              <div className="space-y-8">
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} variant="hero" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Current Lots */}
        {auctionWorks.length > 0 && (
          <section className="py-20 px-6 lg:px-12">
            <div className="max-w-[1440px] mx-auto">
              <SectionHeader
                title="Current Lots"
                subtitle="Bid Now"
                description="Exceptional works available for bidding in our live auctions."
                className="mb-12"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {auctionWorks.map((work) => (
                  <WorkCard key={work.id} work={work} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Auctions */}
        {upcomingAuctions.length > 0 && (
          <section className="py-20 px-6 lg:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                Upcoming Auctions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} variant="default" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-12 text-center">
              How Our Auctions Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B83A2F]/10 text-[#B83A2F] rounded-full flex items-center justify-center mx-auto mb-6 font-serif text-2xl font-semibold">
                  1
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-3">
                  Browse & Register
                </h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  Explore our curated auctions and create an account to bid. Registration is free and required for participation.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B83A2F]/10 text-[#B83A2F] rounded-full flex items-center justify-center mx-auto mb-6 font-serif text-2xl font-semibold">
                  2
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-3">
                  Place Your Bids
                </h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  Bid on works that interest you. Set maximum bids for automatic bidding, or bid manually in real-time.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B83A2F]/10 text-[#B83A2F] rounded-full flex items-center justify-center mx-auto mb-6 font-serif text-2xl font-semibold">
                  3
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-3">
                  Win & Collect
                </h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  If you win, we handle payment processing and shipping. Your new acquisition will be carefully packaged and insured.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 px-6 lg:px-12 bg-[#F5F4F2]">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">100%</p>
                <p className="text-sm text-[#7A7A78]">Authenticated Works</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">Secure</p>
                <p className="text-sm text-[#7A7A78]">Payment Processing</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">Insured</p>
                <p className="text-sm text-[#7A7A78]">Shipping Worldwide</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">Expert</p>
                <p className="text-sm text-[#7A7A78]">Curatorial Team</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
