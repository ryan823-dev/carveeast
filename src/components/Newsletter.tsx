'use client';

import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-32 bg-[#F5F4F2]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
            Stay Connected
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-[#4A4A48] leading-relaxed mb-12 max-w-2xl mx-auto">
            Receive curated stories, new artist announcements, auction previews, 
            and collecting insights delivered to your inbox.
          </p>

          {/* Form */}
          {status === 'success' ? (
            <div className="bg-[#FAFAF8] p-12 border border-[#E5E4E2]">
              <p className="font-serif text-2xl text-[#1A1A1A] mb-4">
                Welcome to CarveEast
              </p>
              <p className="text-[#4A4A48]">
                Thank you for subscribing. Look for our next newsletter in your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-[#FAFAF8] border border-[#E5E4E2] text-[#1A1A1A] placeholder:text-[#9A9A98] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#1A1A1A] text-[#FAFAF8] text-sm tracking-wide hover:bg-[#4A4A48] transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-[#7A7A78] mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </form>
          )}

          {/* Benefits */}
          <div className="mt-16 pt-16 border-t border-[#E5E4E2] grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-lg text-[#1A1A1A] mb-2">Early Access</p>
              <p className="text-sm text-[#4A4A48]">Preview new works before public release</p>
            </div>
            <div>
              <p className="font-serif text-lg text-[#1A1A1A] mb-2">Expert Insights</p>
              <p className="text-sm text-[#4A4A48]">Curatorial perspectives on collecting</p>
            </div>
            <div>
              <p className="font-serif text-lg text-[#1A1A1A] mb-2">Auction Alerts</p>
              <p className="text-sm text-[#4A4A48]">Be notified when bidding opens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
