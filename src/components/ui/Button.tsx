import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/cn';

type Variant = 'default' | 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

interface BaseButtonProps {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  to?: never;
}

interface ButtonAsLink extends BaseButtonProps, Omit<LinkProps, keyof BaseButtonProps> {
  to: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  default: 'bg-forest-deep text-forest-foreground hover:bg-forest-deep/90',
  primary: 'bg-forest-deep text-forest-foreground hover:bg-forest-deep/90',
  destructive: 'bg-red-600 text-white hover:bg-red-600/90',
  outline: 'border border-border bg-white hover:bg-muted/50',
  secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
  ghost: 'hover:bg-muted/50',
  link: 'text-gold underline-offset-4 hover:underline',
};

const sizeClasses: Record<Size, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-lg px-8',
  icon: 'h-10 w-10',
};

function getClassName(variant: Variant, size: Size, className?: string) {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={getClassName(variant, size, className)}
          ref={ref}
          {...props}
        />
      );
    }

    if ('to' in props && props.to) {
      const { to, ...rest } = props;
      return (
        <Link
          to={to}
          className={getClassName(variant, size, className)}
          ref={ref as any}
          {...rest}
        />
      );
    }

    return (
      <button
        className={getClassName(variant, size, className)}
        ref={ref}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);
Button.displayName = 'Button';
