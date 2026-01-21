import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { trackVisitor } from './utils/supabase/client';
import { setSEOTags, organizationSchema, trackPageView } from './utils/seo';

export default function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [artworkType, setArtworkType] = useState('');

  // Set page title, SEO tags, and track visitor on mount
  useEffect(() => {
    // Set comprehensive SEO tags for home page
    setSEOTags({
      title: 'KanakArtistry | Handmade Art & Commission Services',
      description: 'Discover authentic handmade artwork and commission services. Explore 11 unique handcrafted pieces including oil paintings, acrylic art, and mixed media.',
      keywords: ['handmade art', 'oil painting', 'acrylic art', 'art commission', 'custom artwork'],
      image: 'https://kanakartistry.com/og-image.jpg',
      url: 'https://kanakartistry.com',
      type: 'website'
    });

    // Add organization structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(organizationSchema);
    script.setAttribute('data-seo-script', 'organization');
    const existingScript = document.querySelector('script[data-seo-script="organization"]');
    if (existingScript) existingScript.remove();
    document.head.appendChild(script);

    // Track page view
    trackPageView('/', 'Home - KanakArtistry');

    // Track visitor when app loads
    trackVisitor();
  }, []);

  // Secret key combination to open admin dashboard: Ctrl/Cmd + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsAdminDashboardOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInquireClick = () => {
    setArtworkType('');
    setIsInquiryModalOpen(true);
  };

  const handleInquireWithArtwork = (title: string, medium: string) => {
    setArtworkType(`${medium} - Similar to "${title}"`);
    setIsInquiryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsInquiryModalOpen(false);
    setArtworkType('');
  };

  const handleCloseAdminDashboard = () => {
    setIsAdminDashboardOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation onInquireClick={handleInquireClick} />
      <Hero onInquireClick={handleInquireClick} />
      <Gallery onInquireClick={handleInquireClick} onInquireWithArtwork={handleInquireWithArtwork} />
      <About />
      <Contact onInquireClick={handleInquireClick} />
      <Footer />
      <InquiryModal isOpen={isInquiryModalOpen} onClose={handleCloseModal} initialArtType={artworkType} />
      <AdminDashboard isOpen={isAdminDashboardOpen} onClose={handleCloseAdminDashboard} />
    </div>
  );
}