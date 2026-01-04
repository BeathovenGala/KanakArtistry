import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [artworkType, setArtworkType] = useState('');

  // Set page title
  useEffect(() => {
    document.title = 'KanakArtistry - Unique Art for Your Space';
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