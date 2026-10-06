// Data statis fallback — dipakai saat Supabase belum dikonfigurasi
// dan sebagai seed awal untuk migrasi SQL.
// Setelah webadmin jalan + Supabase terisi, update cukup lewat /admin.

import type {
  Certificate,
  Experience,
  Profile,
  Project,
  SiteContent,
  TechItem,
} from "@/types/portfolio";

export const fallbackProfile: Profile = {
  id: "main",
  full_name: "Fajar Ramadhandi Hidayat",
  headline: "Software Engineer — Fullstack Web, Mobile & Data",
  bio: "Information Systems student at UPN Veteran Jawa Timur focusing on Fullstack Web Development, UI/UX Design, and Data Analytics.",
  email: "dhandifajar@gmail.com",
  whatsapp: "https://wa.me/6285648058508",
  location: "Indonesia",
  avatar_url: null,
  cv_url:
    "https://drive.google.com/file/d/1-AnW68Eg0Mj6vMHZMbFWkodPwojhljiX/view?usp=sharing",
  socials: {
    linkedin: "https://www.linkedin.com/in/fajar-ramadhandi-hidayat",
    github: "https://github.com/akudhandi",
    instagram: "https://www.instagram.com/dhn_di/",
    discord: "https://discord.com/users/706400895608291358",
  },
  certificates_url:
    "https://drive.google.com/drive/folders/1BjCH56LyAxKphfNeAYp5XzsoRxEaMv36?usp=sharing",
  docs_url:
    "https://drive.google.com/drive/folders/1fl5fUtcjoHkte25901eRDgYC8aNFCIah?usp=sharing",
  open_to_work: true,
  years_exp: "2+",
  projects_count: "15+",
};

export const fallbackProjects: Project[] = [
  {
    id: "fallback-morations",
    slug: "morations",
    name: "Morations",
    year: "2025",
    role: "Full-Stack Developer",
    description:
      "Desktop-based movie rating and subscription app with data-driven ratings and admin dashboard.",
    type: "software",
    tools: ["VB.NET", "MySQL", "RDLC Report"],
    github_url: "https://github.com/akudhandi/morations",
    doc_url:
      "https://drive.google.com/file/d/1stkUu3uJV8ug0gX3sN6FJ7xHw9GaAi1j/view?usp=drive_link",
    doi_url: null,
    cover_url: null,
    gradient: "bg-gradient-to-br from-blue-900/40 to-black",
    featured: true,
    visible: true,
    sort_order: 1,
  },
  {
    id: "fallback-lunar-store",
    slug: "lunar-store",
    name: "Lunar Store",
    year: "2025",
    role: "Front-End Developer",
    description:
      "Responsive e-commerce platform for selling digital subscriptions with integrated payment gateway.",
    type: "web",
    tools: ["Laravel Livewire", "Tailwind CSS", "MySQL"],
    github_url: "https://github.com/Hafidzrdwn/lunar_store_laravel",
    doc_url:
      "https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link",
    doi_url: null,
    cover_url: null,
    gradient: "bg-gradient-to-br from-emerald-900/40 to-black",
    featured: true,
    visible: true,
    sort_order: 2,
  },
  {
    id: "fallback-nextchamp",
    slug: "nextchamp",
    name: "NextChamp",
    year: "2025",
    role: "Front-End Developer",
    description:
      "Cross-platform mobile app for student competition mentorship with AI chatbot and discussion forum.",
    type: "mobile",
    tools: ["Flutter", "Strapi", "MySQL", "Figma"],
    github_url: "https://github.com/akudhandi/nextchamp-strapi",
    doc_url: null,
    doi_url: null,
    cover_url: null,
    gradient: "bg-gradient-to-br from-purple-900/40 to-black",
    featured: true,
    visible: true,
    sort_order: 3,
  },
  {
    id: "fallback-blu-research",
    slug: "blu-by-bca-research",
    name: "Blu by BCA Research",
    year: "2025",
    role: "Data Analyst",
    description:
      "Research analyzing user acceptance of Blu by BCA Digital app using UTAUT framework.",
    type: "research",
    tools: ["Jamovi", "WarpPLS", "Python"],
    github_url: null,
    doc_url: null,
    doi_url: "https://doi.org/10.59934/jaiea.v4i3.1182",
    cover_url: null,
    gradient: "bg-gradient-to-br from-pink-900/40 to-black",
    featured: true,
    visible: true,
    sort_order: 4,
  },
  {
    id: "fallback-desk-go",
    slug: "desk-go",
    name: "Desk-Go",
    year: "2024",
    role: "Full-Stack Web Developer",
    description:
      "Web-based system for monitoring and booking seats in a coworking space.",
    type: "web",
    tools: ["PHP", "Bootstrap", "MySQL"],
    github_url: null,
    doc_url:
      "https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link",
    doi_url: null,
    cover_url: null,
    gradient: "bg-gradient-to-br from-orange-900/40 to-black",
    featured: true,
    visible: true,
    sort_order: 5,
  },
  {
    id: "fallback-leafly",
    slug: "leafly-db-management",
    name: "Leafly DB Management",
    year: "2024",
    role: "Database Administrator",
    description:
      "Database system implementation for Leafly application focusing on data security and scalability.",
    type: "database",
    tools: ["MariaDB", "MySQL", "SQL"],
    github_url: null,
    doc_url:
      "https://drive.google.com/file/d/16eo5WSRd0vUIcXLkzD7vZzuNjy33Gvhq/view?usp=drive_link",
    doi_url: null,
    cover_url: null,
    gradient: "bg-gradient-to-br from-green-900/40 to-black",
    featured: false,
    visible: true,
    sort_order: 6,
  },
  {
    id: "fallback-network-fik",
    slug: "network-design-fik",
    name: "Network Design FIK",
    year: "2024",
    role: "Network Designer",
    description:
      "Network design and configuration for FIK I Building UPN Veteran Jawa Timur.",
    type: "networking",
    tools: ["Cisco Packet Tracer"],
    github_url: null,
    doc_url:
      "https://drive.google.com/file/d/1s3dLCpXeAYnwI-pyfpwTRqJv4ZNSVtbh/view?usp=drive_link",
    doi_url: null,
    cover_url: null,
    gradient: "bg-gradient-to-br from-cyan-900/40 to-black",
    featured: false,
    visible: true,
    sort_order: 7,
  },
];

