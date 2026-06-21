import { useEffect, useRef, useState, useCallback } from 'react';

interface FrameMeta {
  id: number;
  urls: { '1920w': string; '1280w': string; '640w': string };
  lqip: string;
}

const BASE = import.meta.env.BASE_URL;
const strip = (p: string) => (p.startsWith('/') ? p.slice(1) : p);

function pickResolution(): '1920w' | '1280w' | '640w' {
  const w = window.innerWidth * (window.devicePixelRatio || 1);
  if (w <= 768) return '640w';
  if (w <= 1400) return '1280w';
  return '1920w';
}

export function useHeroSequence(totalScrollHeight: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const metaRef = useRef<FrameMeta[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]); // direct array lookup
  const resRef = useRef<'1920w' | '1280w' | '640w'>('1280w');
  const currentFrameRef = useRef(0);
  const rafRef = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [totalFrames, setTotalFrames] = useState(0);

  // Load metadata
  useEffect(() => {
    fetch(`${BASE}hero-frames/metadata.json`)
      .then(r => r.json())
      .then((data: FrameMeta[]) => {
        metaRef.current = data;
        imagesRef.current = new Array(data.length).fill(null);
        setTotalFrames(data.length);
        resRef.current = pickResolution();
      })
      .catch(console.error);
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback((idx: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!ctx || !canvas || !img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;

    const hR = cw / img.width;
    const vR = ch / img.height;
    const ratio = Math.max(hR, vR);
    const sx = (cw - img.width * ratio) / 2;
    const sy = (ch - img.height * ratio) / 2;

    // No need for clearRect since we cover the entire canvas.
    ctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, img.width * ratio, img.height * ratio);
  }, []);

  // Load a single frame image
  const loadFrame = useCallback((idx: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (imagesRef.current[idx]) return resolve(imagesRef.current[idx]!);
      
      const meta = metaRef.current[idx];
      if (!meta) return reject(new Error(`No meta for frame ${idx}`));

      const img = new Image();
      img.src = `${BASE}${strip(meta.urls[resRef.current])}`;
      img.onload = () => {
        imagesRef.current[idx] = img;
        // If this image is the one we are currently supposed to be looking at, draw it immediately.
        if (currentFrameRef.current === idx) {
          drawFrame(idx);
        }
        resolve(img);
      };
      img.onerror = reject;
    });
  }, [drawFrame]);

  // Preload frames progressively in the background
  const preloadProgressively = useCallback(async () => {
    const total = metaRef.current.length;
    if (total === 0) return;
    
    // We already loaded the initial batch. Now load the rest in order.
    // Start from current frame and go forward, then load earlier frames if any were missed.
    const current = currentFrameRef.current;
    
    function* getIndices() {
      // Prioritize forward
      for (let i = current + 1; i < total; i++) yield i;
      // Then backwards
      for (let i = current - 1; i >= 0; i--) yield i;
    }
    
    const batchSize = 10;
    let batch: Promise<any>[] = [];
    
    for (const idx of getIndices()) {
      if (!imagesRef.current[idx]) {
        batch.push(loadFrame(idx).catch(() => {}));
      }
      if (batch.length >= batchSize) {
        await Promise.all(batch);
        batch = [];
      }
    }
    if (batch.length > 0) {
      await Promise.all(batch);
    }
  }, [loadFrame]);

  // Initialize canvas + preload initial frames
  useEffect(() => {
    if (totalFrames === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to screen
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // alpha: false is a powerful optimization for fully opaque canvases
    ctxRef.current = canvas.getContext('2d', { alpha: false });

    // Preload first batch
    const initialBatch = Math.min(15, totalFrames);
    const promises: Promise<HTMLImageElement>[] = [];
    for (let i = 0; i < initialBatch; i++) {
      promises.push(loadFrame(i));
    }

    Promise.all(promises).then(() => {
      setIsLoaded(true);
      drawFrame(0);
      // Continue loading the rest in the background silently
      preloadProgressively();
    }).catch(console.error);

    // Resize handler
    const onResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      resRef.current = pickResolution();
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [totalFrames, loadFrame, drawFrame, preloadProgressively]);

  // Scroll-driven frame update
  useEffect(() => {
    if (totalFrames === 0 || !isLoaded) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Map scroll position to frame index within the hero scroll height
        const progress = Math.max(0, Math.min(1, scrollY / Math.max(totalScrollHeight - window.innerHeight, 1)));
        const targetFrame = Math.round(progress * (totalFrames - 1));

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          drawFrame(targetFrame);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial draw
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [totalFrames, isLoaded, totalScrollHeight, drawFrame]);

  return { canvasRef, isLoaded, totalFrames };
}
