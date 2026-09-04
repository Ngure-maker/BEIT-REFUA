import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { whoWeAreContent } from '@/data/who-we-are';
import { useSiteContent } from '@/data/SiteContentContext';

export function WhoWeArePage() {
  useSEO({
    title: 'Who We Are | Beit-Refuah',
    description: 'Our vision, mission, biblical foundation, philosophy of healing and the six guiding principles behind Beit-Refuah\'s work in Western Kenya.',
    url: '/who-we-are',
  });

  const { content } = useSiteContent();
  const { hero, vision, mission, biblicalFoundation, philosophyOfHealing, guidingPrinciples } = whoWeAreContent;

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title={hero.title}
        description={hero.description}
        image={{ src: content.mission.image, alt: content.mission.imageAlt }}
      />

      {/* Vision & Mission */}
      <section id="vision-mission" className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-gold">Vision</p>
          <p className="mt-4 font-display text-2xl leading-snug text-forest">{vision.content}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="eyebrow text-gold">Mission</p>
          <p className="mt-4 font-display text-2xl leading-snug text-forest">{mission.content}</p>
        </motion.div>
      </section>

      {/* Biblical Foundation */}
      <section className="bg-forest text-forest-foreground">
        <div className="container-x py-20">
          <SectionHeader
            eyebrow="Biblical Foundation"
            title={biblicalFoundation.title}
            description={biblicalFoundation.description}
            dark
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {biblicalFoundation.scriptures.map((scripture) => (
              <blockquote key={scripture.reference} className="border-l-2 border-gold pl-5">
                <p className="italic text-forest-foreground/90">&ldquo;{scripture.text}&rdquo;</p>
                <cite className="eyebrow mt-3 block text-[0.65rem] not-italic text-gold">
                  {scripture.reference}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy of Healing */}
      <section id="our-approach" className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <motion.img
          src={content.mission.image}
          alt={content.mission.imageAlt}
          width="900"
          height="1100"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-h-[30rem] w-full rounded-sm object-contain"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-gold">Philosophy of Healing</p>
          <h2 className="mt-3 text-3xl font-display text-forest">{philosophyOfHealing.subtitle}</h2>
          <p
            className="mt-5 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: philosophyOfHealing.description }}
          />
          <p className="mt-4 text-muted-foreground">{philosophyOfHealing.details}</p>
        </motion.div>
      </section>

      {/* Theory of Change */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <p className="eyebrow text-gold">Theory of Change</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {philosophyOfHealing.theoryOfChange.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-sm border border-forest/20 bg-card px-4 py-3 text-sm font-medium text-forest">
                  {step}
                </span>
                {index < philosophyOfHealing.theoryOfChange.steps.length - 1 && (
                  <span className="text-gold" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            {philosophyOfHealing.theoryOfChange.note}
          </p>
        </div>
      </section>

      {/* Guiding Principles */}
      <section id="our-story" className="container-x py-20">
        <SectionHeader eyebrow="Our Story" title="Guiding Principles" />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guidingPrinciples.map((principle) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="border-t-2 border-gold pt-5"
            >
              <p className="font-display text-2xl text-gold">{principle.number}</p>
              <h3 className="mt-2 text-lg text-forest">{principle.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{principle.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/stories" variant="secondary">
            Read Our Founder's Story
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}