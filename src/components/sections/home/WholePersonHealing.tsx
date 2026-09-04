import { HeartPulse, Brain, Cross, Users, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { wholePersonHealing } from '@/data/homepage';
import { cn } from '@/utils/cn';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'heart-pulse': HeartPulse,
  brain: Brain,
  cross: Cross,
  users: Users,
  leaf: Leaf,
};

const bgMap: Record<string, string> = {
  physical: 'bg-forest-deep text-forest-foreground',
  emotional: 'bg-forest text-forest-foreground',
  spiritual: 'bg-gold text-gold-foreground',
  relational: 'bg-forest text-forest-foreground',
  community: 'bg-forest-deep text-forest-foreground',
};

export function WholePersonHealing() {
  return (
    <section className="bg-cream">
      <div className="container-x py-16">
        <h2 className="text-center text-2xl md:text-3xl font-display text-forest">
          Healing means caring for the whole person
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-border">
          {wholePersonHealing.map((dimension, index) => {
            const Icon = iconMap[dimension.icon] ?? HeartPulse;
            return (
              <motion.div
                key={dimension.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 lg:px-4"
              >
                <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-full', bgMap[dimension.id])}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="eyebrow text-[0.7rem] text-forest">{dimension.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{dimension.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}