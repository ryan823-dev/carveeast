'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Filter,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

interface Work {
  id: string;
  slug: string;
  title: string;
  artistName: string;
  year: number;
  price?: number;
  availability: string;
  isPublished: boolean;
  createdAt: string;
}

const availabilityLabels: Record<string, string> = {
  available: 'Available',
  sold: 'Sold',
  reserved: 'Reserved',
  in_auction: 'In Auction',
};

const availabilityColors: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  sold: 'bg-gray-100 text-gray-700',
  reserved: 'bg-yellow-100 text-yellow-700',
  in_auction: 'bg-blue-100 text-blue-700',
};

export default function WorksManagementPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<Work | null>(null);

  useEffect(() => {
    fetchWorks();
  }, [statusFilter]);

  async function fetchWorks() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) {
        params.set('status', statusFilter);
      }

      const res = await fetch(`/api/admin/works?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setWorks(data.works);
      }
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteWork() {
    if (!workToDelete) return;

    try {
      const res = await fetch(`/api/admin/works/${workToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setWorks(works.filter((w) => w.id !== workToDelete.id));
        setShowDeleteModal(false);
        setWorkToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting work:', error);
    }
  }

  async function togglePublish(work: Work) {
    try {
      const res = await fetch(`/api/admin/works/${work.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !work.isPublished }),
      });

      if (res.ok) {
        setWorks(
          works.map((w) =>
            w.id === work.id ? { ...w, isPublished: !w.isPublished } : w
          )
        );
      }
    } catch (error) {
      console.error('Error updating work:', error);
    }
  }

  const filteredWorks = works.filter(
    (work) =>
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Works Management"
          subtitle={`${works.length} works`}
          centered={false}
        />
        <Link
          href="/admin/works/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A7A78]" />
          <input
            type="text"
            placeholder="Search works..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E4E2] rounded-lg focus:outline-none focus:border-[#B83A2F]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-[#E5E4E2] rounded-lg focus:outline-none focus:border-[#B83A2F]"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="reserved">Reserved</option>
          <option value="in_auction">In Auction</option>
        </select>
      </div>

      {/* Works Table */}
      <div className="bg-white border border-[#E5E4E2] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F4F2]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Work
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7A78] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#7A7A78] uppercase">
                  Published
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#7A7A78] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E4E2]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F] mx-auto" />
                  </td>
                </tr>
              ) : filteredWorks.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-[#7A7A78]"
                  >
                    No works found
                  </td>
                </tr>
              ) : (
                filteredWorks.map((work) => (
                  <tr key={work.id} className="hover:bg-[#F5F4F2]">
                    <td className="px-6 py-4">
                      <Link
                        href={`/works/${work.slug}`}
                        className="font-medium text-[#1A1A1A] hover:text-[#B83A2F]"
                      >
                        {work.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[#4A4A48]">
                      {work.artistName}
                    </td>
                    <td className="px-6 py-4 text-[#4A4A48]">{work.year}</td>
                    <td className="px-6 py-4 text-[#4A4A48]">
                      {work.price
                        ? `$${work.price.toLocaleString()}`
                        : 'Negotiable'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          availabilityColors[work.availability]
                        }`}
                      >
                        {availabilityLabels[work.availability]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => togglePublish(work)}
                        className={`p-1 rounded ${
                          work.isPublished
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {work.isPublished ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/works/${work.slug}`}
                          className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/works/${work.id}/edit`}
                          className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setWorkToDelete(work);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-[#7A7A78] hover:text-[#B83A2F]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && workToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-lg">
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-4">
              Delete Work?
            </h3>
            <p className="text-[#7A7A78] mb-6">
              Are you sure you want to delete "{workToDelete.title}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setWorkToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A]"
              >
                Cancel
              </button>
              <button
                onClick={deleteWork}
                className="flex-1 px-4 py-2 bg-[#B83A2F] text-white hover:bg-[#9A2F24]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
