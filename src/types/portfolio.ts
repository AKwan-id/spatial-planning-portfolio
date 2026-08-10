export type Language = 'id' | 'en';

export type PublicationStatus = 'PUBLISHED' | 'DRAFT' | 'HIDDEN';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface LocalizedList {
  id: string[];
  en: string[];
}

export interface ProfileData {
  fullName: string;
  professionalField: LocalizedText;
  shortIntro: LocalizedText;
  education: LocalizedText;
  careerInterest: LocalizedText;
  location: LocalizedText;
  portraitUrl: string;
  portraitAlt: LocalizedText;
}

export interface SelectedWorkItem {
  id: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription?: LocalizedText;
  category: LocalizedText;
  coverImage: string;
  galleryImages?: string[];
  tools: string[];
  year?: string;
  role?: LocalizedText;
  order: number;
  featured: boolean;
  visible: boolean;
  status?: PublicationStatus;
}

export type SkillCategoryType = 'spatial_planning' | 'technical_design' | 'productivity' | 'other' | string;

export interface SkillCategoryConfig {
  id: string;
  label: LocalizedText;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategoryType;
  categoryLabel: LocalizedText;
  featured: boolean;
  order: number;
  visible: boolean;
  status?: PublicationStatus;
  description?: LocalizedText;
}

export type ProjectCategoryType = 'all' | 'maps' | 'planning' | 'research' | 'other' | string;

export interface ProjectCategoryConfig {
  id: string;
  label: LocalizedText;
}

export interface ProjectItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  fullDetails?: LocalizedText;
  category: ProjectCategoryType;
  categoryLabel: LocalizedText;
  coverImage: string;
  imageGallery: string[];
  tools: string[];
  year?: string;
  role?: LocalizedText;
  order: number;
  featured: boolean;
  featuredOrder?: number;
  visible: boolean;
  status?: PublicationStatus;
}

export type ExperienceType = 'work' | 'internship' | 'organization' | 'volunteering' | 'kkn' | 'field_activity' | 'other' | string;

export interface ExperienceItem {
  id: string;
  role: LocalizedText;
  organization: LocalizedText;
  period: LocalizedText;
  type: ExperienceType;
  typeLabel: LocalizedText;
  description: LocalizedText;
  bullets?: LocalizedList;
  location?: LocalizedText;
  order: number;
  visible: boolean;
  status?: PublicationStatus;
}

export interface CertificateItem {
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  year: string;
  category: LocalizedText;
  imageUrl: string;
  credentialUrl?: string;
  pdfUrl?: string;
  order: number;
  visible: boolean;
  status?: PublicationStatus;
}

export interface CvData {
  previewImageUrl: string;
  fileUrl: string;
  updatedDate: string;
  summary: LocalizedText;
}

export interface ContactData {
  email: string;
  linkedin: string;
  phone: string;
  phoneAction?: 'whatsapp' | 'phone_call';
  location: LocalizedText;
  availabilityStatus: LocalizedText;
  fieldVisibility?: {
    email?: boolean;
    linkedin?: boolean;
    phone?: boolean;
    location?: boolean;
  };
}

export interface BrandSettings {
  brandText: string;
  portfolioLabel: LocalizedText;
  showIcon?: boolean;
}

export interface SiteSettings {
  title: string;
  brandSettings?: BrandSettings;
  footerText: LocalizedText;
}

export interface PortfolioData {
  profile: ProfileData;
  selectedWork: SelectedWorkItem[];
  skills: SkillItem[];
  projectCategories?: ProjectCategoryConfig[];
  skillCategories?: SkillCategoryConfig[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certificates: CertificateItem[];
  cv: CvData;
  contact: ContactData;
  siteSettings: SiteSettings;
}
