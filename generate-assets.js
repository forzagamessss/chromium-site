const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const masterIcon = path.join(root, 'assets', 'icon-512.png');
const webIcon = path.join(root, 'www', 'icon-512.png');
const resDir = path.join(root, 'android', 'app', 'src', 'main', 'res');
const backgroundHex = '#8CA8E4';

const densities = {
  mdpi: { legacy: 48, adaptive: 108 },
  hdpi: { legacy: 72, adaptive: 162 },
  xhdpi: { legacy: 96, adaptive: 216 },
  xxhdpi: { legacy: 144, adaptive: 324 },
  xxxhdpi: { legacy: 192, adaptive: 432 }
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function writePng(size, destination, background) {
  await sharp(masterIcon)
    .resize(size, size, { fit: 'contain', background })
    .png()
    .toFile(destination);
}

async function main() {
  if (!fs.existsSync(masterIcon)) {
    throw new Error(`Source icon not found: ${masterIcon}`);
  }

  const image = sharp(masterIcon);
  const metadata = await image.metadata();
  const background = { r: 140, g: 168, b: 228, alpha: 1 };

  await image
    .clone()
    .resize(512, 512)
    .png()
    .toFile(webIcon);

  if (!fs.existsSync(resDir)) {
    console.log(`Web icon generated from ${metadata.width}x${metadata.height} PNG source.`);
    console.log('Android project not found; run "npm run sync" before generating launcher resources.');
    return;
  }

  for (const [density, sizes] of Object.entries(densities)) {
    const mipmapDir = path.join(resDir, `mipmap-${density}`);
    ensureDir(mipmapDir);

    await writePng(sizes.legacy, path.join(mipmapDir, 'ic_launcher.png'), background);
    await writePng(sizes.legacy, path.join(mipmapDir, 'ic_launcher_round.png'), background);
    await writePng(sizes.adaptive, path.join(mipmapDir, 'ic_launcher_foreground.png'), {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0
    });
  }

  const valuesDir = path.join(resDir, 'values');
  ensureDir(valuesDir);
  fs.writeFileSync(
    path.join(valuesDir, 'ic_launcher_background.xml'),
    `<resources>\n    <color name="ic_launcher_background">${backgroundHex}</color>\n</resources>\n`
  );

  const adaptiveDir = path.join(resDir, 'mipmap-anydpi-v26');
  ensureDir(adaptiveDir);
  const adaptiveIcon = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">',
    '    <background android:drawable="@color/ic_launcher_background" />',
    '    <foreground android:drawable="@mipmap/ic_launcher_foreground" />',
    '</adaptive-icon>',
    ''
  ].join('\n');
  fs.writeFileSync(path.join(adaptiveDir, 'ic_launcher.xml'), adaptiveIcon);
  fs.writeFileSync(path.join(adaptiveDir, 'ic_launcher_round.xml'), adaptiveIcon);

  console.log(`Master and Android launcher icons generated from ${metadata.width}x${metadata.height} source.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
