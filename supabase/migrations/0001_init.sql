-- ============================================================
-- Portfolio CMS migration 0001 — JALANKAN SEKALI di Supabase
-- SQL Editor > New query > paste seluruh file > Run
-- Gratis: tabel di bawah < 1MB, jauh dari limit 500MB Free tier
-- ============================================================

-- ---------- PROFILES (1 baris, id='main') ----------
create table if not exists profiles (
  id text primary key default 'main',
  full_name text not null default '',
  headline text not null default '',
  bio text not null default '',
  email text not null default '',
  whatsapp text not null default '',
  location text not null default '',
  avatar_url text,
  cv_url text,
  socials jsonb not null default '{"linkedin":"","github":"","instagram":"","discord":""}',
  certificates_url text,
  docs_url text,
  open_to_work boolean not null default true,
  years_exp text not null default '2+',
  projects_count text not null default '15+'
);

-- ---------- PROJECTS ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  year text not null default '',
  role text not null default '',
  description text not null default '',
  type text not null default 'web'
    check (type in ('web','mobile','research','software','database','networking')),
  tools text[] not null default '{}',
  github_url text,
  doc_url text,
  doi_url text,
  cover_url text,
  gradient text not null default 'bg-gradient-to-br from-blue-900/40 to-black',
  featured boolean not null default true,
  visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- EXPERIENCES ----------
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  role text not null default '',
  year_range text not null default '',
  type text not null default '',
  description text not null default '',
  visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- TECH STACK ----------
