'use client';

import { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Locale, locales, defaultLocale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'button' | 'minimal';
  className?: string;
}

export function LanguageSwitcher({
  variant = 'dropdown',
  className,
}: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get locale from localStorage or browser
    const stored = localStorage.getItem('carve-east-locale') as Locale;
    if (stored && locales.includes(stored)) {
      setCurrentLocale(stored);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'zh') {
        setCurrentLocale('zh');
      }
    }
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem('carve-east-locale', locale);
    setIsOpen(false);

    // Reload page to apply translations (in a real app, you'd use a more sophisticated approach)
    window.location.reload();
  };

  const localeNames: Record<Locale, string> = {
    en: 'English',
    zh: '中文',
  };

  if (!mounted) {
    return (
      <div className={cn('w-8 h-8', className)}>
        <Globe className="w-5 h-5 text-[#7A7A78]" />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        onClick={() => handleLocaleChange(currentLocale === 'en' ? 'zh' : 'en')}
        className={cn(
          'text-sm text-[#4A4A48] hover:text-[#1A1A1A] transition-colors',
          className
        )}
      >
        {currentLocale === 'en' ? '中文' : 'EN'}
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors',
          className
        )}
      >
        <Globe className="w-4 h-4" />
        <span>{localeNames[currentLocale]}</span>
      </button>
    );
  }

  // Dropdown variant
  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 text-[#4A4A48] hover:text-[#1A1A1A] transition-colors"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">{localeNames[currentLocale]}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-[#E5E4E2] shadow-lg z-50">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F5F4F2] transition-colors',
                  currentLocale === locale && 'bg-[#F5F4F2]'
                )}
              >
                <span className={cn(
                  'text-sm',
                  currentLocale === locale ? 'text-[#1A1A1A] font-medium' : 'text-[#4A4A48]'
                )}>
                  {localeNames[locale]}
                </span>
                {currentLocale === locale && (
                  <Check className="w-4 h-4 text-[#B83A2F]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Hook to get current locale
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem('carve-east-locale') as Locale;
    if (stored && locales.includes(stored)) {
      setLocale(stored);
    }
  }, []);

  return locale;
}

// Hook for translations
export function useTranslation() {
  const locale = useLocale();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = require('@/lib/i18n').translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        value = require('@/lib/i18n').translations[defaultLocale];
        for (const fk of keys) {
          if (value && typeof value === 'object' && fk in value) {
            value = value[fk];
          } else {
            return key;
          }
        }
        return typeof value === 'string' ? value : key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}
