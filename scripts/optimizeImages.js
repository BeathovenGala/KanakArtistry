#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses and converts images to WebP format
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');

if (!fs.existsSync(assetsDir)) {
  console.error(`Assets directory not found: ${assetsDir}`);
  process.exit(1);
}

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Found ${imageFiles.length} image(s) to optimize...`);

  for (const file of imageFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, `${path.parse(file).name}.webp`);
    const fileName = path.parse(file).name;

    try {
      console.log(`✓ Optimizing: ${file}`);
      
      await sharp(inputPath)
        .resize(1400, 1400, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size / 1024;
      const optimizedSize = fs.statSync(outputPath).size / 1024;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      console.log(`  Original: ${originalSize.toFixed(1)}KB → Optimized: ${optimizedSize.toFixed(1)}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages().catch(error => {
  console.error('Optimization failed:', error);
  process.exit(1);
});
