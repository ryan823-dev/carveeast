'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { search, SearchResult, getFilterOptions } from '@/lib/search';

interface AdvancedSearchProps {
  onResults?: (results: SearchResult[]) => void;
  className?: string;
}

export function AdvancedSearch({ onResults, className }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});
  const [yearRange, setYearRange] = useState<{ from?: number; to?: number }>({});
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc'>('relevance');

  const filterOptions = getFilterOptions();

  const performSearch = useCallback(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let searchResults = search(query, { limit: 50 });

      // Apply type filter
      if (selectedTypes.length > 0) {
        searchResults = searchResults.filter((r) =>
          selectedTypes.includes(r.type)
        );
      }

      // Apply discipline filter
      if (selectedDisciplines.length > 0) {
        searchResults = searchResults.filter((r) =>
          selectedDisciplines.some((d) =>
            r.metadata.discipline?.toLowerCase().includes(d.toLowerCase())
          )
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          searchResults.sort((a, b) => {
            const priceA = parseFloat(a.metadata.price?.replace(/[^0-9.]/g, '') || '0');
            const priceB = parseFloat(b.metadata.price?.replace(/[^0-9.]/g, '') || '0');
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          searchResults.sort((a, b) => {
            const priceA = parseFloat(a.metadata.price?.replace(/[^0-9.]/g, '') || '0');
            const priceB = parseFloat(b.metadata.price?.replace(/[^0-9.]/g, '') || '0');
            return priceB - priceA;
          });
          break;
        case 'year-desc':
          searchResults.sort((a, b) => {
            const yearA = parseInt(a.metadata.year || '0');
            const yearB = parseInt(b.metadata.year || '0');
            return yearB - yearA;
          });
          break;
        case 'year-asc':
          searchResults.sort((a, b) => {
            const yearA = parseInt(a.metadata.year || '0');
            const yearB = parseInt(b.metadata.year || '0');
            return yearA - yearB;
          });
          break;
      }

      setResults(searchResults);
      onResults?.(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedTypes, selectedDisciplines, sortBy, onResults]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleDiscipline = (discipline: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedDisciplines([]);
    setPriceRange({});
    setYearRange({});
    setSortBy('relevance');
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedDisciplines.length > 0 ||
    priceRange.min !== undefined ||
    priceRange.max !== undefined ||
    yearRange.from !== undefined ||
    yearRange.to !== undefined ||
    sortBy !== 'relevance';

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artists, works, stories..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-[#E5E4E2] text-lg focus:outline-none focus:border-[#B83A2F] transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A98]" />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-[#9A9A98] hover:text-[#1A1A1A]" />
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 border transition-colors',
            isOpen || hasActiveFilters
              ? 'border-[#B83A2F] text-[#B83A2F]'
              : 'border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A]'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 px-1.5 py-0.5 bg-[#B83A2F] text-white text-xs rounded-full">
              {selectedTypes.length + selectedDisciplines.length}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none px-4 py-2 pr-10 border border-[#E5E4E2] text-[#4A4A48] focus:outline-none focus:border-[#B83A2F] bg-white cursor-pointer"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest First</option>
            <option value="year-asc">Year: Oldest First</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A98] pointer-events-none" />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#B83A2F] hover:underline"
          >
            Clear all
          </button>
        )}

        <span className="ml-auto text-sm text-[#7A7A78]">
          {results.length} results
        </span>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white border border-[#E5E4E2] p-6 space-y-6">
          {/* Type Filter */}
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-3">Type</h4>
            <div className="flex flex-wrap gap-2">
              {['artist', 'work', 'story'].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={cn(
                    'px-3 py-1.5 text-sm border capitalize transition-colors',
                    selectedTypes.includes(type)
                      ? 'border-[#B83A2F] bg-[#B83A2F]/5 text-[#B83A2F]'
                      : 'border-[#E5E4E2] text-[#4A4A48] hover:border-[#B83A2F]'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Discipline Filter */}
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-3">Discipline</h4>
            <div className="flex flex-wrap gap-2">
              {filterOptions.disciplines.map((discipline) => (
                <button
                  key={discipline.value}
                  onClick={() => toggleDiscipline(discipline.value)}
                  className={cn(
                    'px-3 py-1.5 text-sm border transition-colors',
                    selectedDisciplines.includes(discipline.value)
                      ? 'border-[#B83A2F] bg-[#B83A2F]/5 text-[#B83A2F]'
                      : 'border-[#E5E4E2] text-[#4A4A48] hover:border-[#B83A2F]'
                  )}
                >
                  {discipline.label}
                </button>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-3">Year Created</h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="From"
                value={yearRange.from || ''}
                onChange={(e) =>
                  setYearRange({ ...yearRange, from: parseInt(e.target.value) || undefined })
                }
                className="w-24 px-3 py-2 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
              />
              <span className="text-[#7A7A78]">-</span>
              <input
                type="number"
                placeholder="To"
                value={yearRange.to || ''}
                onChange={(e) =>
                  setYearRange({ ...yearRange, to: parseInt(e.target.value) || undefined })
                }
                className="w-24 px-3 py-2 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F]" />
        </div>
      )}
    </div>
  );
}
