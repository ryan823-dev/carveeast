'use client';

import { Shield, Users, Globe, Award } from 'lucide-react';

const trustPoints = [
  {
    icon: Shield,
    title: 'Authenticated Works',
    description: 'Every piece is verified for authenticity and provenance. We work directly with artists and their studios to ensure you receive genuine works with full documentation.',
  },
  {
    icon: Users,
    title: 'Artist Relationships',
    description: 'We build lasting relationships with our artists, visiting their studios and understanding their practice. This connection allows us to present their work with depth and integrity.',
  },
  {
    icon: Globe,
    title: 'Global Reach, Local Care',
    description: 'From secure international shipping to white-glove delivery, we handle every detail. Our packaging is designed specifically for delicate artworks.',
  },
  {
    icon: Award,
    title: 'Curated Excellence',
    description: 'Our selection process is rigorous. We evaluate artistic merit, technical mastery, and cultural significance to present only exceptional works.',
  },
];

export function WhyCollect() {
  return (
    <section className="py-32 bg-[#1A1A1A] text-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
            Why Collect Here
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Trusted by Collectors Worldwide
          </h2>
          <p className="text-lg text-[#9A9A98] leading-relaxed">
            CarveEast is more than a marketplace—we are a bridge between exceptional 
            Chinese artists and discerning collectors who value authenticity, craftsmanship, 
            and cultural significance.
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2D2D2D]">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="bg-[#1A1A1A] p-10 lg:p-12 hover:bg-[#2D2D2D] transition-colors duration-300"
            >
              <point.icon className="w-8 h-8 text-[#B83A2F] mb-6" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-semibold mb-4">
                {point.title}
              </h3>
              <p className="text-[#9A9A98] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-20 pt-20 border-t border-[#2D2D2D]">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-8 text-[#C4C4C4]">
              &ldquo;CarveEast introduced me to artists I would never have discovered otherwise. 
              The depth of their curation and the care they put into every interaction 
              has made collecting Chinese art an absolute pleasure.&rdquo;
            </p>
            <footer>
              <p className="text-[#FAFAF8] font-medium">Margaret Chen</p>
              <p className="text-sm text-[#7A7A78] mt-1">Collector, New York</p>
            </footer>
          </blockquote>
        </div>

        {/* Stats Row */}
        <div className="mt-20 pt-12 border-t border-[#2D2D2D] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#FAFAF8]">100%</p>
            <p className="text-sm text-[#7A7A78] mt-2">Authenticity Guaranteed</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#FAFAF8]">35+</p>
            <p className="text-sm text-[#7A7A78] mt-2">Verified Artists</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#FAFAF8]">12</p>
            <p className="text-sm text-[#7A7A78] mt-2">Countries Served</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#FAFAF8]">4.9</p>
            <p className="text-sm text-[#7A7A78] mt-2">Collector Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
