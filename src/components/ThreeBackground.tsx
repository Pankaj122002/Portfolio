import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  scrollProgress: number;
}

export default function ThreeBackground({ scrollProgress }: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scrollProgress: 0,
    mouseX: 0,
    mouseY: 0,
    time: 0,
    paused: false,
  });

  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 8;

    // Scene
    const scene = new THREE.Scene();

    // ─── 1. PARTICLE SYSTEM (hero + about transition) ───────────────────────
    const PARTICLE_COUNT = 2500;
    const heroPositions = new Float32Array(PARTICLE_COUNT * 3);
    const icoPositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const particleSizes = new Float32Array(PARTICLE_COUNT);

    const icoGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const icoVerts = icoGeo.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Hero: galaxy-like distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.5) * 7;
      heroPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      heroPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      heroPositions[i * 3 + 2] = r * Math.cos(phi);

      // Ico: vertices sampled repeatedly
      const vIdx = (i % (icoVerts.length / 3)) * 3;
      const jitter = 0.1;
      icoPositions[i * 3] = (icoVerts[vIdx] || 0) + (Math.random() - 0.5) * jitter;
      icoPositions[i * 3 + 1] = (icoVerts[vIdx + 1] || 0) + (Math.random() - 0.5) * jitter;
      icoPositions[i * 3 + 2] = (icoVerts[vIdx + 2] || 0) + (Math.random() - 0.5) * jitter;

      // Colors: indigo ↔ cyan gradient
      const t = Math.random();
      particleColors[i * 3] = 0.31 * (1 - t) + 0.02 * t;   // R
      particleColors[i * 3 + 1] = 0.27 * (1 - t) + 0.71 * t; // G
      particleColors[i * 3 + 2] = 0.9 * (1 - t) + 0.83 * t;  // B

      particleSizes[i] = Math.random() * 0.03 + 0.01;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(heroPositions.slice(), 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const currentPositions = heroPositions.slice();

    // ─── 2. WIREFRAME ICOSAHEDRON ──────────────────────────────────────────
    const icoMeshGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const icoMeshMat = new THREE.MeshBasicMaterial({
      color: 0x4F46E5,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const icoMesh = new THREE.Mesh(icoMeshGeo, icoMeshMat);
    scene.add(icoMesh);

    // ─── 3. FLOATING SHARDS (skills state) ───────────────────────────────
    const shards: THREE.Mesh[] = [];
    const SHARD_COUNT = 20;
    const shardGroup = new THREE.Group();
    scene.add(shardGroup);

    for (let i = 0; i < SHARD_COUNT; i++) {
      const geo = new THREE.TetrahedronGeometry(0.2 + Math.random() * 0.25, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x4F46E5 : 0x06B6D4,
        wireframe: true,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / SHARD_COUNT) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 2;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius * 0.4
      );
      mesh.userData = { angle, radius, speed: 0.3 + Math.random() * 0.2, phaseY: Math.random() * Math.PI * 2 };
      shards.push(mesh);
      shardGroup.add(mesh);
    }

    // ─── 4. 3D TUNNEL PLANES (projects state) ────────────────────────────
    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);
    const TUNNEL_PLANES = 8;
    const tunnelPlanes: THREE.Mesh[] = [];

    for (let i = 0; i < TUNNEL_PLANES; i++) {
      const planeGeo = new THREE.PlaneGeometry(3.2, 2);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.z = -i * 6 + 6;
      planeMesh.position.x = (Math.random() - 0.5) * 2;
      planeMesh.position.y = (Math.random() - 0.5) * 1;
      tunnelGroup.add(planeMesh);
      tunnelPlanes.push(planeMesh);
    }

    // Tunnel border lines
    const tunnelBorders: THREE.LineSegments[] = [];
    for (let i = 0; i < TUNNEL_PLANES; i++) {
      const borderGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.2, 2));
      const borderMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x4F46E5 : 0x06B6D4,
        transparent: true,
        opacity: 0,
      });
      const border = new THREE.LineSegments(borderGeo, borderMat);
      border.position.copy(tunnelPlanes[i].position);
      tunnelGroup.add(border);
      tunnelBorders.push(border);
    }

    // ─── 5. DOT GRID (services/stats state) ──────────────────────────────
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);
    const GRID_SIZE = 12;
    const gridDots: THREE.Mesh[] = [];

    for (let x = -GRID_SIZE / 2; x <= GRID_SIZE / 2; x += 2) {
      for (let y = -GRID_SIZE / 2; y <= GRID_SIZE / 2; y += 2) {
        const dotGeo = new THREE.SphereGeometry(0.04, 4, 4);
        const dotMat = new THREE.MeshBasicMaterial({
          color: 0x4F46E5,
          transparent: true,
          opacity: 0,
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(x, y, 0);
        dot.userData = { phase: Math.random() * Math.PI * 2 };
        gridGroup.add(dot);
        gridDots.push(dot);
      }
    }

    // ─── 6. CONTACT RING ──────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4F46E5,
      transparent: true,
      opacity: 0,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const outerRingGeo = new THREE.TorusGeometry(3.2, 0.01, 16, 128);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    // ─── HELPERS ──────────────────────────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const t = clamp01((x - edge0) / (edge1 - edge0));
      return t * t * (3 - 2 * t);
    };

    // ─── ANIMATION LOOP ────────────────────────────────────────────────────
    let animId: number;

    const animate = () => {
      if (!stateRef.current.paused) {
        animId = requestAnimationFrame(animate);
        stateRef.current.time += 0.016;

        const sp = stateRef.current.scrollProgress;
        const t = stateRef.current.time;
        const mx = stateRef.current.mouseX;
        const my = stateRef.current.mouseY;

        // ── Section weights ──────────────────────────────────────────
        const heroW = smoothstep(0.15, 0.25, 1 - sp);
        const aboutW = smoothstep(0.25, 0.35, sp) * smoothstep(0.45, 0.35, sp);
        const skillsW = smoothstep(0.35, 0.45, sp) * smoothstep(0.65, 0.55, sp);
        const projectsW = smoothstep(0.55, 0.65, sp) * smoothstep(0.75, 0.68, sp);
        const gridW = smoothstep(0.68, 0.78, sp) * smoothstep(0.90, 0.83, sp);
        const contactW = smoothstep(0.85, 0.95, sp);

        // ── Particles (hero) ─────────────────────────────────────────
        const lerpT = 0.05;
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const targetX = lerp(heroPositions[i * 3], icoPositions[i * 3], aboutW);
          const targetY = lerp(heroPositions[i * 3 + 1], icoPositions[i * 3 + 1], aboutW);
          const targetZ = lerp(heroPositions[i * 3 + 2], icoPositions[i * 3 + 2], aboutW);
          currentPositions[i * 3] = lerp(currentPositions[i * 3], targetX, lerpT);
          currentPositions[i * 3 + 1] = lerp(currentPositions[i * 3 + 1], targetY, lerpT);
          currentPositions[i * 3 + 2] = lerp(currentPositions[i * 3 + 2], targetZ, lerpT);
          posAttr.array[i * 3] = currentPositions[i * 3];
          posAttr.array[i * 3 + 1] = currentPositions[i * 3 + 1];
          posAttr.array[i * 3 + 2] = currentPositions[i * 3 + 2];
        }
        posAttr.needsUpdate = true;

        const particleOpacity = Math.max(heroW, aboutW * 0.4);
        particleMat.opacity = particleOpacity;

        // Hero: slow galaxy rotation + mouse parallax
        particles.rotation.y = t * 0.06 + mx * 0.3;
        particles.rotation.x = t * 0.02 + my * 0.15;
        particles.rotation.z = t * 0.015;

        // ── Wireframe icosahedron (about) ─────────────────────────────
        icoMeshMat.opacity = aboutW * 0.35;
        icoMesh.rotation.y = t * 0.25;
        icoMesh.rotation.x = t * 0.1;

        // ── Shards (skills) ───────────────────────────────────────────
        shards.forEach((shard) => {
          const mat = shard.material as THREE.MeshBasicMaterial;
          mat.opacity = skillsW * 0.6;
          const { speed, phaseY } = shard.userData as { speed: number; phaseY: number };
          shard.rotation.x += 0.008 * speed;
          shard.rotation.y += 0.012 * speed;
          shard.position.y += Math.sin(t * speed + phaseY) * 0.004;
          shard.userData.phaseY = phaseY; // unchanged
        });
        shardGroup.rotation.y = t * 0.08;

        // ── Tunnel (projects) ──────────────────────────────────────────
        const tunnelZ = sp * 40 - 20;
        tunnelGroup.position.z = tunnelZ * 0.5;
        tunnelPlanes.forEach((plane) => {
          const mat = plane.material as THREE.MeshBasicMaterial;
          mat.opacity = projectsW * 0.15;
        });
        tunnelBorders.forEach((border) => {
          const mat = border.material as THREE.LineBasicMaterial;
          mat.opacity = projectsW * 0.5;
        });

        // ── Grid dots (services/stats) ────────────────────────────────
        gridDots.forEach((dot) => {
          const mat = dot.material as THREE.MeshBasicMaterial;
          const { phase } = dot.userData as { phase: number };
          const pulse = 0.3 + 0.2 * Math.sin(t * 1.5 + phase);
          mat.opacity = gridW * pulse;
        });
        gridGroup.rotation.x = -0.3;
        gridGroup.position.z = -2;

        // ── Contact ring ───────────────────────────────────────────────
        const ringPulse = 0.7 + 0.3 * Math.sin(t * 1.2);
        ringMat.opacity = contactW * ringPulse;
        outerRingMat.opacity = contactW * ringPulse * 0.4;
        ring.rotation.z = t * 0.15;
        outerRing.rotation.z = -t * 0.08;

        // ── Camera subtle movement ─────────────────────────────────────
        camera.position.x = lerp(camera.position.x, mx * 0.5, 0.03);
        camera.position.y = lerp(camera.position.y, -my * 0.3, 0.03);
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      } else {
        animId = requestAnimationFrame(animate);
      }
    };

    animate();

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Visibility API
    const onVisibilityChange = () => {
      stateRef.current.paused = document.hidden;
    };

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
