'use client';

import { useState, useEffect } from 'react';
import { Gavel, CheckCircle, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  createBid,
  getCurrentBidAmount,
  validateBidAmount,
  formatBidAmount,
} from '@/lib/inquiry';
import { Auction, AuctionLot } from '@/lib/types';

interface BidFormProps {
  auction: Auction;
  lot: AuctionLot;
  className?: string;
  onSuccess?: () => void;
}

export function BidForm({ auction, lot, className, onSuccess }: BidFormProps) {
  const [currentBid, setCurrentBid] = useState(lot.startingBid);
  const [bidAmount, setBidAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    maxBid: '',
    autoBid: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<{ valid: boolean; minimumBid?: number; error?: string }>({ valid: true });

  useEffect(() => {
    const minBid = getCurrentBidAmount(lot.id, lot.startingBid);
    setCurrentBid(minBid);
    setBidAmount(minBid.toString());
  }, [lot]);

  useEffect(() => {
    const amount = parseFloat(bidAmount);
    if (!isNaN(amount)) {
      setValidation(validateBidAmount(amount, lot.id, lot.startingBid));
    }
  }, [bidAmount, lot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const amount = parseFloat(bidAmount);
      const validationResult = validateBidAmount(amount, lot.id, lot.startingBid);

      if (!validationResult.valid) {
        throw new Error(validationResult.error);
      }

      if (!formData.name.trim() || !formData.email.trim()) {
        throw new Error('Please fill in all required fields');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Create bid
      createBid({
        auctionId: auction.id,
        lotId: lot.id,
        amount,
        currency: lot.currency,
        bidderName: formData.name,
        bidderEmail: formData.email,
        bidderPhone: formData.phone || undefined,
        maxBid: formData.autoBid && formData.maxBid
          ? parseFloat(formData.maxBid)
          : undefined,
      });

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickBidAmounts = [
    currentBid,
    currentBid + (currentBid < 1000 ? 50 : currentBid < 5000 ? 100 : 250),
    currentBid + (currentBid < 1000 ? 100 : currentBid < 5000 ? 250 : 500),
  ];

  if (isSuccess) {
    return (
      <div className={cn('text-center py-8', className)}>
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
          Bid Placed Successfully
        </h3>
        <p className="text-[#7A7A78] mb-2">
          Your bid of {formatBidAmount(parseFloat(bidAmount), lot.currency)} has been recorded.
        </p>
        <p className="text-sm text-[#7A7A78] mb-6">
          You will receive email notifications if you are outbid.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setBidAmount(currentBid.toString());
          }}
          className="text-[#B83A2F] hover:underline"
        >
          Place another bid
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Lot Summary */}
      <div className="bg-[#F5F4F2] p-4">
        <p className="text-sm text-[#7A7A78] mb-1">
          Lot {lot.lotNumber} - {auction.title}
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-[#7A7A78]">
            Starting: {formatBidAmount(lot.startingBid, lot.currency)}
          </span>
          {currentBid > lot.startingBid && (
            <span className="flex items-center gap-1 text-[#B83A2F]">
              <TrendingUp className="w-4 h-4" />
              Current: {formatBidAmount(currentBid, lot.currency)}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Quick Bid Buttons */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
          Quick Bid
        </label>
        <div className="grid grid-cols-3 gap-3">
          {quickBidAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setBidAmount(amount.toString())}
              className={cn(
                'py-3 px-2 border text-sm transition-colors',
                bidAmount === amount.toString()
                  ? 'border-[#B83A2F] bg-[#B83A2F]/5 text-[#B83A2F]'
                  : 'border-[#E5E4E2] hover:border-[#B83A2F]'
              )}
            >
              {formatBidAmount(amount, lot.currency)}
            </button>
          ))}
        </div>
      </div>

      {/* Bid Amount */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Your Bid <span className="text-[#B83A2F]">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A78]">
            {lot.currency === 'USD' ? '$' : lot.currency}
          </span>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            min={currentBid}
            step={lot.currency === 'USD' ? 50 : 1}
            className={cn(
              'w-full pl-12 pr-4 py-3 border focus:outline-none transition-colors',
              validation.valid
                ? 'border-[#E5E4E2] focus:border-[#B83A2F]'
                : 'border-red-300 focus:border-red-500'
            )}
            placeholder={`Minimum ${formatBidAmount(currentBid, lot.currency)}`}
          />
        </div>
        {!validation.valid && (
          <p className="mt-1 text-sm text-red-600">{validation.error}</p>
        )}
      </div>

      {/* Auto-bid */}
      <div className="border border-[#E5E4E2] p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.autoBid}
            onChange={(e) =>
              setFormData({ ...formData, autoBid: e.target.checked })
            }
            className="w-4 h-4 mt-0.5 accent-[#B83A2F]"
          />
          <div>
            <span className="font-medium text-[#1A1A1A]">Enable auto-bid</span>
            <p className="text-sm text-[#7A7A78] mt-1">
              We&apos;ll automatically bid up to your maximum amount to keep you in the lead.
            </p>
          </div>
        </label>

        {formData.autoBid && (
          <div className="mt-4 pl-7">
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Maximum Bid
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A78]">
                {lot.currency === 'USD' ? '$' : lot.currency}
              </span>
              <input
                type="number"
                value={formData.maxBid}
                onChange={(e) =>
                  setFormData({ ...formData, maxBid: e.target.value })
                }
                className="w-full pl-12 pr-4 py-2 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
                placeholder="Enter maximum amount"
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-4 pt-4 border-t border-[#E5E4E2]">
        <h4 className="font-medium text-[#1A1A1A]">Contact Information</h4>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Name <span className="text-[#B83A2F]">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Email <span className="text-[#B83A2F]">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Phone <span className="text-[#7A7A78]">(optional)</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !validation.valid}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#B83A2F] text-white font-medium hover:bg-[#A32F24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Placing Bid...
          </>
        ) : (
          <>
            <Gavel className="w-4 h-4" />
            Place Bid
          </>
        )}
      </button>

      <p className="text-xs text-[#7A7A78] text-center">
        By placing a bid, you agree to our Terms of Service and Privacy Policy.
        All bids are binding.
      </p>
    </form>
  );
}
