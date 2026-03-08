'use client';

import { useState } from 'react';
import { Share2, Link2, Check, X, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  variant?: 'icon' | 'button' | 'floating';
  className?: string;
}

export function ShareButton({
  title,
  description = '',
  url,
  image,
  variant = 'button',
  className,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = encodeURIComponent(title);
  const shareDesc = encodeURIComponent(description);
  const shareImage = image || '';

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#4267B2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#0077b5] hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${shareTitle}&body=${shareDesc}%0A%0A${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#EA4335] hover:text-white',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      setIsOpen(true);
    }
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleNativeShare}
          className={cn(
            'p-2 text-[#7A7A78] hover:text-[#1A1A1A] transition-colors',
            className
          )}
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Share Modal */}
        {isOpen && (
          <ShareModal
            shareLinks={shareLinks}
            shareUrl={shareUrl}
            copied={copied}
            onCopy={handleCopyLink}
            onClose={() => setIsOpen(false)}
          />
        )}
      </>
    );
  }

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={handleNativeShare}
          className={cn(
            'fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] text-white rounded-full shadow-lg hover:bg-[#333] transition-all',
            className
          )}
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>

        {isOpen && (
          <ShareModal
            shareLinks={shareLinks}
            shareUrl={shareUrl}
            copied={copied}
            onCopy={handleCopyLink}
            onClose={() => setIsOpen(false)}
          />
        )}
      </>
    );
  }

  // Default button variant
  return (
    <>
      <button
        onClick={handleNativeShare}
        className={cn(
          'flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors',
          className
        )}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <ShareModal
          shareLinks={shareLinks}
          shareUrl={shareUrl}
          copied={copied}
          onCopy={handleCopyLink}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Share Modal Component
interface ShareModalProps {
  shareLinks: { name: string; icon: any; href: string; color: string }[];
  shareUrl: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

function ShareModal({ shareLinks, shareUrl, copied, onCopy, onClose }: ShareModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E4E2]">
          <h3 className="font-serif text-xl text-[#1A1A1A]">Share</h3>
          <button
            onClick={onClose}
            className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Social Links */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex flex-col items-center gap-2 p-4 border border-[#E5E4E2] transition-colors',
                  link.color
                )}
              >
                <link.icon className="w-6 h-6" />
                <span className="text-xs">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Copy Link */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Page Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-[#F5F4F2] border border-[#E5E4E2] text-[#4A4A48] text-sm"
              />
              <button
                onClick={onCopy}
                className={cn(
                  'px-4 py-3 border transition-colors flex items-center gap-2',
                  copied
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for sharing
export function useShare() {
  const share = async (data: { title: string; text?: string; url?: string }) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  return { share, copyToClipboard };
}
