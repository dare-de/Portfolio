import type { ReactNode } from 'react';
import { MotionProvider } from '@/lib/motion/MotionProvider';
import { ThemeProvider } from '@/lib/theme/ThemeContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  );
}
