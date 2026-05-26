import { useState, useEffect } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';

type SocialPost = {
    hook: string;
    body: string;
    footer: string;
    list?: string[];
};

type PresetVideo = {
    title: string;
    duration: string;
    speaker: string;
    posts: Record<string, SocialPost>;
};

const PRESET_VIDEOS: Record<string, PresetVideo> = {
    tech: {
        title: 'AI is rewriting software engineering from scratch...',
        duration: '12:45',
        speaker: 'Alex Rivera',
        posts: {
            twitter: {
                hook:
                    "🚨 AI isn't replacing software engineers. It's replacing engineers who don't use AI.",
                body:
                    'Here is exactly how the development stack is shifting in 2026, and what you need to learn to stay ahead of the curve.',
                footer: '1/8 • Read full thread',
            },
            linkedin: {
                hook: 'Is the junior developer role officially dead?',
                body:
                    "AI will handle 90% of boilerplate code. The engineer's role is shifting toward systems thinking, orchestration, and quality assurance.",
                list: [
                    '1. Prompt Engineering & LLM Systems',
                    '2. Architecture & Product Thinking',
                    '3. Edge-case Testing & Auditing',
                ],
                footer: 'What skills are you building this year?',
            },
            tiktok: {
                hook: '⚡ WRITE CODE 10X FASTER ⚡',
                body:
                    "You don't need to manually build boilerplate anymore. Here's the workflow elite developers are using right now.",
                footer: '#ai #coding #softwareengineering',
            },
        },
    },

    founder: {
        title: 'How we hit $100k MRR in 8 months...',
        duration: '18:20',
        speaker: 'Sarah Chen',
        posts: {
            twitter: {
                hook:
                    'We built a $1.2M ARR SaaS without spending on paid ads.',
                body:
                    'No hacks. No secrets. Just content systems, distribution loops, and consistency.',
                footer: '1/10 • Growth breakdown',
            },
            linkedin: {
                hook: 'Stop buying ads. Start building in public.',
                body:
                    'The fastest growth channel in 2026 is authentic audience trust.',
                list: [
                    '1. Document lessons publicly',
                    '2. Share transparent metrics',
                    '3. Turn insights into repeatable frameworks',
                ],
                footer: 'Would you build in public?',
            },
            tiktok: {
                hook: '🔥 ZERO DOLLAR MARKETING 🔥',
                body:
                    'This founder built a million-dollar company without spending on ads.',
                footer: '#startup #growth #founder',
            },
        },
    },

    marketing: {
        title: 'The psychological trick behind viral hooks...',
        duration: '10:15',
        speaker: 'Marcus Vance',
        posts: {
            twitter: {
                hook:
                    '99% of creators write hooks for themselves instead of their audience.',
                body:
                    'Psychology controls attention. These are the exact triggers that stop people from scrolling.',
                footer: '1/6 • Hook psychology',
            },
            linkedin: {
                hook: 'Why did you stop scrolling on this post?',
                body:
                    'Because high-performing content is engineered around attention psychology.',
                list: [
                    '1. Curiosity gaps',
                    '2. Contrarian positioning',
                    '3. Immediate payoff framing',
                ],
                footer: 'Comment HOOK for the checklist.',
            },
            tiktok: {
                hook: '⚠️ STOP SCROLLING ⚠️',
                body:
                    'Here is the biological reason you clicked this video.',
                footer: '#marketing #creator #hooks',
            },
        },
    },
};

const PROCESSING_STEPS = [
    'Uploading source media...',
    'Extracting transcript data...',
    'Analyzing tone & structure...',
    'Generating optimized content...',
    'Finalizing post formatting...',
];

