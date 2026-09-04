import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ArrowRight, FileText, Download, Shield, HeartHandshake, Scale, Activity } from 'lucide-react';
import { impactContent } from '@/data/impact';
import { impactReports } from '@/data/reports';
import { formatDate } from '@/utils/format';

export function ImpactPage() {
  useSEO({
    title: 'Our Impact | Beit-Refuah',
    description: 'Tracking our progress honestly — impact statistics, ministry structure, governance, safeguarding, financial accountability and impact reports.',
    url: '/impact',
  });

  const { hero, metrics, ministryStructure, governance, safeguarding, accountability, areaOfOperation } = impactContent;

  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title={hero.title}
        description={hero.description}
      />

      {/* Impact Metrics */}
      <section className="bg-forest-deep text-forest-foreground">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-display">Our journey is just beginning.</h2>
            <p className="mt-3 max-w-sm text-sm text-forest-foreground/80">
              We are in our foundation season — building the systems, partnerships and infrastructure to make lasting impact.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="font-display text-3xl text-gold">{metric.formattedValue}</p>
                <p className="mt-1 text-xs text-forest-foreground/80">{metric.label}</p>
                {metric.description && (
                  <p className="mt-1 text-[0.65rem] text-forest-foreground/60">{metric.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Structure */}
      <section className="container-x py-20">
        <SectionHeader
          eyebrow="Ministry Structure"
          title={ministryStructure.title}
          description={ministryStructure.description}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ministryStructure.departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <Activity className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-display text-forest">{dept.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dept.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-display text-forest">Leadership</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ministryStructure.leadership.map((role) => (
              <div key={role.role} className="rounded-sm border border-border bg-card p-5">
                <h4 className="font-medium text-forest">{role.role}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{role.responsibilities}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="bg-cream">
        <div className="container-x py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="size-8 text-gold" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-display text-forest">{governance.title}</h2>
              <p className="mt-4 text-muted-foreground">{governance.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <HeartHandshake className="size-8 text-gold" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-display text-forest">{safeguarding.title}</h2>
              <p className="mt-4 text-muted-foreground">{safeguarding.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accountability */}
      <section id="accountability" className="container-x py-20">
        <SectionHeader
          eyebrow="Accountability"
          title={accountability.title}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {accountability.offices.map((office, index) => (
            <motion.div
              key={office.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <Scale className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-display text-forest">{office.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{office.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-sm bg-forest p-8 text-forest-foreground">
          <h3 className="text-xl font-display">{accountability.monitoring.title}</h3>
          <p className="mt-3 text-forest-foreground/85">{accountability.monitoring.description}</p>
        </div>
      </section>

      {/* Area of Operation */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <SectionHeader
            eyebrow="Where We Serve"
            title={areaOfOperation.title}
            description={areaOfOperation.description}
          />
        </div>
      </section>

      {/* Impact Reports */}
      <section id="reports" className="container-x py-20">
        <SectionHeader
          eyebrow="Impact Reports"
          title="Reports & Publications"
          description="Download our latest impact reports, progress updates and financial statements."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {impactReports.map((report, index) => (
            <motion.article
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <FileText className="size-8 text-gold" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-display text-forest">{report.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{report.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {report.period} · {report.year} · {formatDate(report.publishedAt ?? '')}
              </p>
              <a
                href={report.fileUrl}
                download
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-gold"
              >
                <Download className="size-4" aria-hidden="true" />
                Download PDF
              </a>
            </motion.article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/get-involved#give" variant="primary">
            Support Our Work
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}