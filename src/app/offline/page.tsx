'use client';

import { WifiOff, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 bg-[#F5F4F2] rounded-full flex items-center justify-center mx-auto mb-8">
          <WifiOff className="w-12 h-12 text-[#9A9A98]" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-[#7A7A78] text-lg mb-4">
          It looks like you&apos;ve lost your internet connection.
        </p>
        <p className="text-[#9A9A98] mb-8">
          Don&apos;t worry—some pages you&apos;ve visited before are still available.
          Try browsing the sections below or check your connection.
        </p>

        {/* Cached Pages */}
        <div className="bg-white border border-[#E5E4E2] p-6 mb-8 text-left">
          <h2 className="font-serif text-lg text-[#1A1A1A] mb-4">
            Available Offline
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 text-[#4A4A48] hover:text-[#B83A2F] transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Homepage
              </Link>
            </li>
            <li>
              <Link
                href="/artists"
                className="flex items-center gap-3 text-[#4A4A48] hover:text-[#B83A2F] transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Artists
              </Link>
            </li>
            <li>
              <Link
                href="/works"
                className="flex items-center gap-3 text-[#4A4A48] hover:text-[#B83A2F] transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/stories"
                className="flex items-center gap-3 text-[#4A4A48] hover:text-[#B83A2F] transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Stories
              </Link>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Tips */}
        <div className="mt-12 pt-8 border-t border-[#E5E4E2]">
          <h3 className="text-sm font-medium text-[#1A1A1A] mb-4">
            Troubleshooting Tips
          </h3>
          <ul className="text-sm text-[#7A7A78] space-y-2">
            <li>Check your Wi-Fi or cellular connection</li>
            <li>Try turning airplane mode on and off</li>
            <li>Restart your browser or device</li>
            <li>Check if other websites are loading</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
