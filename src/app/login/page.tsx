'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { login } from '@/lib/auth';
import { cn } from '@/lib/utils';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const user = login(email, password, rememberMe);

      if (user) {
        // Redirect to callback URL or home
        router.push(callbackUrl);
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#1A1A1A] rounded-full flex items-center justify-center">
            <span className="text-[#FAFAF8] font-serif text-2xl font-semibold">C</span>
          </div>
          <h1 className="text-3xl font-light text-[#1A1A1A] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#7A7A78]">
            Sign in to access your collection and saved works
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] focus:ring-1 focus:ring-[#B83A2F] transition-colors rounded-lg"
                placeholder="••••••••"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border-[#E5E4E2] text-[#B83A2F] focus:ring-[#B83A2F] rounded"
              />
              <span className="text-sm text-[#7A7A78]">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[#B83A2F] hover:underline font-medium"
            >
              Forgot password?
            </Link>
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
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-[#F5F4F2] text-sm rounded-lg border border-[#E5E4E2]">
            <p className="font-medium text-[#4A4A48] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              Collector Account:
            </p>
            <p className="text-[#7A7A78] ml-4">
              Email: <span className="text-[#1A1A1A] font-mono">collector@example.com</span>
              <br />
              Password: <span className="text-[#1A1A1A] font-mono">any password</span>
            </p>
          </div>
          
          <div className="p-4 bg-[#F5F4F2] text-sm rounded-lg border border-[#E5E4E2]">
            <p className="font-medium text-[#4A4A48] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#B83A2F] rounded-full inline-block"></span>
              Artist Account (江豪旭):
            </p>
            <p className="text-[#7A7A78] ml-4">
              Email: <span className="text-[#1A1A1A] font-mono">jiang@godseal.com</span>
              <br />
              Password: <span className="text-[#1A1A1A] font-mono">any password</span>
              <br />
              <a href="/artist-dashboard" className="text-[#B83A2F] hover:underline mt-2 inline-block">
                → Access Artist Dashboard
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E4E2]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#FAFAF8] text-[#7A7A78]">New to CarveEast?</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-[#B83A2F] hover:underline font-medium"
          >
            Create an account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A1A]" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
