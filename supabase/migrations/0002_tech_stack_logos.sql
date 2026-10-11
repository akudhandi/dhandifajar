-- ============================================================
-- Portfolio CMS migration 0002 — tech logo tambahan
-- Idempoten: hanya insert bila title belum ada (anti duplikat).
-- Jalankan di Supabase SQL Editor setelah 0001_init.sql.
-- ============================================================

insert into tech_stack (title, icon_key, href, color, visible, sort_order)
select v.title, v.icon_key, v.href, v.color, true, v.sort_order
from (values
  ('Supabase', 'SiSupabase', 'https://supabase.com', '#3ECF8E', 15),
  ('Docker', 'SiDocker', 'https://www.docker.com', '#2496ED', 16),
  ('ngrok', 'SiNgrok', 'https://ngrok.com', '#FFFFFF', 17),
  ('Linux', 'SiLinux', 'https://www.linux.org', '#FCC624', 18),
  ('Ollama', 'SiOllama', 'https://ollama.com', '#FFFFFF', 19),
  ('Python', 'SiPython', 'https://www.python.org', '#3776AB', 20),
  ('OpenCV', 'SiOpencv', 'https://opencv.org', '#5C3EE8', 21),
  ('Redis', 'SiRedis', 'https://redis.io', '#FF4438', 22),
  ('Resend', 'SiResend', 'https://resend.com', '#FFFFFF', 23),
  ('Vercel', 'SiVercel', 'https://vercel.com', '#FFFFFF', 24),
  ('Ubuntu', 'SiUbuntu', 'https://ubuntu.com', '#E95420', 25)
) as v(title, icon_key, href, color, sort_order)
where not exists (
  select 1 from tech_stack t where lower(t.title) = lower(v.title)
);
