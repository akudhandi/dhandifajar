"use client";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useSiteContent } from "@/lib/use-content";

export default function ContactMePage() {
  const content = useSiteContent();
  const socials = [
    { name: "LinkedIn", link: content.profile.socials.linkedin },
    { name: "Discord", link: content.profile.socials.discord },
    { name: "Instagram", link: content.profile.socials.instagram },
    { name: "GitHub", link: content.profile.socials.github },
  ];
  return (
    <main className="min-h-screen w-full bg-[#1B1931] text-[#E9BCB9] selection:bg-[#ED9E59] selection:text-[#1B1931]">
      
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <section className="px-6 pt-40 pb-32">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

          {/* LEFT CONTENT */}
          <div>
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
                Let&apos;s Connect!
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-2xl text-[#E9BCB9]/70 leading-relaxed text-lg">
                Whether you&apos;re looking to collaborate on a project, need a solution
                to a challenging problem, or just want to talk tech — feel free to reach out.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-14 border-t border-[#662249] pt-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          {/* RIGHT SIDEBAR — sticky di desktop, kartu ringkas di mobile */}
          <aside className="block">
            <div className="sticky top-40 space-y-10">

              {/* LOGO */}
              <Reveal delay={0.6}>
                <div className="h-16 w-16 rounded-full bg-[#ED9E59] flex items-center justify-center">
                  <span className="text-[#1B1931] font-bold text-2xl">d</span>
                </div>
              </Reveal>

              {/* EMAIL */}
              <Reveal delay={0.7}>
                <div>
                  <p className="text-xs text-[#E9BCB9]/50 mb-2 uppercase tracking-widest">Contact Details</p>
                  <a
                    href={`mailto:${content.profile.email}`}
                    className="text-sm hover:text-[#ED9E59] transition-colors"
                  >
                    {content.profile.email}
                  </a>
                </div>
              </Reveal>

              {/* SOCIALS */}
              <Reveal delay={0.8}>
                <div>
                  <p className="text-xs text-[#E9BCB9]/50 mb-4 uppercase tracking-widest">Socials</p>
                  <ul className="space-y-4">
                    {socials.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            group inline-flex items-center gap-2
                            text-sm text-[#E9BCB9]/70
                            transition-all duration-300
                            hover:text-[#ED9E59] hover:translate-x-2
                          "
                        >
                          <span
                            className="
                              h-1.5 w-1.5 rounded-full bg-[#E9BCB9]/40
                              transition-all duration-300
                              group-hover:bg-[#ED9E59] group-hover:scale-125
                            "
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}