import { motion } from 'framer-motion';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  className,
}: CTASectionProps) {
  return (
    <section className={cn('grid lg:grid-cols-2', className)}>
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="h-full max-h-80 w-full object-contain"
        />
      )}
      <div className="flex flex-col justify-center bg-cream px-6 py-14 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="max-w-md text-3xl font-display text-forest">{title}</h2>
          {description && <p className="mt-4 max-w-md text-muted-foreground">{description}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Button to={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button to={secondaryCta.href} variant="ghost" className="eyebrow text-[0.7rem] text-forest">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}