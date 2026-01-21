// Google Analytics 4 Setup Guide
// This file provides instructions for enabling GA4 tracking

/**
 * STEP 1: Create Google Analytics 4 Property
 * 1. Go to https://analytics.google.com
 * 2. Click "Admin" (bottom left)
 * 3. Click "Create Property"
 * 4. Fill in property name: "KanakArtistry"
 * 5. Select timezone and currency
 * 6. Click "Create"
 * 
 * STEP 2: Add Web Data Stream
 * 1. Under "Data Streams", click "Add Stream"
 * 2. Select "Web"
 * 3. Enter website URL: https://kanakartistry.com
 * 4. Stream name: "KanakArtistry Website"
 * 5. Click "Create stream"
 * 
 * STEP 3: Get Measurement ID
 * 1. You'll see the measurement ID in format: G-XXXXXXXXXX
 * 2. Copy this ID
 * 
 * STEP 4: Add to index.html
 * Replace G-XXXXXXXXXX in index.html with your actual Measurement ID:
 * <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID_HERE"></script>
 */

// TRACKING EVENTS ALREADY IMPLEMENTED

// 1. Page Views
//    Automatically tracked via gtag('config', ...)
//    trackPageView() function available in seo.ts

// 2. Custom Events
//    Gallery viewed events can be added via trackEvent()
//    Commission inquiry events can be tracked

// 3. Visitor Tracking
//    Custom visitor data tracked in Supabase
//    Email reports include unique visitor counts

// ADDITIONAL EVENTS TO TRACK

export const ANALYTICS_EVENTS = {
  // User Interactions
  INQUIRY_SUBMITTED: 'inquiry_submitted',
  INQUIRY_CANCELED: 'inquiry_canceled',
  GALLERY_VIEWED: 'gallery_viewed',
  ARTWORK_HOVER: 'artwork_hover',
  COMMISSION_CLICKED: 'commission_clicked',
  
  // Navigation
  NAVIGATION_CLICKED: 'navigation_clicked',
  SCROLL_DEPTH: 'scroll_depth',
  
  // CTAs
  HERO_CTA_CLICKED: 'hero_cta_clicked',
  GALLERY_CTA_CLICKED: 'gallery_cta_clicked',
  CONTACT_CTA_CLICKED: 'contact_cta_clicked',
};

/**
 * Example: Track commission button click
 * 
 * import { trackEvent } from '../utils/seo';
 * 
 * const handleCommissionClick = () => {
 *   trackEvent('engagement', 'commission_clicked', 'artwork_title');
 *   // ... rest of function
 * };
 */

// GA4 ENHANCED ECOMMERCE (Optional)
// If you want to track products more like an e-commerce site:

export const enhancedEcommerceConfig = {
  items: [
    {
      item_id: '1',
      item_name: 'The Living Tree of Grace',
      item_category: 'Canvas Painting',
      item_variant: 'Canvas Painting',
      price: '5000', // Example price in INR
    },
    {
      item_id: '2',
      item_name: 'Garden of Living Light',
      item_category: 'Canvas Painting',
      item_variant: 'Canvas Painting',
      price: '4500',
    },
    // ... add all 11 artworks
  ],
};

// GA4 GOALS / CONVERSIONS
// Configure these in Google Analytics admin panel:
// 1. Inquiry Submitted - track when form is submitted
// 2. Contact Initiated - track when contact section scrolled to
// 3. Artwork Commission - track commission button clicks
// 4. Newsletter Signup - if you add newsletter

// PRIVACY & COMPLIANCE
// ✓ Anonymize IP: Enabled in GA4 config
// ✓ User privacy: No personal data collection
// ✓ GDPR compliant: Adjust as needed for your region
// ✓ Cookie consent: Consider adding cookie banner

// USEFUL GA4 DASHBOARDS TO CREATE
// 1. Website Performance
//    - Page views, bounce rate, avg session duration
//    - Top pages, traffic sources
// 
// 2. User Behavior
//    - User flow, drop-off points
//    - Event tracking dashboard
//    - Device/browser breakdown
// 
// 3. Conversion Funnel
//    - Gallery views → Inquiry submissions
//    - Top referral sources
//    - Traffic to conversion ratio

// REPORTING RECOMMENDATIONS
// Weekly: Check traffic trends and top pages
// Monthly: Review user behavior and conversion rates
// Quarterly: Analyze audience demographics and interests
