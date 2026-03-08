'use client';

import Link from 'next/link';
import { NewsletterSignup } from './NewsletterSignup';

export function Footer() {
  const footerLinks = {
    discover: [
      { href: '/artists', label: 'Artists' },
      { href: '/works', label: 'Works' },
      { href: '/auctions', label: 'Auctions' },
      { href: '/stories', label: 'Stories' },
    ],
    learn: [
      { href: '/about', label: 'About Us' },
      { href: '/collecting', label: 'Start Collecting' },
      { href: '/authenticity', label: 'Authenticity' },
      { href: '/shipping', label: 'Shipping & Returns' },
    ],
    connect: [
      { href: '/contact', label: 'Contact' },
      { href: '/artists/apply', label: 'Artist Application' },
      { href: '/press', label: 'Press' },
      { href: '/careers', label: 'Careers' },
    ],
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FAFAF8] flex items-center justify-center">
                <span className="text-[#1A1A1A] font-serif text-lg font-semibold">C</span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight">
                CarveEast
              </span>
            </Link>
            <p className="text-[#9A9A98] max-w-sm leading-relaxed mb-6">
              A curated platform connecting discerning collectors with exceptional Chinese artists.
              Discover seal engraving, calligraphy, ceramics, and ink painting.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A9A98] mb-3">
                Newsletter
              </h4>
              <NewsletterSignup variant="footer" />
            </div>

            <div className="flex gap-4">
              {['Instagram', 'WeChat', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-[#4A4A48] flex items-center justify-center text-xs text-[#9A9A98] hover:border-[#FAFAF8] hover:text-[#FAFAF8] transition-colors"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A9A98] mb-6">Discover</h4>
            <ul className="space-y-4">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#C4C4C4] hover:text-[#FAFAF8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A9A98] mb-6">Learn</h4>
            <ul className="space-y-4">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#C4C4C4] hover:text-[#FAFAF8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A9A98] mb-6">Connect</h4>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#C4C4C4] hover:text-[#FAFAF8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-[#2D2D2D] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#7A7A78]">
            © 2024 CarveEast. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-[#7A7A78]">
            <Link href="/privacy" className="hover:text-[#FAFAF8] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FAFAF8] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
