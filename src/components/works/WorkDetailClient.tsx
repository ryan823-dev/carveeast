'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Heart,
  Share2,
  MessageCircle,
  Truck,
  Shield,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { InquiryForm } from '@/components/InquiryForm';
import { WorkCard } from '@/components/WorkCard';
import { cn } from '@/lib/utils';
import {
  formatPrice,
  STONE_MATERIALS,
  CARVING_STYLES,
  SEAL_LAYOUTS,
  AVAILABILITY_LABELS,
  type ArtworkImage,
} from '@/lib/artwork-data';

interface WorkDetailClientProps {
  work: {
    slug: string;
    title: string;
    titleCn?: string;
    artistName: string;
    artistSlug?: string;
    year: number;
    medium: string;
    stoneColor?: string;
    dimensions: string;
    weight?: string;
    carvingStyle?: string;
    sealStyle?: string;
    scriptType?: string;
    characterCount?: number;
    layout?: string;
    price?: number;
    currency: string;
    availability: string;
    certification?: string;
    provenance?: string;
    images: ArtworkImage[];
    description?: string;
    descriptionCn?: string;
    tags?: string[];
  };
  relatedWorks?: any[];
}

export default function WorkDetailClient({
  work,
  relatedWorks = [],
}: WorkDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const availability = AVAILABILITY_LABELS[work.availability as keyof typeof AVAILABILITY_LABELS] || AVAILABILITY_LABELS.available;
  const stoneMaterial = STONE_MATERIALS.find((m) => m.value === work.medium);
  const carvingStyle = CARVING_STYLES.find((s) => s.value === work.carvingStyle);
  const sealLayout = SEAL_LAYOUTS.find((l) => l.value === work.layout);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % work.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + work.images.length) % work.images.length);
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Works', href: '/works' },
              { label: work.title || work.titleCn || 'Artwork' },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                {work.images[selectedImage] && (
                  <div className="relative w-full h-full">
                    <Image
                      src={work.images[selectedImage].url}
                      alt={work.images[selectedImage].caption || work.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}

                {/* Zoom Button */}
                <button
                  onClick={() => setIsZoomed(true)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                >
                  <ZoomIn className="w-5 h-5 text-stone-700" />
                </button>

                {/* Navigation Arrows */}
                {work.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-stone-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-stone-700" />
                    </button>
                  </>
                )}

                {/* Availability Badge */}
                <div
                  className={cn(
                    'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium',
                    availability.color === 'green' && 'bg-green-100 text-green-800',
                    availability.color === 'red' && 'bg-red-100 text-red-800',
                    availability.color === 'yellow' && 'bg-yellow-100 text-yellow-800',
                    availability.color === 'blue' && 'bg-blue-100 text-blue-800',
                    availability.color === 'gray' && 'bg-stone-100 text-stone-800'
                  )}
                >
                  {availability.label}
                </div>
              </div>

              {/* Thumbnails */}
              {work.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {work.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors',
                        index === selectedImage
                          ? 'border-amber-600'
                          : 'border-transparent hover:border-stone-300'
                      )}
                    >
                      <Image
                        src={image.url}
                        alt={image.caption || `Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Caption */}
              {work.images[selectedImage]?.caption && (
                <p className="text-center text-stone-500 text-sm">
                  {work.images[selectedImage].caption}
                  {work.images[selectedImage].captionCn &&
                    ` / ${work.images[selectedImage].captionCn}`}
                </p>
              )}
            </div>

            {/* Work Details */}
            <div className="space-y-6">
              {/* Title & Artist */}
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                  {work.titleCn || work.title}
                </h1>
                {work.titleCn && work.title && (
                  <p className="text-xl text-stone-500">{work.title}</p>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-stone-600">by</span>
                  <Link
                    href={work.artistSlug ? `/artists/${work.artistSlug}` : '/artists'}
                    className="text-amber-700 hover:text-amber-800 font-medium"
                  >
                    {work.artistName}
                  </Link>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500">{work.year}</span>
                </div>
              </div>

              {/* Price */}
              {work.price && work.availability === 'available' && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-stone-900">
                      {formatPrice(work.price, work.currency)}
                    </span>
                    <span className="text-stone-500">{work.currency}</span>
                  </div>
                  <p className="text-sm text-stone-500 mt-2">
                    Includes certificate of authenticity
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {work.availability === 'available' && work.price && (
                  <button
                    onClick={() => setShowInquiry(true)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-xl font-medium transition-colors"
                  >
                    Purchase Now
                  </button>
                )}
                {(work.availability === 'available' || work.availability === 'reserved') && (
                  <button
                    onClick={() => setShowInquiry(true)}
                    className="flex-1 bg-white hover:bg-stone-50 text-stone-800 py-4 px-6 rounded-xl font-medium border border-stone-300 transition-colors"
                  >
                    Inquire
                  </button>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    'p-4 rounded-xl border transition-colors',
                    isFavorite
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                </button>
                <button className="p-4 bg-white border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Specifications / 规格参数
                </h2>
                <dl className="grid grid-cols-2 gap-4">
                  {stoneMaterial && (
                    <>
                      <div>
                        <dt className="text-sm text-stone-500">Stone Material</dt>
                        <dd className="text-stone-900">
                          {stoneMaterial.labelCn || stoneMaterial.labelEn}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-stone-500">石料</dt>
                        <dd className="text-stone-900">{stoneMaterial.label}</dd>
                      </div>
                    </>
                  )}
                  {work.stoneColor && (
                    <div>
                      <dt className="text-sm text-stone-500">Stone Color / 石色</dt>
                      <dd className="text-stone-900">{work.stoneColor}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-stone-500">Dimensions / 尺寸</dt>
                    <dd className="text-stone-900">{work.dimensions}</dd>
                  </div>
                  {work.weight && (
                    <div>
                      <dt className="text-sm text-stone-500">Weight / 重量</dt>
                      <dd className="text-stone-900">{work.weight}</dd>
                    </div>
                  )}
                  {carvingStyle && (
                    <div>
                      <dt className="text-sm text-stone-500">Style / 风格</dt>
                      <dd className="text-stone-900">
                        {carvingStyle.labelCn || carvingStyle.labelEn}
                      </dd>
                    </div>
                  )}
                  {work.sealStyle && (
                    <div>
                      <dt className="text-sm text-stone-500">Seal Style / 印风</dt>
                      <dd className="text-stone-900">{work.sealStyle}</dd>
                    </div>
                  )}
                  {work.scriptType && (
                    <div>
                      <dt className="text-sm text-stone-500">Script / 字体</dt>
                      <dd className="text-stone-900">{work.scriptType}</dd>
                    </div>
                  )}
                  {work.characterCount && (
                    <div>
                      <dt className="text-sm text-stone-500">Characters / 字数</dt>
                      <dd className="text-stone-900">{work.characterCount}</dd>
                    </div>
                  )}
                  {sealLayout && (
                    <div>
                      <dt className="text-sm text-stone-500">Layout / 章法</dt>
                      <dd className="text-stone-900">
                        {sealLayout.labelCn || sealLayout.labelEn}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-stone-500">Year / 年代</dt>
                    <dd className="text-stone-900">{work.year}</dd>
                  </div>
                </dl>
              </div>

              {/* Description */}
              {(work.description || work.descriptionCn) && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-stone-900 mb-4">
                    Description / 作品说明
                  </h2>
                  {work.descriptionCn && (
                    <p className="text-stone-700 mb-3">{work.descriptionCn}</p>
                  )}
                  {work.description && (
                    <p className="text-stone-600">{work.description}</p>
                  )}
                </div>
              )}

              {/* Certification & Provenance */}
              {(work.certification || work.provenance) && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-stone-900 mb-4">
                    Provenance & Certificate / 传承与证书
                  </h2>
                  <div className="space-y-3">
                    {work.certification && (
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-stone-900">Certificate</p>
                          <p className="text-stone-600">{work.certification}</p>
                        </div>
                      </div>
                    )}
                    {work.provenance && (
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-stone-900">Provenance</p>
                          <p className="text-stone-600">{work.provenance}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Truck className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-stone-700">Worldwide Shipping</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Shield className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-stone-700">Authenticity Guarantee</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <MessageCircle className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-stone-700">Art Advisory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Works */}
      {relatedWorks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif text-stone-900 mb-8">
              Related Works / 相关作品
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedWorks.map((relatedWork) => (
                <WorkCard key={relatedWork.id} work={relatedWork} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowInquiry(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-stone-900">
                Inquire About This Work
              </h3>
              <button
                onClick={() => setShowInquiry(false)}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <InquiryForm
                workSlug={work.slug}
                workTitle={work.titleCn || work.title}
                artistName={work.artistName}
                onSuccess={() => setShowInquiry(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          {work.images[selectedImage] && (
            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
              <Image
                src={work.images[selectedImage].url}
                alt={work.title}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
