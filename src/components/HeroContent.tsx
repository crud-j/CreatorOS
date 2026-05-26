export default function HeroContent() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-32 overflow-hidden text-white">

            <div className="relative z-10 mx-auto max-w-7xl text-center">

                {/* Top Badge */}
                <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/50 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-white/70" />

                    <span className="tracking-wide">
                        CreatorOS 2.0 is now live
                    </span>
                </div>

                {/* Hero Heading */}
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl lg:text-[96px] font-semibold leading-[0.92] tracking-[-0.06em]">
                        Turn one idea into
                        <span className="block text-white/30 mt-3">
                            weeks of content.
                        </span>
                    </h1>

                    <p className="mx-auto mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-white/50 font-normal">
                        CreatorOS transforms long-form videos into premium,
                        platform-native content systems — optimized for every channel,
                        every format, and every audience.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">

                    {/* Primary */}
                    <button className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-white text-black text-sm font-medium tracking-tight hover:opacity-90 transition-all duration-300">
                        Start Free Trial

                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </button>

                    {/* Secondary */}
                    <button className="group inline-flex items-center justify-center gap-3 h-14 px-7 rounded-2xl border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:border-white/25 transition-all duration-300">

                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10">
                            <svg
                                className="w-3 h-3 ml-0.5 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>

                        Watch Demo
                    </button>
                </div>

                {/* Social Proof */}
                <div className="mt-24 flex flex-col items-center">

                    {/* Avatars */}
                    <div className="flex items-center -space-x-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 20}`}
                                alt="Creator"
                                loading="lazy"
                                className="w-12 h-12 rounded-full border-2 border-black object-cover transition-transform duration-300 hover:-translate-y-1"
                            />
                        ))}
                    </div>

                    {/* Text */}
                    <p className="mt-6 text-sm md:text-base text-white/45 max-w-xl leading-relaxed">
                        Trusted by{" "}
                        <span className="text-white font-medium">
                            10,000+ creators
                        </span>{" "}
                        building modern media brands and scaling multi-platform
                        distribution.
                    </p>
                </div>

                {/* Metrics */}
                <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">

                    {[
                        {
                            value: "30x",
                            label: "Faster Repurposing",
                        },
                        {
                            value: "12hrs",
                            label: "Saved Weekly",
                        },
                        {
                            value: "98%",
                            label: "Voice Accuracy",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="rounded-[2rem] border border-white/10 px-8 py-10 text-center bg-white/[0.02]"
                        >
                            <div className="text-4xl md:text-5xl font-semibold tracking-[-0.05em]">
                                {item.value}
                            </div>

                            <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/35 font-medium">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Brand Statement */}
                <div className="mt-28 overflow-hidden">
                    <h2 className="text-[18vw] md:text-[14vw] leading-none font-semibold tracking-[-0.08em] text-white/[0.04] whitespace-nowrap select-none">
                        CREATOROS
                    </h2>
                </div>
            </div>
        </section>
    );
}