create table if not exists tech_stack (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon_key text not null default 'SiHtml5',
  href text not null default '',
  color text not null default '#FFFFFF',
  visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- CERTIFICATES ----------
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null default '',
  year text not null default '',
  credential_url text,
  file_url text,
  visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- MESSAGES (inbox contact form) ----------
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  organization text not null default '' check (char_length(organization) <= 120),
  needs text not null check (char_length(needs) between 3 and 200),
  message text not null check (char_length(message) between 20 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS: baca publik untuk konten, tulis hanya via service_role
-- (service_role bypass RLS; anon hanya SELECT konten + INSERT pesan)
-- ============================================================
alter table profiles enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;
alter table tech_stack enable row level security;
alter table certificates enable row level security;
alter table messages enable row level security;

drop policy if exists "public read" on profiles;
create policy "public read" on profiles for select using (true);

drop policy if exists "public read" on projects;
create policy "public read" on projects for select using (true);

drop policy if exists "public read" on experiences;
create policy "public read" on experiences for select using (true);

drop policy if exists "public read" on tech_stack;
create policy "public read" on tech_stack for select using (true);

drop policy if exists "public read" on certificates;
create policy "public read" on certificates for select using (true);

drop policy if exists "anon insert messages" on messages;
create policy "anon insert messages" on messages
  for insert to anon, authenticated with check (true);

-- ============================================================
-- STORAGE bucket 'portfolio' (cover, avatar, CV) — publik baca,
-- upload hanya via service_role dari webadmin
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "public read portfolio" on storage.objects;
create policy "public read portfolio" on storage.objects
  for select using (bucket_id = 'portfolio');

-- ============================================================
-- SEED: profil + konten awal (sama dengan data statis saat ini)
-- Aman dijalankan ulang (on conflict do nothing / update)
-- ============================================================
insert into profiles (id, full_name, headline, bio, email, whatsapp, location, cv_url, socials, certificates_url, docs_url, open_to_work, years_exp, projects_count)
values (
  'main',
  'Fajar Ramadhandi Hidayat',
  'Software Engineer — Fullstack Web, Mobile & Data',
  'Information Systems student at UPN Veteran Jawa Timur focusing on Fullstack Web Development, UI/UX Design, and Data Analytics.',
  'dhandifajar@gmail.com',
  'https://wa.me/6285648058508',
  'Indonesia',
  'https://drive.google.com/file/d/1-AnW68Eg0Mj6vMHZMbFWkodPwojhljiX/view?usp=sharing',
  '{"linkedin":"https://www.linkedin.com/in/fajar-ramadhandi-hidayat","github":"https://github.com/akudhandi","instagram":"https://www.instagram.com/dhn_di/","discord":"https://discord.com/users/706400895608291358"}',
  'https://drive.google.com/drive/folders/1BjCH56LyAxKphfNeAYp5XzsoRxEaMv36?usp=sharing',
  'https://drive.google.com/drive/folders/1fl5fUtcjoHkte25901eRDgYC8aNFCIah?usp=sharing',
  true, '2+', '15+'
)
on conflict (id) do update set
  full_name = excluded.full_name,
  headline = excluded.headline,
  email = excluded.email,
  whatsapp = excluded.whatsapp,
  socials = excluded.socials;

insert into projects (slug, name, year, role, description, type, tools, github_url, doc_url, doi_url, gradient, featured, sort_order) values
  ('morations','Morations','2025','Full-Stack Developer','Desktop-based movie rating and subscription app with data-driven ratings and admin dashboard.','software','{VB.NET,MySQL,RDLC Report}','https://github.com/akudhandi/morations','https://drive.google.com/file/d/1stkUu3uJV8ug0gX3sN6FJ7xHw9GaAi1j/view?usp=drive_link',null,'bg-gradient-to-br from-blue-900/40 to-black',true,1),
  ('lunar-store','Lunar Store','2025','Front-End Developer','Responsive e-commerce platform for selling digital subscriptions with integrated payment gateway.','web','{Laravel Livewire,Tailwind CSS,MySQL}','https://github.com/Hafidzrdwn/lunar_store_laravel','https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link',null,'bg-gradient-to-br from-emerald-900/40 to-black',true,2),
  ('nextchamp','NextChamp','2025','Front-End Developer','Cross-platform mobile app for student competition mentorship with AI chatbot and discussion forum.','mobile','{Flutter,Strapi,MySQL,Figma}','https://github.com/akudhandi/nextchamp-strapi',null,null,'bg-gradient-to-br from-purple-900/40 to-black',true,3),
  ('blu-by-bca-research','Blu by BCA Research','2025','Data Analyst','Research analyzing user acceptance of Blu by BCA Digital app using UTAUT framework.','research','{Jamovi,WarpPLS,Python}',null,null,'https://doi.org/10.59934/jaiea.v4i3.1182','bg-gradient-to-br from-pink-900/40 to-black',true,4),
  ('desk-go','Desk-Go','2024','Full-Stack Web Developer','Web-based system for monitoring and booking seats in a coworking space.','web','{PHP,Bootstrap,MySQL}',null,'https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link',null,'bg-gradient-to-br from-orange-900/40 to-black',true,5),
  ('leafly-db-management','Leafly DB Management','2024','Database Administrator','Database system implementation for Leafly application focusing on data security and scalability.','database','{MariaDB,MySQL,SQL}',null,'https://drive.google.com/file/d/16eo5WSRd0vUIcXLkzD7vZzuNjy33Gvhq/view?usp=drive_link',null,'bg-gradient-to-br from-green-900/40 to-black',false,6),
  ('network-design-fik','Network Design FIK','2024','Network Designer','Network design and configuration for FIK I Building UPN Veteran Jawa Timur.','networking','{Cisco Packet Tracer}',null,'https://drive.google.com/file/d/1s3dLCpXeAYnwI-pyfpwTRqJv4ZNSVtbh/view?usp=drive_link',null,'bg-gradient-to-br from-cyan-900/40 to-black',false,7)
on conflict (slug) do nothing;

insert into experiences (title, role, year_range, type, description, sort_order) values
  ('Samsung Solve for Tomorrow','Participant','2025','Competition','Developing sustainable technology solutions for environmental challenges.',1),
  ('Fasilkom Fest 2024','Head of Security & Licensing','2024','Organization','Led 30-member division, oversaw safety, and coordinated licensing for 10+ sub-events.',2),
  ('Fasilkom Tech 2024','Head of Logistics','2024','Organization','Managed logistics for a 9-session national bootcamp and hybrid sessions.',3),
  ('BEM Faculty of CS','Student Welfare Advocacy Staff','2024-2025','Organization','Managed advocacy cases and supported students with academic/financial issues.',4);

insert into tech_stack (title, icon_key, href, color, sort_order) values
  ('HTML5','SiHtml5','https://developer.mozilla.org/en-US/docs/Web/HTML','#E34F26',1),
  ('CSS3','SiCss3','https://developer.mozilla.org/en-US/docs/Web/CSS','#1572B6',2),
  ('JavaScript','SiJavascript','https://developer.mozilla.org/en-US/docs/Web/JavaScript','#F7DF1E',3),
  ('Java','SiGradle','https://www.java.com','#007396',4),
  ('PHP','SiPhp','https://www.php.net','#777BB4',5),
  ('Laravel','SiLaravel','https://laravel.com','#FF2D20',6),
  ('Next.js','SiNextdotjs','https://nextjs.org','#FFFFFF',7),
  ('MySQL','SiMysql','https://www.mysql.com','#4479A1',8),
  ('Node.js','SiNodedotjs','https://nodejs.org','#339933',9),
  ('Git','SiGit','https://git-scm.com','#F05032',10),
  ('Flutter','SiFlutter','https://flutter.dev','#02569B',11),
  ('Dart','SiDart','https://dart.dev','#0175C2',12),
  ('Tailwind CSS','SiTailwindcss','https://tailwindcss.com','#38BDF8',13),
  ('RESTful API','SiPostman','https://www.postman.com','#FF6C37',14);
