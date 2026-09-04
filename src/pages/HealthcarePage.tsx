import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ArrowRight, HeartPulse, Brain, Cross, Users, Leaf } from 'lucide-react';
import { healthcareContent } from '@/data/healthcare';
import { useSiteContent } from '@/data/SiteContentContext';
import { cn } from '@/utils/cn';

const dimensionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  physical: HeartPulse,
  emotional: Brain,
  spiritual: Cross,
  relational: Users,
  community: Leaf,
};

const dimensionBg: Record<string, string> = {
  physical: 'bg-forest-deep text-forest-foreground',
  emotional: 'bg-forest text-forest-foreground',
  spiritual: 'bg-gold text-gold-foreground',
  relational: 'bg-forest text-forest-foreground',
  community: 'bg-forest-deep text-forest-foreground',
};

export function HealthcarePage() {
  useSEO({
    title: 'Healthcare | Beit-Refuah',
    description: 'Our community medical clinic, healthcare model and vision for Christ-centered healthcare that sees the whole person in Western Kenya.',
    url: '/healthcare',
  });

  const { content } = useSiteContent();
  const { hero, communityClinic, healthcareModel, challenge, healthcareVision } = healthcareContent;

  return (
    <>
      <PageHero
        eyebrow="Healthcare"
        title={hero.title}
        description={hero.description}
        image={{ src: content.healthcare.image, alt: content.healthcare.imageAlt }}
      />

      {/* Community Clinic */}
      <section id="community-clinic" className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-gold">{communityClinic.subtitle}</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display text-forest">{communityClinic.title}</h2>
          <p className="mt-5 text-muted-foreground">{communityClinic.description}</p>
          <blockquote className="mt-6 border-l-2 border-gold pl-5">
            <p className="italic text-forest">&ldquo;{communityClinic.quote}&rdquo;</p>
          </blockquote>
          <Button to={communityClinic.cta.href} variant="primary" className="mt-8">
            {communityClinic.cta.label}
            <ArrowRight aria-hidden="true" />
          </Button>
        </motion.div>
        <motion.img
          src={content.healthcare.image}
          alt={content.healthcare.imageAlt}
          width="1200"
          height="800"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="w-full rounded-sm object-contain shadow-lg"
        />
      </section>

      {/* Healthcare Model */}
      <section id="healthcare-model" className="bg-cream">
        <div className="container-x py-20">
          <SectionHeader
            eyebrow="Healthcare Model"
            title={healthcareModel.title}
            description="A person can be physically treated and still leave a clinic unhealed. True healing touches five dimensions of a person's life."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {healthcareModel.dimensions.map((dimension, index) => {
              const Icon = dimensionIcons[dimension.id] ?? HeartPulse;
              return (
                <motion.div
                  key={dimension.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3 rounded-sm border border-border bg-card p-6 text-center"
                >
                  <span className={cn('flex size-12 items-center justify-center rounded-full', dimensionBg[dimension.id])}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="eyebrow text-[0.7rem] text-forest">{dimension.title}</h3>
                  <p className="text-sm text-muted-foreground">{dimension.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="container-x py-20">
        <SectionHeader eyebrow="The Challenge" title={challenge.title} description={challenge.description} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {challenge.evidence.map((item) => (
            <div key={item} className="rounded-sm border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-sm bg-forest p-8 text-forest-foreground">
          <p className="text-forest-foreground/90">{challenge.exploiters}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-display text-forest">{challenge.answer.title}</h3>
          <p className="mt-3 max-w-3xl text-muted-foreground">{challenge.answer.description}</p>
          <ul className="mt-4 space-y-2">
            {challenge.answer.sources.map((source) => (
              <li key={source} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {source}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Healthcare Vision */}
      <section id="healthcare-vision" className="bg-forest-deep text-forest-foreground">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow text-gold">Healthcare Vision</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display">{healthcareVision.title}</h2>
            <p className="mt-4 text-forest-foreground/85">{healthcareVision.subtitle}</p>
            <p className="mt-4 text-forest-foreground/85">{healthcareVision.description}</p>
            <Button to="/get-involved#give" variant="primary" className="mt-8">
              Support the Vision
              <ArrowRight aria-hidden="true" />
            </Button>
          </motion.div>
          <motion.img
            src={content.healthcare.image}
            alt={content.healthcare.imageAlt}
            width="1200"
            height="800"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="w-full rounded-sm object-contain shadow-lg"
          />
        </div>
      </section>
    </>
  );
}