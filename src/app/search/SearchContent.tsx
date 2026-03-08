'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { search, SearchResult } from '@/lib/search';
import { SearchBox } from '@/components/SearchBox';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { cn } from '@/lib/utils';

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<string>(typeFilter);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const searchResults = search(query, {
        type: activeType as any || undefined,
      });
      setResults(searchResults);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [query, activeType]);

  const getTypeCount = (type: string) => {
    return search(query, { type: type as any }).length;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artist': return '👤';
      case 'work': return '🎨';
      case 'story': return '📖';
      default: return '🔍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'artist': return 'Artists';
      case 'work': return 'Works';
      case 'story': return 'Stories';
      default: return type;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Search Header */}
      <section className="pt-32 pb-12 border-b border-[#E5E4E2]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-6">
              Search Results
            </h1>
            <SearchBox
              placeholder="Search artists, works, stories..."
              showSuggestions={false}
            />
            {query && (
              <p className="mt-4 text-[#7A7A78]">
                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#1A1A1A]">Filter by Type</h3>
                  {activeType && (
                    <button
                      onClick={() => setActiveType('')}
                      className="text-sm text-[#B83A2F] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {['artist', 'work', 'story'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(activeType === type ? '' : type)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                        activeType === type
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-white hover:bg-[#F5F4F2]'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span>{getTypeIcon(type)}</span>
                        <span className="capitalize">{getTypeLabel(type)}</span>
                      </span>
                      <span className={cn(
                        'text-sm',
                        activeType === type ? 'text-white/70' : 'text-[#7A7A78]'
                      )}>
                        {getTypeCount(type)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Popular Searches */}
                <div className="mt-8 pt-8 border-t border-[#E5E4E2]">
                  <h3 className="font-medium text-[#1A1A1A] mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['seal engraving', 'Yixing', 'calligraphy', 'under $1000', 'auction'].map((term) => (
                      <Link
                        key={term}
                        href={`/search?q=${encodeURIComponent(term)}`}
                        className="px-3 py-1.5 text-sm bg-white border border-[#E5E4E2] text-[#4A4A48] hover:border-[#B83A2F] hover:text-[#B83A2F] transition-colors"
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F]"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-6">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      className="group flex gap-6 p-4 bg-white border border-[#E5E4E2] hover:border-[#B83A2F] transition-colors"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-[#EFEDEA] overflow-hidden">
                        {result.image ? (
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <PlaceholderImage
                            text={result.title[0]}
                            className="w-full h-full"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.1em] text-[#B83A2F] mb-1">
                              {result.type}
                            </p>
                            <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
                              {result.title}
                            </h3>
                            {result.subtitle && (
                              <p className="text-sm text-[#7A7A78] mt-1">
                                {result.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-[#4A4A48] mt-2 line-clamp-2">
                          {result.description}
                        </p>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#7A7A78]">
                          {Object.entries(result.metadata).slice(0, 3).map(([key, value]) => (
                            <span key={key} className="flex items-center gap-1">
                              <span className="capitalize">{key}:</span>
                              <span className="text-[#4A4A48]">{value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query ? (
                <div className="text-center py-24">
                  <Search className="w-12 h-12 text-[#E5E4E2] mx-auto mb-4" />
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                    No results found
                  </h3>
                  <p className="text-[#7A7A78] mb-6">
                    We couldn&apos;t find anything matching &ldquo;{query}&rdquo;
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-[#7A7A78]">Try:</p>
                    <ul className="text-sm text-[#4A4A48] space-y-1">
                      <li>Checking your spelling</li>
                      <li>Using more general keywords</li>
                      <li>Trying a different category</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-24">
                  <Search className="w-12 h-12 text-[#E5E4E2] mx-auto mb-4" />
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                    Start your search
                  </h3>
                  <p className="text-[#7A7A78]">
                    Enter keywords above to search artists, works, and stories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
