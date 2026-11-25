import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    href?: never;
  };

type RouterLinkButtonProps = BaseButtonProps &
  Omit<LinkProps, 'className' | 'children'> & {
    to: LinkProps['to'];
    href?: never;
  };

type ExternalLinkButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: never;
  };

export type ButtonProps = NativeButtonProps | RouterLinkButtonProps | ExternalLinkButtonProps;

function buildClassName(variant: ButtonVariant, size: ButtonSize, extra?: string): string {
  return ['btn-editorial', `btn-${variant}`, `btn-${size}`, extra].filter(Boolean).join(' ');
}

function ButtonContent({
  icon,
  iconPosition = 'right',
  children,
}: Pick<BaseButtonProps, 'icon' | 'iconPosition' | 'children'>) {
  return (
    <>
      {icon && iconPosition === 'left' ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? <span aria-hidden="true">{icon}</span> : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    className,
    children,
    ...rest
  } = props;

  const classes = buildClassName(variant, size, className);

  if ('to' in props && props.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<RouterLinkButtonProps, keyof BaseButtonProps>;
    return (
      <Link to={to} className={classes} {...linkRest}>
        <ButtonContent icon={icon} iconPosition={iconPosition}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<ExternalLinkButtonProps, keyof BaseButtonProps>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        <ButtonContent icon={icon} iconPosition={iconPosition}>
          {children}
        </ButtonContent>
      </a>
    );
  }

  const buttonRest = rest as Omit<NativeButtonProps, keyof BaseButtonProps>;
  return (
    <button type={buttonRest.type ?? 'button'} className={classes} {...buttonRest}>
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}
