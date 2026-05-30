import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap, Check } from 'lucide-react';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Intersection Observer for the entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`py-32 w-full bg-black relative z-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">

          {/* Minimalist Premium Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/30 mb-8">
            <Zap className="w-3.5 h-3.5 text-neutral-400" fill="currentColor" />
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-300">
              Starter Plan Available
            </span>
          </div>

          {/* High-Contrast Typography Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-6 text-white">
            Turn one video into <br className="hidden sm:block" />
            <span className="text-neutral-500">a week of content.</span>
          </h2>

          {/* Refined Subtext */}
          <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-10 max-w-xl mx-auto">
            Join 2,400+ creators shipping more content in less time.
            No credit card. No contracts. Just results.
          </p>

          {/* Sleek Input Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row w-full max-w-md gap-3 mb-10"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-[15px] text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:bg-neutral-900 transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-[15px] font-medium hover:bg-neutral-200 transition-colors duration-200 whitespace-nowrap active:scale-[0.98]"
              >
                Start for free
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-200" />
              </button>
            </form>
          ) : (
            // Understated Success State
            <div className="flex items-center justify-center gap-3 px-5 py-4 rounded-xl border border-neutral-800 bg-neutral-900/50 w-full max-w-md mb-10">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
              </div>
              <span className="text-[15px] font-medium text-white">
                You're in. Check your inbox.
              </span>
            </div>
          )}

          {/* Refined Micro-trust Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-neutral-600">
            <span>5 free runs / month</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800 hidden sm:block" />
            <span>Cancel anytime</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800 hidden sm:block" />
            <span>GDPR compliant</span>
          </div>

        </div>
      </div>
    </section>
  );
}