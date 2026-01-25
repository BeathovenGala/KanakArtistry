import { motion } from 'motion/react';
import { MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--color-neutral-black)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-white mb-3">
                Kanak<span className="luxury-accent">Artistry</span>
              </h4>
              <div className="w-12 h-[1px] bg-[var(--color-gold)] mb-4" />
              <p className="text-white/60 leading-relaxed">
                Creating unique, handcrafted conceptual art pieces that tell your
                story through color, texture, and emotion.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h5>
            <nav className="flex flex-col gap-3">
              {['home', 'about', 'gallery', 'contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="text-white/60 hover:text-[var(--color-gold)] transition-colors text-left capitalize text-sm"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Art Styles */}
          <div>
            <h5 className="text-white mb-6 uppercase tracking-wider text-sm">Specialties</h5>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <p>Mixed Media</p>
              <p>Relief Art</p>
              <p>Acrylic Painting</p>
              <p>Madhubani</p>
              <p>Contemporary Art</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-white mb-6 uppercase tracking-wider text-sm">Contact</h5>
            <div className="space-y-4 text-white/60 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--color-gold)] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <p className="leading-relaxed">
                  Vallabh Vidyanagar,<br />
                  Anand, Gujarat 388120
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--color-gold)] flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="tel:+918758046166"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  +91 87580 46166
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[var(--color-gold)] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <p className="leading-relaxed">
                  Mon - Fri<br />
                  10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
            <p>
              © {currentYear} KanakArtistry. All rights reserved.
            </p>
            <p>
              Each piece is unique and handcrafted by Monika Mistri
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}