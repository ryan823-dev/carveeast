'use client';

import { useState } from 'react';

interface CourseCheckoutButtonProps {
  courseSlug: string;
  courseName: string;
  price: number;
  className?: string;
}

export default function CourseCheckoutButton({
  courseSlug,
  courseName,
  price,
  className = '',
}: CourseCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseSlug,
          email: undefined, // Will be collected by Stripe
        }),
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
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`
          w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg
          transition-colors duration-200 flex items-center justify-center gap-2
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Redirecting to checkout...</span>
          </>
        ) : (
          <>
            <span>Enroll Now</span>
            <span className="text-amber-200">${(price / 100).toFixed(2)}</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-2 text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <p className="mt-2 text-xs text-stone-500 text-center">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}
