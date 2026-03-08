'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Heart, Menu, X } from 'lucide-react';
import { SearchBox } from './SearchBox';
import { UserMenu } from './UserMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CartButton } from './CartButton';
import { getFollowCount } from '@/lib/follow';
import { getFavoritesCount } from '@/lib/favorites';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFollowCount(getFollowCount());
    setFavoritesCount(getFavoritesCount());
  }, []);

  // Update counts when menu opens
  useEffect(() => {
    if (mounted) {
      setFollowCount(getFollowCount());
      setFavoritesCount(getFavoritesCount());
    }
  }, [isMenuOpen, mounted]);

  const navLinks = [
    { href: '/artists', label: 'Artists' },
    { href: '/works', label: 'Works' },
    { href: '/auctions', label: 'Auctions' },
    { href: '/stories', label: 'Stories' },
    { href: '/about', label: 'About' },
  ];

  const userLinks = [
    { href: '/following', label: 'Following', icon: Heart, count: followCount },
    { href: '/favorites', label: 'My Collection', icon: Heart, count: favoritesCount },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E5E4E2]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#FAFAF8] font-serif text-lg font-semibold">C</span>
              </div>
              <span className="font-serif text-xl font-semibold text-[#1A1A1A] tracking-tight hidden sm:block">
                CarveEast
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#4A4A48] hover:text-[#1A1A1A] transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#4A4A48] hover:text-[#1A1A1A] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/following"
                className="p-2 text-[#4A4A48] hover:text-[#B83A2F] transition-colors relative"
                aria-label="Following"
              >
                <Heart className="w-5 h-5" />
                {mounted && followCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B83A2F] text-white text-[10px] flex items-center justify-center rounded-full">
                    {followCount > 9 ? '9+' : followCount}
                  </span>
                )}
              </Link>

              <LanguageSwitcher variant="minimal" />

              <CartButton />

              <UserMenu />

              <Link
                href="/contact"
                className="ml-2 text-sm bg-[#1A1A1A] text-[#FAFAF8] px-5 py-2.5 hover:bg-[#4A4A48] transition-colors duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FAFAF8] border-t border-[#E5E4E2] absolute top-full left-0 right-0">
            <nav className="px-6 py-8 space-y-6">
              {/* Search in mobile menu */}
              <div className="pb-6 border-b border-[#E5E4E2]">
                <SearchBox
                  placeholder="Search..."
                  showSuggestions={true}
                  onResultClick={() => setIsMenuOpen(false)}
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg text-[#1A1A1A] font-serif"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-[#E5E4E2] space-y-4">
                {userLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-[#4A4A48]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                    {link.count !== undefined && link.count > 0 && (
                      <span className="ml-auto px-2 py-0.5 bg-[#B83A2F] text-white text-xs rounded-full">
                        {link.count}
                      </span>
                    )}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  className="block w-full bg-[#1A1A1A] text-[#FAFAF8] py-3 text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-32"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl mx-4 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-[#1A1A1A]">Search</h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SearchBox
                placeholder="Search artists, works, stories..."
                showSuggestions={true}
                onResultClick={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
