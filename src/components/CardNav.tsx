import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import { gsap } from 'gsap';

import { GoArrowUpRight } from 'react-icons/go';

import { Sparkles, ChevronRight } from 'lucide-react';

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
  baseColor = 'rgba(8,8,10,0.78)',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null);

  const cardsRef = useRef<HTMLDivElement[]>([]);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /*
    TOGGLE
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

      tl.eventCallback('onReverseComplete', () =>
        setIsExpanded(false)
      );

      tl.reverse();
    }
  }, [isExpanded]);

  /*
    OUTSIDE CLICK
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

  /*
    HEIGHT
  */
  const calculateHeight = useCallback(() => {
    const isMobile = window.matchMedia(
      '(max-width: 768px)'
    ).matches;

    if (isMobile) {
      return 700;
    }

    return 390;
  }, []);

  /*
    TIMELINE
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
      y: 20,
      scale: 0.985,
      filter: 'blur(8px)',
    });

    const tl = gsap.timeline({
      paused: true,
    });

    tl.to(navEl, {
      height: calculateHeight(),
      duration: 0.68,
      ease,
    });

    tl.to(
      cardsRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.55,
        ease,
      },
      '-=0.38'
    );

    return tl;
  }, [ease, calculateHeight]);

  /*
    INIT
  */
  useLayoutEffect(() => {
    const tl = createTimeline();

    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [items, createTimeline]);

  /*
    RESIZE
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

  /*
    KEYBOARD
  */
  const handleKeyDown = (
    e: React.KeyboardEvent
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      toggleMenu();
    }
  };

  const setCardRef =
    (i: number) =>
    (el: HTMLDivElement | null) => {
      if (el) cardsRef.current[i] = el;
    };

  const centerLinks = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Features', href: '/#features' },
    { label: 'Examples', href: '/#examples' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div
      ref={containerRef}
      className={`
        fixed
        left-1/2
        top-4
        z-[140]
        w-[94%]
        max-w-[1180px]
        -translate-x-1/2
        transition-all
        duration-500
        ${className}
      `}
    >
      <nav
        ref={navRef}
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-white/[0.08]
          shadow-[0_12px_60px_rgba(0,0,0,0.42)]
          backdrop-blur-2xl
        "
        style={{
          background: baseColor,
        }}
      >
        {/* EDGE LIGHT */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/[0.08] via-transparent to-transparent" />

        {/* BG */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[-40%] h-[220px] w-[220px] rounded-full bg-white/[0.04] blur-[90px]" />

          <div className="absolute bottom-[-40%] right-[5%] h-[220px] w-[220px] rounded-full bg-white/[0.03] blur-[90px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]" />
        </div>

        {/* TOP BAR */}
        <div className="relative z-20 flex h-[74px] items-center justify-between px-4 md:px-6">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* MENU */}
            <button
              onClick={toggleMenu}
              onKeyDown={handleKeyDown}
              aria-label={
                isExpanded
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={isExpanded}
              className="
                relative
                flex
                h-[44px]
                w-[44px]
                items-center
                justify-center
                rounded-[16px]
                border
                border-white/[0.08]
                bg-white/[0.03]
                transition-all
                duration-300
                hover:bg-white/[0.05]
              "
            >
              <div className="relative h-4 w-4">
                <span
                  className={`
                    absolute
                    left-0
                    top-[4px]
                    h-px
                    w-4
                    rounded-full
                    bg-white
                    transition-all
                    duration-300
                    ${
                      isHamburgerOpen
                        ? 'top-[7px] rotate-45'
                        : ''
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    bottom-[4px]
                    left-0
                    h-px
                    w-4
                    rounded-full
                    bg-white
                    transition-all
                    duration-300
                    ${
                      isHamburgerOpen
                        ? 'bottom-[7px] -rotate-45'
                        : ''
                    }
                  `}
                />
              </div>
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div
                className="
                  relative
                  flex
                  h-[44px]
                  w-[44px]
                  items-center
                  justify-center
                  rounded-[16px]
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                "
              >
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/[0.08] to-transparent" />

                <Sparkles className="relative z-10 h-[15px] w-[15px] text-white" />
              </div>

              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-[-0.05em] text-white">
                  CreatorOS
                </span>

                <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-white/28">
                  Creative infrastructure
                </span>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {centerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  relative
                  text-[13px]
                  font-medium
                  tracking-[-0.02em]
                  text-white/50
                  transition-all
                  duration-300
                  hover:text-white
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center">
            <Link
              to="/signup"
              className="
                relative
                hidden
                h-[44px]
                items-center
                gap-2
                overflow-hidden
                rounded-[16px]
                border
                border-white/10
                bg-white
                px-5
                text-[13px]
                font-semibold
                tracking-[-0.02em]
                text-black
                transition-all
                duration-300
                hover:scale-[1.02]
                md:inline-flex
              "
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-white/90" />

              <span className="relative z-10">
                Start free
              </span>

              <GoArrowUpRight
                className="relative z-10"
                size={14}
              />
            </Link>
          </div>
        </div>

        {/* EXPANDED */}
        <div
          className={`
            absolute
            left-0
            right-0
            top-[74px]
            p-4
            md:p-5
            transition-all
            duration-300
            ${
              isExpanded
                ? 'visible opacity-100'
                : 'invisible pointer-events-none opacity-0'
            }
          `}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {(items || [])
              .slice(0, 3)
              .map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  ref={setCardRef(idx)}
                  className="
                    group
                    relative
                    flex
                    min-h-[190px]
                    flex-col
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-6
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:border-white/[0.12]
                    hover:bg-white/[0.04]
                  "
                >
                  {/* LIGHT */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-70" />

                  {/* NUMBER */}
                  <div className="absolute right-5 top-4 text-[48px] font-bold tracking-[-0.08em] text-white/[0.03]">
                    0{idx + 1}
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    {/* ACCENT */}
                    <div className="mb-5 h-px w-10 bg-gradient-to-r from-white/60 to-transparent transition-all duration-300 group-hover:w-14" />

                    {/* TITLE */}
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.24em] text-white/28">
                        {item.label}
                      </span>

                      <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.05em] text-white">
                        {item.label}
                      </h3>
                    </div>

                    {/* LINKS */}
                    <div className="mt-auto flex flex-col gap-3 pt-8">
                      {item.links?.map((lnk, i) => (
                        <a
                          key={`${lnk.label}-${i}`}
                          href={lnk.href}
                          aria-label={lnk.ariaLabel}
                          className="
                            group/link
                            inline-flex
                            items-center
                            justify-between
                            text-[13px]
                            text-white/50
                            transition-all
                            duration-300
                            hover:text-white
                          "
                        >
                          <div className="flex items-center gap-2">
                            <ChevronRight
                              size={13}
                              className="
                                opacity-40
                                transition-all
                                duration-300
                                group-hover/link:translate-x-[2px]
                                group-hover/link:opacity-100
                              "
                            />

                            <span>{lnk.label}</span>
                          </div>

                          <GoArrowUpRight
                            size={13}
                            className="
                              transition-all
                              duration-300
                              group-hover/link:translate-x-1
                              group-hover/link:-translate-y-1
                            "
                          />
                        </a>
                      ))}
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