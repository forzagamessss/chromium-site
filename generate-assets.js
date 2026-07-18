const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const sourceIcon = path.join(root, 'assets', 'icon-source.svg');
const foregroundIcon = path.join(root, 'assets', 'icon-foreground.svg');
const masterIcon = path.join(root, 'assets', 'icon-512.png');
const webIcon = path.join(root, 'www', 'icon-512.png');
const resDir = path.join(root, 'android', 'app', 'src', 'main', 'res');
const backgroundHex = '#09090B';

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

async function writePng(source, size, destination, background) {
  await sharp(source)
    .resize(size, size, { fit: 'contain', background })
    .png()
    .toFile(destination);
}

async function main() {
  if (!fs.existsSync(sourceIcon) || !fs.existsSync(foregroundIcon)) {
    throw new Error('Vector icon sources are missing.');
  }

  await writePng(sourceIcon, 512, masterIcon, { r: 9, g: 9, b: 11, alpha: 1 });
  const metadata = await sharp(masterIcon).metadata();
  const background = { r: 9, g: 9, b: 11, alpha: 1 };

  fs.copyFileSync(masterIcon, webIcon);

  if (!fs.existsSync(resDir)) {
    console.log(`Web icon generated from ${metadata.width}x${metadata.height} PNG source.`);
    console.log('Android project not found; run "npm run sync" before generating launcher resources.');
    return;
  }

  for (const [density, sizes] of Object.entries(densities)) {
    const mipmapDir = path.join(resDir, `mipmap-${density}`);
    ensureDir(mipmapDir);

    await writePng(masterIcon, sizes.legacy, path.join(mipmapDir, 'ic_launcher.png'), background);
    await writePng(masterIcon, sizes.legacy, path.join(mipmapDir, 'ic_launcher_round.png'), background);
    await writePng(foregroundIcon, sizes.adaptive, path.join(mipmapDir, 'ic_launcher_foreground.png'), {
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
