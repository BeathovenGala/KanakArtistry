#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses and converts images to WebP format with multiple responsive sizes
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');

// Define responsive breakpoints
const SIZES = [
  { width: 400, suffix: '-sm' },   // Mobile
  { width: 800, suffix: '-md' },   // Tablet
  { width: 1400, suffix: '' },      // Desktop (default)
];

if (!fs.existsSync(assetsDir)) {
  console.error(`Assets directory not found: ${assetsDir}`);
  process.exit(1);
}

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('-sm') && !file.includes('-md'));

  console.log(`Found ${imageFiles.length} image(s) to optimize...`);
  console.log('Creating multiple sizes for responsive loading\n');

  for (const file of imageFiles) {
    const inputPath = path.join(assetsDir, file);
    const fileName = path.parse(file).name;
    
    console.log(`✓ Processing: ${file}`);
    const originalSize = fs.statSync(inputPath).size / 1024;
    console.log(`  Original: ${originalSize.toFixed(1)}KB`);

    // Generate images at different sizes
    for (const size of SIZES) {
      const outputPath = path.join(assetsDir, `${fileName}${size.suffix}.webp`);
      
      try {
        await sharp(inputPath)
          .resize(size.width, size.width, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .webp({ 
            quality: 85,
            effort: 6  // Higher effort = better compression (0-6)
          })
          .toFile(outputPath);

        const optimizedSize = fs.statSync(outputPath).size / 1024;
        const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  → ${size.width}px: ${optimizedSize.toFixed(1)}KB (${savings}% smaller)`);
      } catch (error) {
        console.error(`  ✗ Error creating ${size.width}px version:`, error.message);
      }
    }
    console.log('');
  }

  console.log('✓ Image optimization complete!');
  console.log('\nRecommendation: Delete the original large PNG/JPEG files after verifying WebP versions work correctly.');
}

optimizeImages().catch(error => {
  console.error('Optimization failed:', error);
  process.exit(1);
});
