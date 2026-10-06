// Single source of truth untuk bentuk data portfolio.
// Dipakai oleh: data statis fallback, API /api/content, dan webadmin.

export type ProjectType =
  | "web"
  | "mobile"
  | "research"
  | "software"
  | "database"
  | "networking";

export interface Project {
  id: string;
  slug: string;
  name: string;
  year: string;
  role: string;
  description: string;
  type: ProjectType;
  tools: string[];
  github_url: string | null;
  doc_url: string | null;
  doi_url: string | null;
  cover_url: string | null;
  gradient: string;
  featured: boolean;
  visible: boolean;
  sort_order: number;
}

export interface Experience {
  id: string;
  title: string;
  role: string;
  year_range: string;
  type: string;
  description: string;
  visible: boolean;
  sort_order: number;
}

export interface TechItem {
  id: string;
  title: string;
  icon_key: string;
  href: string;
  color: string;
  visible: boolean;
  sort_order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credential_url: string | null;
  file_url: string | null;
  visible: boolean;
  sort_order: number;
}

export interface Socials {
  linkedin: string;
  github: string;
  instagram: string;
  discord: string;
}

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  email: string;
  whatsapp: string;
  location: string;
  avatar_url: string | null;
  cv_url: string | null;
  socials: Socials;
  certificates_url: string | null;
  docs_url: string | null;
  open_to_work: boolean;
  years_exp: string;
  projects_count: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  needs: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteContent {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  techStack: TechItem[];
  certificates: Certificate[];
  source: "database" | "fallback";
}
