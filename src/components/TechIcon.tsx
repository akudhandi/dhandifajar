"use client";

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiLaravel,
  SiNextdotjs,
  SiMysql,
  SiPostgresql,
  SiNodedotjs,
  SiGit,
  SiFlutter,
  SiDart,
  SiTailwindcss,
  SiPostman,
  SiGradle,
  SiPython,
  SiFigma,
  SiDocker,
  SiSupabase,
} from "react-icons/si";

const map: Record<string, React.ReactNode> = {
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss3 />,
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  SiPhp: <SiPhp />,
  SiLaravel: <SiLaravel />,
  SiNextdotjs: <SiNextdotjs />,
  SiMysql: <SiMysql />,
  SiPostgresql: <SiPostgresql />,
  SiNodedotjs: <SiNodedotjs />,
  SiGit: <SiGit />,
  SiFlutter: <SiFlutter />,
  SiDart: <SiDart />,
  SiTailwindcss: <SiTailwindcss />,
  SiPostman: <SiPostman />,
  SiGradle: <SiGradle />,
  SiPython: <SiPython />,
  SiFigma: <SiFigma />,
  SiDocker: <SiDocker />,
  SiSupabase: <SiSupabase />,
};

export function TechIcon({ iconKey, color }: { iconKey: string; color: string }) {
  return <span style={{ color }}>{map[iconKey] ?? <SiGit />}</span>;
}
