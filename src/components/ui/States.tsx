import { Loader2, AlertCircle, Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

export function LoadingState({ label = 'Loading...', className }: { label?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground', className)} role="status" aria-live="polite">
      <Loader2 className="size-8 animate-spin text-gold" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', description, className }: { title?: string; description?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
      <Inbox className="size-10 text-muted-foreground/50" aria-hidden="true" />
      <h3 className="text-lg font-medium text-forest">{title}</h3>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', description, onRetry, className }: { title?: string; description?: string; onRetry?: () => void; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)} role="alert">
      <AlertCircle className="size-10 text-red-500" aria-hidden="true" />
      <h3 className="text-lg font-medium text-forest">{title}</h3>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-md border border-forest/30 px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest/5"
        >
          Try Again
        </button>
      )}
    </div>
  );
}