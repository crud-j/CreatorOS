import { ArrowUpRight } from 'lucide-react';
import {
  FiInstagram as Instagram,
  FiTwitter as Twitter,
  FiYoutube as Youtube,
  FiLinkedin as Linkedin
} from 'react-icons/fi';

const footerLinks = {
  Product: ['Overview', 'AI Outputs', 'Voice Studio', 'Content Calendar'],
  Resources: ['Changelog', 'Guides', 'Support', 'Status'],
  Company: ['About', 'Careers', 'Security', 'Privacy']
};

const socials = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/creatoros' },
  { name: 'Twitter / X', icon: Twitter, href: 'https://x.com/creatoros' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@creatoros' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/creatoros' }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* ========================================================= */}
      {/* PREMIUM BACKGROUND SYSTEM */}
      {/* ========================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary ambient fields */}
        <div className="absolute top-[-24%] left-[10%] w-[900px] h-[900px] rounded-full bg-white/[0.03] blur-[220px]" />
        <div className="absolute bottom-[-30%] right-[8%] w-[820px] h-[820px] rounded-full bg-white/[0.025] blur-[230px]" />

        {/* Soft horizon band */}
        <div className="absolute inset-x-0 top-[22%] h-[260px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_75%)]" />

        {/* Premium dot field */}
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '5px 5px',
            maskImage:
              'radial-gradient(circle at center top, black 22%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(circle at center top, black 22%, transparent 85%)',
          }}
        />

        {/* Fine grain overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-14 mix-blend-overlay" />

        {/* Vignette and fades */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.78)_100%)]" />
        <div className="absolute top-0 inset-x-0 h-56 bg-gradient-to-b from-black via-black/65 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* ========================================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================================= */}
      <div className="relative z-10">
        {/* ========================================================= */}
        {/* MASSIVE GLOSSY LOGO SECTION */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden border-y border-white/[0.06]">
          {/* Reflection Light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />

          {/* Horizontal glossy line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.05]" />

          {/* Main Metallic Text */}
          <div className="relative flex items-center justify-center px-6 pt-24 md:pt-28">
            <h1
              className="
                relative
                text-[24vw]
                md:text-[18vw]
                lg:text-[15vw]
                font-black
                tracking-[-0.08em]
                leading-none
                whitespace-nowrap
                select-none
                uppercase
              "
            >
              {/* Metallic Fill */}
              <span
                className="
                  bg-gradient-to-b
                  from-white/70
                  via-white/15
                  to-white/[0.02]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]
                "
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.12)',
                }}
              >
                CREATOROS
              </span>

              {/* Inner Reflection */}
              <span
                className="
                  absolute
                  inset-0
                  bg-gradient-to-b
                  from-white/80
                  via-transparent
                  to-transparent
                  opacity-[0.12]
                  blur-[1px]
                  bg-clip-text
                  text-transparent
                "
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                }}
              >
                CREATOROS
              </span>
            </h1>
          </div>

          {/* Bottom shadow fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* ========================================================= */}
        {/* LOWER FOOTER */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-28">
            {/* ========================================================= */}
            {/* LEFT COLUMN */}
            {/* ========================================================= */}
            <div className="space-y-12">
              {/* CTA CONTENT */}
              <div>
                <p className="uppercase tracking-[0.32em] text-[11px] text-white/35 mb-6">
                  CreatorOS
                </p>

                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.06em] leading-[0.95] max-w-2xl">
                  Turn one video
                  <br />
                  into a month
                  <br />
                  of content.
                </h2>

                <p className="mt-8 text-[15px] md:text-base text-white/50 leading-relaxed max-w-xl">
                  CreatorOS turns long-form into platform-ready posts in your
                  voice, then schedules and publishes with UiPath automation.
                </p>

                {/* CTA */}
                <div className="mt-10">
                  <button className="group relative inline-flex items-center gap-4 rounded-full border border-white/10 bg-white text-black px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 hover:bg-neutral-200 hover:-translate-y-0.5">
                    <span>Start your journey</span>

                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight size={16} />
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_60%)]" />
                  </button>
                </div>
              </div>

              {/* ADDRESS + STATUS + SOCIALS */}
              <div className="space-y-8 pt-4">
                {/* Address */}
                <div className="text-sm text-white/35 leading-relaxed">
                  <p>CreatorOS HQ</p>
                  <p>San Francisco, CA</p>
                </div>

                {/* Status */}
                <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-sm text-white/60">
                    All systems operational
                  </span>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-4">
                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className="
                          group
                          flex
                          items-center
                          justify-center
                          w-11
                          h-11
                          rounded-full
                          border
                          border-white/[0.08]
                          bg-white/[0.02]
                          transition-all
                          duration-300
                          hover:bg-white/[0.05]
                          hover:border-white/[0.18]
                          hover:-translate-y-0.5
                        "
                        aria-label={social.name}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon className="text-white/55 group-hover:text-white transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT NAVIGATION */}
            {/* ========================================================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-14">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="text-[12px] uppercase tracking-[0.24em] text-white/28 mb-7">
                    {title}
                  </h3>

                  <ul className="space-y-5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            text-[15px]
                            text-white/58
                            transition-all
                            duration-300
                            hover:text-white
                          "
                        >
                          <span>{link}</span>

                          <ArrowUpRight
                            size={13}
                            className="
                              opacity-0
                              -translate-x-1
                              translate-y-1
                              transition-all
                              duration-300
                              group-hover:opacity-100
                              group-hover:translate-x-0
                              group-hover:translate-y-0
                            "
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Legal */}
              <div>
                <h3 className="text-[12px] uppercase tracking-[0.24em] text-white/28 mb-7">
                  Legal
                </h3>

                <ul className="space-y-5">
                  <li>
                    <a
                      href="#"
                      className="text-[15px] text-white/58 hover:text-white transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-[15px] text-white/58 hover:text-white transition-colors duration-300"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BOTTOM BAR */}
          {/* ========================================================= */}
          <div className="mt-24 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-sm text-white/25">© 2026 CreatorOS Inc.</p>

            <p className="text-sm text-white/20">
              Built for creators who ship everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* EXTRA DEPTH SPACING */}
      <div className="h-8 md:h-12" />
    </footer>
  );
}