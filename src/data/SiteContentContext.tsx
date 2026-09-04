import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

export interface SiteContent {
  hero: {
    headline: string;
    subheadline: string;
    mission: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: string;
    imageAlt: string;
  };
  mission: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    cta: { label: string; href: string };
    pillars: { title: string; description: string }[];
  };
  healthcare: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    cta: { label: string; href: string };
  };
  programs: {
    eyebrow: string;
    heading: string;
    items: { title: string; description: string; image: string; imageAlt: string }[];
  };
  finalCta: {
    title: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: string;
    imageAlt: string;
  };
  impactMetrics: {
    heading: string;
    description: string;
    items: { label: string; value: string; description: string }[];
  };
  contact: {
    location: string;
    phone: string;
    email: string;
    website: string;
    hours: string;
    socialLinks: { name: string; url: string }[];
  };
  organization: {
    name: string;
    tagline: string;
    description: string;
    copyright: string;
    logo: string;
  };
  gallery: {
    id: string;
    src: string;
    alt: string;
    category: string;
    title: string;
    description: string;
    visible: boolean;
  }[];
}

const defaultContent: SiteContent = {
  hero: {
    headline: 'Healing people.\nRestoring hope.',
    subheadline: 'Christ-centered healthcare, discipleship and practical support for vulnerable communities in Kenya.',
    mission: 'Serving the least, the last, and the lost.',
    primaryCta: { label: 'Get Involved', href: '/get-involved' },
    secondaryCta: { label: 'Support the Mission', href: '/get-involved' },
    image: '/assets/hero-clinic.jpg',
    imageAlt: 'A nurse examining a smiling child beside his mother in a rural Kenyan clinic',
  },
  mission: {
    title: 'We believe people deserve more than a service.',
    description: 'Too many in our communities face broken systems, exploitation and neglect. Beit-Refuah exists to offer something different:',
    image: '/assets/elder-woman.jpg',
    imageAlt: 'An elderly Kenyan woman looking up hopefully outside her home',
    cta: { label: 'Why We Exist', href: '/who-we-are' },
    pillars: [
      { title: 'Genuine Relationship', description: 'We walk alongside people in humble, long-term relationship rather than offering one-off handouts.' },
      { title: 'Compassionate Care', description: 'Every individual is created in the image of God and deserves to be treated with respect and honor.' },
      { title: 'Dignity', description: 'We look first for the gifts, skills and resources a family already has, empowering rather than creating dependency.' },
      { title: 'Hope', description: 'Lasting transformation begins with a change of mindset made possible through the gospel, not material provision alone.' },
    ],
  },
  healthcare: {
    title: 'Healthcare that sees the whole person',
    description: 'We believe a person can be physically treated and still leave a clinic unhealed. Our approach integrates medical care, emotional support, spiritual care, relational restoration and community support -- because true healing is whole.',
    image: '/assets/clinic-construction.jpg',
    imageAlt: 'The Beit-Refuah community medical clinic under construction',
    cta: { label: 'Explore Healthcare', href: '/healthcare' },
  },
  programs: {
    eyebrow: 'Our Programs',
    heading: 'Care for today. Hope for tomorrow.',
    items: [
      { title: 'Spiritual Support & Discipleship', description: 'Building faith, prayer and discipleship movements.', image: '/assets/discipleship.jpg', imageAlt: 'A village Bible study group' },
      { title: "Farming God's Way", description: 'Sustainable agriculture for food security, income and stewardship.', image: '/assets/farming.jpg', imageAlt: 'Hands harvesting tomatoes in a mulched field' },
    ],
  },
  finalCta: {
    title: 'Be part of restoring hope and transforming lives.',
    primaryCta: { label: 'Give Now', href: '/get-involved#give' },
    secondaryCta: { label: 'Become a Monthly Partner', href: '/get-involved#give' },
    image: '/assets/children.jpg',
    imageAlt: 'Smiling children waving in a Kenyan village',
  },
  impactMetrics: {
    heading: 'Our journey is just beginning.',
    description: 'We are in our foundation season -- building the systems, partnerships and infrastructure to make lasting impact.',
    items: [
      { label: 'Patients Served', value: '300+', description: 'Individuals receiving medical care' },
      { label: 'Families Reached', value: '50+', description: 'Households impacted through holistic programs' },
      { label: 'Children Supported', value: '100+', description: 'Children served through education, nutrition, and care' },
      { label: 'Households Trained', value: '80+', description: 'Families equipped with farming and life skills' },
      { label: 'Community Members Reached', value: '80+', description: 'Total community impact across all programs' },
    ],
  },
  contact: {
    location: 'Kakamega County, Western Kenya',
    phone: '+254 700 000 000',
    email: 'info@beit-refuah.org',
    website: 'www.beit-refuah.org',
    hours: 'Monday - Friday, 8:00 AM - 5:00 PM (EAT)',
    socialLinks: [
      { name: 'Facebook', url: 'https://facebook.com/beitrefuah' },
      { name: 'Twitter', url: 'https://twitter.com/beitrefuah' },
      { name: 'Instagram', url: 'https://instagram.com/beitrefuah' },
      { name: 'YouTube', url: 'https://youtube.com/beitrefuah' },
    ],
  },
  organization: {
    name: 'Beit-Refuah',
    tagline: 'A House of Healing',
    description: 'Serving the least, the last, and the lost -- Christ-centered healing in Kakamega County, Western Kenya.',
    copyright: '© 2026 Beit-Refuah. A house of healing.',
    logo: '',
  },
  gallery: [],
};

