import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import { useTheme } from '../ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade + blur the animated background as user scrolls past the hero
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0.1,
        filter: 'blur(60px)',
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden theme-page">
      {/* Animated background — fades out on hero scroll */}
      <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <ColorBends
          className="w-full h-full no-transition"
          colors={theme === 'dark' ? ['#4338ca', '#9d174d'] : ['#a5b4fc', '#f9a8d4']}
          speed={0.05}
          scale={1.2}
          frequency={1.3}
          warpStrength={1}
          mouseInfluence={0.2}
          noise={0.1}
          parallax={0.5}
          iterations={1}
          intensity={1.2}
          bandWidth={6}
          transparent
          autoRotate={1}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col">

        {/* ── Hero ── */}
        <div ref={heroRef} className="relative min-h-screen flex flex-col">
          {/* Nav card colors read from CSS variables at render time */}
          <CardNav
            items={[
              {
                label: 'Product',
                bgColor: 'var(--color-nav-card-product)',
                textColor: 'var(--color-nav-card-product-text)',
                links: [
                  { label: 'How it works', href: '#how-it-works', ariaLabel: 'How it works' },
                  { label: 'Features', href: '#features', ariaLabel: 'Features' },
                  { label: 'Examples', href: '#examples', ariaLabel: 'Examples' }
                ]
              },
              {
                label: 'Resources',
                bgColor: 'var(--color-nav-card-resources)',
                textColor: 'var(--color-nav-card-resources-text)',
                links: [
                  { label: 'Wall of Love', href: '#testimonials', ariaLabel: 'Testimonials' },
                  { label: 'Pricing', href: '#pricing', ariaLabel: 'Pricing' },
                  { label: 'FAQ', href: '#faq', ariaLabel: 'FAQ' }
                ]
              },
              {
                label: 'Company',
                bgColor: 'var(--color-nav-card-company)',
                textColor: 'var(--color-nav-card-company-text)',
                links: [
                  { label: 'Log In', href: '/login', ariaLabel: 'Log in' },
                  { label: 'Sign Up', href: '/signup', ariaLabel: 'Sign up' },
                  { label: 'Contact', href: '#contact', ariaLabel: 'Contact us' }
                ]
              }
            ]}
          />
          <HeroContent />
        </div>

        {/* ── Interactive Sandbox ── */}
        <InteractiveSandbox />

        {/* ── How It Works ── */}
        <HowItWorks />

        {/* ── Features ── */}
        <Features />

        {/* ── Examples ── */}
        <Examples />

        {/* ── Contact ── */}
        <ContactSection />

        {/* ── Testimonials ── */}
        <Testimonials />

        {/* ── Pricing ── */}
        <Pricing />

        {/* ── FAQ ── */}
        <FAQ />

        {/* ── CTA ── */}
        <CTASection />

        {/* ── Footer ── */}
        <Footer />

      </div>
    </div>
  );
}
