import {
    motion,
} from 'framer-motion';

import {
    ArrowUpRight,
    Sparkles,
    Play,
    ShieldCheck,
    Layers3,
    Zap,
} from 'lucide-react';

const features = [
    {
        icon: Sparkles,

        title:
            'AI Workflow Automation',

        description:
            'Intelligent orchestration and contextual automation designed for modern digital operations.',
    },

    {
        icon: Layers3,

        title:
            'Unified Collaboration',

        description:
            'Centralized workspace experience engineered for seamless productivity and scalability.',
    },

    {
        icon: ShieldCheck,

        title:
            'Enterprise Infrastructure',

        description:
            'Built with secure architecture, advanced protection, and enterprise-grade reliability.',
    },

    {
        icon: Zap,

        title:
            'Optimized Performance',

        description:
            'Ultra responsive systems designed for premium user experience and high efficiency.',
    },
];

const stats = [
    {
        label: 'Automation Accuracy',
        value: '99.9%',
    },

    {
        label: 'Response Time',
        value: '0.2s',
    },

    {
        label: 'Infrastructure',
        value: 'Enterprise',
    },
];

export default function InteractiveSandbox() {
    return (
        <section
            className="
        relative
        z-10
        py-32
        px-5
        md:px-8
      "
        >
            <div className="mx-auto max-w-[1450px]">
                {/* TOP SECTION */}
                <div
                    className="
            grid
            lg:grid-cols-[1.05fr_0.95fr]
            gap-16
            items-center
          "
                >
                    {/* LEFT */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            duration: 1,
                            ease: 'easeOut',
                        }}

                        viewport={{
                            once: true,
                        }}
                    >
                        {/* LABEL */}
                        <div
                            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.02]
                px-4
                py-2
                backdrop-blur-md
              "
                        >
                            <Sparkles
                                size={14}
                                className="text-white/65"
                            />

                            <span
                                className="
                  text-[11px]
                  uppercase
                  tracking-[0.24em]
                  text-white/45
                "
                            >
                                Executive Platform
                            </span>
                        </div>

                        {/* HEADING */}
                        <div className="mt-8 max-w-[760px]">
                            <h2
                                className="
                  text-[44px]
                  sm:text-[60px]
                  xl:text-[78px]
                  leading-[0.92]
                  tracking-[-0.08em]
                  font-semibold
                  text-white
                "
                            >
                                Premium
                                <span className="block text-white/38">
                                    Digital Workspace
                                </span>
                            </h2>

                            <p
                                className="
                  mt-8
                  max-w-[620px]
                  text-[16px]
                  md:text-[18px]
                  leading-[1.85]
                  text-white/50
                "
                            >
                                A refined enterprise platform
                                engineered for intelligent
                                automation, premium workflows,
                                and modern collaborative
                                operations with a seamless user
                                experience.
                            </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            {/* PRIMARY */}
                            <button
                                className="
                  group
                  relative
                  overflow-hidden
                  inline-flex
                  items-center
                  gap-3
                  h-[58px]
                  px-7
                  rounded-[22px]
                  bg-white
                  text-black
                  text-[15px]
                  font-semibold
                  tracking-[-0.03em]
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  active:scale-[0.985]
                  shadow-[0_10px_45px_rgba(255,255,255,0.10)]
                "
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-200" />

                                <span className="relative z-10">
                                    Launch Platform
                                </span>

                                <ArrowUpRight
                                    size={17}
                                    className="
                    relative
                    z-10
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                                />
                            </button>

                            {/* SECONDARY */}
                            <button
                                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  h-[58px]
                  px-6
                  rounded-[22px]
                  border
                  border-white/[0.08]
                  bg-white/[0.015]
                  text-white
                  text-[15px]
                  font-medium
                  transition-all
                  duration-500
                  hover:bg-white/[0.03]
                  hover:border-white/[0.12]
                "
                            >
                                <div
                                    className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                  "
                                >
                                    <Play
                                        size={14}
                                        fill="white"
                                    />
                                </div>

                                Watch Demo
                            </button>
                        </div>

                        {/* STATS */}
                        <div
                            className="
                mt-16
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
              "
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}

                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}

                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}

                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.08,
                                    }}

                                    viewport={{
                                        once: true,
                                    }}

                                    className="
                    rounded-[26px]
                    border
                    border-white/[0.06]
                    bg-white/[0.015]
                    px-6
                    py-6
                    backdrop-blur-md
                    transition-all
                    duration-500
                    hover:bg-white/[0.025]
                  "
                                >
                                    <p className="text-[13px] text-white/40">
                                        {stat.label}
                                    </p>

                                    <h3
                                        className="
                      mt-3
                      text-[34px]
                      font-semibold
                      tracking-[-0.06em]
                      text-white
                    "
                                    >
                                        {stat.value}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            duration: 1,
                            delay: 0.1,
                            ease: 'easeOut',
                        }}

                        viewport={{
                            once: true,
                        }}

                        className="
              relative
              grid
              gap-4
            "
                    >
                        {features.map(
                            (feature, index) => {
                                const Icon =
                                    feature.icon;

                                return (
                                    <motion.div
                                        key={feature.title}

                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}

                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}

                                        transition={{
                                            duration: 0.7,
                                            delay:
                                                index * 0.08,
                                        }}

                                        viewport={{
                                            once: true,
                                        }}

                                        className="
                      group
                      relative
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-white/[0.07]
                      bg-white/[0.015]
                      p-6
                      backdrop-blur-md
                      transition-all
                      duration-500
                      hover:bg-white/[0.03]
                      hover:border-white/[0.11]
                      hover:-translate-y-[2px]
                    "
                                    >
                                        {/* SUBTLE TOP LIGHT */}
                                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.025] to-transparent pointer-events-none" />

                                        <div className="relative z-10 flex items-start gap-5">
                                            {/* ICON */}
                                            <div
                                                className="
                          flex
                          items-center
                          justify-center
                          w-14
                          h-14
                          rounded-[20px]
                          border
                          border-white/[0.08]
                          bg-white/[0.025]
                          shrink-0
                        "
                                            >
                                                <Icon
                                                    size={22}
                                                    className="text-white"
                                                />
                                            </div>

                                            {/* CONTENT */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <h3
                                                        className="
                              text-[20px]
                              font-semibold
                              tracking-[-0.05em]
                              text-white
                            "
                                                    >
                                                        {feature.title}
                                                    </h3>

                                                    <ArrowUpRight
                                                        size={17}
                                                        className="
                              text-white/25
                              transition-all
                              duration-300
                              group-hover:text-white/60
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                                                    />
                                                </div>

                                                <p
                                                    className="
                            mt-3
                            text-[14px]
                            leading-[1.85]
                            text-white/48
                          "
                                                >
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            }
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}