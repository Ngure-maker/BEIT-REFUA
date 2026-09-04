import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/data/SiteContentContext';
import { Button } from '@/components/ui/Button';

export function HealthcarePreview() {
  const { content } = useSiteContent();
  const { healthcare } = content;

  return (
    <section className="bg-cream">
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow text-gold">Healthcare</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-display text-forest">{healthcare.title}</h2>
          <p className="mt-5 max-w-lg text-muted-foreground">{healthcare.description}</p>
          <Button to={healthcare.cta.href} variant="secondary" className="mt-8">
            {healthcare.cta.label}
            <ArrowRight aria-hidden="true" />
          </Button>
        </motion.div>
        <motion.img
          src={healthcare.image}
          alt={healthcare.imageAlt}
          width="1200"
          height="800"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full rounded-sm object-contain shadow-lg"
        />
      </div>
    </section>
  );
}
