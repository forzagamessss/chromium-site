const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  let srcIcon = path.join(assetsDir, 'icon-512.png');
  if (!fs.existsSync(srcIcon)) {
    srcIcon = path.join(__dirname, 'icon-512.png');
  }

  if (!fs.existsSync(srcIcon)) {
    console.error('❌ Error: icon-512.png not found in assets/ or project root!');
    process.exit(1);
  }

  console.log(`✅ Found source icon: ${srcIcon}`);

  try {
    // 1. Generate icon-only.png (1024x1024)
    console.log('Generating assets/icon-only.png...');
    await sharp(srcIcon)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 9, g: 9, b: 11, alpha: 1 } // Fallback to theme bg color
      })
      .toFile(path.join(assetsDir, 'icon-only.png'));

    // 2. Generate icon-foreground.png (1024x1024 with transparent padding to prevent cropping on Android)
    console.log('Generating assets/icon-foreground.png...');
    const foregroundResized = await sharp(srcIcon)
      .resize(700, 700, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: foregroundResized, gravity: 'center' }])
      .toFile(path.join(assetsDir, 'icon-foreground.png'));

    // 3. Generate icon-background.png (1024x1024 solid color matching theme #09090b)
    console.log('Generating assets/icon-background.png...');
    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 9, g: 9, b: 11, alpha: 1 }
      }
    })
      .toFile(path.join(assetsDir, 'icon-background.png'));

    console.log('🎉 Assets generation complete!');
  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

main();
