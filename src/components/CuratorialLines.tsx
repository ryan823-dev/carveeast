'use client';

import Link from 'next/link';
import { CURATORIAL_LINES } from '@/lib/data';
import { PlaceholderImage } from './PlaceholderImage';

export function CuratorialLines() {
  return (
    <section className="py-32 bg-[#F5F4F2]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
            Curatorial Focus
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
            Core Disciplines
          </h2>
          <p className="text-lg text-[#4A4A48] leading-relaxed">
            Our collection is organized around core disciplines, each representing 
            a distinct tradition within Chinese artistic practice.
          </p>
        </div>

        {/* Lines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E4E2]">
          {CURATORIAL_LINES.map((line, index) => (
            <Link
              key={line.id}
              href={`/works?discipline=${line.slug}`}
              className="group bg-[#F5F4F2] p-8 lg:p-12 hover:bg-[#FAFAF8] transition-colors duration-500"
            >
              <div className="flex flex-col h-full">
                {/* Number */}
                <span className="text-xs text-[#9A9A98] mb-8">
                  0{index + 1}
                </span>

                {/* Image */}
                <div className="aspect-[16/10] bg-[#EFEDEA] mb-8 overflow-hidden">
                  <PlaceholderImage 
                    text={line.name.cn[0]} 
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
                      {line.name.en}
                    </h3>
                    <span className="text-sm text-[#7A7A78] font-serif italic">
                      {line.name.cn}
                    </span>
                  </div>
                  <p className="text-[#4A4A48] leading-relaxed mb-6">
                    {line.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-[#7A7A78] pt-6 border-t border-[#E5E4E2]">
                  <span>{line.artistCount} Artists</span>
                  <span>{line.workCount} Works</span>
                  {!line.isCore && <span className="text-[#B83A2F]">Extension</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
