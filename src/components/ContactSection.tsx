import React, { useState } from 'react';
import {
    ArrowUpRight,
    Check,
    Mail,
    Phone,
    MapPin,
    X,
    Loader2,
} from 'lucide-react';
import {

    FiTwitter as Twitter,

    FiFacebook as Facebook,

    FiInstagram as Instagram

} from 'react-icons/fi';


// Interfaces for component states
interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FeedbackMessage {
    type: 'success' | 'error' | null;
    text: string;
}

export default function App() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackMessage>({ type: null, text: '' });

    // Handle inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Form submit handler with custom visual feedback
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setFeedback({
                type: 'error',
                text: 'Please fill in all fields before submitting.'
            });
            return;
        }

        setIsSubmitting(true);
        setFeedback({ type: null, text: '' });

        // Simulate an API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFeedback({
                type: 'success',
                text: 'Message received! Our team will reach out to you within 2 hours.'
            });
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <div id="contact" className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 relative">

            {/* PREMIUM BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {/* AMBIENT LIGHTING */}
                <div className="absolute top-[-15%] left-[10%] w-[800px] h-[800px] rounded-full bg-white/[0.035] blur-[180px]" />

                <div className="absolute bottom-[-20%] right-[5%] w-[700px] h-[700px] rounded-full bg-white/[0.025] blur-[180px]" />

                {/* RADIAL LIGHT */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />

                {/* PREMIUM DOT GRID */}
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)',

                        backgroundSize: '4px 4px',

                        maskImage:
                            'radial-gradient(circle at center top, black 18%, transparent 82%)',

                        WebkitMaskImage:
                            'radial-gradient(circle at center top, black 18%, transparent 82%)',
                    }}
                />

                {/* VIGNETTE */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)]" />

                {/* TOP FADE */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent" />

                {/* BOTTOM FADE */}
                <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Centralized, Massive, Low-Opacity Background Text */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none z-0">
                <span className="text-[18vw] lg:text-[220px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent leading-none whitespace-nowrap">
                    CONTACT
                </span>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Main Split Contact Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start pt-24 pb-20">

                    {/* Left Side: Brand Text and Bullet points */}
                    <div className="lg:col-span-5 space-y-10 relative pt-4">

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-wide text-neutral-300 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Available for new projects
                            </div>

                            <h2 className="text-5xl sm:text-6xl font-medium tracking-tighter text-white flex flex-col gap-2">
                                <span>Let's talk</span>
                                <span className="text-neutral-500 font-normal">about your vision.</span>
                            </h2>

                            <p className="text-neutral-400 text-lg leading-relaxed max-w-md font-light">
                                Have a question, a project in mind, or just want to say hi? Reach out to our dedicated team. We usually respond within a few hours.
                            </p>
                        </div>

                        {/* Premium Bullet Points with checkmarks */}
                        <div className="space-y-5 pt-4">
                            {[
                                'Personalized, 1-on-1 assistance',
                                'Timely responses within 2 hours',
                                'Comprehensive technical support'
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-4 text-neutral-300">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.1] text-white">
                                        <Check className="w-3.5 h-3.5 text-neutral-300" />
                                    </span>
                                    <span className="text-base font-light text-neutral-400">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 pt-8">
                            {[
                                { Icon: Twitter, label: 'Twitter' },
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Instagram, label: 'Instagram' }
                            ].map(({ Icon, label }, idx) => (
                                <a
                                    key={idx}
                                    href={`#${label.toLowerCase()}`}
                                    aria-label={`${label} Profile`}
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-400 hover:text-black hover:bg-white hover:border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                    </div>

                    {/* Right Side: High-End Glassmorphism Interactive Form */}
                    <div className="lg:col-span-7">
                        <div className="relative group">
                            {/* Animated subtle glow behind the form */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-[32px] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

                            <div className="relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-2xl">
                                <div className="bg-[#0a0a0a]/80 rounded-[31px] p-8 sm:p-10 shadow-2xl border border-white/[0.02] space-y-8">

                                    {/* Visual feedback banner */}
                                    {feedback.type && (
                                        <div className={`p-4 rounded-2xl text-sm flex items-start gap-3 transition-all duration-500 animate-in fade-in slide-in-from-top-2 ${feedback.type === 'success'
                                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                            : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                                            }`}>
                                            <div className="mt-0.5">
                                                {feedback.type === 'success' ? (
                                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                                ) : (
                                                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                                                )}
                                            </div>
                                            <div className="flex-1 font-medium">
                                                <p>{feedback.text}</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Name and Email side-by-side on desktop */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-xs font-medium text-neutral-400 ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08] border border-white/[0.05] focus:border-white/[0.2] rounded-2xl px-5 py-4 text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all duration-300"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-xs font-medium text-neutral-400 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08] border border-white/[0.05] focus:border-white/[0.2] rounded-2xl px-5 py-4 text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-xs font-medium text-neutral-400 ml-1">Your Message</label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="How can we help you today?"
                                                className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08] border border-white/[0.05] focus:border-white/[0.2] rounded-2xl px-5 py-4 text-neutral-200 placeholder-neutral-600 focus:outline-none resize-none transition-all duration-300"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full group/btn bg-white hover:bg-neutral-200 text-black font-semibold py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Sending securely...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <ArrowUpRight className="w-5 h-5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                                                </>
                                            )}
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Dynamic Cards Grid: Email us, Call us, Our location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 pb-24 border-t border-white/[0.05]">

                    {/* Card 1: Email */}
                    <div className="group relative rounded-3xl border border-white/[0.05] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1">
                        <div className="space-y-5">
                            <div className="inline-flex p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-neutral-300 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-neutral-500">Email us</h4>
                                <a href="mailto:hi@affanlab.com" className="block text-lg text-neutral-200 font-medium mt-1 hover:text-white transition-colors">
                                    hi@affanlab.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Phone */}
                    <div className="group relative rounded-3xl border border-white/[0.05] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1">
                        <div className="space-y-5">
                            <div className="inline-flex p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-neutral-300 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-neutral-500">Call us</h4>
                                <a href="tel:+15011234567" className="block text-lg text-neutral-200 font-medium mt-1 hover:text-white transition-colors">
                                    (501) 123-4567
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Location */}
                    <div className="group relative rounded-3xl border border-white/[0.05] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1">
                        <div className="space-y-5">
                            <div className="inline-flex p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-neutral-300 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-neutral-500">Our location</h4>
                                <p className="text-lg text-neutral-200 font-medium mt-1 group-hover:text-white transition-colors">
                                    Crosby Street, NY
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Testimonials Header */}
                <div className="text-center pt-20 pb-12 border-t border-white/[0.03] relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-32 bg-white/[0.02] blur-[100px] pointer-events-none" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium tracking-widest text-neutral-400 mb-6 uppercase backdrop-blur-sm">
                        Testimonials
                    </div>

                    <h3 className="text-4xl sm:text-5xl font-medium tracking-tight text-white max-w-2xl mx-auto leading-tight">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">1000+ customers</span> worldwide
                    </h3>
                </div>

            </div>
        </div>
    );
}