'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check, Mail, Lock, User as UserIcon } from 'lucide-react';
import { register } from '@/lib/auth';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the terms of service');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      register(formData.email, formData.name, formData.password);
      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-light text-[#1A1A1A] mb-4">
            Welcome to CarveEast!
          </h1>
          <p className="text-[#7A7A78] mb-8">
            Your account has been created successfully. Redirecting you to the homepage...
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#1A1A1A] rounded-full flex items-center justify-center">
            <span className="text-[#FAFAF8] font-serif text-2xl font-semibold">C</span>
          </div>
          <h1 className="text-3xl font-light text-[#1A1A1A] mb-2">
            Join CarveEast
          </h1>
          <p className="text-[#7A7A78]">
            Create an account to save works, follow artists, and receive personalized recommendations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#4A4A48] mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A98]" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] focus:ring-1 focus:ring-[#B83A2F] transition-colors rounded-lg"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#4A4A48] mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A98]" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] focus:ring-1 focus:ring-[#B83A2F] transition-colors rounded-lg"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#4A4A48] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A98]" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={8}
                className="w-full pl-10 pr-12 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] focus:ring-1 focus:ring-[#B83A2F] transition-colors rounded-lg"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A78] hover:text-[#4A4A48] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#4A4A48] mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A98]" />
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] focus:ring-1 focus:ring-[#B83A2F] transition-colors rounded-lg"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeTerms: e.target.checked })
                }
                className="mt-1 w-4 h-4 border-[#E5E4E2] text-[#B83A2F] focus:ring-[#B83A2F] rounded"
              />
              <span className="text-sm text-[#7A7A78]">
                I agree to the{' '}
                <Link href="/terms" className="text-[#B83A2F] hover:underline font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#B83A2F] hover:underline font-medium">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) =>
                  setFormData({ ...formData, newsletter: e.target.checked })
                }
                className="mt-1 w-4 h-4 border-[#E5E4E2] text-[#B83A2F] focus:ring-[#B83A2F] rounded"
              />
              <span className="text-sm text-[#7A7A78]">
                Send me updates about new works, auctions, and stories
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors rounded-lg font-medium',
              isLoading && 'opacity-70 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E4E2]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#FAFAF8] text-[#7A7A78]">Already have an account?</span>
          </div>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[#B83A2F] hover:underline font-medium"
          >
            Sign in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </div>
  );
}
