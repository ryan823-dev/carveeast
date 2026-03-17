'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedArtists } from '@/lib/data';

export function FeaturedArtists() {
  const artists = getFeaturedArtists();

  return (
    <section className="py-32 bg-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
              Featured Artists
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight">
              Masters of the Craft
            </h2>
          </div>
          <Link
            href="/artists"
            className="text-sm text-[#4A4A48] hover:text-[#1A1A1A] transition-colors border-b border-[#4A4A48] pb-0.5 hover:border-[#1A1A1A]"
          >
            View All Artists
          </Link>
        </div>

        {/* Artists Grid - Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Artist - Large */}
          {artists[0] && (
            <div className="lg:col-span-7">
              <Link href={`/artists/${artists[0].slug}`} className="group block">
                <div className="aspect-[4/5] bg-[#EFEDEA] mb-6 overflow-hidden">
                  {artists[0].portraitImage ? (
                    <img
                      src={artists[0].portraitImage}
                      alt={artists[0].name.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E5E4E2] to-[#D5D4D2] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <span className="text-[#9A9A98] font-serif text-8xl">{artists[0].name.cn?.[0] || artists[0].name.en[0]}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7A7A78]">
                    {artists[0].disciplines.map(d => d.replace(/-/g, ' ')).join(' · ')}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
                    {artists[0].name.en}
                  </h3>
                  <p className="text-[#4A4A48] leading-relaxed max-w-md">
                    {artists[0].shortBio}
                  </p>
                </div>
              </Link>
            </div>
          )}

          {/* Other Artists - Stacked */}
          <div className="lg:col-span-5 space-y-8">
            {artists.slice(1).map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group flex gap-6"
              >
                <div className="w-32 h-40 bg-[#EFEDEA] flex-shrink-0 overflow-hidden">
                  {artist.portraitImage ? (
                    <img
                      src={artist.portraitImage}
                      alt={artist.name.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E5E4E2] to-[#D5D4D2] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="text-[#9A9A98] font-serif text-4xl">{artist.name.cn?.[0] || artist.name.en[0]}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7A7A78] mb-2">
                    {artist.primaryDiscipline.replace(/-/g, ' ')}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors mb-2">
                    {artist.name.en}
                  </h3>
                  <p className="text-sm text-[#4A4A48] line-clamp-2">
                    {artist.shortBio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
