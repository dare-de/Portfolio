import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

export interface LenisController {
  instance: Lenis;
  destroy: () => void;
}

/**
 * Creates a Lenis smooth-scroll instance synchronized with GSAP's ticker
 * and ScrollTrigger updates so scroll-linked animations stay frame-locked.
 */
export function createLenisController(): LenisController {
  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  return {
    instance: lenis,
    destroy: () => {
      gsap.ticker.remove(onTick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    },
  };
}
