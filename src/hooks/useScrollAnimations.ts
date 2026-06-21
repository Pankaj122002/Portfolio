import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(phase: string) {
  useEffect(() => {
    if (phase !== 'main') return;

    let ctx: gsap.Context;

    // Small delay to ensure all DOM elements are perfectly rendered and sized
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // ─── Fade-up reveals for all sections with 3D flip ───
        gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 60, rotationX: -15, transformPerspective: 1000 },
            {
              opacity: 1, y: 0, rotationX: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ─── Staggered card reveals with 3D effect ───
        gsap.utils.toArray<HTMLElement>('.gsap-stagger-parent').forEach((parent) => {
          const children = parent.querySelectorAll('.gsap-stagger-child');
          gsap.fromTo(children,
            { opacity: 0, y: 50, scale: 0.9, rotationY: 10, transformPerspective: 1000 },
            {
              opacity: 1, y: 0, scale: 1, rotationY: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: parent,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ─── Counter animations ───
        gsap.utils.toArray<HTMLElement>('.gsap-counter').forEach((el) => {
          const target = parseFloat(el.dataset.target || '0');
          const suffix = el.dataset.suffix || '';
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              el.textContent = `${Math.floor(obj.val)}${suffix}`;
            },
          });
        });

        // ─── Horizontal line animations ───
        gsap.utils.toArray<HTMLElement>('.gsap-line').forEach((el) => {
          gsap.fromTo(el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ─── Text slide-up ───
        gsap.utils.toArray<HTMLElement>('.gsap-text-up').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ─── Scale-in animations ───
        gsap.utils.toArray<HTMLElement>('.gsap-scale-in').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1, scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [phase]);
}
