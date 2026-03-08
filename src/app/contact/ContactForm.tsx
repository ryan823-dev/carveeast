'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-medium text-green-800 mb-2">
          Message Sent
        </h3>
        <p className="text-green-700">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-[#E5E4E2] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#B83A2F] transition-colors"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-[#E5E4E2] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#B83A2F] transition-colors"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Subject
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 border border-[#E5E4E2] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#B83A2F] transition-colors"
        >
          <option value="general">General Inquiry</option>
          <option value="work">Question About a Work</option>
          <option value="artist">Question About an Artist</option>
          <option value="auction">Auction Inquiry</option>
          <option value="sell">Interested in Selling</option>
          <option value="artist-submission">Artist Submission</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-[#E5E4E2] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#B83A2F] transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1A1A1A] text-white py-4 font-medium hover:bg-[#4A4A48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
