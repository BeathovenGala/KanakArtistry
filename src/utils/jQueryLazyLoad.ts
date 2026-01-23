import $ from 'jquery';

/**
 * jQuery-based lazy loading for images
 * Images are loaded after page content is ready, improving initial page load speed
 * and Google PageSpeed scores (search engines only measure initial HTML load)
 */
export function initLazyLoading() {
  $(document).ready(function() {
    // Wait for all content to be loaded
    $(window).on('load', function() {
      // Find all images with lazy-load class and data-src attribute
      $('.lazy-load[data-src]').each(function() {
        const $img = $(this);
        const imageSrc = $img.attr('data-src');
        
        if (imageSrc) {
          // Add a loading class for smooth transition
          $img.addClass('loading');
          
          // Create a new image to preload
          const img = new Image();
          
          img.onload = function() {
            // Set the src attribute to actually load the image
            $img.attr('src', imageSrc);
            
            // Remove loading state and add loaded class
            $img.removeClass('loading').addClass('loaded');
            
            // Optional: fade in effect
            $img.css({
              'opacity': '0',
              'transition': 'opacity 0.3s ease-in-out'
            }).animate({ opacity: 1 }, 300);
          };
          
          img.onerror = function() {
            // Handle image load error
            $img.removeClass('loading').addClass('error');
            console.error('Failed to load image:', imageSrc);
          };
          
          // Start loading the image
          img.src = imageSrc;
        }
      });
    });
  });
}

/**
 * Alternative: Load images with delay for even better initial page speed
 * Use this if you want images to load with a slight delay after page load
 */
export function initDelayedLazyLoading(delayMs: number = 500) {
  $(document).ready(function() {
    $(window).on('load', function() {
      // Add a delay before loading images
      setTimeout(function() {
        $('.lazy-load[data-src]').each(function() {
          const $img = $(this);
          const imageSrc = $img.attr('data-src');
          
          if (imageSrc) {
            $img.addClass('loading');
            
            const img = new Image();
            img.onload = function() {
              $img.attr('src', imageSrc);
              $img.removeClass('loading').addClass('loaded');
              $img.css('opacity', '0').animate({ opacity: 1 }, 300);
            };
            
            img.onerror = function() {
              $img.removeClass('loading').addClass('error');
              console.error('Failed to load image:', imageSrc);
            };
            
            img.src = imageSrc;
          }
        });
      }, delayMs);
    });
  });
}

/**
 * Advanced: Load images sequentially with stagger effect
 * Creates a nice cascade loading animation
 */
export function initStaggeredLazyLoading(staggerDelayMs: number = 100) {
  $(document).ready(function() {
    $(window).on('load', function() {
      const $images = $('.lazy-load[data-src]');
      
      $images.each(function(index) {
        const $img = $(this);
        const imageSrc = $img.attr('data-src');
        
        if (imageSrc) {
          // Stagger the loading based on index
          setTimeout(function() {
            $img.addClass('loading');
            
            const img = new Image();
            img.onload = function() {
              $img.attr('src', imageSrc);
              $img.removeClass('loading').addClass('loaded');
              $img.css('opacity', '0').animate({ opacity: 1 }, 400);
            };
            
            img.onerror = function() {
              $img.removeClass('loading').addClass('error');
              console.error('Failed to load image:', imageSrc);
            };
            
            img.src = imageSrc;
          }, index * staggerDelayMs);
        }
      });
    });
  });
}
