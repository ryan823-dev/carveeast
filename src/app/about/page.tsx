import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PlaceholderImage } from '@/components/PlaceholderImage';

export const metadata = {
  title: 'About | CarveEast',
  description: 'Learn about CarveEast—our mission to connect discerning collectors with exceptional Chinese artists.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs items={[{ label: 'About' }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-6">
                Our Story
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight mb-8">
                Bridging Tradition and Contemporary Expression
              </h1>
              <p className="text-xl text-[#4A4A48] leading-relaxed">
                CarveEast was founded with a singular mission: to connect discerning collectors with exceptional Chinese artists working in traditional media. We believe that the ancient arts of seal engraving, calligraphy, and ink painting remain vital, relevant, and worthy of collection.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-6">
                  Our Mission
                </h2>
                <div className="space-y-4 text-[#4A4A48] leading-relaxed">
                  <p>
                    In an age of mass production and digital art, we champion the slow, deliberate practices of traditional Chinese craft. Each work in our collection represents thousands of hours of disciplined practice, a lifetime of study, and a unique artistic vision.
                  </p>
                  <p>
                    We exist to support these artists—many of whom are under-recognized outside of China—and to help collectors discover works that resonate on both aesthetic and cultural levels.
                  </p>
                  <p>
                    Our focus is on works under $5,000, making exceptional art accessible to serious collectors at every level. Whether you are acquiring your first piece or adding to an established collection, we are here to guide your journey.
                  </p>
                </div>
              </div>
              <div className="aspect-[4/3] bg-[#E5E4E2]">
                <PlaceholderImage className="w-full h-full" text="印" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B83A2F]/10 text-[#B83A2F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-3">
                  Authenticity First
                </h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  Every work we sell is authenticated and comes with provenance documentation. We stand behind every piece in our collection.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B83A2F]/10 text-[#B83A2F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-3">
                  Artist-Centered
                </h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  We prioritize fair compensation and recognition for our artists. Their success is our success.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B83A2F]/10 text-[#B83A2F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-3">
                  Education
                </h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  We believe informed collectors make better decisions. Our editorial content helps you understand the art you collect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curatorial Approach */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 aspect-[4/3] bg-[#E5E4E2]">
                <PlaceholderImage className="w-full h-full" text="刻" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-6">
                  Our Curatorial Approach
                </h2>
                <div className="space-y-4 text-[#4A4A48] leading-relaxed">
                  <p>
                    Our core focus is on four traditional disciplines: seal engraving (篆刻), calligraphy (书法), ink painting (水墨), and inscribed ceramics (刻铭紫砂陶瓷). These arts form the foundation of Chinese literati culture and continue to produce exceptional contemporary work.
                  </p>
                  <p>
                    We also selectively feature contemporary oil painting and printmaking by artists who engage meaningfully with Chinese aesthetic traditions. This expansion allows us to support innovative artists while maintaining our cultural focus.
                  </p>
                  <p>
                    Every artist in our collection has been personally vetted. We visit studios, examine work in person, and build relationships based on mutual respect and shared passion for these art forms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-12 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#E5E4E2] rounded-full mx-auto mb-4 overflow-hidden">
                  <PlaceholderImage className="w-full h-full" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                  David Chen
                </h3>
                <p className="text-sm text-[#B83A2F] mb-2">Founder & Director</p>
                <p className="text-sm text-[#7A7A78]">
                  Former curator with 15 years experience in Chinese art
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-[#E5E4E2] rounded-full mx-auto mb-4 overflow-hidden">
                  <PlaceholderImage className="w-full h-full" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                  Mei Lin
                </h3>
                <p className="text-sm text-[#B83A2F] mb-2">Head of Curation</p>
                <p className="text-sm text-[#7A7A78]">
                  Specialist in contemporary seal engraving and calligraphy
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-[#E5E4E2] rounded-full mx-auto mb-4 overflow-hidden">
                  <PlaceholderImage className="w-full h-full" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                  Sarah Park
                </h3>
                <p className="text-sm text-[#B83A2F] mb-2">Collector Relations</p>
                <p className="text-sm text-[#7A7A78]">
                  Dedicated to helping collectors build meaningful collections
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-6 lg:px-12 bg-[#1A1A1A]">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Have questions about our collection, an artist, or the collecting process? We are here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-[#B83A2F] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#982A1F] transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
