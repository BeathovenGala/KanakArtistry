import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

interface ContactProps {
  onInquireClick: () => void;
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    content: '104, Vashisth Vanijyam, Vallabh Vidyanagar, Anand, Gujarat 388120, India',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+91 87580 46166',
    link: 'tel:+918758046166',
  },
  {
    icon: Clock,
    title: 'Hours',
    content: 'Monday to Friday\n10:00 AM - 4:00 PM',
  },
  {
    icon: Mail,
    title: 'Inquire',
    content: 'Send an Inquiry',
    action: true,
  },
];

export function Contact({ onInquireClick }: ContactProps) {
  const handleContactClick = (item: typeof contactInfo[0]) => {
    if (item.action) {
      onInquireClick();
    } else if (item.link) {
      window.location.href = item.link;
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--color-neutral-white)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-6" />
          <h6 className="text-[var(--color-primary-teal)] tracking-[0.3em] uppercase mb-6">
            Get in Touch
          </h6>
          <h2 className="mb-6">Let's Create Together</h2>
          <p className="max-w-2xl mx-auto text-lg text-[var(--color-neutral-gray)]">
            Have a vision for your space? Want to commission a unique piece?
            We'd love to hear from you and bring your artistic vision to life.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleContactClick(item)}
              className={`bg-[var(--color-neutral-white)] p-8 luxury-shadow transition-all duration-300 ${
                item.link || item.action
                  ? 'cursor-pointer hover:luxury-shadow-hover hover:border-[var(--color-gold)] border border-transparent'
                  : 'border border-transparent'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-gold-light)] mb-6">
                <item.icon className="text-[var(--color-primary-teal)]" size={20} strokeWidth={1.5} />
              </div>
              <h5 className="mb-3">{item.title}</h5>
              <p className="text-sm whitespace-pre-line leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--color-neutral-white)] py-16 px-12 text-center luxury-shadow"
        >
          <h3 className="mb-6">Are you looking for Bespoke Artwork?</h3>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-[var(--color-neutral-gray)]">
            Located in Vallabh Vidyanagar, Anand, Gujarat.
            Schedule a visit to discuss your custom piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              onClick={onInquireClick}
              className="px-12 py-4 bg-[var(--color-primary-teal)] text-white rounded-none transition-all duration-300 luxury-shadow hover:luxury-shadow-hover hover:bg-[var(--color-primary-deep-teal)]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <h5 className="text-white">Schedule a Visit</h5>
            </motion.button>
            <motion.a
              href="tel:+918758046166"
              className="px-12 py-4 border border-[var(--color-neutral-charcoal)] text-[var(--color-neutral-charcoal)] rounded-none transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] inline-flex items-center justify-center"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <h5>Call Now</h5>
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-12 text-center"
        >
          {[
            { number: '100+', label: 'Unique Pieces Created' },
            { number: '100%', label: 'Handcrafted Quality' },
            { number: '1:1', label: 'Personalized Consultation' },
          ].map((stat, index) => (
            <div key={index}>
              <h2 className="text-[var(--color-primary-teal)] mb-3">{stat.number}</h2>
              <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto mb-3" />
              <p className="text-[var(--color-neutral-gray)]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}