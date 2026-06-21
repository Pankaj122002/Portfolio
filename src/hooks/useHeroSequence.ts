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
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const resRef = useRef<'1920w' | '1280w' | '640w'>('1280w');
  const currentFrameRef = useRef(0);
  const rafRef = useRef(0);
  const loadingRef = useRef<Set<number>>(new Set());

  const [isLoaded, setIsLoaded] = useState(false);
  const [totalFrames, setTotalFrames] = useState(0);

  // Load metadata
  useEffect(() => {
    fetch(`${BASE}hero-frames/metadata.json`)
      .then(r => r.json())
      .then((data: FrameMeta[]) => {
        metaRef.current = data;
        setTotalFrames(data.length);
        resRef.current = pickResolution();
      })
      .catch(console.error);
  }, []);

  // Load a single frame image
  const loadFrame = useCallback((idx: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const cache = cacheRef.current;
      if (cache.has(idx)) return resolve(cache.get(idx)!);
      if (loadingRef.current.has(idx)) {
        // Wait for already-loading frame
        const check = setInterval(() => {
          if (cache.has(idx)) {
            clearInterval(check);
            resolve(cache.get(idx)!);
          }
        }, 16);
        return;
      }

      loadingRef.current.add(idx);
      const meta = metaRef.current[idx];
      if (!meta) return reject(new Error(`No meta for frame ${idx}`));

      const img = new Image();
      img.src = `${BASE}${strip(meta.urls[resRef.current])}`;
      img.onload = () => {
        cache.set(idx, img);
        loadingRef.current.delete(idx);
        evictDistant(currentFrameRef.current); // EVICT based on the CURRENT frame, not the loading frame!
        
        // Bulletproof fix: whenever ANY image finishes loading, just attempt to draw the current frame.
        // If the current frame was missing and just loaded, this will perfectly render it.
        // If it was already rendered, drawFrame is very cheap.
        // We use setTimeout to ensure it has access to the latest state/refs without React warning.
        setTimeout(() => drawFrame(currentFrameRef.current), 0);
        
        resolve(img);
      };
      img.onerror = (e) => {
        loadingRef.current.delete(idx);
        reject(e);
      };
    });
  }, []);

  // LRU eviction: keep max ~60 frames
  const evictDistant = useCallback((current: number) => {
    const cache = cacheRef.current;
    const MAX = 60;
    if (cache.size <= MAX) return;

    const entries = [...cache.entries()];
    entries.sort((a, b) => Math.abs(a[0] - current) - Math.abs(b[0] - current));
    // Remove farthest
    while (entries.length > MAX) {
      const [key] = entries.pop()!;
      cache.delete(key);
    }
  }, []);

  // Preload frames around a given index
  const preloadAround = useCallback((idx: number, range = 20) => {
    const total = metaRef.current.length;
    if (total === 0) return;

    // Prioritize forward frames
    for (let offset = 0; offset <= range; offset++) {
      const fwd = idx + offset;
      const bwd = idx - offset;
      if (fwd < total && !cacheRef.current.has(fwd)) loadFrame(fwd).catch(() => {});
      if (bwd >= 0 && bwd !== fwd && !cacheRef.current.has(bwd)) loadFrame(bwd).catch(() => {});
    }
  }, [loadFrame]);

  // Draw frame to canvas
  const drawFrame = useCallback((idx: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = cacheRef.current.get(idx);
    if (!ctx || !canvas || !img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Cover fit
    const hR = cw / img.width;
    const vR = ch / img.height;
    const ratio = Math.max(hR, vR);
    const sx = (cw - img.width * ratio) / 2;
    const sy = (ch - img.height * ratio) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, img.width * ratio, img.height * ratio);
  }, []);

  // Initialize canvas + preload initial frames
  useEffect(() => {
    if (totalFrames === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to screen
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctxRef.current = canvas.getContext('2d');

    // Preload first batch
    const initialBatch = Math.min(15, totalFrames);
    const promises: Promise<HTMLImageElement>[] = [];
    for (let i = 0; i < initialBatch; i++) {
      promises.push(loadFrame(i));
    }

    Promise.all(promises).then(() => {
      setIsLoaded(true);
      drawFrame(0);
      // Continue loading the rest
      preloadAround(0, 30);
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

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [totalFrames, loadFrame, drawFrame, preloadAround]);

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
          preloadAround(targetFrame, 15);
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
  }, [totalFrames, isLoaded, totalScrollHeight, drawFrame, preloadAround]);

  return { canvasRef, isLoaded, totalFrames };
}
