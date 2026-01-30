"use client";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function ContactMePage() {
  return (
    <main className="min-h-screen w-full bg-[#141516] text-white selection:bg-cyan-500">
      
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
              <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed text-lg">
                Whether you&apos;re looking to collaborate on a project, need a solution
                to a challenging problem, or just want to talk tech — feel free to reach out.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-14 border-t border-white/10 pt-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-40 space-y-10">

              {/* LOGO */}
              <Reveal delay={0.6}>
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-black font-bold text-2xl">d</span>
                </div>
              </Reveal>

              {/* EMAIL */}
              <Reveal delay={0.7}>
                <div>
                  <p className="text-xs text-neutral-500 mb-2 uppercase tracking-widest">Contact Details</p>
                  <a
                    href="mailto:dhandifajar@gmail.com"
                    className="text-sm hover:text-cyan-400 transition-colors"
                  >
                    dhandifajar@gmail.com
                  </a>
                </div>
              </Reveal>

              {/* SOCIALS */}
              <Reveal delay={0.8}>
                <div>
                  <p className="text-xs text-neutral-500 mb-4 uppercase tracking-widest">Socials</p>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "LinkedIn",
                        link: "https://www.linkedin.com/in/fajar-ramadhandi-hidayat",
                      },
                      {
                        name: "Discord",
                        link: "https://discord.com/users/",
                      },
                      {
                        name: "Instagram",
                        link: "https://instagram.com/",
                      },
                      {
                        name: "GitHub",
                        link: "https://github.com/akudhandi",
                      },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            group inline-flex items-center gap-2
                            text-sm text-neutral-400
                            transition-all duration-300
                            hover:text-white hover:translate-x-2
                          "
                        >
                          <span
                            className="
                              h-1.5 w-1.5 rounded-full bg-neutral-600
                              transition-all duration-300
                              group-hover:bg-cyan-400 group-hover:scale-125
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