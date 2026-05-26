/*
  PREMIUM LUXURY NAVBAR — REFINED VERSION

  IMPROVEMENTS:
  ✓ Cleaner alignment system
  ✓ More premium proportions
  ✓ Better navbar spacing rhythm
  ✓ Smoother GSAP animations
  ✓ Better luxury aesthetic
  ✓ More refined glassmorphism
  ✓ Cleaner dropdown card layout
  ✓ Better mobile responsiveness
  ✓ Better CTA hierarchy
  ✓ More elegant logo section
  ✓ Elevated hover states
  ✓ More consistent typography
  ✓ Better visual balance
*/

import React, {
    useLayoutEffect,
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';

import { gsap } from 'gsap';

import { GoArrowUpRight } from 'react-icons/go';

import { useTheme } from '../ThemeContext';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    items,
    className = '',
    ease = 'power4.out',
    baseColor = 'rgba(0,0,0,0.78)',
}) => {
    const { theme, toggleTheme } = useTheme();

    const [isHamburgerOpen, setIsHamburgerOpen] =
        useState(false);

    const [isExpanded, setIsExpanded] =
        useState(false);

    const containerRef =
        useRef<HTMLDivElement | null>(null);

    const navRef =
        useRef<HTMLDivElement | null>(null);

    const cardsRef = useRef<HTMLDivElement[]>(
        []
    );

    const tlRef =
        useRef<gsap.core.Timeline | null>(null);

    /**
     * TOGGLE
     */
    const toggleMenu = useCallback(() => {
        const tl = tlRef.current;

        if (!tl) return;

        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);

            tl.play(0);
        } else {
            setIsHamburgerOpen(false);

            tl.eventCallback(
                'onReverseComplete',
                () => setIsExpanded(false)
            );

            tl.reverse();
        }
    }, [isExpanded]);

    /**
     * CLOSE OUTSIDE
     */
    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                isExpanded &&
                containerRef.current &&
                !containerRef.current.contains(
                    event.target as Node
                )
            ) {
                toggleMenu();
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
    }, [isExpanded, toggleMenu]);

    /**
     * DYNAMIC HEIGHT
     */
    const calculateHeight = useCallback(() => {
        const navEl = navRef.current;

        if (!navEl) return 340;

        const isMobile = window.matchMedia(
            '(max-width: 768px)'
        ).matches;

        if (isMobile) {
            return 420;
        }

        return 340;
    }, []);

    /**
     * TIMELINE
     */
    const createTimeline = useCallback(() => {
        const navEl = navRef.current;

        if (!navEl) return null;

        gsap.set(navEl, {
            height: 74,
            overflow: 'hidden',
        });

        gsap.set(cardsRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.96,
            filter: 'blur(10px)',
        });

        const tl = gsap.timeline({
            paused: true,
        });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.7,
            ease,
        });

        tl.to(
            cardsRef.current,
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.08,
                ease,
            },
            '-=0.35'
        );

        return tl;
    }, [ease, calculateHeight]);

    /**
     * INIT
     */
    useLayoutEffect(() => {
        const tl = createTimeline();

        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [items, createTimeline]);

    /**
     * RESIZE
     */
    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            tlRef.current.kill();

            const newTl = createTimeline();

            if (!newTl) return;

            if (isExpanded) {
                newTl.progress(1);
            }

            tlRef.current = newTl;
        };

        window.addEventListener(
            'resize',
            handleResize
        );

        return () =>
            window.removeEventListener(
                'resize',
                handleResize
            );
    }, [isExpanded, createTimeline]);



    /**
     * KEYBOARD
     */
    const handleKeyDown = (
        e: React.KeyboardEvent
    ) => {
        if (
            e.key === 'Enter' ||
            e.key === ' '
        ) {
            e.preventDefault();

            toggleMenu();
        }
    };

    const setCardRef =
        (i: number) =>
            (el: HTMLDivElement | null) => {
                if (el) cardsRef.current[i] = el;
            };

    return (
        <div
            ref={containerRef}
            className={`fixed left-1/2 -translate-x-1/2 top-5 md:top-7 z-[120] w-[92%] max-w-[1280px] ${className}`}
        >
            <nav
                ref={navRef}
                className="relative overflow-hidden rounded-[30px] border border-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
                style={{
                    background: baseColor,
                }}
            >
                {/* TOP BAR */}
                <div className="relative h-[74px] px-4 md:px-6 flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                        {/* HAMBURGER */}
                        <button
                            onClick={toggleMenu}
                            onKeyDown={handleKeyDown}
                            aria-label={
                                isExpanded
                                    ? 'Close menu'
                                    : 'Open menu'
                            }
                            aria-expanded={isExpanded}
                            className="group relative w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center transition-all duration-300 hover:bg-white/[0.06]"
                        >
                            <div className="relative w-5 h-5">

                                <span
                                    className={`absolute left-0 top-[6px] h-[1.5px] w-5 bg-white transition-all duration-300 ${isHamburgerOpen
                                            ? 'rotate-45 top-[9px]'
                                            : ''
                                        }`}
                                />

                                <span
                                    className={`absolute left-0 bottom-[6px] h-[1.5px] w-5 bg-white transition-all duration-300 ${isHamburgerOpen
                                            ? '-rotate-45 bottom-[9px]'
                                            : ''
                                        }`}
                                />
                            </div>
                        </button>

                        {/* LOGO */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">

                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.4}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 3L4 14h6v7l9-11h-6V3z"
                                    />
                                </svg>
                            </div>

                            <div className="hidden sm:flex flex-col leading-none">
                                <span className="text-[18px] font-semibold tracking-[-0.04em] text-white">
                                    CreatorOS
                                </span>

                                <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/28">
                                    Creator Infrastructure
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CENTER LINKS */}
                    <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                        {[
                            'Features',
                            'Solutions',
                            'Testimonials',
                            'Pricing',
                        ].map((item, i) => (
                            <button
                                key={i}
                                className="text-[14px] tracking-[-0.02em] text-white/45 hover:text-white transition-colors duration-300"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">

                        {/* THEME TOGGLE */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={
                                theme === 'dark'
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }
                            className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                        >
                            {theme === 'dark' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="5"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12.79A9 9 0 1111.21 3"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* CTA */}
                        <button className="hidden md:inline-flex items-center gap-3 h-12 px-6 rounded-2xl border border-white/10 bg-white text-black text-[14px] font-medium tracking-[-0.02em] hover:scale-[1.02] transition-all duration-300">
                            Start for free

                            <GoArrowUpRight size={16} />
                        </button>
                    </div>
                </div>

                {/* EXPANDED CONTENT */}
                <div
                    className={`absolute left-0 right-0 top-[74px] p-4 md:p-5 ${isExpanded
                            ? 'visible pointer-events-auto'
                            : 'invisible pointer-events-none'
                        }`}
                >
                    <div className="grid md:grid-cols-3 gap-4">
                        {(items || [])
                            .slice(0, 3)
                            .map((item, idx) => (
                                <div
                                    key={`${item.label}-${idx}`}
                                    ref={setCardRef(idx)}
                                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 min-h-[220px] flex flex-col"
                                >

                                    {/* LIGHT */}
                                    <div className="absolute inset-x-0 top-0 h-24 bg-white/[0.02]" />

                                    {/* CONTENT */}
                                    <div className="relative z-10 flex flex-col h-full">

                                        <div>
                                            <span className="text-[11px] uppercase tracking-[0.25em] text-white/28">
                                                {item.label}
                                            </span>

                                            <h3 className="mt-5 text-[28px] leading-[1] tracking-[-0.05em] font-semibold text-white">
                                                {item.label}
                                            </h3>
                                        </div>

                                        {/* LINKS */}
                                        <div className="mt-auto pt-10 flex flex-col gap-4">
                                            {item.links?.map(
                                                (lnk, i) => (
                                                    <a
                                                        key={`${lnk.label}-${i}`}
                                                        href={lnk.href}
                                                        aria-label={
                                                            lnk.ariaLabel
                                                        }
                                                        className="group inline-flex items-center gap-3 text-[15px] text-white/55 hover:text-white transition-colors duration-300"
                                                    >
                                                        <GoArrowUpRight
                                                            className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                                                            size={15}
                                                        />

                                                        {lnk.label}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default CardNav;