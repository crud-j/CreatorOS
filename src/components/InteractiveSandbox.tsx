import React, { useState, useEffect } from 'react';

const PRESET_VIDEOS: Record<string, any> = {
    tech: {
        title: "AI is rewriting software engineering from scratch...",
        duration: "12:45",
        speaker: "Alex Rivera",
        posts: {
            twitter: {
                hook: "🚨 AI isn't replacing software engineers. It's replacing engineers who don't use AI.",
                body: "Here is exactly how the development stack is shifting in 2026, and what you need to learn to stay ahead of the curve (a short thread) 🧵👇",
                footer: "1/8 • Read full post"
            },
            linkedin: {
                hook: "Is the junior developer role officially dead?",
                body: "In our latest podcast episode, Alex Rivera made a bold claim: within 3 years, AI will handle 90% of boilerplate code. The modern engineer's role is shifting from writing code to system architecture and quality orchestration.\n\nHere are 3 high-leverage skills you must build starting today:",
                list: ["1. Prompt Engineering & LLM Orchestration\n", "2. System Design & Architectural Vision\n", "3. Rigorous Edge-case Code Auditing\n"],
                footer: "Do you agree with Alex? Share your thoughts below."
            },
            tiktok: {
                hook: "⚡ WRITE CODES 10X FASTER (NO BS) ⚡",
                body: "POV: You realize you don't need to manually write boilerplate API endpoints anymore. Stop wasting hours. Here is the ultimate automated workflow to 10x your output...",
                footer: "🏷️ #softwareengineer #developer #coding #ai #productivity"
            }
        }
    },
    founder: {
        title: "How we hit $100k MRR in 8 months with $0 ad spend...",
        duration: "18:20",
        speaker: "Sarah Chen",
        posts: {
            twitter: {
                hook: "We built an $1.2M ARR SaaS in 8 months without spending a single dollar on paid advertising.",
                body: "No secrets, no gatekeeping. Here is our exact content-led growth blueprint that unlocked viral acquisition on a budget 🧵👇",
                footer: "1/10 • Read full thread"
            },
            linkedin: {
                hook: "Stop buying ads. Start building in public.",
                body: "Sarah Chen joined us to share the story of how she scaled CreatorOS. The secret wasn't a fancy marketing agency. It was documenting the messy journey in public.\n\nHere is her 3-step 'Build in Public' playbook:",
                list: ["1. Document your failures (they build authentic trust)\n", "2. Share raw numbers and analytics\n", "3. Create actionable frameworks from daily lessons\n"],
                footer: "Read the full case study link in comments."
            },
            tiktok: {
                hook: "🔥 ZERO DOLLAR MARKETING PLAYBOOK 🔥",
                body: "This founder built a million-dollar software company without spending a penny on ads. Here is her step-by-step secret strategy...",
                footer: "🏷️ #startup #founder #entrepreneur #buildinpublic #marketing"
            }
        }
    },
    marketing: {
        title: "The psychological trick behind hooks that convert...",
        duration: "10:15",
        speaker: "Marcus Vance",
        posts: {
            twitter: {
                hook: "99% of creators fail because they write hooks for themselves, not their audience.",
                body: "Psychology rules the feed. Here are 5 psychological triggers that make people stop scrolling instantly and read your content 🧵👇",
                footer: "1/6 • Trigger Guide"
            },
            linkedin: {
                hook: "Why did you stop scrolling on this post?",
                body: "It wasn't an accident. It was psychology. Marcus Vance explains that great content is 20% value and 80% hook psychology. If your first 3 lines don't agitate a specific problem, your content is effectively invisible.\n\nHere are the 3 main triggers Marcus uses:",
                list: ["1. The Curated Gap (Unrevealed information)\n", "2. Cognitive Dissonance (Challenging a common belief)\n", "3. Immediate Loss Aversion (Save 10 hours this week)\n"],
                footer: "Want our ultimate hook checklist? Comment 'HOOK' and I'll DM it."
            },
            tiktok: {
                hook: "⚠️ STOP SCROLLING! READ THIS! ⚠️",
                body: "Here is the exact biological reason why you clicked on this video, and how you can use this simple psychological hack to double your view count overnight...",
                footer: "🏷️ #marketingtips #socialmedia #contentcreator #hooks #psychology"
            }
        }
    }
};

