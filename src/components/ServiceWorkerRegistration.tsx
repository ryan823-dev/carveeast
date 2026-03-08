'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ServiceWorkerRegistration() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_AVAILABLE') {
          setUpdateAvailable(true);
        }
      });
    }

    // Online/offline detection
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotice(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotice(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial state
    setIsOnline(navigator.onLine);
    if (!navigator.onLine) {
      setShowOfflineNotice(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
        window.location.reload();
      });
    }
  };

  return (
    <>
      {/* Offline Notice */}
      {!isOnline && showOfflineNotice && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-white px-4 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5" />
              <span className="font-medium">
                You&apos;re offline. Some features may be limited.
              </span>
            </div>
            <button
              onClick={() => setShowOfflineNotice(false)}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Update Available Notice */}
      {updateAvailable && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-6 py-4 shadow-lg">
          <div className="flex items-center gap-4">
            <RefreshCw className="w-5 h-5" />
            <span className="font-medium">Update available</span>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#B83A2F] text-white text-sm hover:bg-[#A32F24] transition-colors"
            >
              Reload
            </button>
            <button
              onClick={() => setUpdateAvailable(false)}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Online Status Indicator (subtle) */}
      <div
        className={cn(
          'fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all',
          isOnline
            ? 'bg-green-100 text-green-800 opacity-0 pointer-events-none'
            : 'bg-amber-100 text-amber-800 opacity-100'
        )}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </>
        )}
      </div>
    </>
  );
}

// Hook to check online status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Offline fallback component
export function OfflineFallback() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <WifiOff className="w-16 h-16 text-[#E5E4E2] mx-auto mb-6" />
        <h1 className="font-serif text-2xl text-[#1A1A1A] mb-4">
          You&apos;re Offline
        </h1>
        <p className="text-[#7A7A78] mb-8">
          It looks like you&apos;ve lost your internet connection. Some pages may
          still be available from your cache.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="block w-full px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
