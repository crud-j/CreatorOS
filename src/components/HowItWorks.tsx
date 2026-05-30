import { useEffect, useRef } from 'react';
import gsapActual from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsapInstance = gsapActual;
gsapInstance.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Upload your content',
    desc:
      'Paste a YouTube URL, upload a podcast, MP4, or Loom recording. CreatorOS automatically ingests and processes long-form media.',
    footer: 'YouTube · MP4 · Podcast · Loom',
  },

  {
    num: '02',
    title: 'AI detects viral moments',
    desc:
      'Whisper AI transcribes your content with timestamp precision while advanced scoring models identify the strongest moments automatically.',
    footer: 'Whisper AI · Viral Intelligence',
  },

  {
    num: '03',
    title: 'Generate multi-platform content',
    desc:
      'AI creates platform-native posts including threads, short-form scripts, newsletters, captions, and branded social content.',
    footer: '30+ AI Generated Assets',
  },

  {
    num: '04',
    title: 'Publish on autopilot',
    desc:
      'Approve content, automate scheduling, and distribute across platforms while analytics continuously improve performance.',
    footer: 'Automation · Analytics Loop',
  },
];

export default function HowItWorks() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const headingRef =
    useRef<HTMLDivElement>(null);

  const gridRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsapInstance.context(() => {
      /*
        HEADER ANIMATION
      */
      gsapInstance.fromTo(
        headingRef.current?.children ??
        [],
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      /*
        CARD ANIMATION
      */
      if (gridRef.current) {
        const cards =
          gridRef.current.querySelectorAll(
            '.step-card'
          );

        gsapInstance.fromTo(
          cards,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="
        relative
        overflow-hidden
        py-32
        lg:py-40
        text-white
      "
    >
      <div
        className="
          relative
          z-10
          max-w-[1450px]
          mx-auto
          px-6
          md:px-8
        "
      >
        {/* HEADER */}
        <div
          ref={headingRef}
          className="
            max-w-5xl
            mx-auto
            text-center
            mb-28
          "
        >
          {/* LABEL */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.015]
              px-5
              py-2.5
              backdrop-blur-md
              mb-8
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-white/60
              "
            />

            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.28em]
                text-white/42
                font-medium
              "
            >
              Workflow Process
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="
              text-[48px]
              md:text-[68px]
              xl:text-[88px]
              leading-[0.9]
              tracking-[-0.08em]
              font-semibold
            "
          >
            One upload.
            <span className="block text-white/38">
              Infinite distribution.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              max-w-3xl
              mx-auto
              text-[17px]
              md:text-[19px]
              leading-[1.9]
              text-white/50
            "
          >
            CreatorOS transforms a single
            long-form video into a fully
            automated content engine —
            generating platform-native assets,
            optimizing engagement, and
            distributing content autonomously.
          </p>
        </div>

        {/* GRID */}
        <div
          ref={gridRef}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
            xl:gap-6
          "
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="
                step-card
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/[0.07]
                bg-white/[0.015]
                backdrop-blur-md
                transition-all
                duration-500
                hover:bg-white/[0.03]
                hover:border-white/[0.12]
                hover:-translate-y-[3px]
              "
            >
              {/* TOP LIGHT */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-32
                  bg-gradient-to-b
                  from-white/[0.025]
                  to-transparent
                  pointer-events-none
                "
              />

              {/* BACKGROUND NUMBER */}
              <div
                className="
                  absolute
                  top-6
                  right-6
                  text-[72px]
                  font-semibold
                  tracking-[-0.08em]
                  text-white/[0.03]
                  select-none
                "
              >
                {step.num}
              </div>

              {/* CONTENT */}
              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  h-full
                  p-7
                "
              >
                {/* TOP ACCENT */}
                <div
                  className="
                    h-[2px]
                    w-14
                    rounded-full
                    bg-gradient-to-r
                    from-white/70
                    to-transparent
                    mb-10
                    transition-all
                    duration-500
                    group-hover:w-20
                  "
                />

                {/* STEP */}
                <span
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.28em]
                    text-white/35
                    font-medium
                  "
                >
                  Step {step.num}
                </span>

                {/* TITLE */}
                <h3
                  className="
                    mt-6
                    text-[28px]
                    leading-[1.08]
                    tracking-[-0.05em]
                    font-semibold
                    text-white
                    max-w-[240px]
                  "
                >
                  {step.title}
                </h3>

                {/* DESC */}
                <p
                  className="
                    mt-6
                    text-[15px]
                    leading-[1.9]
                    text-white/50
                    flex-grow
                  "
                >
                  {step.desc}
                </p>

                {/* FOOTER */}
                <div
                  className="
                    mt-12
                    pt-6
                    border-t
                    border-white/[0.08]
                  "
                >
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.24em]
                      text-white/28
                    "
                  >
                    {step.footer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-28 text-center">
          <div
            className="
              inline-flex
              items-center
              gap-4
              text-[11px]
              uppercase
              tracking-[0.32em]
              text-white/24
            "
          >
            <div className="w-14 h-px bg-white/[0.08]" />

            AI-Powered Content Distribution

            <div className="w-14 h-px bg-white/[0.08]" />
          </div>
        </div>
      </div>
    </section>
  );
}