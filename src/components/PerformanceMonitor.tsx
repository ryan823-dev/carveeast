'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    // Only run in production and if Performance API is available
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Check if PerformanceObserver is supported
    if (!('PerformanceObserver' in window)) {
      return;
    }

    const newMetrics: PerformanceMetrics = {};

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcp) {
          newMetrics.fcp = Math.round(fcp.startTime);
          setMetrics((prev) => ({ ...prev, fcp: newMetrics.fcp }));
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // FCP not supported
    }

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        newMetrics.lcp = Math.round(lastEntry.startTime);
        setMetrics((prev) => ({ ...prev, lcp: newMetrics.lcp }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as PerformanceEventTiming;
        if (firstEntry) {
          newMetrics.fid = Math.round(firstEntry.processingStart - firstEntry.startTime);
          setMetrics((prev) => ({ ...prev, fid: newMetrics.fid }));
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        newMetrics.cls = Math.round(clsValue * 1000) / 1000;
        setMetrics((prev) => ({ ...prev, cls: newMetrics.cls }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }

    // Time to First Byte
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        newMetrics.ttfb = Math.round(navigation.responseStart - navigation.startTime);
        setMetrics((prev) => ({ ...prev, ttfb: newMetrics.ttfb }));
      }
    } catch (e) {
      // TTFB not available
    }

    // Log metrics to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Performance Metrics:', newMetrics);
    }

    // Send metrics to analytics (placeholder)
    const sendMetrics = () => {
      if (Object.keys(newMetrics).length > 0) {
        // TODO: Send to your analytics service
        // Example: analytics.track('web_vitals', newMetrics);
      }
    };

    // Send after page is fully loaded
    window.addEventListener('load', sendMetrics);

    return () => {
      window.removeEventListener('load', sendMetrics);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

// Hook to track custom performance marks
export function usePerformanceMark(markName: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    performance.mark(`${markName}-start`);

    return () => {
      performance.mark(`${markName}-end`);
      performance.measure(markName, `${markName}-start`, `${markName}-end`);
    };
  }, [markName]);
}

// Component to measure render time
export function RenderTimeTracker({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      if (process.env.NODE_ENV === 'development') {
        console.log(`[RenderTime] ${name}: ${duration}ms`);
      }
    };
  }, [name]);

  return <>{children}</>;
}
