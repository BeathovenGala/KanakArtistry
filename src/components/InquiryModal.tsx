import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { saveInquiry, supabase } from '../utils/supabase/client';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArtType?: string;
  initialMedium?: string;
}

export function InquiryModal({ isOpen, onClose, initialArtType = '', initialMedium = '' }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artType: '',
    size: '',
    budget: '',
    message: '',
    timeline: '',
  });

  useEffect(() => {
    if (initialArtType) {
      setFormData(prev => ({ ...prev, artType: initialArtType }));
    }
  }, [initialArtType]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    setError(null);

    try {
      // Save inquiry to database and get the full saved data
      const savedInquiry = await saveInquiry(formData);

      // Transform field names to what the edge function expects
      const inquiryForEmail = {
        name: savedInquiry?.name ?? formData.name,
        email: savedInquiry?.email ?? formData.email,
        phone: savedInquiry?.phone ?? formData.phone,
        art_type: savedInquiry?.art_type ?? formData.artType,
        size: savedInquiry?.size ?? formData.size,
        budget: savedInquiry?.budget ?? formData.budget,
        message: savedInquiry?.message ?? formData.message,
        timeline: savedInquiry?.timeline ?? formData.timeline,
        submitted_at: savedInquiry?.submitted_at ?? new Date().toISOString(),
        ip_address: savedInquiry?.ip_address ?? '',
        user_agent: savedInquiry?.user_agent ?? navigator.userAgent,
      };

      // Send instant email notification using Supabase client (handles CORS)
      try {
        const { data, error } = await supabase.functions.invoke('send-inquiry-notification', {
          body: inquiryForEmail,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        });

        if (error) {
          console.warn('Instant email notification failed (non-critical):', error.message);
        } else {
          console.log('Instant email notification sent', data);
        }
      } catch (emailError) {
        console.warn('Instant email notification failed (non-critical):', emailError);
        // Don't fail the form submission if email fails
      }

      console.log('Inquiry submitted successfully');
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          artType: '',
          size: '',
          budget: '',
          message: '',
          timeline: '',
        });
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto luxury-shadow"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="bg-[var(--color-primary-teal)] text-white p-6 md:p-10 relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:opacity-70 transition-opacity"
                  >
                    <X size={24} />
                  </button>
                  <div className="w-12 h-[1px] bg-[var(--color-gold)] mb-4" />
                  <h3 className="text-white mb-2">Commission Your Artwork</h3>
                  <p className="text-white/80">
                    Let's create something unique together
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block mb-2">
                        <h6>Your Name *</h6>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors text-base"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2">
                        <h6>Email Address *</h6>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-2">
                        <h6>Phone Number *</h6>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors text-base"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="artType" className="block mb-2">
                        <h6>Art Type *</h6>
                      </label>
                      <input
                        type="text"
                        id="artType"
                        name="artType"
                        required
                        value={formData.artType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors text-base"
                        placeholder="e.g., Madhubani, Mixed Media"
                      />
                    </div>

                    <div>
                      <label htmlFor="size" className="block mb-2">
                        <h6>Preferred Size</h6>
                      </label>
                      <input
                        type="text"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors text-base"
                        placeholder="e.g., 24x36 inches"
                      />
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block mb-2">
                        <h6>Timeline</h6>
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors bg-white text-base"
                      >
                        <option value="">When do you need it?</option>
                        <option value="flexible">Flexible</option>
                        <option value="1-2-weeks">1-2 weeks</option>
                        <option value="3-4-weeks">3-4 weeks</option>
                        <option value="1-2-months">1-2 months</option>
                        <option value="2-months-plus">2+ months</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="budget" className="block mb-2">
                      <h6>Budget Range</h6>
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors text-base"
                      placeholder="Your budget range"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block mb-2">
                      <h6>Tell Me About Your Vision *</h6>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-[var(--color-neutral-light-gray)] focus:border-[var(--color-primary-teal)] focus:outline-none transition-colors resize-none text-base"
                      placeholder="Describe your vision, color preferences, themes, or any specific ideas..."
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700"
                    >
                      <p>{error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-[var(--color-primary-teal)] text-white rounded-none hover:bg-[var(--color-primary-deep-teal)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed luxury-shadow hover:luxury-shadow-hover"
                  >
                    <Send size={20} />
                    <h5 className="text-white">{isSubmitting ? 'Sending...' : 'Send Inquiry'}</h5>
                  </button>

                  <p className="text-center mt-6 text-sm text-[var(--color-neutral-gray)]">
                    We'll get back to you within 24 hours during business hours
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 md:p-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 border-2 border-[var(--color-gold)] flex items-center justify-center mx-auto mb-8"
                >
                  <Send className="text-[var(--color-primary-teal)]" size={32} />
                </motion.div>
                <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-6" />
                <h3 className="mb-4">Thank You</h3>
                <p className="text-lg text-[var(--color-neutral-gray)]">
                  Your inquiry has been received. We'll reach out to you soon to
                  discuss your custom artwork.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}