export const fallbackExperiences: Experience[] = [
  {
    id: "fallback-samsung",
    title: "Samsung Solve for Tomorrow",
    role: "Participant",
    year_range: "2025",
    type: "Competition",
    description:
      "Developing sustainable technology solutions for environmental challenges.",
    visible: true,
    sort_order: 1,
  },
  {
    id: "fallback-fasilkom-fest",
    title: "Fasilkom Fest 2024",
    role: "Head of Security & Licensing",
    year_range: "2024",
    type: "Organization",
    description:
      "Led 30-member division, oversaw safety, and coordinated licensing for 10+ sub-events.",
    visible: true,
    sort_order: 2,
  },
  {
    id: "fallback-fasilkom-tech",
    title: "Fasilkom Tech 2024",
    role: "Head of Logistics",
    year_range: "2024",
    type: "Organization",
    description:
      "Managed logistics for a 9-session national bootcamp and hybrid sessions.",
    visible: true,
    sort_order: 3,
  },
  {
    id: "fallback-bem",
    title: "BEM Faculty of CS",
    role: "Student Welfare Advocacy Staff",
    year_range: "2024-2025",
    type: "Organization",
    description:
      "Managed advocacy cases and supported students with academic/financial issues.",
    visible: true,
    sort_order: 4,
  },
];

export const fallbackTechStack: TechItem[] = [
  { id: "fallback-html", title: "HTML5", icon_key: "SiHtml5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#E34F26", visible: true, sort_order: 1 },
  { id: "fallback-css", title: "CSS3", icon_key: "SiCss3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572B6", visible: true, sort_order: 2 },
  { id: "fallback-js", title: "JavaScript", icon_key: "SiJavascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E", visible: true, sort_order: 3 },
  { id: "fallback-java", title: "Java", icon_key: "SiGradle", href: "https://www.java.com", color: "#007396", visible: true, sort_order: 4 },
  { id: "fallback-php", title: "PHP", icon_key: "SiPhp", href: "https://www.php.net", color: "#777BB4", visible: true, sort_order: 5 },
  { id: "fallback-laravel", title: "Laravel", icon_key: "SiLaravel", href: "https://laravel.com", color: "#FF2D20", visible: true, sort_order: 6 },
  { id: "fallback-next", title: "Next.js", icon_key: "SiNextdotjs", href: "https://nextjs.org", color: "#FFFFFF", visible: true, sort_order: 7 },
  { id: "fallback-mysql", title: "MySQL", icon_key: "SiMysql", href: "https://www.mysql.com", color: "#4479A1", visible: true, sort_order: 8 },
  { id: "fallback-node", title: "Node.js", icon_key: "SiNodedotjs", href: "https://nodejs.org", color: "#339933", visible: true, sort_order: 9 },
  { id: "fallback-git", title: "Git", icon_key: "SiGit", href: "https://git-scm.com", color: "#F05032", visible: true, sort_order: 10 },
  { id: "fallback-flutter", title: "Flutter", icon_key: "SiFlutter", href: "https://flutter.dev", color: "#02569B", visible: true, sort_order: 11 },
  { id: "fallback-dart", title: "Dart", icon_key: "SiDart", href: "https://dart.dev", color: "#0175C2", visible: true, sort_order: 12 },
  { id: "fallback-tailwind", title: "Tailwind CSS", icon_key: "SiTailwindcss", href: "https://tailwindcss.com", color: "#38BDF8", visible: true, sort_order: 13 },
  { id: "fallback-postman", title: "RESTful API", icon_key: "SiPostman", href: "https://www.postman.com", color: "#FF6C37", visible: true, sort_order: 14 },
];

export const fallbackCertificates: Certificate[] = [];

export const fallbackContent: SiteContent = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  experiences: fallbackExperiences,
  techStack: fallbackTechStack,
  certificates: fallbackCertificates,
  source: "fallback",
};
