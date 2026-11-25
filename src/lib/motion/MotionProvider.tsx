import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type Lenis from 'lenis';
import { REDUCED_MOTION_QUERY, ScrollTrigger, prefersReducedMotion } from './gsap';
import { createLenisController } from './lenis';

export interface MotionContextValue {
  lenis: Lenis | null;
  reducedMotion: boolean;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  refreshScrollTrigger: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<boolean>(prefersReducedMotion);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null);
      ScrollTrigger.refresh();
      return;
    }

    const controller = createLenisController();
    setLenis(controller.instance);

    return () => {
      controller.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset = 0) => {
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, { offset });
        return;
      }

      if (typeof target === 'number') {
        window.scrollTo({ top: target + offset, behavior: 'auto' });
        return;
      }

      const element =
        typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'auto' });
      }
    },
    [lenis, reducedMotion],
  );

  const refreshScrollTrigger = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  const value = useMemo<MotionContextValue>(
    () => ({
      lenis,
      reducedMotion,
      scrollTo,
      refreshScrollTrigger,
    }),
    [lenis, reducedMotion, scrollTo, refreshScrollTrigger],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider.');
  }
  return context;
}
