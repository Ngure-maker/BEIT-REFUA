import { HeartHandshake, Sparkles, HeartPulse, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/data/SiteContentContext';
import { Button } from '@/components/ui/Button';

const pillarIcons = [HeartHandshake, Sparkles, HeartPulse, Sun];

export function MissionSection() {
  const { content } = useSiteContent();
  const { mission } = content;

  return (
    <section className="grid lg:grid-cols-2">
      <img
        src={mission.image}
        alt={mission.imageAlt}
        width="900"
        height="1100"
        loading="lazy"
        className="h-full w-full object-contain"
      />
      <div className="bg-forest px-6 py-16 text-forest-foreground md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="max-w-md text-3xl md:text-4xl font-display">{mission.title}</h2>
          <p className="mt-5 max-w-lg text-forest-foreground/85">{mission.description}</p>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {mission.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? HeartHandshake;
              return (
                <div key={pillar.title}>
                  <Icon className="size-7 text-gold" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium">{pillar.title}</p>
                </div>
              );
            })}
          </div>
          <Button to={mission.cta.href} variant="primary" className="mt-10">
            {mission.cta.label}
            <ArrowRight aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
