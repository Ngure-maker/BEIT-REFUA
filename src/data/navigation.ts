import type { NavigationItem, FooterSection } from '@/types';

export const mainNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/who-we-are' },
  { label: 'Healthcare', href: '/healthcare' },
  { label: 'Our Programs', href: '/programs' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Stories', href: '/stories' },
];

export const footerNavigation: FooterSection[] = [
  {
    title: 'Who We Are',
    links: [
      { label: 'Our Story', href: '/who-we-are#our-story' },
      { label: 'Vision & Mission', href: '/who-we-are#vision-mission' },
      { label: 'Our Approach', href: '/who-we-are#our-approach' },
      { label: 'Leadership & Governance', href: '/impact#governance' },
    ],
  },
  {
    title: 'Healthcare',
    links: [
      { label: 'Community Clinic', href: '/healthcare#community-clinic' },
      { label: 'Healthcare Model', href: '/healthcare#healthcare-model' },
      { label: 'Healthcare Vision', href: '/healthcare#healthcare-vision' },
    ],
  },
  {
    title: 'Our Programs',
    links: [
      { label: 'Current Programs', href: '/programs#current-programs' },
      { label: 'Programs in Development', href: '/programs#development-programs' },
      { label: 'Future Vision', href: '/programs#future-vision' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Give', href: '/get-involved#give' },
      { label: 'Pray', href: '/get-involved#pray' },
      { label: 'Volunteer', href: '/get-involved#volunteer' },
      { label: 'Partner', href: '/get-involved#partner' },
    ],
  },
  {
    title: 'Trust & Impact',
    links: [
      { label: 'Governance', href: '/impact#governance' },
      { label: 'Safeguarding', href: '/impact#safeguarding' },
      { label: 'Financial Accountability', href: '/impact#accountability' },
      { label: 'Impact Reports', href: '/impact#reports' },
    ],
  },
];

export const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/beitrefuah', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com/beitrefuah', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com/beitrefuah', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com/beitrefuah', icon: 'youtube' },
];

export const contactInfo = {
  location: 'Kakamega County, Western Kenya',
  phone: '+254 700 000 000',
  email: 'info@beit-refuah.org',
  website: 'www.beit-refuah.org',
};