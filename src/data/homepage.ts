import type { Program, ImpactMetric, WholePersonDimension, MissionPillar } from '@/types';

export const heroContent = {
  headline: 'Healing people.<br/>Restoring hope.',
  subheadline: 'Christ-centered healthcare, discipleship and practical support for vulnerable communities in Kenya.',
  missionStatement: 'Serving the least, the last, and the lost.',
  primaryCta: { label: 'Get Involved', href: '/get-involved' },
  secondaryCta: { label: 'Support the Mission', href: '/get-involved' },
  image: {
    src: '/assets/hero-clinic.jpg',
    alt: 'A nurse examining a smiling child beside his mother in a rural Kenyan clinic',
  },
};

export const wholePersonHealing: WholePersonDimension[] = [
  {
    id: 'physical',
    title: 'Physical',
    description: 'Accessible and dignified healthcare',
    icon: 'heart-pulse',
    longDescription: 'We provide comprehensive medical care through our community clinic, mobile health teams, and preventive health programs. Every patient is treated with dignity, respect, and clinical excellence.',
  },
  {
    id: 'emotional',
    title: 'Emotional',
    description: 'Counselling and trauma support',
    icon: 'brain',
    longDescription: 'Through professional Christian counseling, trauma healing groups, and pastoral care, we address the invisible wounds that keep people trapped in cycles of pain and hopelessness.',
  },
  {
    id: 'spiritual',
    title: 'Spiritual',
    description: 'Prayer, discipleship and the Gospel',
    icon: 'cross',
    longDescription: 'We share the transformative love of Christ through Bible studies, discipleship movements, prayer ministry, and gospel proclamation — believing true healing begins with reconciliation to God.',
  },
  {
    id: 'relational',
    title: 'Relational',
    description: 'Restoring trust and connection',
    icon: 'users',
    longDescription: 'Brokenness isolates. We walk alongside individuals and families in long-term, genuine relationships that rebuild trust, restore family bonds, and reconnect people to supportive community.',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Farming, income and mutual support',
    icon: 'leaf',
    longDescription: 'Through Farming God\'s Way and economic empowerment programs, we help vulnerable households achieve food security, generate sustainable income, and build resilient communities rooted in biblical stewardship.',
  },
];

export const missionContent = {
  title: 'We believe people deserve more than a service.',
  description: 'Too many in our communities face broken systems, exploitation and neglect. Beit-Refuah exists to offer something different:',
  pillars: [
    { title: 'Genuine Relationship', description: 'We walk alongside people in humble, long-term relationship rather than offering one-off handouts.' },
    { title: 'Compassionate Care', description: 'Every individual is created in the image of God and deserves to be treated with respect and honor.' },
    { title: 'Dignity', description: 'We look first for the gifts, skills and resources a family already has, empowering rather than creating dependency.' },
    { title: 'Hope', description: 'Lasting transformation begins with a change of mindset made possible through the gospel, not material provision alone.' },
  ] as MissionPillar[],
  cta: { label: 'Why We Exist', href: '/who-we-are' },
};

export const healthcarePreview = {
  title: 'Healthcare that sees the whole person',
  description: 'We believe a person can be physically treated and still leave a clinic unhealed. Our approach integrates medical care, emotional support, spiritual care, relational restoration and community support — because true healing is whole.',
  image: {
    src: '/assets/clinic-construction.jpg',
    alt: 'The Beit-Refuah community medical clinic under construction',
  },
  cta: { label: 'Explore Healthcare', href: '/healthcare' },
};

export const programsPreview: Program[] = [
  {
    id: '1',
    slug: 'spiritual-support-discipleship',
    title: 'Spiritual Support & Discipleship',
    shortDescription: 'Building faith, prayer and discipleship movements.',
    fullDescription: '',
    imageUrl: '/assets/discipleship.jpg',
    imageAlt: 'A village Bible study group',
    category: 'current',
    objectives: [],
    isActive: true,
    order: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    slug: 'farming-gods-way',
    title: 'Farming God\'s Way',
    shortDescription: 'Sustainable agriculture for food security, income and stewardship.',
    fullDescription: '',
    imageUrl: '/assets/farming.jpg',
    imageAlt: 'Hands harvesting tomatoes in a mulched field',
    category: 'current',
    objectives: [],
    isActive: true,
    order: 2,
    createdAt: '',
    updatedAt: '',
  },
];

export const developmentPrograms = [
  'Community Medical Clinic (Under Construction)',
  'Mental Health & Trauma Support',
  'Protection of Women & Children',
  'Community Outreach & Evangelism',
];

export const futureVision = [
  'Feeding Program for Malnourished Children',
  'Support for Widows and School-age Children',
  'Growth to a Level 4 Christ-centered Hospital',
  'Christian Medical Training School',
];

export const impactMetrics: ImpactMetric[] = [
  { id: '1', label: 'Patients Served', value: 300, formattedValue: '300+', category: 'patients', period: 'total', lastUpdated: '', icon: 'heart-pulse' },
  { id: '2', label: 'Families Reached', value: 50, formattedValue: '50+', category: 'families', period: 'total', lastUpdated: '', icon: 'users' },
  { id: '3', label: 'Children Supported', value: 100, formattedValue: '100+', category: 'children', period: 'total', lastUpdated: '', icon: 'child' },
  { id: '4', label: 'Households Trained', value: 80, formattedValue: '80+', category: 'households', period: 'total', lastUpdated: '', icon: 'graduation-cap' },
  { id: '5', label: 'Community Members Reached', value: 80, formattedValue: '80+', category: 'community', period: 'total', lastUpdated: '', icon: 'map-pin' },
];

export const finalCta = {
  title: 'Be part of restoring hope and transforming lives.',
  primaryCta: { label: 'Give Now', href: '/get-involved#give' },
  secondaryCta: { label: 'Become a Monthly Partner', href: '/get-involved#give' },
  image: {
    src: '/assets/children.jpg',
    alt: 'Smiling children waving in a Kenyan village',
  },
};

export const organizationInfo = {
  name: 'Beit-Refuah',
  tagline: 'A House of Healing',
  description: 'Serving the least, the last, and the lost — Christ-centered healing in Kakamega County, Western Kenya.',
  scripture: 'Whoever welcomes one such child in my name welcomes me.',
  scriptureRef: 'Mark 9:37',
  copyright: '© 2026 Beit-Refuah. A house of healing.',
};