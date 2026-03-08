'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { getInquiries, Inquiry } from '@/lib/inquiry';
import { getWorkById, formatPrice } from '@/lib/data';
import { cn } from '@/lib/utils';

interface InquiryWithWork extends Inquiry {
  workTitle?: string;
  workSlug?: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryWithWork[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    const allInquiries = getInquiries();
    const withWorkData = allInquiries.map((inquiry) => {
      const work = getWorkById(inquiry.workId);
      return {
        ...inquiry,
        workTitle: work?.title.en,
        workSlug: work?.slug,
      };
    });
    setInquiries(withWorkData.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const getStatusIcon = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'responded':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'closed':
        return <XCircle className="w-5 h-5 text-[#7A7A78]" />;
    }
  };

  const getStatusLabel = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'responded':
        return 'Responded';
      case 'closed':
        return 'Closed';
    }
  };

  const getStatusClass = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'responded':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'closed':
        return 'bg-[#F5F4F2] text-[#7A7A78] border-[#E5E4E2]';
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#FAFAF8]">
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-[#E5E4E2] rounded w-48 mb-4"></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs
            items={[{ label: 'My Inquiries', href: '/inquiries' }]}
            className="mb-8"
          />
          <SectionHeader
            title="My Inquiries"
            subtitle="Track"
            description="View and track the status of your inquiries and purchase requests."
          />
        </div>
      </section>

      {/* Inquiries List */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {inquiries.length === 0 ? (
            <div className="text-center py-24">
              <MessageSquare className="w-16 h-16 text-[#E5E4E2] mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
                No inquiries yet
              </h3>
              <p className="text-[#7A7A78] mb-8 max-w-md mx-auto">
                Browse our collection and inquire about works that interest you.
              </p>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
              >
                Browse Works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="bg-white border border-[#E5E4E2] p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border rounded-full',
                            getStatusClass(inquiry.status)
                          )}
                        >
                          {getStatusIcon(inquiry.status)}
                          {getStatusLabel(inquiry.status)}
                        </span>
                        <span className="text-sm text-[#7A7A78]">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                        {inquiry.type === 'purchase'
                          ? 'Purchase Request'
                          : 'Inquiry'}
                      </h3>

                      {inquiry.workTitle && inquiry.workSlug && (
                        <Link
                          href={`/works/${inquiry.workSlug}`}
                          className="text-[#B83A2F] hover:underline mt-1 block"
                        >
                          {inquiry.workTitle}
                        </Link>
                      )}

                      {inquiry.proposedPrice && (
                        <p className="text-sm text-[#4A4A48] mt-2">
                          Proposed price:{' '}
                          {formatPrice(
                            inquiry.proposedPrice,
                            inquiry.currency || 'USD'
                          )}
                        </p>
                      )}

                      {inquiry.message && (
                        <p className="text-[#4A4A48] mt-3 line-clamp-2">
                          &ldquo;{inquiry.message}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="md:w-48 md:text-right">
                      <p className="text-sm text-[#1A1A1A] font-medium">
                        {inquiry.name}
                      </p>
                      <p className="text-sm text-[#7A7A78]">{inquiry.email}</p>
                      {inquiry.phone && (
                        <p className="text-sm text-[#7A7A78]">
                          {inquiry.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
