'use client';

import { useState, useEffect } from 'react';

interface CoursePaymentProps {
  courseSlug: string;
  courseName: string;
  courseNameCn: string;
  price: number;
  className?: string;
}

type PaymentMethod = 'stripe' | 'paypal';
type CheckoutStep = 'select' | 'processing' | 'success' | 'error';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (selector: string) => void };
    };
  }
}

export default function CoursePayment({
  courseSlug,
  courseName,
  courseNameCn,
  price,
  className = '',
}: CoursePaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<CheckoutStep>('select');
  const [error, setError] = useState<string | null>(null);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [isPayPalReady, setIsPayPalReady] = useState(false);

  // Load PayPal SDK
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already loaded
    if (window.paypal) {
      setIsPayPalReady(true);
      return;
    }

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'Adazu1Vf_Xa2fubiTGvxEf3D7kwW8WVnJ8LfEtWcknDzunSHj8QVuhA5N3oamZLHhtFOOjUOo2LSFRyA';
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => setIsPayPalReady(true);
    script.onerror = () => console.error('Failed to load PayPal SDK');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize PayPal buttons when selected
  useEffect(() => {
    if (selectedMethod !== 'paypal' || !window.paypal || !isPayPalReady) return;

    const container = document.getElementById(`paypal-button-container-${courseSlug}`);
    if (!container || container.hasChildNodes()) return;

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: async (_data: unknown, actions: { order: { create: (config: Record<string, unknown>) => Promise<string> } }) => {
        try {
          const response = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseSlug }),
          });

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          return data.orderId;
        } catch (err) {
          console.error('Error creating PayPal order:', err);
          throw err;
        }
      },
      onApprove: async (_data: unknown, actions: { order: { capture: () => Promise<unknown> } }) => {
        setStep('processing');
        try {
          // This is handled by redirect, but we keep it for reference
          const capture = await actions.order.capture();
          console.log('Order captured:', capture);
          setStep('success');
        } catch (err) {
          console.error('Error capturing PayPal order:', err);
          setError('Payment capture failed');
          setStep('error');
        }
      },
      onError: (err: unknown) => {
        console.error('PayPal error:', err);
        setError('PayPal payment failed');
        setStep('error');
      },
      onCancel: () => {
        setSelectedMethod(null);
        setStep('select');
      },
    }).render(`#paypal-button-container-${courseSlug}`);
  }, [selectedMethod, isPayPalReady, courseSlug]);

  const handleStripeCheckout = async () => {
    setIsStripeLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Stripe checkout error:', err);
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setStep('error');
      setIsStripeLoading(false);
    }
  };

  const handlePayPalCheckout = async () => {
    setSelectedMethod('paypal');
  };

  const handleBack = () => {
    setSelectedMethod(null);
    setStep('select');
    setError(null);
  };

  // Success state
  if (step === 'success') {
    return (
      <div className={className}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-green-700 mb-4">Thank you for enrolling in {courseName}</p>
          <a
            href="/dashboard"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Error state
  if (step === 'error') {
    return (
      <div className={className}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h3>
          <p className="text-red-700 mb-4">{error || 'An error occurred during checkout'}</p>
          <button
            onClick={handleBack}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // PayPal button container
  if (selectedMethod === 'paypal') {
    return (
      <div className={className}>
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="text-stone-600 hover:text-stone-800 text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to payment options
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <img src="/images/paypal-logo.png" alt="PayPal" className="h-6" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="font-medium text-stone-800">PayPal Checkout</span>
          </div>

          <div id={`paypal-button-container-${courseSlug}`} className="min-h-[150px]">
            {!isPayPalReady && (
              <div className="flex items-center justify-center h-[150px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            )}
          </div>

          <p className="mt-3 text-xs text-stone-500 text-center">
            After clicking the PayPal button, you will be redirected to complete your purchase securely.
          </p>
        </div>
      </div>
    );
  }

  // Processing state
  if (step === 'processing') {
    return (
      <div className={className}>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Processing Payment...</h3>
          <p className="text-amber-700">Please wait while we process your payment</p>
        </div>
      </div>
    );
  }

  // Default: Select payment method
  return (
    <div className={className}>
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">Enroll Now</h3>
            <p className="text-stone-600 text-sm">{courseNameCn}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-600">${(price / 100).toFixed(2)}</div>
            <div className="text-xs text-stone-500">USD</div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Stripe Option */}
          <button
            onClick={handleStripeCheckout}
            disabled={isStripeLoading}
            className={`
              w-full border-2 rounded-lg p-4 transition-all text-left
              ${isStripeLoading ? 'opacity-50 cursor-not-allowed' : 'border-stone-200 hover:border-amber-500'}
              ${selectedMethod === 'stripe' ? 'border-amber-500 bg-amber-50' : ''}
            `}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-stone-900">Credit / Debit Card</div>
                <div className="text-sm text-stone-500">Pay securely with Stripe</div>
              </div>
              <div className="text-stone-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* PayPal Option */}
          <button
            onClick={handlePayPalCheckout}
            className="w-full border-2 border-stone-200 hover:border-blue-500 rounded-lg p-4 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#009cde]" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.645h6.922c2.296 0 3.883.48 4.698 1.44.774.91 1.073 2.08.89 3.517-.155 1.213-.7 2.19-1.394 3.024-1.023 1.23-2.386 1.88-3.82 2.275-1.367.376-2.84.515-4.21.515H7.28l-.203.74z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-stone-900">PayPal</div>
                <div className="text-sm text-stone-500">Pay with your PayPal account</div>
              </div>
              <div className="text-stone-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Buyer Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
