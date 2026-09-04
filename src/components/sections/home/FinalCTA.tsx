import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/data/SiteContentContext';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  const { content } = useSiteContent();
  const { finalCta } = content;

  return (
    <section className="grid lg:grid-cols-2">
      <img
        src={finalCta.image}
        alt={finalCta.imageAlt}
        width="1200"
        height="700"
        loading="lazy"
        className="h-full w-full object-contain"
      />
      <div className="flex flex-col justify-center bg-cream px-6 py-14 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="max-w-md text-3xl font-display text-forest">{finalCta.title}</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button to={finalCta.primaryCta.href} variant="primary">
              {finalCta.primaryCta.label}
            </Button>
            <Button to={finalCta.secondaryCta.href} variant="ghost" className="eyebrow text-[0.7rem] text-forest">
              {finalCta.secondaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
