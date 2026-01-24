const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generate() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  const srcSvg = path.resolve(__dirname, '..', 'src', 'assets', 'logo.svg');

  // Validate source svg exists
  try {
    await fs.promises.access(srcSvg, fs.constants.F_OK);
  } catch {
    console.error('Source logo.svg not found at', srcSvg);
    process.exit(1);
  }

  await ensureDir(publicDir);

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ];

  // Render PNG variants from SVG source
  await Promise.all(
    sizes.map(async ({ size, name }) => {
      const outPath = path.join(publicDir, name);
      await sharp(srcSvg, { density: 384 })
        .resize(size, size, { fit: 'contain' })
        .png({ quality: 90 })
        .toFile(outPath);
      console.log('Generated', name);
    })
  );

  // Create ICO from 16 and 32 PNGs
  const icoPath = path.join(publicDir, 'favicon.ico');
  const icoBuffer = await pngToIco([
    path.join(publicDir, 'favicon-16x16.png'),
    path.join(publicDir, 'favicon-32x32.png')
  ]);
  await fs.promises.writeFile(icoPath, icoBuffer);
  console.log('Generated favicon.ico');

  // Copy original SVG to public as favicon.svg for modern browsers
  const svgOut = path.join(publicDir, 'favicon.svg');
  await fs.promises.copyFile(srcSvg, svgOut);
  console.log('Copied favicon.svg');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
