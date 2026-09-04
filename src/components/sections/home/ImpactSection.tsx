import { motion } from 'framer-motion';
import { impactMetrics } from '@/data/homepage';

export function ImpactSection() {
  return (
    <section className="bg-forest-deep text-forest-foreground">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-display">Our journey is just beginning.</h2>
          <p className="mt-3 max-w-sm text-sm text-forest-foreground/80">
            We are in our foundation season — building the systems, partnerships and infrastructure to make lasting impact.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="font-display text-3xl text-gold">{metric.formattedValue}</p>
              <p className="mt-1 text-xs text-forest-foreground/80">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}