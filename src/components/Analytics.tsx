'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4 tracking
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsContent />
      </Suspense>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_path: window.location.pathname,
              send_page_view: false,
            });
          `,
        }}
      />
    </>
  );
}

// Custom event tracking
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
}

// E-commerce tracking
export const ecommerce = {
  // Track when user views a product
  viewItem: (item: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    currency?: string;
  }) => {
    trackEvent('view_item', {
      currency: item.currency || 'USD',
      value: item.price,
      items: [item],
    });
  },

  // Track when user adds item to wishlist/follows
  addToWishlist: (item: {
    id: string;
    name: string;
    category?: string;
  }) => {
    trackEvent('add_to_wishlist', {
      items: [item],
    });
  },

  // Track inquiry/purchase intent
  beginCheckout: (item: {
    id: string;
    name: string;
    price?: number;
    currency?: string;
  }) => {
    trackEvent('begin_checkout', {
      currency: item.currency || 'USD',
      value: item.price,
      items: [item],
    });
  },

  // Track search
  search: (searchTerm: string) => {
    trackEvent('search', {
      search_term: searchTerm,
    });
  },

  // Track artist follow
  followArtist: (artist: { id: string; name: string }) => {
    trackEvent('follow_artist', {
      artist_id: artist.id,
      artist_name: artist.name,
    });
  },

  // Track auction bid
  placeBid: (data: {
    auctionId: string;
    lotId: string;
    amount: number;
    currency: string;
  }) => {
    trackEvent('place_bid', {
      auction_id: data.auctionId,
      lot_id: data.lotId,
      value: data.amount,
      currency: data.currency,
    });
  },
};

// User engagement tracking
export const engagement = {
  // Track time on page
  trackTimeOnPage: (seconds: number) => {
    trackEvent('time_on_page', {
      seconds,
      minutes: Math.floor(seconds / 60),
    });
  },

  // Track scroll depth
  trackScrollDepth: (percentage: number) => {
    trackEvent('scroll_depth', {
      percentage,
    });
  },

  // Track outbound links
  trackOutboundLink: (url: string, label?: string) => {
    trackEvent('outbound_link', {
      url,
      label,
    });
  },

  // Track file downloads
  trackDownload: (fileName: string, fileExtension: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_extension: fileExtension,
    });
  },
};

// Hook for scroll depth tracking
export function useScrollDepthTracking() {
  useEffect(() => {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        milestones.forEach((milestone) => {
          if (maxScroll >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            engagement.trackScrollDepth(milestone);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// Hook for time on page tracking
export function useTimeOnPageTracking() {
  useEffect(() => {
    let startTime = Date.now();
    const intervals = [30, 60, 120, 300]; // seconds
    const tracked = new Set<number>();

    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);

      intervals.forEach((threshold) => {
        if (seconds >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          engagement.trackTimeOnPage(threshold);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
