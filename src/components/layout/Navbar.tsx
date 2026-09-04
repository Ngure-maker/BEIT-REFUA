import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavigation, contactInfo } from '@/data/navigation';
import { useSiteContent } from '@/data/SiteContentContext';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur">
      {/* Top bar */}
      <div className="bg-forest-deep text-forest-foreground">
        <div className="container-x flex h-9 items-center justify-between gap-4 text-[0.7rem]">
          <p className="flex min-w-0 items-center gap-2 truncate">
            <span className="eyebrow text-[0.7rem] text-gold">Beit-Refuah</span>
            <span aria-hidden="true" className="text-forest-foreground/40">|</span>
            <span className="truncate italic text-forest-foreground/85">A House of Healing</span>
          </p>
          <div className="hidden items-center gap-5 text-forest-foreground/80 sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Kakamega County, Kenya
            </span>
            <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
              <Mail className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {contactInfo.email}
            </a>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hidden items-center gap-1.5 transition-colors hover:text-gold lg:inline-flex">
              <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={cn('container-x flex items-center justify-between gap-6 py-2 transition-all', scrolled ? 'h-20' : 'h-24 md:h-28')}>
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="inline-block" aria-label="Beit-Refuah — A House Of Healing">
            <div className={cn("flex h-18 w-18 items-center justify-center rounded-full overflow-hidden", !content.organization.logo && "bg-forest-deep text-forest-foreground")}>
              {content.organization.logo ? (
                <img src={content.organization.logo} alt="Beit-Refuah logo" className="h-full w-full object-contain" />
              ) : (
                <span className="font-display text-xl font-bold text-gold">BR</span>
              )}
            </div>
          </Link>
          <span className="hidden min-w-0 border-l border-border pl-3 md:block">
            <span className="block font-display text-lg leading-tight text-forest">Beit-Refuah</span>
            <span className="eyebrow block text-[0.6rem] text-foreground/60">A House of Healing</span>
          </span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'eyebrow text-[0.7rem] transition-colors hover:text-forest',
                  isActive ? 'text-forest border-b-2 border-gold pb-1' : 'text-foreground/80'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/get-involved#give"
            className="hidden items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gold px-7 text-sm font-semibold uppercase tracking-[0.08em] text-gold-foreground transition-colors hover:bg-gold/90 sm:inline-flex h-11"
          >
            <Heart className="size-4 fill-current" aria-hidden="true" />
            Donate
          </Link>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-forest lg:hidden"
          >
            {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-cream lg:hidden"
          >
            <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile navigation">
              {mainNavigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-4 py-3 text-sm font-medium transition-colors',
                      isActive ? 'bg-forest-deep text-forest-foreground' : 'text-foreground/80 hover:bg-forest/5 hover:text-forest'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/get-involved#give"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gold-foreground"
              >
                <Heart className="size-4 fill-current" aria-hidden="true" />
                Donate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}