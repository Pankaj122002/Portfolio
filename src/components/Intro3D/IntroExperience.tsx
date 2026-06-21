import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PhotoMetadata {
  id: string;
  url: string;
  lqip: string;
}

export default function IntroExperience({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const startAnimationRef = useRef<(() => void) | null>(null);
  
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 1. Fetch metadata
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}optimized-photos/metadata.json`)
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(console.error);
  }, []);

  // 2. Preload images & start automatic playback
  useEffect(() => {
    if (photos.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    let tl: gsap.core.Timeline | null = null;

    const images: HTMLImageElement[] = [];
    
    const stripSlash = (p: string) => p.startsWith('/') ? p.slice(1) : p;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = `${import.meta.env.BASE_URL}${stripSlash(photos[0].url)}`;
    firstImg.onload = () => {
      ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      images[0] = firstImg;
      
      // Load the rest of the sequence
      let loadedCount = 1;
      for (let i = 1; i < photos.length; i++) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}${stripSlash(photos[i].url)}`;
        img.onload = () => {
          loadedCount++;
          // Enable start button once all or a sufficient chunk is loaded
          if (loadedCount === photos.length) {
            setIsReady(true);
          }
        };
        images[i] = img;
      }
    };
    imagesRef.current = images;

    const startAnimation = () => {
      const totalFrames = photos.length - 1;

      if (audioRef.current) {
        audioRef.current.volume = 0.5; // adjust volume if needed
        audioRef.current.play().catch(e => console.warn("Audio autoplay blocked by browser:", e));
        
        // Fade out and pause audio 1 second before the end (starts at 2.5s, ends at 3.0s)
        gsap.to(audioRef.current, {
          volume: 0,
          duration: 0.5,
          delay: 2.5,
          onComplete: () => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }
        });
      }

      // Using GSAP to tween a dummy object for smooth 60fps playback over exactly ~4 seconds
      const obj = { frame: 0 };
      const duration = 4.0; // 4 seconds total for 240 frames

      tl = gsap.timeline();

      tl.to(obj, {
        frame: totalFrames,
        duration: duration,
        ease: 'none',
        onUpdate: () => {
          const frameIndex = Math.round(obj.frame);
          const img = imagesRef.current[frameIndex];
          if (img && img.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;  
            
            ctx.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);  
          }
        },
        onComplete: () => {
          // Fade out intro typography and trigger next phase
          gsap.to('#intro-typography', { 
            opacity: 0, 
            duration: 0.5, 
            onComplete: () => {
              if (onCompleteRef.current) onCompleteRef.current();
            }
          });
        }
      });

      // Typography fade-in during the last 25% of the video
      tl.fromTo('#intro-typography', 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        `-=${1.5}` // Start 1.5 seconds before the video ends
      );
    };

    startAnimationRef.current = startAnimation;

    return () => {
      if (tl) tl.kill();
    };
  }, [photos]);

  const handleStart = () => {
    setHasStarted(true);
    if (startAnimationRef.current) startAnimationRef.current();
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center ${hasStarted ? 'pointer-events-none' : 'pointer-events-auto'}`}>
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-cover transition-opacity duration-1000 ${hasStarted ? 'opacity-70' : 'opacity-30'}`} 
      />
      
      {!hasStarted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <button 
            onClick={handleStart}
            disabled={!isReady}
            className={`px-8 py-4 rounded-full text-white text-xl font-medium tracking-wider border-2 border-white/20 transition-all duration-300 ${isReady ? 'hover:bg-white hover:text-black hover:scale-105 cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          >
            {isReady ? 'Start Experience' : 'Loading...'}
          </button>
        </div>
      )}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white pointer-events-none opacity-0" id="intro-typography">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Pankaj Pal
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 tracking-wide" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          Full Stack Software Developer
        </p>
      </div>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}intro-music.mp3`} preload="auto" />
    </div>
  );
}
