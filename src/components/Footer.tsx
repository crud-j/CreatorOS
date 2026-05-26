import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  FiInstagram as Instagram,
  FiTwitter as Twitter,
  FiYoutube as Youtube,
  FiLinkedin as Linkedin
} from 'react-icons/fi';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Enterprise'],
  Resources: ['Documentation', 'Help Center', 'API Reference', 'Status'],
  Company: ['About', 'Careers', 'Privacy', 'Terms']
};

const socials = [
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitter / X', icon: Twitter },
  { name: 'YouTube', icon: Youtube },
  { name: 'LinkedIn', icon: Linkedin }
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black text-white mt-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 items-start">

          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-10">
              <p className="uppercase tracking-[0.3em] text-xs text-white/40 mb-6">
                CreatorOS
              </p>

              <h2 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.95] text-white">
                Build a brand
                <br />
                that feels
                <br />
                world-class.
              </h2>
            </div>

            <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl mb-12">
              Powerful creator infrastructure designed with precision, speed,
              and clarity. Built for modern teams who value exceptional
              experiences.
            </p>

            <button className="group inline-flex items-center gap-4 rounded-full border border-white/15 bg-white text-black px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-neutral-200">
              Start your journey
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>

          {/* Right Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 lg:gap-20">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm uppercase tracking-[0.2em] text-white/35 mb-6">
                  {title}
                </h3>

                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[15px] text-white/75 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social */}
            <div className="sm:col-span-2 pt-2">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/35 mb-6">
                Connect
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href="#"
                      className="group flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 hover:border-white/25 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-white/70 group-hover:text-white transition-colors duration-300" />
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                          {social.name}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="text-white/30 group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-20" />

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h1 className="text-[16vw] md:text-[10vw] leading-none font-semibold tracking-[-0.08em] text-white whitespace-nowrap">
              CREATOROS
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 text-sm text-white/40">
            <p>© 2026 CreatorOS Inc.</p>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>All systems operational</span>
            </div>

            <p>
              Designed for premium digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Extra spacing fix so testimonials remain fully visible while scrolling */}
      <div className="h-10 md:h-16" />
    </footer>
  );
}
