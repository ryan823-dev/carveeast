'use client';

import Link from 'next/link';
import { getFeaturedWorks, formatPrice, getWorkDisplayAuthors } from '@/lib/data';
import { PlaceholderImage } from './PlaceholderImage';

export function FeaturedWorks() {
  const works = getFeaturedWorks();

  return (
    <section className="py-32 bg-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
              Featured Works
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight">
              Curator&apos;s Selection
            </h2>
          </div>
          <Link
            href="/works"
            className="text-sm text-[#4A4A48] hover:text-[#1A1A1A] transition-colors border-b border-[#4A4A48] pb-0.5 hover:border-[#1A1A1A]"
          >
            View All Works
          </Link>
        </div>

        {/* Works Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <Link
              key={work.id}
              href={`/works/${work.slug}`}
              className={`group block ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`bg-[#EFEDEA] mb-6 overflow-hidden ${index === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                <PlaceholderImage 
                  text={work.title.cn?.[0] || work.title.en[0]}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-[#7A7A78] uppercase tracking-[0.2em]">
                  {getWorkDisplayAuthors(work)}
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
                  {work.title.en}
                </h3>
                <p className="text-sm text-[#4A4A48]">
                  {work.medium} · {work.year}
                </p>
                {work.price && (
                  <p className="font-serif text-lg text-[#1A1A1A] pt-2">
                    {formatPrice(work.price.amount, work.price.currency)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
