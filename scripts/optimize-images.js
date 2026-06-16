import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PHOTOS_DIR = path.resolve(__dirname, '../Photos');
const OUTPUT_DIR = path.resolve(__dirname, '../public/optimized-photos');
const METADATA_PATH = path.resolve(OUTPUT_DIR, 'metadata.json');

// Process every frame for smooth video scrubbing
const SAMPLE_RATE = 1; 
const WEBP_QUALITY = 75; // Lower quality for 240 frames to save bandwidth

async function processImages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(PHOTOS_DIR).filter(file => {
    return file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg');
  }).sort();

  console.log(`Found ${files.length} images. Sampling every ${SAMPLE_RATE} frames...`);

  const metadata = [];

  for (let i = 0; i < files.length; i += SAMPLE_RATE) {
    const file = files[i];
    const inputPath = path.join(PHOTOS_DIR, file);
    const outputFileName = `frame-${String(i).padStart(3, '0')}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    console.log(`Processing ${file} -> ${outputFileName}...`);

    try {
      // Create optimized WebP for full screen video scrub
      await sharp(inputPath)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      // Generate LQIP (Low Quality Image Placeholder) Base64
      const lqipBuffer = await sharp(inputPath)
        .resize({ width: 20 })
        .webp({ quality: 20 })
        .toBuffer();
      
      const lqipBase64 = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;

      metadata.push({
        id: `frame-${i}`,
        url: `/optimized-photos/${outputFileName}`,
        lqip: lqipBase64
      });
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
  console.log(`\nSuccessfully processed ${metadata.length} images.`);
  console.log(`Metadata saved to ${METADATA_PATH}`);
}

processImages().catch(console.error);
