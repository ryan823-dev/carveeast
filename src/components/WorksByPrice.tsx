'use client';

import Link from 'next/link';
import { PRICE_RANGES, getWorksByPriceRange, formatPrice } from '@/lib/data';
import { useState } from 'react';
import { WorkCard } from './WorkCard';

export function WorksByPrice() {
  const [activeRange, setActiveRange] = useState(PRICE_RANGES[0].id);
  const works = getWorksByPriceRange(activeRange);

  return (
    <section className="py-32 bg-[#F5F4F2]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
            Collect by Investment Level
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
            Works at Every Level
          </h2>
          <p className="text-lg text-[#4A4A48] leading-relaxed">
            Whether you are beginning your collection or acquiring masterworks, 
            discover pieces matched to your collecting goals.
          </p>
        </div>

        {/* Price Range Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[#E5E4E2] pb-6">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => setActiveRange(range.id)}
              className={`px-6 py-3 text-sm transition-all duration-300 ${
                activeRange === range.id
                  ? 'bg-[#1A1A1A] text-[#FAFAF8]'
                  : 'bg-transparent text-[#4A4A48] hover:bg-[#EFEDEA]'
              }`}
            >
              <span className="font-medium">{range.labelEn}</span>
              <span className="text-xs ml-2 opacity-70">
                {formatPrice(range.min, 'USD')} - {range.max ? formatPrice(range.max, 'USD') : '+'}
              </span>
            </button>
          ))}
        </div>

        {/* Active Range Description */}
        <div className="mb-12">
          <p className="text-[#4A4A48]">
            {PRICE_RANGES.find(r => r.id === activeRange)?.description}
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} variant="default" />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-[#1A1A1A] hover:text-[#B83A2F] transition-colors border-b border-[#1A1A1A] hover:border-[#B83A2F] pb-1"
          >
            Browse All Works
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
