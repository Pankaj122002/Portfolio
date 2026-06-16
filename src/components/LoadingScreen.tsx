import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'assembling' | 'glowing' | 'exploding' | 'done'>('assembling');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // PP target shape — two "P" letter outlines defined as 2D points
    const targetPoints: THREE.Vector3[] = [];

    // Helper: generate points on a line segment
    const linePts = (x1: number, y1: number, x2: number, y2: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const t = i / Math.max(n - 1, 1);
        targetPoints.push(new THREE.Vector3(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, 0));
      }
    };
    // Helper: arc
    const arcPts = (cx: number, cy: number, r: number, a1: number, a2: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = a1 + (a2 - a1) * (i / Math.max(n - 1, 1));
        targetPoints.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0));
      }
    };

    // First P (offset left)
    const ox1 = -1.4;
    linePts(ox1, -1.0, ox1, 1.0, 15);
    linePts(ox1, 1.0, ox1 + 0.35, 1.0, 6);
    arcPts(ox1 + 0.35, 0.55, 0.45, Math.PI / 2, -Math.PI / 2, 12);
    linePts(ox1 + 0.35, 0.1, ox1, 0.1, 6);

    // Second P (offset right)
    const ox2 = 0.3;
    linePts(ox2, -1.0, ox2, 1.0, 15);
    linePts(ox2, 1.0, ox2 + 0.35, 1.0, 6);
    arcPts(ox2 + 0.35, 0.55, 0.45, Math.PI / 2, -Math.PI / 2, 12);
    linePts(ox2 + 0.35, 0.1, ox2, 0.1, 6);

    const N = targetPoints.length;

    // Random start positions
    const startPositions: THREE.Vector3[] = targetPoints.map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8
    ));

    const currentPositions = startPositions.map(v => v.clone());

    const geo = new THREE.BufferGeometry();
    const posArr = new Float32Array(N * 3);
    const colArr = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const t = i / N;
      colArr[i * 3] = 0.31 + t * 0.1;
      colArr[i * 3 + 1] = 0.27 + t * 0.44;
      colArr[i * 3 + 2] = 0.9 - t * 0.07;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const startTime = Date.now();
    let assembleT = 0;
    let currentPhase: 'assembling' | 'glowing' | 'exploding' | 'done' = 'assembling';
    let glowStart = 0;
    let explodeStart = 0;
    let animId: number;

    const ASSEMBLE_DURATION = 1400;
    const GLOW_DURATION = 400;
    const EXPLODE_DURATION = 350;

    const explodeVelocities = targetPoints.map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.2
    ));

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = Date.now();

      if (currentPhase === 'assembling') {
        assembleT = Math.min((now - startTime) / ASSEMBLE_DURATION, 1);
        const ease = 1 - Math.pow(1 - assembleT, 3);

        setProgress(Math.floor(assembleT * 100));

        const posAttr = geo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < N; i++) {
          currentPositions[i].lerpVectors(startPositions[i], targetPoints[i], ease);
          posAttr.array[i * 3] = currentPositions[i].x;
          posAttr.array[i * 3 + 1] = currentPositions[i].y;
          posAttr.array[i * 3 + 2] = currentPositions[i].z;
        }
        posAttr.needsUpdate = true;

        if (assembleT >= 1) {
          currentPhase = 'glowing';
          glowStart = now;
          setPhase('glowing');
        }
      } else if (currentPhase === 'glowing') {
        const glowT = (now - glowStart) / GLOW_DURATION;
        mat.size = 0.08 + Math.sin(glowT * Math.PI * 4) * 0.04;

        if (glowT >= 1) {
          currentPhase = 'exploding';
          explodeStart = now;
          setPhase('exploding');
        }
      } else if (currentPhase === 'exploding') {
        const expT = (now - explodeStart) / EXPLODE_DURATION;
        mat.opacity = 1 - expT;

        const posAttr = geo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < N; i++) {
          currentPositions[i].add(explodeVelocities[i]);
          posAttr.array[i * 3] = currentPositions[i].x;
          posAttr.array[i * 3 + 1] = currentPositions[i].y;
          posAttr.array[i * 3 + 2] = currentPositions[i].z;
        }
        posAttr.needsUpdate = true;

        if (expT >= 1) {
          currentPhase = 'done';
          setPhase('done');
          setTimeout(() => onComplete(), 50);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 flex items-end justify-center pb-16">
      <div ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 text-center">
        <div
          className="h-px w-48 mx-auto mb-3 bg-gradient-to-r from-transparent via-indigo to-transparent"
          style={{ opacity: phase === 'assembling' ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {phase === 'assembling' ? `${progress}%` : phase === 'glowing' ? '100%' : ''}
        </p>
      </div>
    </div>
  );
}
