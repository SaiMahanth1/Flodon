"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

// Stylized dynamic winged logo matching Flodon's identity
const LocalLogo = ({ showText = true }: { showText?: boolean }) => (
  <div className="flex items-center gap-2 cursor-pointer select-none">
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 100 100" 
      fill="none" 
      className="inline-block shrink-0 transition-transform duration-300 hover:scale-110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nav-logo-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="nav-logo-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="nav-logo-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {/* Top swoosh */}
      <path 
        d="M 12,85 C 10,75 14,50 30,35 C 45,22 75,15 95,15 C 80,24 55,25 35,35 C 22,42 18,58 12,85 Z" 
        fill="url(#nav-logo-grad-1)" 
      />
      {/* Middle swoosh */}
      <path 
        d="M 22,88 C 22,78 25,60 38,48 C 48,38 72,32 88,32 C 75,39 55,40 38,48 C 28,54 24,68 22,88 Z" 
        fill="url(#nav-logo-grad-2)" 
      />
      {/* Bottom swoosh */}
      <path 
        d="M 32,90 C 33,83 36,70 46,61 C 54,53 68,48 80,48 C 70,53 54,54 44,61 C 38,66 35,76 32,90 Z" 
        fill="url(#nav-logo-grad-3)" 
      />
    </svg>
    {showText && (
      <span className="font-sans font-black text-xs sm:text-sm tracking-[0.25em] text-white">
        FL<span className="inline-flex items-center justify-center w-2.5 h-2.5 mx-0.5 rounded-full border border-blue-500 bg-blue-600/20"><span className="w-1 h-1 rounded-full bg-blue-400"></span></span>D<span className="inline-flex items-center justify-center w-2.5 h-2.5 mx-0.5 rounded-full border border-blue-500 bg-blue-600/20"><span className="w-1 h-1 rounded-full bg-blue-400"></span></span>N
      </span>
    )}
  </div>
);

const navItems = [
  { label: "Home", sectionId: "hero" },
  { label: "Services", sectionId: "services" },
  { label: "Case Studies", sectionId: "case-studies" },
  { label: "Simulator", sectionId: "simulator" },
  { label: "Contact", sectionId: "contact" },
];

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyTop?: boolean;
  onBookCall?: () => void;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyTop = true,
  onBookCall,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleScroll = (sectionId: string, idx: number) => {
    setActiveIndex(idx);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy to update active index based on scroll position
  useEffect(() => {
    const observers = navItems.map((item, idx) => {
      const element = document.getElementById(item.sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px", // Focus on viewport center
          threshold: 0,
        }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  return (
    <>
      <div 
        id="modernic-nav-wrapper"
        className={cn(
          "w-full z-50 text-white transition-all duration-300 px-4",
          stickyTop ? "fixed top-6 left-0 right-0" : "relative"
        )}
      >
        {/* Main Floating Glassmorphic Pill Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className={cn(
            "mx-auto w-full max-w-5xl h-[58px] rounded-full border border-neutral-800/80 bg-neutral-950/65 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-between px-5 py-2 relative z-50",
            className
          )}
        >
          {/* LEFT: Logo area */}
          <div 
            onClick={() => handleScroll("hero", 0)}
            className="flex items-center shrink-0 pr-2"
          >
            {/* Show icon + text on desktop, icon only on smaller viewports */}
            <div className="hidden sm:block">
              <LocalLogo showText={true} />
            </div>
            <div className="block sm:hidden">
              <LocalLogo showText={false} />
            </div>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 h-full relative">
            {navItems.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.label}
                  onClick={() => handleScroll(item.sectionId, idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative px-4 py-2 text-[10.5px] uppercase font-bold tracking-[0.12em] font-sans h-9 rounded-full select-none cursor-pointer flex items-center justify-center transition-colors duration-250",
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  )}
                  type="button"
                >
                  {/* Dynamic Spring Background Slide Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="modernicActiveIndicator"
                      className="absolute inset-0 bg-white/10 border border-white/5 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Gentle hover capsule backing */}
                  {hoveredIndex === idx && !isActive && (
                    <motion.span
                      layoutId="modernicHoverIndicator"
                      className="absolute inset-0 bg-neutral-800/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}

                  <span className="relative z-10 leading-none">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: CTA Button & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0 pl-2">
            {/* Book a Call CTA Joly Button inside the pill */}
            <button
              onClick={() => {
                if (onBookCall) {
                  onBookCall();
                } else {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-white hover:bg-neutral-200 text-black text-[10.5px] uppercase font-sans font-black tracking-[0.14em] px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer h-9 flex items-center justify-center"
              type="button"
            >
              BOOK CALL
            </button>

            {/* Mobile hamburger toggle (only visible on mobile/tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-blue-400 transition-colors cursor-pointer select-none"
              type="button"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Dropdown Expandable Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2.5 mx-auto w-full max-w-5xl rounded-[1.75rem] border border-neutral-800/80 bg-neutral-950/90 backdrop-blur-xl p-5 shadow-2xl flex flex-col gap-2 relative z-40 md:hidden text-left"
            >
              <span className="text-[9px] font-black tracking-widest text-neutral-500 uppercase block mb-2 px-3">
                Menu Navigation
              </span>
              <div className="flex flex-col gap-1 w-full">
                {navItems.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleScroll(item.sectionId, idx)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-sans uppercase font-bold tracking-wider flex items-center justify-between cursor-pointer text-left transition-colors",
                        isActive 
                          ? "bg-blue-600/10 text-blue-400 border border-blue-900/40" 
                          : "text-neutral-400 hover:text-white"
                      )}
                      type="button"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className={cn("w-3.5 h-3.5 opacity-60 transition-transform", isActive && "rotate-45 opacity-100 text-blue-400")} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default BottomNavBar;
