const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const sourceIcon = path.join(root, 'assets', 'icon-512.png');
const resDir = path.join(root, 'android', 'app', 'src', 'main', 'res');

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
  await sharp(sourceIcon)
    .resize(size, size, { fit: 'contain', background })
    .png()
    .toFile(destination);
}

async function main() {
  if (!fs.existsSync(sourceIcon)) {
    throw new Error(`Source icon not found: ${sourceIcon}`);
  }
  if (!fs.existsSync(resDir)) {
    throw new Error('Android project not found. Run "npx cap add android" first.');
  }

  const image = sharp(sourceIcon);
  const metadata = await image.metadata();
  const pixel = await image.clone()
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .removeAlpha()
    .raw()
    .toBuffer();
  const background = { r: pixel[0], g: pixel[1], b: pixel[2], alpha: 1 };
  const backgroundHex = `#${[pixel[0], pixel[1], pixel[2]]
    .map(value => value.toString(16).padStart(2, '0'))
    .join('')}`;

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

  console.log(`Android launcher icons generated from ${metadata.width}x${metadata.height} source.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
