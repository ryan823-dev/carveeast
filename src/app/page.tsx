import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { FeaturedArtists } from '@/components/FeaturedArtists';
import { CuratorialLines } from '@/components/CuratorialLines';
import { CurrentAuctions } from '@/components/CurrentAuctions';
import { Stories } from '@/components/Stories';
import { WorksByPrice } from '@/components/WorksByPrice';
import { FeaturedWorks } from '@/components/FeaturedWorks';
import { WhyCollect } from '@/components/WhyCollect';
import { Newsletter } from '@/components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedArtists />
        <CuratorialLines />
        <CurrentAuctions />
        <Stories />
        <WorksByPrice />
        <FeaturedWorks />
        <WhyCollect />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
