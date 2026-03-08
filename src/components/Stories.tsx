'use client';

import Link from 'next/link';
import { getFeaturedStories } from '@/lib/data';

export function Stories() {
  const stories = getFeaturedStories();

  return (
    <section className="py-32 bg-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
              Stories & Insights
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight">
              The Journal
            </h2>
          </div>
          <Link
            href="/stories"
            className="text-sm text-[#4A4A48] hover:text-[#1A1A1A] transition-colors border-b border-[#4A4A48] pb-0.5 hover:border-[#1A1A1A]"
          >
            View All Stories
          </Link>
        </div>

        {/* Stories Grid - Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Story */}
          {stories[0] && (
            <div className="lg:col-span-8">
              <Link href={`/stories/${stories[0].slug}`} className="group block">
                <div className="aspect-[16/9] bg-[#EFEDEA] mb-8 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#E5E4E2] to-[#D5D4D2] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-[#9A9A98] font-serif text-8xl">文</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-[#7A7A78]">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B83A2F]">
                      {stories[0].category}
                    </span>
                    <span>·</span>
                    <span>{stories[0].readTime} min read</span>
                  </div>
                  <h3 className="font-serif text-3xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
                    {stories[0].title}
                  </h3>
                  <p className="text-lg text-[#4A4A48] italic">
                    {stories[0].subtitle}
                  </p>
                  <p className="text-[#4A4A48] leading-relaxed max-w-2xl">
                    {stories[0].excerpt}
                  </p>
                </div>
              </Link>
            </div>
          )}

          {/* Side Stories */}
          <div className="lg:col-span-4 space-y-8">
            {stories.slice(1).map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group block pb-8 border-b border-[#E5E4E2] last:border-0"
              >
                <div className="flex items-center gap-4 text-sm text-[#7A7A78] mb-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#B83A2F]">
                    {story.category}
                  </span>
                  <span>·</span>
                  <span>{story.readTime} min read</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-[#4A4A48] line-clamp-2">
                  {story.excerpt}
                </p>
              </Link>
            ))}

            {/* More Stories CTA */}
            <Link
              href="/stories"
              className="block py-6 px-8 bg-[#F5F4F2] hover:bg-[#EFEDEA] transition-colors group"
            >
              <p className="text-sm text-[#4A4A48] mb-2">Explore more insights</p>
              <p className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
                Browse All Stories →
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
