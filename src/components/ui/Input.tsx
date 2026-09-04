import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-forest',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';