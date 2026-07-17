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
    console.error('❌ Error: icon-512.png not found!');
    process.exit(1);
  }

  try {
    const image = sharp(srcIcon);
    const metadata = await image.metadata();

    // Get the top-left pixel color to use as background color
    const topLeftBuffer = await image
      .clone()
      .extract({ left: 0, top: 0, width: 1, height: 1 })
      .raw()
      .toBuffer();

    const bgRed = topLeftBuffer[0];
    const bgGreen = topLeftBuffer[1];
    const bgBlue = topLeftBuffer[2];
    const bgAlpha = metadata.hasAlpha ? topLeftBuffer[3] : 255;

    // Determine background color configuration
    const bgColor = { r: bgRed, g: bgGreen, b: bgBlue, alpha: bgAlpha / 255 };
    console.log(`Detected background color from top-left pixel: rgba(${bgRed}, ${bgGreen}, ${bgBlue}, ${bgAlpha / 255})`);

    // 1. Generate icon-only.png (1024x1024)
    console.log('Generating assets/icon-only.png...');
    await sharp(srcIcon)
      .resize(1024, 1024, {
        fit: 'contain',
        background: bgColor
      })
      .toFile(path.join(assetsDir, 'icon-only.png'));

    // 1b. Generate icon.png (1024x1024) - required for legacy launcher icon generation
    console.log('Generating assets/icon.png...');
    await sharp(srcIcon)
      .resize(1024, 1024, {
        fit: 'contain',
        background: bgColor
      })
      .toFile(path.join(assetsDir, 'icon.png'));

    // 2. Generate icon-foreground.png (1024x1024)
    console.log('Generating assets/icon-foreground.png...');
    // Android applies its own adaptive-icon safe area and mask. Extra padding here
    // makes the artwork look noticeably smaller on Android 8+ launchers.
    await sharp(srcIcon)
      .resize(1024, 1024, {
        fit: 'cover',
        position: 'centre'
      })
      .toFile(path.join(assetsDir, 'icon-foreground.png'));

    // 3. Generate icon-background.png (1024x1024 solid color matching detected background)
    console.log('Generating assets/icon-background.png...');
    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: bgRed, g: bgGreen, b: bgBlue, alpha: 1 } // Opaque background
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
