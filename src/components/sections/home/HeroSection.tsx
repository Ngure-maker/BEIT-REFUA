import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/data/SiteContentContext';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section className="relative bg-forest-deep text-forest-foreground">
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          width="1600"
          height="1008"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/90 to-forest-deep/10" />
      </div>
      <div className="container-x relative py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1
            className="max-w-2xl text-5xl leading-[1.05] md:text-7xl font-display"
            dangerouslySetInnerHTML={{ __html: hero.headline.replace(/\n/g, '<br/>') }}
          />
          <p className="mt-6 max-w-md text-lg text-forest-foreground/90">{hero.subheadline}</p>
          <p className="mt-6 max-w-md border-t border-gold/60 pt-6 text-sm italic text-gold">
            {hero.mission}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={hero.primaryCta.href} variant="primary" className="bg-gold hover:bg-gold/90 text-gold-foreground">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button to={hero.secondaryCta.href} variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white bg-transparent">
              {hero.secondaryCta.label}
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
