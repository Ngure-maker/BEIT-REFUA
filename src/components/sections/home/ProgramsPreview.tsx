import { motion } from 'framer-motion';
import { ArrowRight, Cross, Sun } from 'lucide-react';
import { developmentPrograms, futureVision } from '@/data/homepage';
import { useSiteContent } from '@/data/SiteContentContext';
import { Button } from '@/components/ui/Button';

export function ProgramsPreview() {
  const { content } = useSiteContent();
  const { programs } = content;

  return (
    <section className="bg-background">
      <div className="container-x py-20">
        <div className="text-center">
          <p className="eyebrow text-gold">{programs.eyebrow}</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display text-forest">{programs.heading}</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Current Programs */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="eyebrow bg-forest-deep py-3 text-center text-[0.7rem] text-forest-foreground">Current Programs</h3>
            <div className="space-y-6 p-6">
              {programs.items.map((program, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={program.image}
                    alt={program.imageAlt}
                    width="1000"
                    height="700"
                    loading="lazy"
                    className="size-24 shrink-0 rounded-sm object-contain"
                  />
                  <div>
                    <h4 className="text-base text-forest">{program.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{program.description}</p>
                  </div>
                </div>
              ))}
              <Button to="/programs" variant="ghost" className="eyebrow text-[0.65rem] text-forest">
                Learn more
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Button>
            </div>
          </motion.article>

          {/* In Development */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <h3 className="eyebrow bg-gold py-3 text-center text-[0.7rem] text-gold-foreground">In Development</h3>
            <ul className="space-y-4 p-6 text-sm">
              {developmentPrograms.map((program) => (
                <li key={program} className="flex gap-3">
                  <Cross className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{program}</span>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <Button to="/programs" variant="ghost" className="eyebrow text-[0.65rem] text-forest">
                Learn more
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Button>
            </div>
          </motion.article>

          {/* Future Vision */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <h3 className="eyebrow bg-forest-deep py-3 text-center text-[0.7rem] text-forest-foreground">Future Vision</h3>
            <ul className="space-y-4 p-6 text-sm">
              {futureVision.map((item) => (
                <li key={item} className="flex gap-3">
                  <Sun className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <Button to="/programs" variant="ghost" className="eyebrow text-[0.65rem] text-forest">
                Learn more
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
