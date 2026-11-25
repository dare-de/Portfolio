import type { ComponentPropsWithRef, ReactNode } from 'react';

interface ContainerProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

export function Container({ children, className = '', ...rest }: ContainerProps) {
  return (
    <div className={`editorial-container ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

interface SectionProps extends ComponentPropsWithRef<'section'> {
  spacing?: 'default' | 'tight' | 'none';
  children: ReactNode;
}

export function Section({
  spacing = 'default',
  children,
  className = '',
  ...rest
}: SectionProps) {
  const spacingClass =
    spacing === 'tight'
      ? 'section-space-tight'
      : spacing === 'none'
        ? ''
        : 'section-space';

  return (
    <section className={`${spacingClass} ${className}`.trim()} {...rest}>
      {children}
    </section>
  );
}

interface EditorialGridProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

export function EditorialGrid({ children, className = '', ...rest }: EditorialGridProps) {
  return (
    <div className={`editorial-grid ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
