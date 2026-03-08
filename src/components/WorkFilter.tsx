'use client';

import { useState } from 'react';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFilterOptions, WorkFilters } from '@/lib/search';

interface WorkFilterProps {
  filters: WorkFilters;
  onChange: (filters: WorkFilters) => void;
  className?: string;
}

export function WorkFilter({ filters, onChange, className }: WorkFilterProps) {
  const [expanded, setExpanded] = useState<string[]>(['discipline']);
  const options = getFilterOptions();

  const toggleSection = (section: string) => {
    setExpanded((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = (key: keyof WorkFilters, value: any) => {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-[#E5E4E2] last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-[#1A1A1A]">{title}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-[#7A7A78] transition-transform',
            expanded.includes(id) && 'rotate-180'
          )}
        />
      </button>
      {expanded.includes(id) && <div className="pb-4">{children}</div>}
    </div>
  );

  return (
    <div className={cn('bg-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#E5E4E2]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#1A1A1A]" />
          <span className="font-medium text-[#1A1A1A]">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-[#B83A2F] text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#B83A2F] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="p-4">
        {/* Discipline */}
        <FilterSection title="Discipline" id="discipline">
          <div className="space-y-2">
            {options.disciplines.map((discipline) => (
              <label
                key={discipline.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="discipline"
                  checked={filters.discipline === discipline.value}
                  onChange={() => updateFilter('discipline', discipline.value)}
                  className="w-4 h-4 accent-[#B83A2F]"
                />
                <span className="text-[#4A4A48] group-hover:text-[#1A1A1A] transition-colors">
                  {discipline.label}
                </span>
              </label>
            ))}
            {filters.discipline && (
              <button
                onClick={() => updateFilter('discipline', '')}
                className="text-sm text-[#B83A2F] hover:underline mt-2"
              >
                Clear selection
              </button>
            )}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" id="price">
          <div className="space-y-2">
            {options.priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === range.value}
                  onChange={() => updateFilter('priceRange', range.value)}
                  className="w-4 h-4 accent-[#B83A2F]"
                />
                <span className="text-[#4A4A48] group-hover:text-[#1A1A1A] transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability" id="availability">
          <div className="space-y-2">
            {options.availability.map((status) => (
              <label
                key={status.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === status.value}
                  onChange={() => updateFilter('availability', status.value)}
                  className="w-4 h-4 accent-[#B83A2F]"
                />
                <span className="text-[#4A4A48] group-hover:text-[#1A1A1A] transition-colors">
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Year Range */}
        <FilterSection title="Year Created" id="year">
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="From"
              value={filters.yearFrom || ''}
              onChange={(e) =>
                updateFilter('yearFrom', parseInt(e.target.value) || undefined)
              }
              className="w-full px-3 py-2 border border-[#E5E4E2] text-sm focus:outline-none focus:border-[#B83A2F]"
            />
            <span className="text-[#7A7A78]">-</span>
            <input
              type="number"
              placeholder="To"
              value={filters.yearTo || ''}
              onChange={(e) =>
                updateFilter('yearTo', parseInt(e.target.value) || undefined)
              }
              className="w-full px-3 py-2 border border-[#E5E4E2] text-sm focus:outline-none focus:border-[#B83A2F]"
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

// Mobile filter drawer
export function MobileWorkFilter({
  filters,
  onChange,
  isOpen,
  onClose,
}: WorkFilterProps & { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 overflow-auto lg:hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#E5E4E2]">
          <span className="font-medium text-[#1A1A1A]">Filters</span>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-[#7A7A78]" />
          </button>
        </div>
        <WorkFilter filters={filters} onChange={onChange} />
      </div>
    </>
  );
}
