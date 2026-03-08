'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackData {
  type: 'suggestion' | 'bug' | 'question' | 'other';
  message: string;
  email?: string;
  pageUrl: string;
}

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'suggestion',
    message: '',
    email: '',
    pageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store feedback locally for now
    const feedbacks = JSON.parse(localStorage.getItem('carve-east-feedback') || '[]');
    feedbacks.push({
      ...feedback,
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('carve-east-feedback', JSON.stringify(feedbacks));

    setStep('success');
    setTimeout(() => {
      setIsOpen(false);
      setStep('form');
      setFeedback({
        type: 'suggestion',
        message: '',
        email: '',
        pageUrl: '',
      });
    }, 2000);
  };

  const feedbackTypes = [
    { value: 'suggestion', label: 'Suggestion', icon: '💡' },
    { value: 'bug', label: 'Bug Report', icon: '🐛' },
    { value: 'question', label: 'Question', icon: '❓' },
    { value: 'other', label: 'Other', icon: '💬' },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] text-white rounded-full shadow-lg hover:bg-[#333] transition-all',
          isOpen && 'opacity-0 pointer-events-none'
        )}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-medium">Feedback</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6 pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-white shadow-2xl pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E5E4E2]">
              <h3 className="font-serif text-lg text-[#1A1A1A]">Send Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#7A7A78] hover:text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Feedback Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() =>
                            setFeedback({ ...feedback, type: type.value as any })
                          }
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 text-sm border transition-colors',
                            feedback.type === type.value
                              ? 'border-[#B83A2F] bg-[#B83A2F]/5 text-[#B83A2F]'
                              : 'border-[#E5E4E2] hover:border-[#B83A2F]'
                          )}
                        >
                          <span>{type.icon}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      value={feedback.message}
                      onChange={(e) =>
                        setFeedback({ ...feedback, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F] resize-none"
                      placeholder="Tell us what you think..."
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Email <span className="text-[#7A7A78]">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={feedback.email}
                      onChange={(e) =>
                        setFeedback({ ...feedback, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-[#E5E4E2] focus:outline-none focus:border-[#B83A2F]"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!feedback.message.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Send Feedback
                  </button>
                </form>
              )}

              {step === 'submitting' && (
                <div className="py-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#B83A2F]" />
                  <p className="text-[#7A7A78]">Sending feedback...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-12 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h4 className="font-serif text-lg text-[#1A1A1A] mb-2">
                    Thank You!
                  </h4>
                  <p className="text-[#7A7A78]">
                    Your feedback helps us improve CarveEast.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
