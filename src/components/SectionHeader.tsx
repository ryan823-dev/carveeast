'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  action,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {subtitle && (
        <p className="text-xs uppercase tracking-[0.2em] text-[#B83A2F] mb-4">
          {subtitle}
        </p>
      )}
      <div className={cn(
        'flex items-end justify-between gap-8',
        centered && 'flex-col items-center'
      )}>
        <div className={cn(centered && 'max-w-2xl')}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-[#4A4A48] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#B83A2F] transition-colors group shrink-0"
          >
            {action.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
