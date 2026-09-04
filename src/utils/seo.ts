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
}

export function generateSEOTags(props: SEOProps): string {
  const baseUrl = 'https://beit-refuah.org';
  const url = props.url ? `${baseUrl}${props.url}` : baseUrl;
  const image = props.image ? `${baseUrl}${props.image}` : `${baseUrl}/og-default.jpg`;

  const tags = [
    `<title>${props.title}</title>`,
    `<meta name="description" content="${props.description}" />`,
    `<meta property="og:title" content="${props.title}" />`,
    `<meta property="og:description" content="${props.description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:type" content="${props.type || 'website'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${props.title}" />`,
    `<meta name="twitter:description" content="${props.description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${url}" />`,
  ];

  if (props.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${props.publishedTime}" />`);
  }
  if (props.modifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${props.modifiedTime}" />`);
  }
  if (props.author) {
    tags.push(`<meta property="article:author" content="${props.author}" />`);
  }
  if (props.section) {
    tags.push(`<meta property="article:section" content="${props.section}" />`);
  }
  if (props.tags?.length) {
    props.tags.forEach(tag => {
      tags.push(`<meta property="article:tag" content="${tag}" />`);
    });
  }

  return tags.join('\n');
}

export function useSEO(props: SEOProps) {
  useEffect(() => {
    document.title = props.title;

    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', props.description);
    updateMeta('og:title', props.title, true);
    updateMeta('og:description', props.description, true);
    if (props.url) updateMeta('og:url', `https://beit-refuah.org${props.url}`, true);
    if (props.image) updateMeta('og:image', `https://beit-refuah.org${props.image}`, true);
    updateMeta('og:type', props.type || 'website', true);
    updateMeta('twitter:title', props.title);
    updateMeta('twitter:description', props.description);
    if (props.image) updateMeta('twitter:image', `https://beit-refuah.org${props.image}`);
    if (props.publishedTime) updateMeta('article:published_time', props.publishedTime, true);
    if (props.modifiedTime) updateMeta('article:modified_time', props.modifiedTime, true);
    if (props.author) updateMeta('article:author', props.author, true);
    if (props.section) updateMeta('article:section', props.section, true);
  }, [props.title, props.description, props.url, props.image, props.type, props.publishedTime, props.modifiedTime, props.author, props.section]);
}