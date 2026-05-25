import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiTwitter, FiInstagram, FiYoutube, FiLinkedin,
  FiArrowUpRight
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const links = {
  Product: [
    { label: 'How it works', href: '#' },
    { label: 'Examples', href: '#' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#', badge: 'New' },
  ],
  Company: [
    { label: 'Blog', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms of service', href: '#' },
  ],
  Resources: [
    { label: 'Creator handbook', href: '#' },
    { label: 'API docs', href: '#' },
    { label: 'Integrations', href: '#' },
    { label: 'Affiliate program', href: '#', badge: '$' },
    { label: 'Status page', href: '#' },
  ],
};

const socials = [
  { icon: <FiTwitter className="w-4 h-4" />, href: '#', label: 'Twitter/X' },
  { icon: <FiInstagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
  { icon: <FiYoutube className="w-4 h-4" />, href: '#', label: 'YouTube' },
  { icon: <FiLinkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black border-t border-white/[0.06] relative overflow-hidden z-20">
      {/* Top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="pt-16 pb-12 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

          {/* Brand column */}
          <div className="footer-col col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 to-rose-500" />
              <span className="text-sm font-bold text-white tracking-tight">CreatorOS</span>
            </div>

            <p className="text-xs text-white/40 leading-relaxed mb-6 max-w-[200px]">
              The operating system for content creators. One video, every platform, zero effort.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([colTitle, colLinks]) => (
            <div key={colTitle} className="footer-col">
              <h5 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-5">
                {colTitle}
              </h5>
              <ul className="space-y-3">
                {colLinks.map((link, li) => (
                  <li key={li}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-1.5 text-xs text-white/35 hover:text-white/75 transition-colors duration-250"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-bold border border-pink-500/20 leading-none">
                          {link.badge}
                        </span>
                      )}
                      <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-50 -ml-0.5 transition-all duration-250" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Bottom bar */}
        <div className="footer-col py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/20">
            © 2025 CreatorOS, Inc. All rights reserved.
          </span>

          {/* Status pill */}
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-300 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[11px] text-white/30 group-hover:text-white/50 transition-colors duration-300">
              All systems operational
            </span>
          </a>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((l, i) => (
              <a
                key={i}
                href="#"
                className="text-[11px] text-white/20 hover:text-white/45 transition-colors duration-250"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