interface GalleryMeta {
  id: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  visible: boolean;
}

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (path: string, value: any) => void;
  updateImage: (path: string, file: File) => Promise<void>;
  addGalleryImage: (file: File, meta: { alt: string; category: string; title: string; description: string }) => Promise<void>;
  updateGalleryImage: (id: string, meta: { alt?: string; category?: string; title?: string; description?: string; visible?: boolean }) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  ready: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

function deepMerge(defaults: any, saved: any): any {
  if (typeof defaults !== 'object' || defaults === null) return saved ?? defaults;
  if (typeof saved !== 'object' || saved === null) return defaults;
  if (Array.isArray(defaults)) return saved;
  const result: any = {};
  for (const key of Object.keys(defaults)) {
    result[key] = deepMerge(defaults[key], saved[key]);
  }
  return result;
}

function loadImageField(fieldKey: string): string {
  return `/api/images/${fieldKey}`;
}

function galleryImageUrl(id: string): string {
  return `/api/gallery/${id}/image`;
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [ready, setReady] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  // Load all data from backend on mount
  useEffect(() => {
    async function loadAll() {
      try {
        // Load text content from API
        const contentRes = await fetch('/api/content');
        let loadedContent: any = {};

        if (contentRes.ok) {
          const apiContent = await contentRes.json();
          // API returns key-value pairs like { hero: {...}, mission: {...}, ... }
          loadedContent = apiContent;
        }

        // Merge with defaults
        const merged = deepMerge(defaultContent, loadedContent);

        // Set image URLs from backend
        merged.hero.image = loadImageField('hero.image');
        merged.mission.image = loadImageField('mission.image');
        merged.healthcare.image = loadImageField('healthcare.image');
        merged.finalCta.image = loadImageField('finalCta.image');
        merged.organization.logo = loadImageField('organization.logo');

        // Load program item images
        if (merged.programs?.items) {
          merged.programs.items = merged.programs.items.map((item: any, i: number) => ({
            ...item,
            image: loadImageField(`programs.items.${i}.image`),
          }));
        }

        // Load gallery from API
        try {
          const galleryRes = await fetch('/api/gallery');
          if (galleryRes.ok) {
            const galleryMeta: GalleryMeta[] = await galleryRes.json();
            merged.gallery = galleryMeta.map(img => ({
              ...img,
              src: galleryImageUrl(img.id),
              visible: img.visible !== false,
            }));
          } else {
            console.error('Gallery API returned error:', galleryRes.status, galleryRes.statusText);
          }
        } catch (err) {
          console.error('Gallery load failed:', err);
        }

        setContent(merged);
      } catch (err) {
        console.warn('Failed to load from API, using defaults:', err);
      }
      setReady(true);
    }
    loadAll();
  }, []);

  // Save text content to backend (debounced)
  const saveContentToAPI = useCallback((data: SiteContent) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        // Save each top-level section separately
        const sections: Record<string, any> = {
          hero: data.hero,
          mission: data.mission,
          healthcare: data.healthcare,
          programs: data.programs,
          finalCta: data.finalCta,
          impactMetrics: data.impactMetrics,
          contact: data.contact,
          organization: data.organization,
        };
        await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sections),
        });
      } catch (err) {
        console.warn('Failed to save content to API:', err);
      }
    }, 500);
  }, []);

  const updateContent = useCallback((path: string, value: any) => {
    setContent(prev => {
      const keys = path.split('.');
      const next = JSON.parse(JSON.stringify(prev));
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      saveContentToAPI(next);
      return next;
    });
  }, [saveContentToAPI]);

  const updateImage = useCallback(async (path: string, file: File): Promise<void> => {
    const fieldKey = path;
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`/api/images/${fieldKey}`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const imageUrl = loadImageField(fieldKey) + '?t=' + Date.now();
      setContent(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        const keys = path.split('.');
        let obj: any = next;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = imageUrl;
        saveContentToAPI(next);
        return next;
      });
    } catch (err) {
      console.warn('Image upload to server failed, using data URL fallback:', err);
    }
  }, [saveContentToAPI]);

  const addGalleryImage = useCallback(async (file: File, meta: { alt: string; category: string; title: string; description: string }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('alt', meta.alt);
      formData.append('category', meta.category);
      formData.append('title', meta.title);
      formData.append('description', meta.description);
      formData.append('visible', 'true');

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const { id } = await res.json();
        const newItem = {
          id,
          src: galleryImageUrl(id),
          alt: meta.alt,
          category: meta.category,
          title: meta.title,
          description: meta.description,
          visible: true,
        };
        setContent(prev => ({
          ...prev,
          gallery: [...prev.gallery, newItem],
        }));
      }
    } catch (err) {
      console.error('Failed to add gallery image:', err);
    }
  }, []);

  const updateGalleryImage = useCallback(async (id: string, meta: { alt?: string; category?: string; title?: string; description?: string; visible?: boolean }) => {
    try {
      await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meta),
      });
      setContent(prev => ({
        ...prev,
        gallery: prev.gallery.map(img =>
          img.id === id ? { ...img, ...meta } : img
        ),
      }));
    } catch (err) {
      console.error('Failed to update gallery image:', err);
    }
  }, []);

  const deleteGalleryImage = useCallback(async (id: string) => {
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setContent(prev => ({
        ...prev,
        gallery: prev.gallery.filter(img => img.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete gallery image:', err);
    }
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, updateContent, updateImage, addGalleryImage, updateGalleryImage, deleteGalleryImage, ready }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}

export { defaultContent };
