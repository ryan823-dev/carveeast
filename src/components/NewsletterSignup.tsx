'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'footer';
  className?: string;
}

export function NewsletterSignup({
  variant = 'inline',
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const interestOptions = [
    { value: 'new-works', label: 'New Works' },
    { value: 'auctions', label: 'Auctions' },
    { value: 'artist-stories', label: 'Artist Stories' },
    { value: 'collecting-guides', label: 'Collecting Guides' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store subscription locally for now
    const subscriptions = JSON.parse(localStorage.getItem('carve-east-newsletter') || '[]');
    subscriptions.push({
      email,
      interests,
      subscribedAt: new Date().toISOString(),
    });
    localStorage.setItem('carve-east-newsletter', JSON.stringify(subscriptions));

    setStatus('success');
    setEmail('');
    setInterests([]);
  };

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  if (status === 'success') {
    return (
      <div className={cn('text-center py-8', className)}>
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h4 className="font-serif text-xl text-[#1A1A1A] mb-2">
          You&apos;re Subscribed!
        </h4>
        <p className="text-[#7A7A78]">
          Thank you for joining. Watch your inbox for updates.
        </p>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-4 py-2 bg-[#B83A2F] text-white hover:bg-[#A32F24] transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
        )}
      </form>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('bg-[#1A1A1A] p-8 text-white', className)}>
        <h3 className="font-serif text-2xl mb-2">Stay Updated</h3>
        <p className="text-white/70 mb-6">
          Get notified about new works, auctions, and stories.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#B83A2F] text-white hover:bg-[#A32F24] transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Subscribe
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // Inline variant (default)
  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Subscribe
            </>
          )}
        </button>
      </div>

      {/* Interests */}
      <div className="mt-4">
        <p className="text-sm text-[#7A7A78] mb-2">I&apos;m interested in:</p>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleInterest(option.value)}
              className={cn(
                'px-3 py-1.5 text-sm border transition-colors',
                interests.includes(option.value)
                  ? 'border-[#B83A2F] bg-[#B83A2F]/5 text-[#B83A2F]'
                  : 'border-[#E5E4E2] text-[#4A4A48] hover:border-[#B83A2F]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-4">{errorMessage}</p>
      )}
    </form>
  );
}
