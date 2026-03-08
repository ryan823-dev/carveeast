import { Suspense } from 'react';
import { SearchContent } from './SearchContent';

export const metadata = {
  title: 'Search | CarveEast',
  description: 'Search for artists, works, and stories on CarveEast.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <section className="pt-32 pb-12 border-b border-[#E5E4E2]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="h-8 bg-[#E5E4E2] rounded w-48 mb-6 animate-pulse" />
            <div className="h-12 bg-[#E5E4E2] rounded animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex gap-12">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="h-64 bg-[#E5E4E2] rounded animate-pulse" />
            </div>
            <div className="flex-1 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-[#E5E4E2] rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
