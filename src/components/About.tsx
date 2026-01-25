import { motion } from 'motion/react';
import { useRef } from 'react';
import { Palette, Layers, Heart, Award } from 'lucide-react';

const styles = [
  'Mixed Media',
  'Relief Art',
  'Acrylic',
  'Textured Art',
  'Madhubani',
  'Warli',
  'Gond Art',
  'Lippan Art',
];

const features = [
  {
    icon: Palette,
    title: 'Diverse Mediums',
    description: 'From traditional folk art to contemporary mixed media, exploring various artistic expressions.',
  },
  {
    icon: Layers,
    title: 'Textured Depth',
    description: 'Incorporating relief and dimensional elements that add physical depth to visual stories.',
  },
  {
    icon: Heart,
    title: 'Emotional Resonance',
    description: 'Creating pieces that resonate emotionally through symbolism and layered meaning.',
  },
  {
    icon: Award,
    title: 'One-of-a-Kind',
    description: 'Every piece is unique, handcrafted exclusively for you with thoughtful customization.',
  },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-[var(--color-neutral-cream)]"
    >
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
            The Artist
          </h6>
          <h2 className="mb-4">Monika Mistri</h2>
          <p className="text-[var(--color-gold)] italic text-xl">Creating Golden Moments in Art</p>
        </motion.div>

        {/* Philosophy Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-6 md:p-12 luxury-shadow">
              <h3 className="mb-6">Artistic Philosophy</h3>
              <div className="w-12 h-[1px] bg-[var(--color-gold)] mb-8" />
              <p className="mb-6 leading-relaxed text-[var(--color-neutral-charcoal)]">
                Every brushstroke carries intention. Every texture tells a story.
                Our work explores the intersection of traditional Indian folk art
                and contemporary artistic expression, creating pieces that honor
                heritage while speaking to modern sensibilities.
              </p>
              <p className="mb-6 leading-relaxed text-[var(--color-neutral-charcoal)]">
                We believe art should be more than decoration—it should be a
                conversation, a memory, a piece of your story. That's why each
                commission is crafted uniquely for you, ensuring your artwork is
                truly one-of-a-kind.
              </p>
              <p className="leading-relaxed text-[var(--color-neutral-charcoal)]">
                From the intricate patterns of Madhubani to the bold textures of
                contemporary mixed media, we bring diverse techniques together to
                create something entirely personal and meaningful.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="border border-[var(--color-gold-light)] p-6 md:p-10">
              <h4 className="mb-6 text-[var(--color-primary-teal)]">What We Create</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-[var(--color-gold)] rounded-full mt-3 flex-shrink-0" />
                  <p>Customized art pieces tailored to your vision</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-[var(--color-gold)] rounded-full mt-3 flex-shrink-0" />
                  <p>Contemporary wall art with unique textures</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-[var(--color-gold)] rounded-full mt-3 flex-shrink-0" />
                  <p>Folk-inspired paintings honoring tradition</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-[var(--color-gold)] rounded-full mt-3 flex-shrink-0" />
                  <p>Handcrafted décor artworks for your space</p>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-primary-teal)] p-6 md:p-10 text-white">
              <h4 className="mb-4 text-white">Our Specialty</h4>
              <p className="text-white/90 leading-relaxed">
                Each piece is a unique conversation between tradition and contemporary
                artistry, making your commissioned artwork truly one-of-a-kind.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 md:p-8 bg-white luxury-shadow transition-all duration-300 hover:luxury-shadow-hover"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[var(--color-gold-light)]">
                <feature.icon className="text-[var(--color-primary-teal)]" size={28} strokeWidth={1.5} />
              </div>
              <h5 className="mb-4">{feature.title}</h5>
              <p className="text-sm leading-relaxed text-[var(--color-neutral-gray)]">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Styles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="mb-12">Styles & Mediums</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {styles.map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-8 py-3 border border-[var(--color-gold-light)] text-[var(--color-neutral-charcoal)] hover:border-[var(--color-gold)] hover:bg-[var(--color-neutral-cream)] transition-all duration-300"
              >
                <h6>{style}</h6>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}