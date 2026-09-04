import { useSEO } from '@/hooks/useSEO';
import { PageHero } from '@/components/ui/PageHero';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Expand, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '@/data/SiteContentContext';
import { cn } from '@/utils/cn';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  visible?: boolean;
}

const categories = ['All', 'Facilities', 'Programs', 'Community', 'Spiritual Care', 'Team'];

export function GalleryPage() {
  useSEO({
    title: 'Gallery | Beit-Refuah',
    description: 'View photos of our clinic, programs, community outreach, and spiritual care activities in Kakamega County, Kenya.',
    url: '/gallery',
  });

  const { content } = useSiteContent();
  const allGalleryImages: GalleryImage[] = content.gallery || [];
  const galleryImages = allGalleryImages.filter(img => img.visible !== false);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A visual journey through our healing ministry"
        description="Explore images of our facilities, programs, community impact, and the lives transformed through Christ-centered healthcare in Western Kenya."
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-full px-6 py-2.5 text-sm font-medium transition-all',
                  selectedCategory === cat
                    ? 'bg-forest-deep text-forest-foreground shadow-lg'
                    : 'bg-cream text-foreground hover:bg-forest/10 hover:text-forest border border-border'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => openLightbox(filteredImages.indexOf(image))}
                  className="group relative block w-full aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  aria-label={`View ${image.title} - ${image.description}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={450}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block rounded-full bg-gold/90 px-3 py-1 text-xs font-medium uppercase tracking-wide mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-1">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                      <Expand className="size-5 text-forest" aria-hidden="true" />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}

            {filteredImages.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <ImageIcon className="size-16 text-muted-foreground mb-4" aria-hidden="true" />
                <h3 className="font-display text-2xl text-forest mb-2">No images found</h3>
                <p className="text-muted-foreground">Try selecting a different category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest-deep">
        <div className="container-x text-center">
          <h2 className="font-display text-3xl md:text-4xl text-forest-foreground mb-4">
            Want to See More?
          </h2>
          <p className="text-lg text-forest-foreground/80 max-w-2xl mx-auto mb-8">
            Visit us in person to experience the healing atmosphere of Beit-Refuah firsthand. 
            Schedule a tour or join us for a community event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-involved#volunteer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gold-foreground transition-colors hover:bg-gold/90"
            >
              Visit Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gold transition-colors hover:bg-gold/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${lightboxIndex + 1} of ${filteredImages.length}`}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close lightbox"
            >
              <X className="size-6" aria-hidden="true" />
            </button>

            <motion.div
              key={filteredImages[lightboxIndex]?.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-[90vw]"
            >
              <img
                src={filteredImages[lightboxIndex]?.src}
                alt={filteredImages[lightboxIndex]?.alt}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-medium uppercase tracking-wide mb-2">
                  {filteredImages[lightboxIndex]?.category}
                </span>
                <h3 className="font-display text-xl font-semibold">{filteredImages[lightboxIndex]?.title}</h3>
                <p className="text-muted-foreground">{filteredImages[lightboxIndex]?.description}</p>
                <p className="text-sm text-white/50 mt-2">
                  {lightboxIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default GalleryPage;