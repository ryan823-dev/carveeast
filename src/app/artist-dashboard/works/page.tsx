'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

interface Work {
  id: string;
  slug: string;
  title: string;
  titleCn?: string;
  artistName: string;
  year: number;
  medium: string;
  dimensions?: string;
  price?: number;
  availability: string;
  images: string;
  isPublished: boolean;
  createdAt: string;
}

export default function WorksListPage() {
  const router = useRouter();
  const user = getCurrentUser();
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorks();
    }
  }, [user]);

  const fetchWorks = async () => {
    try {
      const response = await fetch(`/api/artist-dashboard/works?artistId=${user?.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setWorks(data.works);
      }
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this work?')) return;

    try {
      const response = await fetch(`/api/artist-dashboard/works/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWorks(works.filter(w => w.slug !== slug));
        alert('Work deleted successfully');
      } else {
        alert('Failed to delete work');
      }
    } catch (error) {
      console.error('Error deleting work:', error);
      alert('Failed to delete work');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#7A7A78] hover:text-[#1A1A1A] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-semibold text-[#1A1A1A] mb-2">
                Manage Works
              </h1>
              <p className="text-[#7A7A78]">
                Edit and manage your artwork listings
              </p>
            </div>
            <button
              onClick={() => router.push('/artist-dashboard/works/new')}
              className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-sm hover:bg-[#333] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Work
            </button>
          </div>

          {/* Works List */}
          <div className="bg-white rounded-lg border border-[#E5E4E2]">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A1A] mx-auto mb-4" />
                <p className="text-[#7A7A78]">Loading works...</p>
              </div>
            ) : works.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[#7A7A78] mb-4">
                  You haven't added any works yet
                </p>
                <button
                  onClick={() => router.push('/artist-dashboard/works/new')}
                  className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-sm hover:bg-[#333] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Work
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5F4F2] border-b border-[#E5E4E2]">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-[#4A4A48]">
                        Work
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-[#4A4A48]">
                        Year
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-[#4A4A48]">
                        Medium
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-[#4A4A48]">
                        Price
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-[#4A4A48]">
                        Status
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-[#4A4A48]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {works.map((work) => (
                      <tr
                        key={work.id}
                        className="border-b border-[#E5E4E2] hover:bg-[#F5F4F2]"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-[#1A1A1A]">
                              {work.title}
                            </p>
                            {work.titleCn && (
                              <p className="text-sm text-[#7A7A78]">
                                {work.titleCn}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#4A4A48]">
                          {work.year}
                        </td>
                        <td className="py-4 px-6 text-[#4A4A48]">
                          {work.medium}
                        </td>
                        <td className="py-4 px-6 text-[#4A4A48]">
                          {work.price ? `$${work.price.toLocaleString()}` : '—'}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              work.availability === 'available'
                                ? 'bg-green-100 text-green-800'
                                : work.availability === 'sold'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {work.availability}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                router.push(`/works/${work.slug}`)
                              }
                              className="p-2 text-[#4A4A48] hover:text-[#1A1A1A] hover:bg-[#E5E4E2] rounded transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                router.push(
                                  `/artist-dashboard/works/edit/${work.slug}`
                                )
                              }
                              className="p-2 text-[#4A4A48] hover:text-[#1A1A1A] hover:bg-[#E5E4E2] rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(work.slug)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
