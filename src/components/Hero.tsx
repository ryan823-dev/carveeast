'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAFAF8] pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-2/3 h-full bg-[#EFEDEA]">
          {/* Placeholder for hero image */}
          <div className="w-full h-full bg-gradient-to-br from-[#E5E4E2] to-[#D5D4D2] flex items-center justify-center">
            <span className="text-[#9A9A98] font-serif text-6xl">印</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-2xl py-20">
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-8">
            Discover Contemporary Chinese Art
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1A1A1A] leading-[1.1] mb-8">
            Where Tradition
            <br />
            Meets Expression
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[#4A4A48] leading-relaxed mb-12 max-w-lg">
            CarveEast connects discerning collectors with exceptional Chinese artists. 
            Explore seal engraving, calligraphy, ceramics, and ink painting—
            each work carrying centuries of tradition into contemporary practice.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/artists"
              className="inline-flex items-center bg-[#1A1A1A] text-[#FAFAF8] px-8 py-4 text-sm tracking-wide hover:bg-[#4A4A48] transition-colors duration-300"
            >
              Explore Artists
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-colors duration-300"
            >
              Browse Works
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 pt-8 border-t border-[#E5E4E2] grid grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-3xl font-semibold text-[#1A1A1A]">35+</p>
              <p className="text-sm text-[#7A7A78] mt-1">Curated Artists</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-[#1A1A1A]">200+</p>
              <p className="text-sm text-[#7A7A78] mt-1">Authentic Works</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-[#1A1A1A]">12</p>
              <p className="text-sm text-[#7A7A78] mt-1">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-[#9A9A98]">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-[#E5E4E2] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1A1A1A] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
