const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const MAX_SIZE_KB = 100;
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 85;

async function optimize() {
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(f => 
    /\.(png|jpe?g)$/i.test(f)
  );

  console.log(`\n📸 Optimizing images in ${IMAGES_DIR}`);
  console.log(`   Threshold: ${MAX_SIZE_KB}KB+`);
  console.log(`   Target width: ${MAX_WIDTH}px`);
  console.log(`   Format: WebP (quality ${WEBP_QUALITY})\n`);

  let optimized = 0;
  let skipped = 0;
  let totalSaved = 0;

  for (const file of imageFiles) {
    const filePath = path.join(IMAGES_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;

    if (sizeKB < MAX_SIZE_KB) {
      console.log(`  ⏭️  ${file} (${sizeKB.toFixed(1)}KB)`);
      skipped++;
      continue;
    }

    try {
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const outputPath = path.join(IMAGES_DIR, `${basename}.webp`);

      const result = await sharp(filePath)
        .resize({ 
          width: MAX_WIDTH,
          withoutEnlargement: true 
        })
        .webp({ quality: WEBP_QUALITY, lossless: false })
        .toFile(outputPath);

      const originalSizeKB = sizeKB;
      const newSizeKB = result.size / 1024;
      const savedKB = originalSizeKB - newSizeKB;
      totalSaved += savedKB;

      if (fs.existsSync(outputPath)) {
        // Remove original
        fs.unlinkSync(filePath);
        console.log(`  ✅ ${file} → ${basename}.webp (${originalSizeKB.toFixed(1)}KB → ${newSizeKB.toFixed(1)}KB, -${savedKB.toFixed(1)}KB)`);
        optimized++;
      }
    } catch (err) {
      console.error(`  ❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`  Optimized: ${optimized} images`);
  console.log(`  Skipped: ${skipped} images`);
  console.log(`  Space saved: ${(totalSaved/1024).toFixed(1)}MB`);
  console.log(`========================================\n`);
}

optimize();
