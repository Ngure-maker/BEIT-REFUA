export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'volunteer' | 'partner';
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  category: 'current' | 'development' | 'future';
  objectives: string[];
  impactMetrics?: ImpactMetric[];
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  isFeatured: boolean;
  relatedStoryIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  description?: string;
  icon?: string;
  category: 'patients' | 'families' | 'children' | 'households' | 'community';
  period: 'total' | 'monthly' | 'yearly';
  lastUpdated: string;
}

export interface Donation {
  id: string;
  donorId?: string;
  amount: number;
  currency: 'KES' | 'USD';
  frequency: 'one-time' | 'monthly';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'mpesa' | 'stripe' | 'bank-transfer';
  paymentReference?: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  isAnonymous: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  isAnonymous: boolean;
  consentGiven: boolean;
  status: 'new' | 'praying' | 'answered' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  skills: string[];
  availability: string;
  motivation: string;
  experience?: string;
  references?: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface PartnerInquiry {
  id: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType: 'church' | 'ngo' | 'government' | 'medical' | 'business' | 'other';
  partnershipInterest: string[];
  message: string;
  status: 'new' | 'contacted' | 'in-discussion' | 'partnered' | 'declined';
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ImpactReport {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'docx' | 'xlsx';
  fileSize: number;
  period: string;
  year: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface WholePersonDimension {
  id: string;
  title: string;
  description: string;
  icon: string;
  longDescription: string;
}

export interface MissionPillar {
  title: string;
  description: string;
}

export interface ScriptureQuote {
  text: string;
  reference: string;
}

export interface GuidingPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface Department {
  title: string;
  description: string;
}

export interface LeadershipRole {
  role: string;
  responsibilities: string;
}

export interface AccountabilityOffice {
  title: string;
  description: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'multiselect' | 'checkbox';
  required: boolean;
  options?: string[];
}

export interface DonationFormData {
  amount: number;
  customAmount?: number;
  frequency: 'one-time' | 'monthly';
  currency: 'KES' | 'USD';
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  paymentMethod: 'mpesa' | 'stripe' | 'bank-transfer';
  isAnonymous: boolean;
  note?: string;
}

export interface PrayerFormData {
  name?: string;
  email: string;
  request: string;
  isAnonymous: boolean;
  consent: boolean;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  profession: string;
  skills: string;
  availability: string;
  motivation: string;
  experience?: string;
  references?: string;
}

export interface PartnerFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType: string;
  partnershipInterest: string[];
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}