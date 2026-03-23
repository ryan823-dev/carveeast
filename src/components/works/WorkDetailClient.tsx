'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ZoomIn, Heart, Share2, Truck, Shield, MessageCircle, Send, Loader2, CheckCircle, X, ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart, CartItem } from '@/lib/cart-context';
import { formatPrice, STONE_MATERIALS, CARVING_STYLES, SEAL_LAYOUTS, AVAILABILITY_LABELS, type ArtworkImage } from '@/lib/artwork-data';

interface WorkDetailProps {
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

export default function WorkDetail({ work, relatedWorks = [] }: WorkDetailProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isWorkInCart = isInCart(work.slug);
  const availability = AVAILABILITY_LABELS[work.availability as keyof typeof AVAILABILITY_LABELS] || AVAILABILITY_LABELS.available;
  const stoneMaterial = STONE_MATERIALS.find((m) => m.value === work.medium);
  const carvingStyle = CARVING_STYLES.find((s) => s.value === work.carvingStyle);
  const sealLayout = SEAL_LAYOUTS.find((l) => l.value === work.layout);

  const handleAddToCart = () => {
    if (!work.price) return;
    const cartItem: CartItem = {
      id: work.slug,
      slug: work.slug,
      title: work.title,
      titleCn: work.titleCn,
      artistName: work.artistName,
      artistSlug: work.artistSlug,
      price: work.price,
      currency: work.currency,
      image: work.images[0]?.url || '',
      category: 'seal_carving',
      type: 'artwork',
    };
    addItem(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!work.price) return;
    const cartItem: CartItem = {
      id: work.slug,
      slug: work.slug,
      title: work.title,
      titleCn: work.titleCn,
      artistName: work.artistName,
      artistSlug: work.artistSlug,
      price: work.price,
      currency: work.currency,
      image: work.images[0]?.url || '',
      category: 'seal_carving',
      type: 'artwork',
    };
    addItem(cartItem);
    router.push('/checkout');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workSlug: work.slug,
          workTitle: work.titleCn || work.title,
          artistName: work.artistName,
          name: formName,
          email: formEmail,
          message: formMessage,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormName('');
        setFormEmail('');
        setFormMessage('');
      }
    } catch {
      alert('Failed to submit inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-stone-500 max-w-7xl mx-auto">
          <Link href="/" className="hover:text-stone-700">Home</Link>
          <span>/</span>
          <Link href="/works" className="hover:text-stone-700">Works</Link>
          <span>/</span>
          <span className="text-stone-900">{work.titleCn || work.title}</span>
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                {work.images[selectedImage] ? (
                  <Image src={work.images[selectedImage].url} alt={work.titleCn || work.title} fill className="object-contain" priority />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-stone-300">印</div>
                )}
                <button onClick={() => setIsZoomed(true)} className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow">
                  <ZoomIn className="w-5 h-5" />
                </button>
                {work.images.length > 1 && (
                  <>
                    <button onClick={() => setSelectedImage((p) => (p - 1 + work.images.length) % work.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setSelectedImage((p) => (p + 1) % work.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <span className={cn('absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium',
                  availability.color === 'green' && 'bg-green-100 text-green-800',
                  availability.color === 'red' && 'bg-red-100 text-red-800',
                  availability.color === 'yellow' && 'bg-yellow-100 text-yellow-800',
                  availability.color === 'gray' && 'bg-stone-100 text-stone-800'
                )}>{availability.label}</span>
              </div>
              {work.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {work.images.map((img, i) => (
                    <button key={img.id} onClick={() => setSelectedImage(i)} className={cn('relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2', i === selectedImage ? 'border-amber-600' : 'border-transparent')}>
                      <Image src={img.url} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">{work.titleCn || work.title}</h1>
                <div className="flex items-center gap-2 text-stone-600">
                  <span>by</span>
                  <Link href={`/artists/${work.artistSlug || ''}`} className="text-amber-700 hover:text-amber-800 font-medium">{work.artistName}</Link>
                  <span>·</span>
                  <span>{work.year}</span>
                </div>
              </div>

              {work.price && work.availability === 'available' && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <span className="text-4xl font-bold text-stone-900">{formatPrice(work.price, work.currency)}</span>
                  <p className="text-sm text-stone-500 mt-2">Includes certificate of authenticity</p>
                </div>
              )}

              <div className="flex gap-4">
                {work.availability === 'available' && work.price && (
                  <>
                    <button onClick={handleBuyNow} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2">
                      Buy Now
                    </button>
                    {addedToCart || isWorkInCart ? (
                      <button disabled className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </button>
                    ) : (
                      <button onClick={handleAddToCart} className="flex-1 bg-white hover:bg-stone-50 text-stone-800 py-4 px-6 rounded-xl font-medium border border-stone-300 flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    )}
                  </>
                )}
                {!work.price && (
                  <button onClick={() => setShowInquiry(true)} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-xl font-medium">Inquire for Price</button>
                )}
                <button onClick={() => setShowInquiry(true)} className="flex-1 bg-white hover:bg-stone-50 text-stone-800 py-4 px-6 rounded-xl font-medium border border-stone-300">Inquire</button>
                <button onClick={() => setIsFavorite(!isFavorite)} className={cn('p-4 rounded-xl border', isFavorite ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-stone-300 text-stone-600')}>
                  <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                </button>
                <button className="p-4 bg-white border border-stone-300 rounded-xl text-stone-600"><Share2 className="w-5 h-5" /></button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">Specifications</h2>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  {stoneMaterial && <><div><dt className="text-stone-500">Material</dt><dd className="text-stone-900">{stoneMaterial.labelEn}</dd></div><div><dt className="text-stone-500">石料</dt><dd className="text-stone-900">{stoneMaterial.label}</dd></div></>}
                  {work.stoneColor && <div><dt className="text-stone-500">Color</dt><dd className="text-stone-900">{work.stoneColor}</dd></div>}
                  <div><dt className="text-stone-500">Dimensions</dt><dd className="text-stone-900">{work.dimensions}</dd></div>
                  {work.weight && <div><dt className="text-stone-500">Weight</dt><dd className="text-stone-900">{work.weight}</dd></div>}
                  {carvingStyle && <div><dt className="text-stone-500">Style</dt><dd className="text-stone-900">{carvingStyle.labelEn}</dd></div>}
                  {work.sealStyle && <div><dt className="text-stone-500">Seal Style</dt><dd className="text-stone-900">{work.sealStyle}</dd></div>}
                  {work.scriptType && <div><dt className="text-stone-500">Script</dt><dd className="text-stone-900">{work.scriptType}</dd></div>}
                  {work.characterCount && <div><dt className="text-stone-500">Characters</dt><dd className="text-stone-900">{work.characterCount}</dd></div>}
                  {sealLayout && <div><dt className="text-stone-500">Layout</dt><dd className="text-stone-900">{sealLayout.labelEn}</dd></div>}
                  <div><dt className="text-stone-500">Year</dt><dd className="text-stone-900">{work.year}</dd></div>
                </dl>
              </div>

              {(work.description || work.descriptionCn) && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-stone-900 mb-4">Description</h2>
                  {work.descriptionCn && <p className="text-stone-700 mb-3">{work.descriptionCn}</p>}
                  {work.description && <p className="text-stone-600">{work.description}</p>}
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm"><Truck className="w-6 h-6 text-amber-600 mx-auto mb-2" /><p className="text-sm text-stone-700">Worldwide Shipping</p></div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm"><Shield className="w-6 h-6 text-amber-600 mx-auto mb-2" /><p className="text-sm text-stone-700">Authenticity Guarantee</p></div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm"><MessageCircle className="w-6 h-6 text-amber-600 mx-auto mb-2" /><p className="text-sm text-stone-700">Art Advisory</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedWorks.length > 0 && (
        <section className="py-16 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif text-stone-900 mb-8">Related Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedWorks.slice(0, 3).map((r) => (
                <Link key={r.slug} href={`/works/${r.slug}`} className="group block bg-stone-100 rounded-xl overflow-hidden">
                  <div className="aspect-square bg-stone-200 flex items-center justify-center text-5xl text-stone-400">印</div>
                  <div className="p-4"><h3 className="font-medium text-stone-900 group-hover:text-amber-600">{r.titleCn || r.title}</h3><p className="text-sm text-stone-500">{r.artistName}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowInquiry(false); setSubmitted(false); }} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-stone-900">Inquire About This Work</h3>
              <button onClick={() => { setShowInquiry(false); setSubmitted(false); }} className="p-2 hover:bg-stone-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Inquiry Submitted!</h3>
                  <p className="text-stone-600 mb-4">We will respond within 24-48 hours.</p>
                  <button onClick={() => { setShowInquiry(false); setSubmitted(false); }} className="text-amber-600 font-medium">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-stone-50 rounded-lg p-4">
                    <p className="text-sm text-stone-500">Inquiring about</p>
                    <p className="font-medium text-stone-900">{work.titleCn || work.title}</p>
                    {work.price && <p className="text-amber-600">{formatPrice(work.price, work.currency)}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
                    <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
                    <input type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Message *</label>
                    <textarea required rows={4} value={formMessage} onChange={(e) => setFormMessage(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg" placeholder="Your questions..." />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-400 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Inquiry</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {isZoomed && work.images[selectedImage] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out" onClick={() => setIsZoomed(false)}>
          <Image src={work.images[selectedImage].url} alt={work.title} fill className="object-contain" />
        </div>
      )}
    </main>
  );
}
