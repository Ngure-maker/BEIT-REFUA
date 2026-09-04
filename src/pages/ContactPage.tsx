import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { contactInfo } from '@/data/navigation';

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/beitrefuah' },
  { name: 'Twitter', href: 'https://twitter.com/beitrefuah' },
  { name: 'Instagram', href: 'https://instagram.com/beitrefuah' },
  { name: 'YouTube', href: 'https://youtube.com/beitrefuah' },
];

export function ContactPage() {
  useSEO({
    title: 'Contact Us | Beit-Refuah',
    description: 'Get in touch with Beit-Refuah. We would love to hear from you about partnering, volunteering, giving or praying with us.',
    url: '/contact',
  });

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We would love to hear from you."
        description="Whether you want to give, pray, volunteer, partner, or simply learn more about Beit-Refuah — reach out and our team will respond."
      />

      {/* Contact Info + Form */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-display text-forest">Contact Information</h2>
            <p className="mt-4 text-muted-foreground">
              Reach us by phone, email, or visit us in Kakamega County. We are always glad to connect.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
                  <MapPin className="size-5 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-medium text-forest">Location</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{contactInfo.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
                  <Phone className="size-5 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-medium text-forest">Phone</h3>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-forest"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
                  <Mail className="size-5 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-medium text-forest">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-forest"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
                  <Globe className="size-5 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-medium text-forest">Website</h3>
                  <a
                    href={`https://${contactInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-forest"
                  >
                    {contactInfo.website}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
                  <Clock className="size-5 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-medium text-forest">Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Monday – Friday, 8:00 AM – 5:00 PM (EAT)</p>
                </div>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-8">
              <h3 className="font-medium text-forest">Follow Us</h3>
              <div className="mt-3 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Beit-Refuah on ${social.name}`}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-forest hover:text-forest"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-sm border border-border bg-card p-6 md:p-10">
              <h2 className="text-2xl font-display text-forest">Send Us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Area */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <h2 className="text-center text-3xl font-display text-forest">Find Us in Kakamega County</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Beit-Refuah serves communities across Kakamega County in Western Kenya.
          </p>
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-sm border border-border bg-card shadow-lg">
            {/* Map placeholder — replace with an embedded map when production coords are finalized */}
            <div className="relative flex h-[24rem] items-center justify-center bg-forest-deep">
              <div className="text-center text-forest-foreground">
                <MapPin className="mx-auto size-12 text-gold" aria-hidden="true" />
                <p className="mt-4 font-display text-2xl">Kakamega County</p>
                <p className="mt-2 text-sm text-forest-foreground/70">Western Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}