export default function InteractiveSandbox() {
    const [selectedCategory, setSelectedCategory] = useState("tech");
    const [activePlatform, setActivePlatform] = useState("twitter");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);
    const [urlInput, setUrlInput] = useState("");

    const processingSteps = [
        "Uploading audio...",
        "Extracting video transcripts...",
        "Analyzing brand voice...",
        "Generating posts & formatting structures...",
        "Refining hook engagement metrics..."
    ];

    const handleRepurpose = () => {
        setIsProcessing(true);
        setProcessingStep(0);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isProcessing) {
            interval = setInterval(() => {
                setProcessingStep((prev) => {
                    if (prev < processingSteps.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        setIsProcessing(false);
                        return prev;
                    }
                });
            }, 700);
        }
        return () => clearInterval(interval);
    }, [isProcessing, processingSteps.length]);

    return (
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-transparent text-white relative z-20">
            <div className="w-full max-w-4xl rounded-3xl bg-white/[0.02] border border-white/10 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                {/* Preset Picker Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                        <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Interactive Sandbox</span>
                        <h3 className="text-xl font-bold mt-0.5">See how CreatorOS transforms audio</h3>
                    </div>

                    {/* Topic Selector Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(PRESET_VIDEOS).map((key) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedCategory(key);
                                    setActivePlatform("twitter");
                                }}
                                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 capitalize ${selectedCategory === key
                                    ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                                    : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                                    }`}
                            >
                                {key} Demo
                            </button>
                        ))}
                    </div>
                </div>

                {/* Core Widget Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">

                    {/* Left Workspace: Input Video simulation */}
                    <div className="lg:col-span-5 space-y-4">
                        <label className="text-xs font-semibold text-white/50 block">SOURCE VIDEO</label>

                        {/* Fake Video Player Card */}
                        <div className="bg-black/40 rounded-2xl border border-white/5 p-4 relative overflow-hidden group">
                            <div className="aspect-video w-full rounded-xl bg-white/5 relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                                {/* Glowing core decoration */}
                                <div className="absolute w-24 h-24 bg-indigo-500/20 blur-xl rounded-full"></div>

                                {/* Play Button Icon Overlay */}
                                <span className="relative z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>

                                {/* Video length tag */}
                                <span className="absolute bottom-2.5 right-2.5 z-20 px-2 py-1 bg-black/80 rounded text-[10px] font-bold">
                                    {PRESET_VIDEOS[selectedCategory].duration}
                                </span>
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                    {PRESET_VIDEOS[selectedCategory].speaker}
                                </div>
                                <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                                    "{PRESET_VIDEOS[selectedCategory].title}"
                                </h4>
                            </div>
                        </div>

                        {/* Action bar and Live Repurpose Trigger */}
                        <div className="space-y-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    className="w-full bg-black/40 text-xs text-white/70 border border-white/5 rounded-xl pl-3 pr-24 py-3.5 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                    placeholder="Enter YouTube Link..."
                                />
                                <button
                                    onClick={handleRepurpose}
                                    disabled={isProcessing}
                                    className="absolute right-1.5 top-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-rose-600 rounded-lg text-[11px] font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                >
                                    {isProcessing ? "Processing..." : "Repurpose"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Workspace: Output previews */}
                    <div className="lg:col-span-7 flex flex-col min-h-[300px]">
                        <label className="text-xs font-semibold text-white/50 mb-3 block">GENERATED POSTS</label>

                        {/* Platform Filter Tabs */}
                        <div className="flex gap-1.5 bg-black/30 p-1 rounded-xl border border-white/5">
                            {["twitter", "linkedin", "tiktok"].map((plat) => (
                                <button
                                    key={plat}
                                    onClick={() => setActivePlatform(plat)}
                                    className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${activePlatform === plat
                                        ? 'bg-white/[0.08] text-white shadow-inner border border-white/5'
                                        : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    {plat}
                                </button>
                            ))}
                        </div>

                        {/* Generated Content Body Area */}
                        <div className="flex-1 mt-4 rounded-2xl bg-black/30 border border-white/5 p-5 relative overflow-hidden flex flex-col justify-between">

                            {isProcessing ? (
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                                    <div className="relative flex items-center justify-center mb-6">
                                        <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
                                        <div className="absolute w-12 h-12 rounded-full border-b-2 border-l-2 border-rose-500 animate-spin [animation-duration:1.5s]"></div>
                                        <span className="absolute text-xs">✨</span>
                                    </div>
                                    <p className="text-sm font-semibold text-white/90 animate-pulse duration-1000">
                                        {processingSteps[processingStep]}
                                    </p>
                                    <p className="text-xs text-white/40 mt-1">CreatorOS AI is rewriting transcript voice structures</p>
                                </div>
                            ) : null}

                            {/* Actual Generated Text Markup */}
                            <div className="space-y-3.5">
                                {/* Top Creator Header info */}
                                <div className="flex items-center gap-2">
                                    <img
                                        className="w-8 h-8 rounded-full bg-white/10"
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                                        alt="Avatar"
                                    />
                                    <div>
                                        <div className="text-xs font-bold flex items-center gap-1">
                                            CreatorOS AI <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">Tone Matcher</span>
                                        </div>
                                        <div className="text-[10px] text-white/40">Updated 2 mins ago</div>
                                    </div>
                                </div>

                                {/* Body Text Output */}
                                <div className="text-sm text-white/80 leading-relaxed font-medium whitespace-pre-wrap select-all">
                                    <span className="text-white font-bold block mb-1">
                                        {PRESET_VIDEOS[selectedCategory].posts[activePlatform].hook}
                                    </span>
                                    {PRESET_VIDEOS[selectedCategory].posts[activePlatform].body}

                                    {/* Render extra bullets for LinkedIn format */}
                                    {activePlatform === "linkedin" && (
                                        <div className="mt-3.5 space-y-1 text-indigo-300">
                                            {PRESET_VIDEOS[selectedCategory].posts.linkedin.list.map((item: string, i: number) => (
                                                <p key={i}>{item}</p>
                                            ))}
                                        </div>
                                    )}

                                    <span className="block mt-4 text-xs text-white/40 border-t border-white/5 pt-3 font-normal italic">
                                        {PRESET_VIDEOS[selectedCategory].posts[activePlatform].footer}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Clipboard & Copy Options */}
                            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                                <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                                    Ready to schedule
                                </span>
                                <button
                                    onClick={() => {
                                        const textToCopy = `${PRESET_VIDEOS[selectedCategory].posts[activePlatform].hook}\n${PRESET_VIDEOS[selectedCategory].posts[activePlatform].body}`;
                                        navigator.clipboard.writeText(textToCopy);
                                    }}
                                    className="flex items-center gap-1 text-[11px] font-bold text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all active:scale-95"
                                >
                                    <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy Output
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
