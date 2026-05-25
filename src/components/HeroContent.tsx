export default function HeroContent() {
    return (
        <section className="relative w-full px-4 sm:px-6 lg:px-8 py-24 text-white flex items-center justify-center min-h-screen">
            {/* 3D Spline Background */}
            <div className="absolute inset-0 z-0">
            </div>

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center pointer-events-none">

                {/* Premium Announcement Badge */}
                <div className="pointer-events-auto group mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] cursor-pointer">

                    <div className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    </div>

                    <span className="text-sm font-medium tracking-wide text-white/75">
                        CreatorOS 2.0 is officially live
                    </span>

                    <svg
                        className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>

                {/* Main Heading */}
                <div className="max-w-4xl drop-shadow-2xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-[-0.045em] leading-[1.02]">
                        Turn one idea into
                        <span className="relative block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                            weeks of content
                        </span>
                        instantly.
                    </h1>

                    {/* Supporting Copy */}
                    <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-white/75 font-medium drop-shadow-md">
                        CreatorOS transforms your long-form videos into polished,
                        platform-native posts, clips, captions, and campaigns —
                        automatically aligned to your voice and brand.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row pointer-events-auto">

                    {/* Primary CTA */}
                    <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_35px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(99,102,241,0.35)] active:translate-y-0">

                        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" />

                        <span className="relative z-10 flex items-center gap-2">
                            Start Free Trial

                            <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.3}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </span>
                    </button>

                    {/* Secondary CTA */}
                    <button className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-white/85 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:bg-white/[0.08]">
                            <svg
                                className="ml-0.5 h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>

                        <span>Watch Demo</span>
                    </button>
                </div>

                {/* Trust Row */}
                <div className="mt-14 flex flex-col items-center gap-5 pointer-events-auto">

                    {/* Avatars */}
                    <div className="flex items-center -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 20}`}
                                alt="Creator"
                                loading="lazy"
                                className="h-10 w-10 rounded-full border border-black/20 ring-2 ring-white/10"
                            />
                        ))}
                    </div>

                    {/* Social Proof */}
                    <div className="flex flex-col items-center gap-2 sm:flex-row">

                        <div className="flex items-center gap-1 text-amber-400 drop-shadow-md">
                            {[...Array(5)].map((_, idx) => (
                                <svg
                                    key={idx}
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <p className="text-sm text-white/90 drop-shadow-md font-medium">
                            Trusted by{" "}
                            <span className="font-bold text-white">
                                10,000+ creators
                            </span>{" "}
                            building modern media brands.
                        </p>
                    </div>
                </div>

                {/* Minimal Metrics */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center pointer-events-auto drop-shadow-xl">

                    {[
                        { value: "30x", label: "Faster Repurposing" },
                        { value: "12hrs", label: "Saved Weekly" },
                        { value: "98%", label: "Voice Accuracy" },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center backdrop-blur-sm bg-white/5 px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <span className="text-3xl font-black tracking-tight text-white drop-shadow-md">
                                {item.value}
                            </span>

                            <span className="mt-1 text-sm text-white/70 font-medium">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}