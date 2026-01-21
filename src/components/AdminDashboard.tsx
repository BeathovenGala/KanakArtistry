import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, Tag, DollarSign, MessageSquare, X, RefreshCw } from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  art_type: string;
  size: string;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  submitted_at: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('queries')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getArtTypeName = (artType: string) => {
    const types: Record<string, string> = {
      'mixed-media': 'Mixed Media Painting',
      'relief': 'Relief Art',
      'acrylic': 'Acrylic Painting',
      'textured': 'Contemporary Textured Art',
      'madhubani': 'Madhubani Painting',
      'warli': 'Warli Painting',
      'gond': 'Gond Art',
      'lippan': 'Lippan Art',
      'other': 'Other / Not Sure',
    };
    return types[artType] || artType;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary-teal)] to-[var(--color-accent-coral)] text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-2">Inquiry Dashboard</h3>
              <p className="text-white/90">
                {inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'} received
              </p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={fetchInquiries}
                disabled={isLoading}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <RefreshCw size={20} />
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-3 bg-white/20 hover:bg-red-500 rounded-full transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Close Dashboard"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary-teal)] border-t-transparent" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-[var(--color-accent-coral)] mb-4">{error}</p>
              <button
                onClick={fetchInquiries}
                className="px-6 py-2 bg-[var(--color-primary-teal)] text-white rounded-full hover:bg-[var(--color-primary-deep-teal)] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto mb-4 text-[var(--color-neutral-gray)]" size={48} />
              <h4 className="mb-2">No inquiries yet</h4>
              <p>When someone submits an inquiry, it will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {inquiries.map((inquiry) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--color-neutral-cream)] rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="mb-1">{inquiry.name}</h5>
                      <p className="text-sm text-[var(--color-neutral-gray)]">
                        {formatDate(inquiry.submitted_at)}
                      </p>
                    </div>
                    <span className="px-4 py-1 bg-[var(--color-primary-teal)] text-white rounded-full text-sm">
                      {inquiry.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-[var(--color-primary-teal)]" />
                      <p className="text-sm">{inquiry.email}</p>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-[var(--color-primary-teal)]" />
                        <p className="text-sm">{inquiry.phone}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Tag size={16} className="text-[var(--color-primary-teal)]" />
                      <p className="text-sm">{getArtTypeName(inquiry.art_type)}</p>
                    </div>
                    {inquiry.timeline && (
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-[var(--color-primary-teal)]" />
                        <p className="text-sm capitalize">{inquiry.timeline.replace('-', ' ')}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <h6 className="mb-2">Message:</h6>
                    <p className="text-sm line-clamp-2">{inquiry.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedInquiry(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[var(--color-primary-teal)] to-[var(--color-accent-coral)] text-white p-8 rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white mb-2">{selectedInquiry.name}</h3>
                  <p className="text-white/90">{formatDate(selectedInquiry.submitted_at)}</p>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h6 className="mb-3 text-[var(--color-primary-teal)]">Contact Information</h6>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-[var(--color-neutral-gray)]" />
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-[var(--color-primary-teal)] hover:underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[var(--color-neutral-gray)]" />
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-[var(--color-primary-teal)] hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-[var(--color-primary-teal)]">Project Details</h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--color-neutral-gray)] mb-1">Art Type</p>
                    <p>{getArtTypeName(selectedInquiry.art_type)}</p>
                  </div>
                  {selectedInquiry.size && (
                    <div>
                      <p className="text-sm text-[var(--color-neutral-gray)] mb-1">Size</p>
                      <p>{selectedInquiry.size}</p>
                    </div>
                  )}
                  {selectedInquiry.budget && (
                    <div>
                      <p className="text-sm text-[var(--color-neutral-gray)] mb-1">Budget</p>
                      <p>{selectedInquiry.budget}</p>
                    </div>
                  )}
                  {selectedInquiry.timeline && (
                    <div>
                      <p className="text-sm text-[var(--color-neutral-gray)] mb-1">Timeline</p>
                      <p className="capitalize">{selectedInquiry.timeline.replace('-', ' ')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-[var(--color-primary-teal)]">Vision & Message</h6>
                <div className="bg-[var(--color-neutral-cream)] rounded-xl p-4">
                  <p>{selectedInquiry.message}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex-1 px-6 py-3 bg-[var(--color-primary-teal)] text-white rounded-full hover:bg-[var(--color-primary-deep-teal)] transition-colors text-center"
                >
                  Send Email
                </a>
                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="flex-1 px-6 py-3 border-2 border-[var(--color-primary-teal)] text-[var(--color-primary-teal)] rounded-full hover:bg-[var(--color-primary-teal)] hover:text-white transition-colors text-center"
                  >
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
