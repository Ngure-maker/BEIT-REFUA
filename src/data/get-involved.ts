export const getInvolvedContent = {
  hero: {
    title: 'Get Involved',
    description: 'Walk with us. If your church, organization or medical team shares this vision, we would be glad to talk with you.',
  },
  give: {
    id: 'give',
    title: 'Give',
    description: 'Your giving completes the community clinic, equips outreach and feeds families in crisis. Every shilling is stewarded through our audit and stewardship team.',
    ctaPrimary: { label: 'Give Now', href: '#donate-form' },
    ctaSecondary: { label: 'Become a Monthly Partner', href: '#donate-form' },
  },
  pray: {
    id: 'pray',
    title: 'Pray',
    description: 'Beit-Refuah began as a prayer. Join our prayer list for monthly requests from the field and updates on answered prayer.',
    cta: { label: 'Submit Prayer Request', href: '#prayer-form' },
  },
  volunteer: {
    id: 'volunteer',
    title: 'Volunteer',
    description: 'Christian medical professionals, counsellors, trainers and builders — we are seeking compassion held to real standards of skill and integrity.',
    cta: { label: 'Apply to Volunteer', href: '#volunteer-form' },
  },
  partner: {
    id: 'partner',
    title: 'Partner',
    description: 'We are already engaging Medical Teams Worldwide and welcome churches, NGOs, faith-based organisations, government agencies and community elders.',
    cta: { label: 'Start a Conversation', href: '#partner-form' },
  },
  donationSection: {
    title: 'Give toward the house of healing',
    description: 'We are in our foundation season — building the clinic, the systems and the partnerships that will carry this work for decades. A monthly partnership lets us plan, hire carefully, and serve without pressuring the people we exist to help.',
    presetAmounts: [500, 1000, 2500, 5000, 10000],
    currency: 'KES',
  },
  partnershipQuote: {
    quote: 'I never want us to become like the systems that hurt the people we are called to serve, or to hire competence without compassion.',
    author: 'Eric Salleh',
    role: 'Founder, Beit-Refuah',
  },
};

export const donationPresets = [500, 1000, 2500, 5000, 10000, 20000];

export const volunteerFields = [
  { name: 'name', label: 'Full Name', type: 'text', required: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { name: 'profession', label: 'Profession / Role', type: 'text', required: true },
  { name: 'skills', label: 'Skills & Experience', type: 'textarea', required: true },
  { name: 'availability', label: 'Availability', type: 'select', required: true, options: ['Full-time', 'Part-time', 'Short-term (1-4 weeks)', 'Long-term (1+ months)', 'Remote support', 'Other'] },
  { name: 'motivation', label: 'Why do you want to volunteer with Beit-Refuah?', type: 'textarea', required: true },
  { name: 'experience', label: 'Previous Volunteer/Mission Experience (optional)', type: 'textarea', required: false },
  { name: 'references', label: 'References (optional)', type: 'textarea', required: false },
];

export const partnerFields = [
  { name: 'organizationName', label: 'Organization / Church Name', type: 'text', required: true },
  { name: 'contactName', label: 'Contact Person', type: 'text', required: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { name: 'organizationType', label: 'Organization Type', type: 'select', required: true, options: ['Church', 'NGO / Faith-based Organization', 'Government Agency', 'Medical Institution', 'Business', 'Other'] },
  { name: 'partnershipInterest', label: 'Areas of Partnership Interest', type: 'multiselect', required: true, options: ['Medical Missions / Clinical Support', 'Funding / Resource Partnership', 'Prayer Partnership', 'Volunteer Teams', 'Training / Capacity Building', 'Advocacy / Awareness', 'Strategic Collaboration', 'Other'] },
  { name: 'message', label: 'Tell us about your vision for partnership', type: 'textarea', required: true },
];

export const prayerFields = [
  { name: 'name', label: 'Name (optional)', type: 'text', required: false },
  { name: 'email', label: 'Email (for updates)', type: 'email', required: true },
  { name: 'request', label: 'Prayer Request', type: 'textarea', required: true },
  { name: 'isAnonymous', label: 'Keep my request anonymous', type: 'checkbox', required: false },
  { name: 'consent', label: 'I consent to my request being shared with the prayer team', type: 'checkbox', required: true },
];