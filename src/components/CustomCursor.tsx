import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState('#F5F5F7');

  useEffect(() => {
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      const isBtn = el.closest('button, a, [data-magnetic]') !== null;
      setHovering(isBtn);

      const section = el.closest('#projects');
      const isCta = el.closest('a[href="#contact"], a[href="#projects"]') !== null;

      if (section) setCursorColor('#06B6D4');
      else if (isCta) setCursorColor('#6366F1');
      else setCursorColor('#F5F5F7');
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }

      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      // Glow trail — even more delayed
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.06;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.06;

      if (trailRef.current) {
        trailRef.current.style.left = `${trailPos.current.x}px`;
        trailRef.current.style.top = `${trailPos.current.y}px`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Glow trail — very delayed, soft */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 9998,
          width: 60,
          height: 60,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${cursorColor}08, transparent 70%)`,
          borderRadius: '50%',
          transition: 'background 0.3s',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 9999,
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          transform: 'translate(-50%, -50%)',
          border: `1.5px solid ${cursorColor}`,
          borderRadius: '50%',
          opacity: 0.4,
          mixBlendMode: 'difference',
          transition: 'width 0.25s, height 0.25s, border-color 0.2s, opacity 0.2s',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 9999,
          width: hovering ? 0 : 6,
          height: hovering ? 0 : 6,
          transform: 'translate(-50%, -50%)',
          background: cursorColor,
          borderRadius: '50%',
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
        }}
      />
    </>
  );
}
