/**
 * SEO Utility Functions
 * Manages meta tags, structured data, and SEO optimization
 */

export interface SEOMetaTags {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
}

/**
 * Update page meta tags for SEO
 */
export function setSEOTags(seo: SEOMetaTags) {
  // Set page title (no suffix)
  document.title = seo.title;

  // Update or create meta tags
  updateMetaTag('description', seo.description);
  
  if (seo.keywords?.length) {
    updateMetaTag('keywords', seo.keywords.join(', '));
  }

  // Open Graph tags for social media
  updateMetaTag('og:title', seo.title, 'property');
  updateMetaTag('og:description', seo.description, 'property');
  updateMetaTag('og:type', seo.type || 'website', 'property');
  updateMetaTag('og:url', seo.url || 'https://kanakartistry.com', 'property');
  
  if (seo.image) {
    updateMetaTag('og:image', seo.image, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
  }

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', seo.title);
  updateMetaTag('twitter:description', seo.description);
  if (seo.image) {
    updateMetaTag('twitter:image', seo.image);
  }

  // Canonical URL
  updateCanonicalURL(seo.url || 'https://kanakartistry.com');
}

/**
 * Create or update a meta tag
 */
function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

/**
 * Update canonical URL
 */
function updateCanonicalURL(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  
  link.href = url;
}

/**
 * Add structured data (JSON-LD Schema)
 */
export function addStructuredData(data: Record<string, any>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Organization Schema
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'KanakArtistry',
  'image': 'https://kanakartistry.com/logo.png',
  'description': 'Handmade spiritual canvas paintings and custom art commissions. Tree of Life, Krishna art, and more.',
  'url': 'https://kanakartistry.com',
  'telephone': '+91-XXXXX',
  'email': 'has132006@gmail.com',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'IN'
  },
  'sameAs': [
    'https://instagram.com/kanakartistry',
    'https://facebook.com/kanakartistry',
    'https://pinterest.com/kanakartistry'
  ],
  'priceRange': '₹2000 - ₹50000'
};

/**
 * Product Schema for artworks
 */
export function createProductSchema(name: string, description: string, image: string, price?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': name,
    'description': description,
    'image': image,
    'brand': {
      '@type': 'Brand',
      'name': 'KanakArtistry'
    },
    ...(price && {
      'offers': {
        '@type': 'Offer',
        'url': 'https://kanakartistry.com',
        'priceCurrency': 'INR',
        'price': price,
        'availability': 'https://schema.org/CustomOrder'
      }
    })
  };
}

/**
 * Breadcrumb Schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * FAQ Schema
 */
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Review/Rating Schema
 */
export function createReviewSchema(name: string, rating: number, reviewText: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': rating.toString(),
      'bestRating': '5',
      'worstRating': '1'
    },
    'author': {
      '@type': 'Person',
      'name': name
    },
    'reviewBody': reviewText
  };
}

/**
 * Track Google Analytics event
 */
export function trackEvent(category: string, action: string, label?: string, value?: number) {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
}

/**
 * Track page view with custom title
 */
export function trackPageView(pagePath: string, pageTitle: string) {
  if (window.gtag) {
    window.gtag('config', (window as any).GA_ID, {
      'page_path': pagePath,
      'page_title': pageTitle
    });
  }
}
