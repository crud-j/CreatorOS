import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

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
    menuColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    items,
    className = '',
    ease = 'power3.out',
    // UI: Lowered opacity significantly (0.3) to let background elements show through more intensely
    baseColor = 'rgba(255, 255, 255, 0.03)',
    menuColor = '#fff', // UI: White navigation text/burger menu for high contrast
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isExpanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                toggleMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });

        gsap.set(cardsRef.current, {
            y: 40,
            opacity: 0,
            scale: 0.95,
            filter: 'blur(12px)'
        });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease,
            stagger: 0.08
        }, '-=0.2');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            ref={containerRef}
            className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl backdrop-saturate-150 relative overflow-hidden will-change-[height] transition-shadow duration-300`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20`}
                        onClick={toggleMenu}
                        onKeyDown={handleKeyDown}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        aria-expanded={isExpanded}
                        tabIndex={0}
                        style={{ color: menuColor }}
                    >
                        <div
                            className={`hamburger-line w-[28px] h-[2px] bg-current transition-all duration-300 ease-in-out origin-center ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                                } group-hover:opacity-60`}
                        />
                        <div
                            className={`hamburger-line w-[28px] h-[2px] bg-current transition-all duration-300 ease-in-out origin-center ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                                } group-hover:opacity-60`}
                        />
                    </div>

                    <div className="logo-container flex items-center gap-2.5 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-white font-black text-xl tracking-tight hidden sm:block">Creator<span className="text-white/60 font-medium">OS</span></span>
                    </div>

                    <button
                        type="button"
                        className="card-nav-cta-button hidden md:inline-flex border-0 shadow-lg shadow-pink-500/25 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-[10px] px-5 items-center h-[70%] font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2"
                    >
                        Start for free
                    </button>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-3 flex flex-col items-stretch gap-3 justify-start z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                        } md:flex-row md:items-end md:gap-[12px]`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-2 p-4 rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] border border-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label font-semibold tracking-tight text-[18px] md:text-[20px]">
                                {item.label}
                            </div>
                            <div className="nav-card-links mt-auto flex flex-col gap-1">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link group inline-flex items-center gap-2 no-underline cursor-pointer transition-all duration-300 text-[14px] md:text-[15px] hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm w-fit"
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon shrink-0 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;