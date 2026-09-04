import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { DonationForm } from '@/components/forms/DonationForm';
import { PrayerForm } from '@/components/forms/PrayerForm';
import { VolunteerForm } from '@/components/forms/VolunteerForm';
import { PartnerForm } from '@/components/forms/PartnerForm';
import { getInvolvedContent } from '@/data/get-involved';
import { Heart, HeartHandshake, Users, Hand, Quote } from 'lucide-react';

export function GetInvolvedPage() {
  useSEO({
    title: 'Get Involved | Beit-Refuah',
    description: 'Give, pray, volunteer or partner with Beit-Refuah — walk with us as we heal people and restore hope in Western Kenya.',
    url: '/get-involved',
  });

  const { hero, give, pray, volunteer, partner, donationSection, partnershipQuote } = getInvolvedContent;

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title={hero.title}
        description={hero.description}
      />

      {/* Give */}
      <section id="give" className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-gold text-gold-foreground">
                <Heart className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-display text-forest">{give.title}</h2>
            </div>
            <p className="mt-4 text-muted-foreground">{give.description}</p>
            <div className="mt-6 rounded-sm bg-cream p-6">
              <h3 className="text-xl font-display text-forest">{donationSection.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{donationSection.description}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-sm border border-border bg-card p-6 md:p-8"
          >
            <h3 className="text-2xl font-display text-forest">Donate Now</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a one-time gift or become a monthly partner.
            </p>
            <div className="mt-6">
              <DonationForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pray */}
      <section id="pray" className="bg-cream">
        <div className="container-x py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-forest text-forest-foreground">
                  <Hand className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-3xl font-display text-forest">{pray.title}</h2>
              </div>
              <p className="mt-4 text-muted-foreground">{pray.description}</p>
              <div className="mt-6 rounded-sm bg-forest p-6 text-forest-foreground">
                <Quote className="size-6 text-gold" aria-hidden="true" />
                <p className="mt-3 italic text-forest-foreground/90">&ldquo;{partnershipQuote.quote}&rdquo;</p>
                <p className="mt-3 text-sm text-forest-foreground/70">
                  — {partnershipQuote.author}, {partnershipQuote.role}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-sm border border-border bg-card p-6 md:p-8"
            >
              <h3 className="text-2xl font-display text-forest">Submit a Prayer Request</h3>
              <div className="mt-6">
                <PrayerForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
                <Users className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-display text-forest">{volunteer.title}</h2>
            </div>
            <p className="mt-4 text-muted-foreground">{volunteer.description}</p>
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-display text-forest">Opportunities</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  Medical professionals (doctors, nurses, clinical officers)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  Christian counselors and trauma specialists
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  Agricultural trainers for Farming God's Way
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  Builders and construction professionals
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  Teachers, discipleship facilitators and children's workers
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-sm border border-border bg-card p-6 md:p-8"
          >
            <h3 className="text-2xl font-display text-forest">Volunteer Application</h3>
            <div className="mt-6">
              <VolunteerForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner */}
      <section id="partner" className="bg-cream">
        <div className="container-x py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <HeartHandshake className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-3xl font-display text-forest">{partner.title}</h2>
              </div>
              <p className="mt-4 text-muted-foreground">{partner.description}</p>
              <div className="mt-6 rounded-sm border border-border bg-card p-6">
                <h3 className="text-xl font-display text-forest">Partnership Opportunities</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    Medical missions and clinical support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    Funding and resource partnerships
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    Prayer partnerships
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    Volunteer teams and training
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    Strategic collaboration with churches, NGOs and government
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-sm border border-border bg-card p-6 md:p-8"
            >
              <h3 className="text-2xl font-display text-forest">Partnership Inquiry</h3>
              <div className="mt-6">
                <PartnerForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}