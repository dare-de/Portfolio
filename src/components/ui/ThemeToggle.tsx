import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className = '' }: ThemeToggleProps) {
  const { theme, isDark, toggleTheme } = useTheme();
  const nextThemeLabel = isDark ? 'Crimson & Cream (Light)' : 'Burnt Orange (Dark)';
  const currentThemeLabel = isDark ? 'Burnt Orange' : 'Crimson & Cream';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch theme to ${nextThemeLabel}`}
      aria-pressed={!isDark}
      data-theme-state={theme}
      className={`btn-editorial btn-secondary btn-sm ${className}`.trim()}
    >
      {isDark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
      {!compact ? <span>{currentThemeLabel}</span> : null}
    </button>
  );
}
