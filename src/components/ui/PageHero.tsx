import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface PageHeroProps {
  eyebrow?: string;
  subtitle?: string;
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

export function PageHero({ eyebrow, subtitle, title, description, image, className }: PageHeroProps) {
  return (
    <section className={cn('relative bg-forest-deep text-forest-foreground', className)}>
      {image && (
        <div className="absolute inset-0">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/90 to-forest-deep/60" />
        </div>
      )}
      <div className="container-x relative py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
          {subtitle && <p className="mt-2 text-lg text-forest-foreground/90 font-medium">{subtitle}</p>}
          <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl font-display">{title}</h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base text-forest-foreground/80">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}