'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { WorkCard } from '@/components/WorkCard';
import { WorkFilter, MobileWorkFilter } from '@/components/WorkFilter';
import { WORKS, PRICE_RANGES, getDisciplineLabel, getWorkDisplayAuthors } from '@/lib/data';
import { WorkAvailability, Discipline } from '@/lib/types';
import { WorkFilters, filterWorks } from '@/lib/search';
import { cn } from '@/lib/utils';

export default function WorksPage() {
  const [filters, setFilters] = useState<WorkFilters>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter works based on current filters
  const filteredWorks = useMemo(() => {
    return filterWorks(filters);
  }, [filters]);

  // Group by price range
  const worksByPriceRange = PRICE_RANGES.map((range) => ({
    range,
    works: filteredWorks.filter((w) => w.priceRangeId === range.id),
  })).filter((group) => group.works.length > 0);

  // Group by discipline
  const worksByDiscipline = filteredWorks.reduce((acc, work) => {
    if (!acc[work.discipline]) {
      acc[work.discipline] = [];
    }
    acc[work.discipline].push(work);
    return acc;
  }, {} as Record<Discipline, typeof filteredWorks>);

  const disciplineOrder = [
    Discipline.SEAL_ENGRAVING,
    Discipline.CALLIGRAPHY,
    Discipline.INK_PAINTING,
    Discipline.INSCRIBED_CERAMICS,
    Discipline.OIL_PAINTING,
    Discipline.PRINTMAKING,
  ];

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: 'Works' }]} className="mb-8" />
          <SectionHeader
            title="Available Works"
            subtitle="Collect"
            description="Each work in our collection has been carefully authenticated and curated. From entry-level pieces to investment-grade masterworks, discover art that speaks to you."
          />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-30 bg-white border-y border-[#E5E4E2] px-6 lg:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#1A1A1A]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-[#B83A2F] text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-6">
            <span className="text-sm text-[#7A7A78]">
              {filteredWorks.length} {filteredWorks.length === 1 ? 'work' : 'works'}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters({})}
                className="text-sm text-[#B83A2F] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'grid'
                  ? 'text-[#1A1A1A]'
                  : 'text-[#9A9A98] hover:text-[#1A1A1A]'
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'list'
                  ? 'text-[#1A1A1A]'
                  : 'text-[#9A9A98] hover:text-[#1A1A1A]'
              )}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex gap-12">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <WorkFilter filters={filters} onChange={setFilters} />
              </div>
            </aside>

            {/* Mobile Filter Drawer */}
            <MobileWorkFilter
              filters={filters}
              onChange={setFilters}
              isOpen={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
            />

            {/* Results */}
            <div className="flex-1">
              {filteredWorks.length === 0 ? (
                <div className="text-center py-24">
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">
                    No works found
                  </h3>
                  <p className="text-[#7A7A78]">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Works by Price Range */}
                  {worksByPriceRange.length > 0 && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                        Browse by Price
                      </h2>
                      <div className="space-y-12">
                        {worksByPriceRange.map(({ range, works }) => (
                          <div key={range.id}>
                            <div className="flex items-center gap-4 mb-6">
                              <div>
                                <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                                  {range.labelEn}
                                </h3>
                                <p className="text-sm text-[#7A7A78]">
                                  {range.description}
                                </p>
                              </div>
                              <div className="flex-1 h-px bg-[#E5E4E2]" />
                              <span className="text-sm text-[#7A7A78]">
                                {works.length} works
                              </span>
                            </div>
                            <div className={cn(
                              'grid gap-6',
                              viewMode === 'grid'
                                ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                            )}>
                              {works.map((work) => (
                                <WorkCard
                                  key={work.id}
                                  work={work}
                                  variant={viewMode === 'list' ? 'compact' : 'default'}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Works by Discipline */}
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">
                      Browse by Discipline
                    </h2>
                    <div className="space-y-12">
                      {disciplineOrder.map((discipline) => {
                        const works = worksByDiscipline[discipline];
                        if (!works || works.length === 0) return null;

                        return (
                          <div key={discipline}>
                            <div className="flex items-center gap-4 mb-6">
                              <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                                {getDisciplineLabel(discipline)}
                              </h3>
                              <div className="flex-1 h-px bg-[#E5E4E2]" />
                              <span className="text-sm text-[#7A7A78]">
                                {works.length} works
                              </span>
                            </div>
                            <div className={cn(
                              'grid gap-6',
                              viewMode === 'grid'
                                ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                            )}>
                              {works.map((work) => (
                                <WorkCard
                                  key={work.id}
                                  work={work}
                                  variant={viewMode === 'list' ? 'compact' : 'default'}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
