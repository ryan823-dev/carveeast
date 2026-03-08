'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm', className)}>
      <Link
        href="/"
        className="text-[#7A7A78] hover:text-[#1A1A1A] transition-colors"
      >
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-[#9A9A98]" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-[#7A7A78] hover:text-[#1A1A1A] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1A1A1A]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