export default function InteractiveSandbox() {
    const [selectedCategory, setSelectedCategory] = useState('tech');
    const [activePlatform, setActivePlatform] = useState('twitter');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);
    const [urlInput, setUrlInput] = useState('');



    const handleRepurpose = () => {
        setIsProcessing(true);
        setProcessingStep(0);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isProcessing) {
            interval = setInterval(() => {
                setProcessingStep((prev) => {
                    if (prev < PROCESSING_STEPS.length - 1) {
                        return prev + 1;
                    }

                    clearInterval(interval);
                    setIsProcessing(false);
                    return prev;
                });
            }, 900);
        }

        return () => clearInterval(interval);
    }, [isProcessing]);

    return (
        <section className="w-full bg-black px-4 sm:px-6 lg:px-8 py-24 text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <p className="uppercase tracking-[0.3em] text-xs text-white/40 mb-5">
                        Interactive Sandbox
                    </p>

                    <h2 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.05em]">
                        Transform one piece of content into platform-native distribution.
                    </h2>

                    <p className="mt-8 text-lg text-white/55 leading-relaxed max-w-2xl">
                        Experience how CreatorOS repurposes long-form content into premium,
                        high-converting posts optimized for every major platform.
                    </p>
                </div>

                {/* Main Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel */}
                    <div className="lg:col-span-5 border border-white/10 rounded-[2rem] p-6 md:p-8 bg-white/[0.02]">

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {Object.keys(PRESET_VIDEOS).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setSelectedCategory(key);
                                        setActivePlatform('twitter');
                                    }}
                                    className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wide border transition-all duration-300 ${selectedCategory === key
                                            ? 'bg-white text-black border-white'
                                            : 'border-white/10 text-white/45 hover:text-white hover:border-white/30'
                                        }`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>

                        {/* Video Card */}
                        <div className="rounded-[1.75rem] overflow-hidden border border-white/10 bg-white/[0.03]">
                            <div className="aspect-video bg-neutral-900 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-black/20" />

                                <button className="relative z-10 w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center hover:scale-105 transition-transform">
                                    <svg
                                        className="w-6 h-6 fill-white ml-1"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>

                                <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/80 text-[10px] font-medium text-white/80">
                                    {PRESET_VIDEOS[selectedCategory].duration}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-white/60" />

                                    <span className="text-xs uppercase tracking-wide text-white/50">
                                        {PRESET_VIDEOS[selectedCategory].speaker}
                                    </span>
                                </div>

                                <h3 className="text-lg font-medium leading-snug tracking-tight text-white">
                                    {PRESET_VIDEOS[selectedCategory].title}
                                </h3>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="mt-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    placeholder="Paste YouTube or Podcast URL..."
                                    className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 px-5 pr-36 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
                                />

                                <button
                                    onClick={handleRepurpose}
                                    disabled={isProcessing}
                                    className="absolute right-2 top-2 h-10 px-5 rounded-xl bg-white text-black text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {isProcessing ? 'Processing' : 'Repurpose'}

                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-7 border border-white/10 rounded-[2rem] bg-white/[0.02] overflow-hidden relative">

                        {/* Top Nav */}
                        <div className="border-b border-white/10 px-6 md:px-8 py-5 flex items-center justify-between">

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-1">
                                    Generated Content
                                </p>

                                <h3 className="text-lg font-medium tracking-tight">
                                    Platform-ready outputs
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                                {['twitter', 'linkedin', 'tiktok'].map((plat) => (
                                    <button
                                        key={plat}
                                        onClick={() => setActivePlatform(plat)}
                                        className={`px-4 py-2 rounded-full text-xs uppercase tracking-wide border transition-all duration-300 ${activePlatform === plat
                                                ? 'bg-white text-black border-white'
                                                : 'border-white/10 text-white/45 hover:text-white hover:border-white/30'
                                            }`}
                                    >
                                        {plat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Processing Overlay */}
                        {isProcessing && (
                            <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center px-6">

                                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-8">
                                    <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                </div>

                                <p className="text-lg font-medium tracking-tight">
                                    {PROCESSING_STEPS[processingStep]}
                                </p>

                                <p className="mt-2 text-sm text-white/40">
                                    CreatorOS AI is generating optimized content structures.
                                </p>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[620px]">

                            {/* Creator Header */}
                            <div>
                                <div className="flex items-center justify-between mb-10">

                                    <div className="flex items-center gap-4">
                                        <img
                                            className="w-12 h-12 rounded-full object-cover"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                                            alt="Avatar"
                                        />

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium tracking-tight">
                                                    CreatorOS AI
                                                </span>

                                                <span className="px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-white text-black">
                                                    Verified
                                                </span>
                                            </div>

                                            <p className="text-sm text-white/35 mt-1">
                                                Updated 2 minutes ago
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-white/35">
                                        <Check size={14} />
                                        Ready to publish
                                    </div>
                                </div>

                                {/* Post */}
                                <div className="max-w-2xl">
                                    <h4 className="text-2xl md:text-3xl font-medium leading-[1.2] tracking-tight mb-6">
                                        {
                                            PRESET_VIDEOS[selectedCategory].posts[activePlatform]
                                                .hook
                                        }
                                    </h4>

                                    <p className="text-base leading-8 text-white/60 whitespace-pre-wrap">
                                        {
                                            PRESET_VIDEOS[selectedCategory].posts[activePlatform]
                                                .body
                                        }
                                    </p>

                                    {activePlatform === 'linkedin' && (
                                        <div className="mt-8 space-y-4">
                                            {PRESET_VIDEOS[selectedCategory].posts.linkedin.list.map(
                                                (item: string, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-start gap-4 text-white/75"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-3" />
                                                        <p className="leading-7">{item}</p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    <p className="mt-10 pt-6 border-t border-white/10 text-sm text-white/35">
                                        {
                                            PRESET_VIDEOS[selectedCategory].posts[activePlatform]
                                                .footer
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-10 mt-10 border-t border-white/10">

                                <div className="flex items-center gap-2 text-sm text-white/35">
                                    <div className="w-2 h-2 rounded-full bg-white/50" />
                                    AI optimization complete
                                </div>

                                <button
                                    onClick={() => {
                                        const textToCopy = `${PRESET_VIDEOS[selectedCategory].posts[activePlatform].hook}\n${PRESET_VIDEOS[selectedCategory].posts[activePlatform].body}`;

                                        navigator.clipboard.writeText(textToCopy);
                                    }}
                                    className="inline-flex items-center gap-2 px-5 h-11 rounded-xl border border-white/10 text-sm text-white/75 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                >
                                    <Copy size={15} />
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