import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact | CarveEast',
  description: 'Get in touch with the CarveEast team. We are here to help with inquiries about artists, works, and the collecting process.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <Breadcrumbs items={[{ label: 'Contact' }]} className="mb-8" />
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-6">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-[#4A4A48] leading-relaxed">
                Have a question about a work, an artist, or the collecting process? We are here to help. Fill out the form below and we will respond within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <ContactForm />

              {/* Contact Info */}
              <div className="space-y-12">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-4">
                    Email Us
                  </h3>
                  <p className="text-[#4A4A48] mb-2">
                    For general inquiries:
                  </p>
                  <a href="mailto:hello@carveeast.com" className="text-[#B83A2F] hover:underline">
                    hello@carveeast.com
                  </a>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-4">
                    Collector Services
                  </h3>
                  <p className="text-[#4A4A48] mb-2">
                    For personalized collecting guidance:
                  </p>
                  <a href="mailto:collectors@carveeast.com" className="text-[#B83A2F] hover:underline">
                    collectors@carveeast.com
                  </a>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-4">
                    Artist Submissions
                  </h3>
                  <p className="text-[#4A4A48] mb-2">
                    For artists interested in joining our collection:
                  </p>
                  <a href="mailto:artists@carveeast.com" className="text-[#B83A2F] hover:underline">
                    artists@carveeast.com
                  </a>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-4">
                    Response Time
                  </h3>
                  <p className="text-[#4A4A48]">
                    We aim to respond to all inquiries within 24 hours. For complex questions about specific works or artists, please allow up to 48 hours for a thorough response.
                  </p>
                </div>

                <div className="p-6 bg-[#F5F4F2]">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-2">
                    Prefer to Schedule a Call?
                  </h3>
                  <p className="text-[#4A4A48] text-sm mb-4">
                    We offer private consultations for serious collectors. Schedule a video call with our team to discuss your collecting goals.
                  </p>
                  <button className="text-[#B83A2F] font-medium hover:underline">
                    Schedule a Consultation
                  </button>
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
