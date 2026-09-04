import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow', dark ? 'text-gold' : 'text-gold')}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          'mt-3 text-3xl md:text-4xl font-display',
          dark ? 'text-forest-foreground' : 'text-forest'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-muted-foreground',
            align === 'center' && 'mx-auto',
            dark && 'text-forest-foreground/85'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}