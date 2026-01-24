// Generates favicon PNG/ICO variants from an SVG logo and places them in public/
// Requires dev dependencies: sharp, png-to-ico

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
let Resvg = null;
try {
  // CommonJS require for @resvg/resvg-js
  ({ Resvg } = require('@resvg/resvg-js'));
} catch (_) {
  console.warn('@resvg/resvg-js not installed; will try sharp for SVG rasterization.');
}
let pngToIco = null;
try {
  pngToIco = require('png-to-ico');
} catch (_) {
  console.warn('png-to-ico not installed; skipping ICO generation.');
}

async function main() {
  const publicDir = path.resolve('public');
  const srcDir = path.resolve('src', 'assets');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const candidates = [
    path.join(srcDir, 'logo.svg'),
    path.join(srcDir, 'logo-icon.svg'),
    path.join(publicDir, 'favicon.svg'),
  ];

  let sourceSvg = candidates.find((p) => fs.existsSync(p));
  if (!sourceSvg) {
    // Minimal fallback SVG if none found
    sourceSvg = path.join(publicDir, 'favicon.svg');
    if (!fs.existsSync(sourceSvg)) {
      const minimalSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#1a1a1a"/></svg>';
      fs.writeFileSync(sourceSvg, minimalSvg);
    }
  }

  // Ensure favicon.svg exists in public (copy if using src asset),
  // but keep sourceSvg pointing to the original for rasterization.
  if (path.dirname(sourceSvg) !== publicDir) {
    const targetSvg = path.join(publicDir, 'favicon.svg');
    fs.copyFileSync(sourceSvg, targetSvg);
  }

  const outputs = {
    png16: path.join(publicDir, 'favicon-16x16.png'),
    png32: path.join(publicDir, 'favicon-32x32.png'),
    apple180: path.join(publicDir, 'apple-touch-icon.png'),
    pwa192: path.join(publicDir, 'android-chrome-192x192.png'),
    pwa512: path.join(publicDir, 'android-chrome-512x512.png'),
    ico: path.join(publicDir, 'favicon.ico'),
  };

  console.log('Generating PNG variants from', sourceSvg);
  async function generateAllWithResvg(svgPath) {
    if (!Resvg) throw new Error('Resvg not available');
    const svgData = fs.readFileSync(svgPath, 'utf-8');
    const renderToFile = (size, outPath) => {
      const resvg = new Resvg(svgData, {
        fitTo: { mode: 'width', value: size },
        background: 'transparent',
      });
      const png = resvg.render();
      fs.writeFileSync(outPath, png.asPng());
    };
    renderToFile(16, outputs.png16);
    renderToFile(32, outputs.png32);
    renderToFile(180, outputs.apple180);
    renderToFile(192, outputs.pwa192);
    renderToFile(512, outputs.pwa512);
  }

  async function generateAllWithSharp(fromSvg) {
    await sharp(fromSvg)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputs.png16);

    await sharp(fromSvg)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputs.png32);

    await sharp(fromSvg)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .png()
      .toFile(outputs.apple180);

    await sharp(fromSvg)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .png()
      .toFile(outputs.pwa192);

    await sharp(fromSvg)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .png()
      .toFile(outputs.pwa512);
  }

  try {
    if (Resvg) {
      await generateAllWithResvg(sourceSvg);
    } else {
      await generateAllWithSharp(sourceSvg);
    }
  } catch (err) {
    console.warn('SVG parsing failed; using minimal fallback:', err?.message || err);
    const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0CABC6"/></svg>';
    const fallbackPath = path.join(publicDir, '__favicon_fallback.svg');
    fs.writeFileSync(fallbackPath, fallbackSvg);
    if (Resvg) {
      await generateAllWithResvg(fallbackPath);
    } else {
      await generateAllWithSharp(fallbackPath);
    }
  }

  if (pngToIco) {
    console.log('Generating favicon.ico');
    const icoBuffer = await pngToIco([outputs.png16, outputs.png32]);
    fs.writeFileSync(outputs.ico, icoBuffer);
  }

  console.log('Favicons generated in /public:', Object.values(outputs).map((p) => path.basename(p)).join(', '));
}

main().catch((err) => {
  console.error('Favicons generation failed:', err);
  process.exit(1);
});
