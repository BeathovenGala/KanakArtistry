import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  webpSrc?: string;
}

export function LazyImage({ src, alt, className = '', webpSrc }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        className={`
          ${className}
          transition-all duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-50'}
          ${isError ? 'bg-gray-200' : ''}
        `}
      />
    </picture>
  );
}
