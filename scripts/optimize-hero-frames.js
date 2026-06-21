import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../HeroSequence');
const OUTPUT_DIR = path.resolve(__dirname, '../public/hero-frames');
const METADATA_PATH = path.resolve(OUTPUT_DIR, 'metadata.json');

const RESOLUTIONS = [
  { name: '1920w', width: 1920 },
  { name: '1280w', width: 1280 },
  { name: '640w', width: 640 },
];

const WEBP_QUALITY = 80;

async function processImages() {
  // Create output dirs
  for (const res of RESOLUTIONS) {
    const dir = path.join(OUTPUT_DIR, res.name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} source frames.`);

  const metadata = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(SOURCE_DIR, file);
    const frameId = String(i).padStart(3, '0');
    const outputName = `frame-${frameId}.webp`;

    process.stdout.write(`\r  [${i + 1}/${files.length}] ${file}`);

    try {
      const urls = {};

      for (const res of RESOLUTIONS) {
        const outPath = path.join(OUTPUT_DIR, res.name, outputName);
        await sharp(inputPath)
          .resize({ width: res.width, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(outPath);
        urls[res.name] = `/hero-frames/${res.name}/${outputName}`;
      }

      // LQIP
      const lqipBuf = await sharp(inputPath)
        .resize({ width: 20 })
        .webp({ quality: 20 })
        .toBuffer();
      const lqip = `data:image/webp;base64,${lqipBuf.toString('base64')}`;

      metadata.push({ id: i, urls, lqip });
    } catch (err) {
      console.error(`\nError processing ${file}:`, err);
    }
  }

  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata));
  console.log(`\n\nDone! ${metadata.length} frames processed across ${RESOLUTIONS.length} resolutions.`);
  console.log(`Metadata: ${METADATA_PATH}`);
}

processImages().catch(console.error);
