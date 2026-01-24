// Logo.tsx
import React from 'react';
import iconUrl from '../assets/logo.svg';
import textUrl from '../assets/logo-text.svg';

export function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">

      {/* Icon: 24px height (standard) */}
      <img
        src={iconUrl}
        alt="Kanak Artistry Icon"
         className="h-6 w-auto object-contain flex-shrink-0"
        draggable={false}
      />
      {/* Text: 24px height */}
      <img
        src={textUrl}
        alt="Kanak Artistry Wordmark"
        className="h-6 w-auto object-contain flex-shrink-0"
        draggable={false}
      />
    </div>
  );
}
