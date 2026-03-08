'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createInquiry, Inquiry } from '@/lib/inquiry';
import { Work } from '@/lib/types';
import { formatPrice } from '@/lib/data';

interface InquiryFormProps {
  work: Work;
  type?: 'inquiry' | 'purchase';
  className?: string;
  onSuccess?: () => void;
}

export function InquiryForm({
  work,
  type = 'inquiry',
  className,
  onSuccess,
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    proposedPrice: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate
      if (!formData.name.trim() || !formData.email.trim()) {
        throw new Error('Please fill in all required fields');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Create inquiry
      createInquiry({
        workId: work.id,
        type: type === 'purchase' ? 'purchase' : 'inquiry',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        proposedPrice: formData.proposedPrice
          ? parseFloat(formData.proposedPrice)
          : undefined,
        currency: work.price?.currency,
      });

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn('text-center py-8', className)}>
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
          Inquiry Submitted
        </h3>
        <p className="text-[#7A7A78] mb-6">
          Thank you for your interest. We will respond to your inquiry within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: '',
              proposedPrice: '',
            });
          }}
          className="text-[#B83A2F] hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Work Summary */}
      <div className="bg-[#F5F4F2] p-4 mb-6">
        <p className="text-sm text-[#7A7A78] mb-1">Inquiring about:</p>
        <p className="font-serif text-lg text-[#1A1A1A]">{work.title.en}</p>
        {work.price && (
          <p className="text-[#B83A2F] mt-1">
            {formatPrice(work.price.amount, work.price.currency)}
            {work.price.isNegotiable && ' (Negotiable)'}
          </p>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Name <span className="text-[#B83A2F]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] transition-colors"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Email <span className="text-[#B83A2F]">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Phone <span className="text-[#7A7A78]">(optional)</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] transition-colors"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      {/* Proposed Price (if negotiable) */}
      {work.price?.isNegotiable && (
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Proposed Price <span className="text-[#7A7A78]">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A78]">
              {work.price.currency === 'USD' ? '$' : work.price.currency}
            </span>
            <input
              type="number"
              value={formData.proposedPrice}
              onChange={(e) =>
                setFormData({ ...formData, proposedPrice: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] transition-colors"
              placeholder="Enter amount"
              min={0}
            />
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Message <span className="text-[#7A7A78]">(optional)</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] transition-colors resize-none"
          placeholder="Tell us about your interest in this work..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#1A1A1A] text-white font-medium hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {type === 'purchase' ? 'Submit Purchase Request' : 'Send Inquiry'}
          </>
        )}
      </button>

      <p className="text-xs text-[#7A7A78] text-center">
        We respect your privacy. Your information will not be shared with third parties.
      </p>
    </form>
  );
}
