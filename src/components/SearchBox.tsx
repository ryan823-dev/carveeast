'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Loader2 } from 'lucide-react';
import { search, getSearchSuggestions, SearchResult } from '@/lib/search';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  showSuggestions?: boolean;
  onResultClick?: () => void;
}

export function SearchBox({
  className,
  placeholder = 'Search artists, works, stories...',
  showSuggestions = true,
  onResultClick,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle input changes
  useEffect(() => {
    if (!showSuggestions) return;

    const timer = setTimeout(() => {
      if (query.length >= 2) {
        setIsLoading(true);
        const results = getSearchSuggestions(query, 5);
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query, showSuggestions]);

  // Handle clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          window.location.href = suggestions[selectedIndex].href;
          onResultClick?.();
        } else if (query) {
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
      onResultClick?.();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artist':
        return '👤';
      case 'work':
        return '🎨';
      case 'story':
        return '📖';
      default:
        return '🔍';
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-[#E5E4E2] text-[#1A1A1A] placeholder:text-[#9A9A98] focus:outline-none focus:border-[#B83A2F] transition-colors"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A98]" />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A98] animate-spin" />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-[#9A9A98] hover:text-[#1A1A1A]" />
          </button>
        ) : null}
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E4E2] shadow-lg z-50 max-h-96 overflow-auto">
          {suggestions.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#7A7A78] border-b border-[#E5E4E2]">
                Suggestions
              </div>
              {suggestions.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() => {
                    setIsOpen(false);
                    onResultClick?.();
                  }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 hover:bg-[#F5F4F2] transition-colors',
                    selectedIndex === index && 'bg-[#F5F4F2]'
                  )}
                >
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1A1A1A] truncate">
                      {result.title}
                    </p>
                    <p className="text-sm text-[#7A7A78] truncate">
                      {result.subtitle || result.metadata.discipline || result.metadata.category}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.1em] text-[#9A9A98]">
                    {result.type}
                  </span>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => onResultClick?.()}
                className="flex items-center justify-center gap-2 px-4 py-3 border-t border-[#E5E4E2] text-[#B83A2F] hover:bg-[#F5F4F2] transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>See all results for &ldquo;{query}&rdquo;</span>
              </Link>
            </>
          ) : (
            <div className="px-4 py-8 text-center text-[#7A7A78]">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
