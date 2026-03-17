'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

export default function NewWorkPage() {
  const router = useRouter();
  const user = getCurrentUser();
  
  const [formData, setFormData] = useState({
    titleEn: '',
    titleCn: '',
    year: new Date().getFullYear().toString(),
    medium: '',
    dimensions: '',
    price: '',
    description: '',
    culturalContext: '',
    category: 'seal_engraving',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit to API
      const response = await fetch('/api/artist-dashboard/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.titleEn,
          titleCn: formData.titleCn,
          artistId: user?.id,
          artistName: user?.name,
          year: formData.year,
          medium: formData.medium,
          dimensions: formData.dimensions,
          price: formData.price,
          description: formData.description,
          images: [],
          availability: 'available',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Work submitted successfully!');
        router.push('/artist-dashboard/works');
      } else {
        alert(`Error: ${result.error || 'Failed to create work'}`);
      }
    } catch (error) {
      console.error('Error submitting work:', error);
      alert('Failed to submit work. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#7A7A78] hover:text-[#1A1A1A] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-semibold text-[#1A1A1A] mb-2">
              Add New Work
            </h1>
            <p className="text-[#7A7A78]">
              List a new artwork for sale on CarveEast
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section className="bg-white rounded-lg border border-[#E5E4E2] p-6">
              <h2 className="text-xl font-serif font-semibold text-[#1A1A1A] mb-6">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                    placeholder="e.g., Tranquility Seal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                    Title (Chinese) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleCn}
                    onChange={(e) => setFormData({ ...formData, titleCn: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                    placeholder="例如：静观印"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                  >
                    <option value="seal_engraving">Seal Engraving</option>
                    <option value="calligraphy">Calligraphy</option>
                    <option value="ink_painting">Ink Painting</option>
                    <option value="inscribed_ceramics">Inscribed Ceramics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                    Year Created *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                  Medium/Materials *
                </label>
                <input
                  type="text"
                  required
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                  placeholder="e.g., Qingtian Stone, single-stroke carving"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                  Dimensions (H × W × D in cm) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                  placeholder="e.g., 6.8 × 3.5 × 3.5 cm"
                />
              </div>
            </section>

            {/* Pricing */}
            <section className="bg-white rounded-lg border border-[#E5E4E2] p-6">
              <h2 className="text-xl font-serif font-semibold text-[#1A1A1A] mb-6">
                Pricing
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                  placeholder="2800"
                />
                <p className="text-sm text-[#7A7A78] mt-2">
                  CarveEast takes a 20% commission on sales
                </p>
              </div>
            </section>

            {/* Description */}
            <section className="bg-white rounded-lg border border-[#E5E4E2] p-6">
              <h2 className="text-xl font-serif font-semibold text-[#1A1A1A] mb-6">
                Description
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                    placeholder="Describe the artwork, its inspiration, and significance..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A48] mb-2">
                    Cultural Context (Optional)
                  </label>
                  <textarea
                    value={formData.culturalContext}
                    onChange={(e) => setFormData({ ...formData, culturalContext: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] rounded-lg"
                    placeholder="Explain any cultural or historical significance..."
                  />
                </div>
              </div>
            </section>

            {/* Images */}
            <section className="bg-white rounded-lg border border-[#E5E4E2] p-6">
              <h2 className="text-xl font-serif font-semibold text-[#1A1A1A] mb-6">
                Images
              </h2>
              
              <div className="border-2 border-dashed border-[#E5E4E2] rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-[#9A9A98] mx-auto mb-4" />
                <p className="text-[#4A4A48] mb-2">
                  Drag and drop images, or click to upload
                </p>
                <p className="text-sm text-[#7A7A78]">
                  Upload at least 1 high-quality image (minimum 800x800px)
                </p>
                <button
                  type="button"
                  className="mt-4 bg-[#1A1A1A] text-white px-6 py-2 text-sm hover:bg-[#333] transition-colors"
                >
                  Choose Files
                </button>
              </div>
            </section>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-[#4A4A48] hover:text-[#1A1A1A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#B83A2F] text-white px-8 py-3 text-sm tracking-wide hover:bg-[#982A1F] transition-colors"
              >
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
