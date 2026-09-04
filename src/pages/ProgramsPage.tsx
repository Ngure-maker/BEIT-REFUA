import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Cross, Sun, Target } from 'lucide-react';
import { programsContent } from '@/data/programs';
import { useSiteContent } from '@/data/SiteContentContext';
import { cn } from '@/utils/cn';

export function ProgramsPage() {
  useSEO({
    title: 'Our Programs | Beit-Refuah',
    description: 'Explore Beit-Refuah\'s current programs, programs in development, and future vision for Christ-centered healing in Western Kenya.',
    url: '/programs',
  });

  const { content } = useSiteContent();
  const { hero, currentPrograms, developmentPrograms, futureVision } = programsContent;

  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title={hero.title}
        description={hero.description}
      />

      {/* Current Programs */}
      <section id="current-programs" className="container-x py-20">
        <SectionHeader
          eyebrow="Current Programs"
          title="Running Today"
          description="Programs that are actively running and making a difference in our communities."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {currentPrograms.map((program, index) => {
            const siteImage = content.programs.items[index];
            return (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={siteImage?.image || program.imageUrl}
                    alt={siteImage?.imageAlt || program.imageAlt}
                    width="1000"
                    height="700"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                <span className="absolute left-4 top-4 rounded-sm bg-forest-deep px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-foreground">
                  Current Program
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display text-forest">{program.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{program.shortDescription}</p>
                {program.fullDescription && (
                  <p className="mt-3 text-sm text-muted-foreground">{program.fullDescription}</p>
                )}
                {program.objectives.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {program.objectives.map((objective) => (
                      <li key={objective} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Target className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                )}
                <Button to="/get-involved#give" variant="secondary" className="mt-6">
                  Support This Program
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </motion.article>
          );
          })}
        </div>
      </section>

      {/* Programs in Development */}
      <section id="development-programs" className="bg-cream">
        <div className="container-x py-20">
          <SectionHeader
            eyebrow="In Development"
            title="Programs in Development"
            description="Programs we are actively building and preparing to launch responsibly."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {developmentPrograms.map((program, index) => (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <Cross className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-display text-forest">{program.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{program.shortDescription}</p>
                <Button to="/get-involved#pray" variant="ghost" className="mt-4 eyebrow text-[0.65rem] text-forest">
                  Pray for this program
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section id="future-vision" className="container-x py-20">
        <SectionHeader
          eyebrow="Future Vision"
          title="What We Are Praying Toward"
          description="Our long-term vision for growth and expanded impact in Western Kenya."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {futureVision.map((program, index) => (
            <motion.article
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn('card p-6', index === 0 && 'border-gold/40')}
            >
              <Sun className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-display text-forest">{program.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{program.shortDescription}</p>
              <Button to="/get-involved#give" variant="ghost" className="mt-4 eyebrow text-[0.65rem] text-forest">
                Help make it real
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Button>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}