'use client';

import { useState } from 'react';
import { Printer, Check, X, FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrintButtonProps {
  variant?: 'icon' | 'button';
  className?: string;
  title?: string;
}

export function PrintButton({
  variant = 'button',
  className,
  title = 'Print this page',
}: PrintButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [includeImages, setIncludeImages] = useState(true);

  const handlePrint = () => {
    // Add print-optimized class to body
    document.body.classList.add('printing');

    // Trigger print
    window.print();

    // Remove class after print dialog closes
    setTimeout(() => {
      document.body.classList.remove('printing');
    }, 100);
  };

  const handlePrintWithOptions = (withImages: boolean) => {
    if (!withImages) {
      document.body.classList.add('print-no-images');
    }

    handlePrint();

    if (!withImages) {
      setTimeout(() => {
        document.body.classList.remove('print-no-images');
      }, 100);
    }

    setShowOptions(false);
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={() => setShowOptions(true)}
          className={cn(
            'p-2 text-[#7A7A78] hover:text-[#1A1A1A] transition-colors',
            className
          )}
          aria-label="Print"
        >
          <Printer className="w-5 h-5" />
        </button>

        {showOptions && (
          <PrintOptionsModal
            onPrint={handlePrintWithOptions}
            onClose={() => setShowOptions(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowOptions(true)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors',
          className
        )}
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>

      {showOptions && (
        <PrintOptionsModal
          onPrint={handlePrintWithOptions}
          onClose={() => setShowOptions(false)}
        />
      )}
    </>
  );
}

// Print Options Modal
interface PrintOptionsModalProps {
  onPrint: (includeImages: boolean) => void;
  onClose: () => void;
}

function PrintOptionsModal({ onPrint, onClose }: PrintOptionsModalProps) {
  const [includeImages, setIncludeImages] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E4E2]">
          <h3 className="font-serif text-xl text-[#1A1A1A]">Print Options</h3>
          <button
            onClick={onClose}
            className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Include Images Option */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="w-4 h-4 accent-[#B83A2F]"
              />
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#7A7A78]" />
                Include images
              </span>
            </label>
            <p className="text-sm text-[#7A7A78] mt-2 ml-7">
              Uncheck to save ink and paper
            </p>
          </div>

          {/* Print Preview Info */}
          <div className="p-4 bg-[#F5F4F2] text-sm text-[#4A4A48]">
            <p className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" />
              <span className="font-medium">Print Preview</span>
            </p>
            <p>
              This page is optimized for printing. Headers, footers, and navigation
              will be automatically removed.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onPrint(includeImages)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Now
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Print Header Component (shown only when printing)
export function PrintHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="print-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      <p>www.carveeast.com</p>
    </div>
  );
}

// Print Footer Component (shown only when printing)
export function PrintFooter() {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="print-footer">
      <p>
        Printed from CarveEast on {today} | © 2024 CarveEast. All rights reserved.
      </p>
    </div>
  );
}

// Print QR Code Component (shown only when printing)
export function PrintQR({ url }: { url?: string }) {
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <div className="print-qr">
      <p>Scan to view online:</p>
      <p className="font-mono text-xs mt-1">{pageUrl}</p>
    </div>
  );
}
