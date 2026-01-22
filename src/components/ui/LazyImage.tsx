import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  webpSrc?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  title?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  webpSrc, 
  width, 
  height,
  loading = 'lazy',
  title
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
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
