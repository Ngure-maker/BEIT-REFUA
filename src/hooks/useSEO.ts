import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

const SITE_URL = 'https://beit-refuah.org';

/**
 * Reusable SEO hook — updates document title, meta description,
 * Open Graph and Twitter card tags on each page mount.
 * Works with the future backend (SEO can later be SSR/CSR driven).
 */
export function useSEO(props: SEOProps) {
  useEffect(() => {
    document.title = props.title;

    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const fullUrl = props.url ? `${SITE_URL}${props.url}` : SITE_URL;
    const imageUrl = props.image ? `${SITE_URL}${props.image}` : `${SITE_URL}/og-default.jpg`;

    updateMeta('description', props.description);
    updateMeta('og:title', props.title, true);
    updateMeta('og:description', props.description, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:image', imageUrl, true);
    updateMeta('og:type', props.type || 'website', true);
    updateMeta('twitter:title', props.title);
    updateMeta('twitter:description', props.description);
    updateMeta('twitter:image', imageUrl);
    updateMeta('twitter:card', 'summary_large_image');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Robots meta
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    const robotsContent = [
      props.noIndex ? 'noindex' : 'index',
      props.noFollow ? 'nofollow' : 'follow',
    ].join(', ');
    robots.setAttribute('content', robotsContent);

    if (props.type === 'article') {
      if (props.publishedTime) updateMeta('article:published_time', props.publishedTime, true);
      if (props.modifiedTime) updateMeta('article:modified_time', props.modifiedTime, true);
      if (props.author) updateMeta('article:author', props.author, true);
      if (props.section) updateMeta('article:section', props.section, true);
      props.tags?.forEach(tag => updateMeta('article:tag', tag, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title, props.description, props.url, props.image, props.type]);
}