interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <p className="text-amber-600 text-xs uppercase tracking-widest mb-4">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-stone-600 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
