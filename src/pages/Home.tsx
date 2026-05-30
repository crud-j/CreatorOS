import {
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';

import CardNav from '../components/CardNav';
import ColorBends from '../components/ColorBends';

import HeroContent from '../components/HeroContent';
import InteractiveSandbox from '../components/InteractiveSandbox';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Examples from '../components/Examples';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
  const ambientOneRef =
    useRef<HTMLDivElement>(null);

  const ambientTwoRef =
    useRef<HTMLDivElement>(null);

  const heroGlowRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    /*
      ULTRA SMOOTH FLOATING MOTION
    */

    gsap.to(ambientOneRef.current, {
      x: 80,
      y: -60,

      duration: 16,

      repeat: -1,

      yoyo: true,

      ease: 'sine.inOut',
    });

    gsap.to(ambientTwoRef.current, {
      x: -60,
      y: 50,

      duration: 18,

      repeat: -1,

      yoyo: true,

      ease: 'sine.inOut',
    });

    gsap.to(heroGlowRef.current, {
      scale: 1.08,

      opacity: 0.7,

      duration: 8,

      repeat: -1,

      yoyo: true,

      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* ULTRA PREMIUM BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* CINEMATIC SHADER */}
        <ColorBends
          className="absolute inset-0"
          colors={[
            '#ffffff',
            '#71717a',
            '#000000',
          ]}
        />

        {/* HERO GLOW */}
        <div
          ref={heroGlowRef}
          className="
            absolute
            top-[-20%]
            left-1/2
            -translate-x-1/2
            w-[1200px]
            h-[1200px]
            rounded-full
            bg-white/[0.035]
            blur-[220px]
            opacity-50
          "
        />

        {/* AMBIENT LIGHT 1 */}
        <div
          ref={ambientOneRef}
          className="
            absolute
            top-[5%]
            left-[-10%]
            w-[700px]
            h-[700px]
            rounded-full
            bg-zinc-300/[0.04]
            blur-[180px]
          "
        />

        {/* AMBIENT LIGHT 2 */}
        <div
          ref={ambientTwoRef}
          className="
            absolute
            bottom-[-10%]
            right-[-5%]
            w-[650px]
            h-[650px]
            rounded-full
            bg-zinc-400/[0.03]
            blur-[180px]
          "
        />

        {/* PREMIUM GRID */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.45) 1px, transparent 1px)',

            backgroundSize: '4px 4px',
          }}
        />

        {/* CINEMATIC VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.78)_100%)]" />

        {/* TOP FADE */}
        <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-black via-black/85 to-transparent" />

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/95 to-transparent" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col">
        {/* HERO */}
        <div className="relative min-h-screen flex flex-col">
          {/* NAVBAR */}
          <CardNav
            items={[
              {
                label: 'Product',

                bgColor:
                  'var(--color-nav-card-product)',

                textColor:
                  'var(--color-nav-card-product-text)',

                links: [
                  {
                    label: 'How it works',
                    href: '#how-it-works',
                    ariaLabel:
                      'How it works',
                  },

                  {
                    label: 'Features',
                    href: '#features',
                    ariaLabel: 'Features',
                  },

                  {
                    label: 'Examples',
                    href: '#examples',
                    ariaLabel: 'Examples',
                  },
                ],
              },

              {
                label: 'Resources',

                bgColor:
                  'var(--color-nav-card-resources)',

                textColor:
                  'var(--color-nav-card-resources-text)',

                links: [
                  {
                    label: 'Wall of Love',
                    href: '#testimonials',
                    ariaLabel:
                      'Testimonials',
                  },

                  {
                    label: 'Pricing',
                    href: '#pricing',
                    ariaLabel: 'Pricing',
                  },

                  {
                    label: 'FAQ',
                    href: '#faq',
                    ariaLabel: 'FAQ',
                  },
                ],
              },

              {
                label: 'Company',

                bgColor:
                  'var(--color-nav-card-company)',

                textColor:
                  'var(--color-nav-card-company-text)',

                links: [
                  {
                    label: 'About Us',
                    href: '/about',
                    ariaLabel: 'About us',
                  },

                  {
                    label: 'Log In',
                    href: '/login',
                    ariaLabel: 'Log in',
                  },

                  {
                    label: 'Contact',
                    href: '#contact',
                    ariaLabel:
                      'Contact us',
                  },
                ],
              },
            ]}
          />

          {/* HERO CONTENT */}
          <HeroContent />
        </div>

        {/* CONTENT */}
        <InteractiveSandbox />

        <HowItWorks />

        <Features />

        <Examples />

        <ContactSection />

        <Testimonials />

        <Pricing />

        <FAQ />

        <CTASection />

        <Footer />
      </div>
    </div>
  );
}