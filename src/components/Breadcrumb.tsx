import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { createBreadcrumbSchema } from '../utils/seo';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Add structured data on mount
  useEffect(() => {
    const breadcrumbItems = items.map(item => ({
      name: item.label,
      url: item.url || 'https://kanakartistry.com'
    }));

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(createBreadcrumbSchema(breadcrumbItems));
    script.setAttribute('data-breadcrumb-schema', 'true');
    
    const existingScript = document.querySelector('script[data-breadcrumb-schema]');
    if (existingScript) existingScript.remove();
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`py-4 px-6 bg-[var(--color-neutral-white)] ${className}`}>
      <ol className="flex items-center gap-2 max-w-7xl mx-auto text-sm text-[var(--color-neutral-gray)]">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            {item.url ? (
              <a
                href={item.url}
                className="hover:text-[var(--color-primary-teal)] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-[var(--color-neutral-gray)] font-medium">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight size={16} className="text-[var(--color-gold)]" />
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
