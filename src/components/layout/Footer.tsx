import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { footerNavigation, contactInfo } from '@/data/navigation';
import { organizationInfo } from '@/data/homepage';

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block" aria-label="Beit-Refuah — A House Of Healing">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-deep text-forest-foreground">
              <span className="font-display text-2xl font-bold text-gold">BR</span>
            </div>
          </Link>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">{organizationInfo.description}</p>
        </div>

        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
          {footerNavigation.map((section) => (
            <div key={section.title}>
              <h4 className="eyebrow text-[0.65rem] text-forest">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-forest">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="eyebrow text-[0.65rem] text-forest">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {contactInfo.location}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-forest">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-forest">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Globe className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-forest">
                {contactInfo.website}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{organizationInfo.copyright}</p>
          <p className="italic">
            &ldquo;{organizationInfo.scripture}&rdquo; — {organizationInfo.scriptureRef}
          </p>
        </div>
      </div>
    </footer>
  );
}