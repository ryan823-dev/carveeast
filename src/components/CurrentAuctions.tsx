'use client';

import Link from 'next/link';
import { AUCTIONS, formatPrice } from '@/lib/data';
import { AuctionStatus } from '@/lib/types';
import { PlaceholderImage } from './PlaceholderImage';

function getStatusLabel(status: AuctionStatus): string {
  const labels: Record<AuctionStatus, string> = {
    [AuctionStatus.UPCOMING]: 'Coming Soon',
    [AuctionStatus.LIVE]: 'Live Now',
    [AuctionStatus.CLOSING]: 'Closing Soon',
    [AuctionStatus.ENDED]: 'Ended',
  };
  return labels[status] || status;
}

function getStatusColor(status: AuctionStatus): string {
  const colors: Record<AuctionStatus, string> = {
    [AuctionStatus.UPCOMING]: 'bg-[#7A7A78]',
    [AuctionStatus.LIVE]: 'bg-[#B83A2F]',
    [AuctionStatus.CLOSING]: 'bg-[#B83A2F]',
    [AuctionStatus.ENDED]: 'bg-[#4A4A48]',
  };
  return colors[status] || 'bg-[#7A7A78]';
}

export function CurrentAuctions() {
  return (
    <section className="py-32 bg-[#1A1A1A] text-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B83A2F] mb-4">
              Current Auctions
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
              Bid on Exceptional Works
            </h2>
          </div>
          <Link
            href="/auctions"
            className="text-sm text-[#9A9A98] hover:text-[#FAFAF8] transition-colors border-b border-[#9A9A98] pb-0.5 hover:border-[#FAFAF8]"
          >
            View All Auctions
          </Link>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {AUCTIONS.map((auction) => (
            <Link
              key={auction.id}
              href={`/auctions/${auction.slug}`}
              className="group block bg-[#2D2D2D] hover:bg-[#3D3D3D] transition-colors duration-300"
            >
              {/* Cover Image */}
              <div className="aspect-[16/9] bg-[#4A4A48] relative overflow-hidden">
                <PlaceholderImage 
                  text="拍" 
                  className="w-full h-full"
                  bgColor="bg-gradient-to-br from-[#5A5A58] to-[#4A4A48]"
                  textColor="text-[#7A7A78]"
                />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <span className={`${getStatusColor(auction.status)} text-white text-xs uppercase tracking-[0.2em] px-4 py-2`}>
                    {getStatusLabel(auction.status)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-2 group-hover:text-[#B83A2F] transition-colors">
                  {auction.title}
                </h3>
                <p className="text-[#9A9A98] mb-6">
                  {auction.subtitle}
                </p>

                {/* Dates */}
                <div className="flex items-center justify-between pt-6 border-t border-[#4A4A48]">
                  <div>
                    <p className="text-xs text-[#7A7A78] uppercase tracking-[0.2em] mb-1">Starts</p>
                    <p className="text-sm">
                      {new Date(auction.startDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7A7A78] uppercase tracking-[0.2em] mb-1">Ends</p>
                    <p className="text-sm">
                      {new Date(auction.endDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
