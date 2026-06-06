/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
  Calendar,
  Check,
  Send,
  Sparkles,
  AlertCircle,
  ArrowUpRight,
  MessageSquare,
  PhoneCall,
  Workflow,
  TrendingUp,
  ChevronRight,
  Menu,
  X,
  Users,
  BookOpen,
  Layers,
  HeartHandshake,
  BrainCircuit,
  Target,
  PenTool,
  Code,
  Megaphone
} from 'lucide-react';

import { ServiceCarousel, type Service } from './components/ui/services-card';
import { ProcessSection } from './components/ui/how-we-do-it-process-overview';
import { BottomNavBar } from './components/ui/bottom-nav-bar';
import { Button } from './components/ui/joly-button';
import { TestimonialsColumn } from './components/ui/testimonials-columns-1';

// Flodon Logo (Stylized dynamic wings logo) matching the uploaded image exactly
const Logo = ({ showText = false, dark = false }: { showText?: boolean; dark?: boolean }) => (
  <div className="flex items-center gap-2">
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 100 100" 
      fill="none" 
      className="inline-block shrink-0 transition-transform duration-250 hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="logo-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {/* Top brush stroke/swoosh */}
      <path 
        d="M 12,85 C 10,75 14,50 30,35 C 45,22 75,15 95,15 C 80,24 55,25 35,35 C 22,42 18,58 12,85 Z" 
        fill="url(#logo-grad-1)" 
      />
      {/* Middle brush stroke/swoosh */}
      <path 
        d="M 22,88 C 22,78 25,60 38,48 C 48,38 72,32 88,32 C 75,39 55,40 38,48 C 28,54 24,68 22,88 Z" 
        fill="url(#logo-grad-2)" 
      />
      {/* Bottom brush stroke/swoosh */}
      <path 
        d="M 32,90 C 33,83 36,70 46,61 C 54,53 68,48 80,48 C 70,53 54,54 44,61 C 38,66 35,76 32,90 Z" 
        fill="url(#logo-grad-3)" 
      />
    </svg>
    {showText && (
      <span className={`font-black text-xs sm:text-sm tracking-[0.25em] font-sans flex items-center select-none ${dark ? 'text-white' : 'text-gray-900'}`}>
        FL<span className={`inline-flex items-center justify-center w-2.5 h-2.5 mx-0.5 rounded-full border ${dark ? 'border-blue-500 bg-blue-600/20' : 'border-gray-900 bg-gray-900/10'}`}><span className="w-1 h-1 rounded-full bg-blue-400"></span></span>D<span className={`inline-flex items-center justify-center w-2.5 h-2.5 mx-0.5 rounded-full border ${dark ? 'border-blue-500 bg-blue-600/20' : 'border-gray-900 bg-gray-900/10'}`}><span className="w-1 h-1 rounded-full bg-blue-400"></span></span>N
      </span>
    )}
  </div>
);

export default function App() {
  // Navigation & Floating Sticky States
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showFittingModal, setShowFittingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form Booking fields
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '2026-06-15',
    department: 'Sales Automation',
    notes: ''
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success'>('idle');

  // Services data list configured dynamically for our Carousel component
  const servicesData: Service[] = [
    {
      number: "01",
      title: "AI CONVERSION & LEAD GENERATION",
      description: "We build inbound and outbound AI agents that actively engage visitors, qualify leads via WhatsApp, and book calls effortlessly 24/7.",
      icon: MessageSquare,
      gradient: "from-blue-950/40 to-neutral-900/40 border-blue-900/30",
      onExplore: () => {
        setBookingFormData({ ...bookingFormData, department: 'Sales Automation', notes: 'Interested in AI Lead Conversion systems' });
        setShowFittingModal(true);
      }
    },
    {
      number: "02",
      title: "AUTOMATED WORKFLOWS & CRM",
      description: "Replace manual bottlenecks with intelligent internal systems. We connect your data pipelines to automate follow-ups, logging, and day-to-day operations.",
      icon: Workflow,
      gradient: "from-blue-950/40 to-neutral-900/40 border-blue-900/30",
      onExplore: () => {
        setBookingFormData({ ...bookingFormData, department: 'Workflow Automation', notes: 'Interested in Automated Workflows and CRM sync integration' });
        setShowFittingModal(true);
      }
    },
    {
      number: "03",
      title: "AI PERSONAL BRANDING & CONTENT",
      description: "Scale your presence instantly. Turn single conversations into dozens of highly engaging content pieces with AI-driven scripts and viral video outlines.",
      icon: Sparkles,
      gradient: "from-blue-950/40 to-neutral-900/40 border-blue-900/30",
      onExplore: () => {
        setBookingFormData({ ...bookingFormData, department: 'Marketing Systems', notes: 'Interested in AI Content Multiplier Pipelines & Personal branding outlines' });
        setShowFittingModal(true);
      }
    },
    {
      number: "04",
      title: "VOICE AGENT & CALL SYSTEMS",
      description: "Deploy conversational AI voice systems capable of calling inbound leads under 60 seconds, conducting smart screening, and performing live advisor transfers.",
      icon: PhoneCall,
      gradient: "from-blue-950/40 to-neutral-900/40 border-blue-900/30",
      onExplore: () => {
        setBookingFormData({ ...bookingFormData, department: 'Sales Automation', notes: 'Interested in AI Voice Calling and Conversational Outbound systems' });
        setShowFittingModal(true);
      }
    }
  ];

  // Dynamic process steps list adhering to the original brand context
  const processItemsData = [
    {
      icon: BrainCircuit,
      title: 'Forensic System Audit',
      description: 'We sit down with you to forensically examine where human bottlenecks are destroying team throughput.'
    },
    {
      icon: Target,
      title: 'AI Architecture Design',
      description: 'Meticulously design a custom state machine logic mapping precisely to your specific operational gaps.'
    },
    {
      icon: PenTool,
      title: 'Prompt & Flow Creation',
      description: 'Draft advanced prompt guardrails, custom knowledge libraries, and seamless interaction paths.'
    },
    {
      icon: Code,
      title: 'API & CRM Integrations',
      description: 'Fully integrate the AI agents and action bridges into your HubSpot, Salesforce, or SQL databases.'
    },
    {
      icon: ShieldCheck,
      title: 'Dynamic Safety Testing',
      description: 'Conduct strict edge-case simulation, prompt injection stress testing, and pipeline live dry runs.'
    },
    {
      icon: Megaphone,
      title: 'Live Launch & Staging',
      description: 'Deploy live under telemetry supervision. We analyze conversations monthly to relentlessly compound performance.'
    }
  ];

  // Animated Scrolling Testimonials Dataset
  const testimonialsData = [
    {
      text: "Every week another software tool reaches out to see if I want them to automate my workflows. I'm always like, absolutely not, Flodon builds AI systems that are 1000x better and more reliable than anything I could piece together. Thank you. You rock.",
      name: "Jack Rhysider",
      role: "Dental Clinic Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "This is awesome! Great to see. Our no-shows dropped by over 60% once the AI voice agent started confirming and rescheduling appointments autonomously.",
      name: "Jason Shuman",
      role: "Med Spa Director",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "Glanced at the system architecture and loved it :) Inbound organic leads tripled within 60 days of deploying the AI content pipeline.",
      name: "Guy Podjarny",
      role: "Real Estate Broker",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "We saved over 30 hours per week by automating our intake processing. Documents are read, categorized, and pushed directly to our CRM within 2 seconds.",
      name: "Briana Patton",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "The low-latency audio response on the voice bots is incredibly human. Clients don't even realize they're speaking with an AI assistant.",
      name: "Bilal Ahmed",
      role: "IT Director",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "Flodon built an advanced pay-slip analyzer that handles our entire mortgage broker pipeline. It reduced underwriting turnaround from 4 days to 4 minutes.",
      name: "Aliza Khan",
      role: "Mortgage Consultant",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "Implementing their custom prompt guardrails took our client-facing chatbots from simple FAQs to complex, transactional scheduling agents flawlessly.",
      name: "Samar Malik",
      role: "Support Advisor",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "Our manual data entry errors have dropped to zero. The telemetry logs and self-healing pipelines make handling complex APIs absolute child's play.",
      name: "Zainab Hussain",
      role: "Project Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    },
    {
      text: "Outstanding communication and top-tier execution. The ROI of connecting our legacy customer databases to active LLM routing rules was felt in week two.",
      name: "Farhan Siddiqui",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const firstColumn = testimonialsData.slice(0, 3);
  const secondColumn = testimonialsData.slice(3, 6);
  const thirdColumn = testimonialsData.slice(6, 9);

  // Interactive Live Use Case Simulator (Lending Workflow Automation)
  const [activeStudyTab, setActiveStudyTab] = useState<string>('lending');

  // Lending Tab States
  const [grossIncome, setGrossIncome] = useState<number>(100000);
  const [propertyPrice, setPropertyPrice] = useState<number>(400000);
  const [deposit, setDeposit] = useState<number>(45000);

  // Sales Tab States
  const [dealValue, setDealValue] = useState<number>(5000);
  const [monthlyLeads, setMonthlyLeads] = useState<number>(350);
  const [closeRate, setCloseRate] = useState<number>(15);

  // CRM Tab States
  const [recordsCount, setRecordsCount] = useState<number>(12000);
  const [legacySystems, setLegacySystems] = useState<number>(4);
  const [teamErrors, setTeamErrors] = useState<number>(45);

  // Custom User query in simulator
  const [userQuery, setUserQuery] = useState('');
  const [customMessages, setCustomMessages] = useState<any[]>([]);

  // Telemetry real-time dynamic logs state
  const [systemUptime, setSystemUptime] = useState<string>("99.98%");
  const [activePipelines, setActivePipelines] = useState<number>(14);

  // Dynamic values calculation for lending simulation
  const loanRequired = propertyPrice - deposit;
  const ltvValue = propertyPrice > 0 ? (loanRequired / propertyPrice) * 100 : 0;
  const standardBorrowMultiplier = grossIncome * 4.5;
  const isPreQualified = loanRequired <= standardBorrowMultiplier && ltvValue < 95;

  // Dynamic values calculation for Sales simulation
  const estMonthlyRevenue = monthlyLeads * (closeRate / 100) * dealValue;
  const estRoiMultiplier = estMonthlyRevenue > 0 ? Number(((dealValue * monthlyLeads * (closeRate / 100)) / 2500).toFixed(1)) : 10.5;
  const estConversions = Math.floor(monthlyLeads * (closeRate / 100));

  // Dynamic values calculation for CRM simulation
  const avgHoursSaved = teamErrors * 1.5 + (recordsCount / 200);

  // Sync simulator updates to document/state
  useEffect(() => {
    // Dynamically randomize uptime and pipeline logs slightly to feel active
    const interval = setInterval(() => {
      setSystemUptime((99.95 + Math.random() * 0.04).toFixed(2) + "%");
      setActivePipelines((prev) => Math.max(8, Math.min(24, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Standard dialogue matching context text perfectly
  const defaultSimulatorDialogue = 
    activeStudyTab === 'lending' ? [
      {
        id: 1,
        sender: 'user',
        text: `Hi! Gross combined income is £${grossIncome.toLocaleString()}. Property price is £${propertyPrice.toLocaleString()}, and our deposit is £${deposit.toLocaleString()}.`
      },
      {
        id: 2,
        sender: 'ai',
        text: `Got it! That is an **${ltvValue.toFixed(2)}% LTV** multiple. Based on a standard 4.5x income capacity (£${standardBorrowMultiplier.toLocaleString()}), you ${isPreQualified ? 'could qualify to borrow up to £' + standardBorrowMultiplier.toLocaleString() + '. You are pre-qualified!' : 'currently require £' + loanRequired.toLocaleString() + ' which exceeds typical standard capacity of £' + standardBorrowMultiplier.toLocaleString() + '. We suggest adding custom manual advisor routing.'}`
      },
      {
        id: 3,
        sender: 'user',
        text: "Perfect, let's schedule the call."
      }
    ] : activeStudyTab === 'sales' ? [
      {
        id: 1,
        sender: 'user',
        text: `We generate ${monthlyLeads} inbound leads monthly, with an average deal size of £${dealValue.toLocaleString()} and a close rate of ${closeRate}%.`
      },
      {
        id: 2,
        sender: 'ai',
        text: `Got it! With a ${closeRate}% conversion rate, you close around ${estConversions} high-tier accounts. Based on that throughput, your potential monthly revenue pipeline is **£${estMonthlyRevenue.toLocaleString()}**. With our speed-to-lead workflow, your projected ROI is **${estRoiMultiplier}x**!`
      },
      {
        id: 3,
        sender: 'user',
        text: "Perfect, let's schedule the call."
      }
    ] : [
      {
        id: 1,
        sender: 'user',
        text: `Our team bridges ${legacySystems} legacy software clients, managing ${recordsCount.toLocaleString()} synced slots. Internal errors average ${teamErrors} each month.`
      },
      {
        id: 2,
        sender: 'ai',
        text: `Analyzing pipeline... Connecting your ${legacySystems} systems with automated prompt guardrails reduces human errors from ${teamErrors} to **0**. This workflow saves your internal operators approximately **${avgHoursSaved.toFixed(1)} hours** every single month.`
      },
      {
        id: 3,
        sender: 'user',
        text: "Perfect, let's schedule the call."
      }
    ];

  const currentDialogue = customMessages.length > 0 ? customMessages : defaultSimulatorDialogue;

  // Dynamic Favicon Generation with 4K-sharp high-res canvas scaling
  useEffect(() => {
    document.title = "Flodon — AI Automation";

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Scale up coordinate system 4x for ultra-sharp Retina rendering of 32px path layout
      ctx.scale(4, 4);

      // Draw shiny background dark circle
      ctx.fillStyle = '#0B0F19';
      ctx.beginPath();
      ctx.arc(16, 16, 15.5, 0, Math.PI * 2);
      ctx.fill();

      // Sharp glowing border ring
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Top swoosh
      ctx.fillStyle = '#60A5FA';
      ctx.beginPath();
      ctx.moveTo(6, 24);
      ctx.quadraticCurveTo(8, 15, 12, 10);
      ctx.quadraticCurveTo(19, 7, 27, 6);
      ctx.quadraticCurveTo(21, 9, 14, 14);
      ctx.quadraticCurveTo(10, 19, 6, 24);
      ctx.closePath();
      ctx.fill();

      // Middle swoosh
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.moveTo(9, 26);
      ctx.quadraticCurveTo(11, 19, 15, 15);
      ctx.quadraticCurveTo(21, 13, 25, 11);
      ctx.quadraticCurveTo(20, 14, 15, 18);
      ctx.quadraticCurveTo(12, 22, 9, 26);
      ctx.closePath();
      ctx.fill();

      // Bottom swoosh
      ctx.fillStyle = '#1D5CFF';
      ctx.beginPath();
      ctx.moveTo(12, 28);
      ctx.quadraticCurveTo(13, 23, 17, 20);
      ctx.quadraticCurveTo(21, 18, 23, 17);
      ctx.quadraticCurveTo(19, 20, 16, 23);
      ctx.quadraticCurveTo(14, 26, 12, 28);
      ctx.closePath();
      ctx.fill();

      const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
      (link as any).type = 'image/x-icon';
      (link as any).rel = 'shortcut icon';
      (link as any).href = canvas.toDataURL();
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, []);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery;
    setUserQuery('');

    // Append new messages simulation
    const conversation = [
      ...currentDialogue,
      {
        id: Date.now(),
        sender: 'user',
        text: query
      },
      {
        id: Date.now() + 1,
        sender: 'ai',
        text: activeStudyTab === 'lending' 
          ? `Custom CRM Sync active (Est. LTV: ${ltvValue.toFixed(2)}%). Automating pay slips & SA302 checks for ${grossIncome > 80000 ? 'High-Net-Worth' : 'Standard'} track. Routing context to scheduling modal.`
          : activeStudyTab === 'sales'
            ? `Sub-60s webhook queued for your ${monthlyLeads} leads. Sales routing rules updated for £${dealValue.toLocaleString()} avg deal ticket. Launching Calendly trigger.`
            : `Compiling data sync protocol for ${recordsCount.toLocaleString()} records across ${legacySystems} systems. Slack warning dispatched to verify integrity logs.`
      }
    ];
    setCustomMessages(conversation);
  };

  const handleBookFitting = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('success');
  };

  // Reset simulator values back to classic defaults matching context
  const handleResetSimulator = () => {
    setGrossIncome(100000);
    setPropertyPrice(400000);
    setDeposit(45000);
    setDealValue(5000);
    setMonthlyLeads(350);
    setCloseRate(15);
    setRecordsCount(12000);
    setLegacySystems(4);
    setTeamErrors(45);
    setCustomMessages([]);
  };

  return (
    <div id="flodon_agency_root" className="relative min-h-screen overflow-x-hidden bg-black font-sans antialiased text-white scroll-smooth selection:bg-blue-600 selection:text-white">
      
      {/* BACKGROUND VIDEO ELEMENT: Absolutely positioned, fullscreen backdrop behind the hero */}
      <div className="absolute inset-0 h-screen w-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <video
          id="hero_video_bg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-[1.15]"
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Soft, modern, professional dark/blue gradients to balance typography contrast */}
        {/* Left-to-right gradient ensures maximum legibility of the left-aligned hero text, while letting the right-side white prosthetic hand shine in full clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15 mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      </div>
      {/* Visual background wrapper */}

      {/* HERO SECTION CONTAINER: Bottom-Left alignment specified exactly */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-end pb-12 sm:pb-20 lg:pb-24 px-6 sm:px-12 md:px-20 lg:px-28 z-10">
        <div className="max-w-xl md:max-w-2xl text-left">

          {/* Dynamic Headline */}
          <h1 className="text-[2.25rem] sm:text-[3.25rem] leading-[1.08] font-extrabold text-white tracking-tight sm:max-w-xl mb-4 uppercase">
            Automating <br />
            <span className="text-blue-500">The Future</span>
          </h1>

          {/* Description subtext */}
          <p className="text-[14px] sm:text-[16px] text-neutral-300 font-normal leading-relaxed mb-6 max-w-lg">
            We build custom AI systems, autonomous agents, and intelligent workflows that replace repetitive tasks and scale your core business operations 24/7.
          </p>

          {/* Split Buttons Layout with smooth transitions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setShowFittingModal(true)}
              variant="shimmer"
              size="default"
              className="rounded-full flex items-center justify-center font-bold"
            >
              BOOK
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Button>
            <Button
              onClick={() => scrollTo('services')}
              variant="ghost"
              size="default"
              className="rounded-full text-neutral-450 hover:text-blue-400 font-semibold"
            >
              See Our Services
            </Button>
          </div>

        </div>
      </section>

      {/* INFINITE RUNNING MARQUEE RIBBON OVERLAY */}
      <div className="w-full bg-neutral-950 overflow-hidden py-3.5 text-white border-y border-neutral-900 shadow-xl">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex gap-8 text-[11px] sm:text-xs font-mono tracking-widest text-[#EDEDED]/90 uppercase shrink-0">
            <span>AI VOICE AGENTS · AI CHATBOTS · WHATSAPP AUTOMATION · PERSONAL BRANDING · WEBSITE AI · LEAD CONVERSION · 24/7 AUTOMATION</span>
            <span>· AI VOICE AGENTS · AI CHATBOTS · WHATSAPP AUTOMATION · PERSONAL BRANDING · WEBSITE AI · LEAD CONVERSION · 24/7 AUTOMATION</span>
            <span>· AI VOICE AGENTS · AI CHATBOTS · WHATSAPP AUTOMATION · PERSONAL BRANDING · WEBSITE AI · LEAD CONVERSION · 24/7 AUTOMATION</span>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-black border-b border-neutral-900 relative overflow-hidden">
        {/* Soft Aura Ambient Glow circles */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-950/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-950/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-wider block uppercase mb-1.5">What We Build</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">SERVICES</h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm mt-3 md:mt-0 leading-relaxed">
              Tailored automated architectures crafted to elevate outreach pipelines and maximize internal human team throughput.
            </p>
          </div>

          <div className="mt-8">
            <ServiceCarousel services={servicesData} />
          </div>
        </div>
      </section>

      {/* CASE STUDIES & SIMULATOR UNIFIED SECTION CONTAINER */}
      <section id="case-studies" className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-black border-b border-neutral-900 relative">
        <div id="simulator" className="max-w-6xl mx-auto">
          
          <div className="mb-12 text-left">
            <span className="text-xs font-bold text-blue-400 tracking-wider block uppercase mb-1.5">Bespoke Industry Solutions & Live Demo</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">SPECIALIZED SOLUTIONS IN ACTION</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              We build custom operational layers and autonomous engines optimized for high-value verticals. Click to swap tabs and adjust metrics on the simulator below.
            </p>
          </div>

          {/* Unified Screenshot Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT COLUMN: Use Case Vertical Swappers (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-4 justify-start">
              
              {/* Tab 1: Mortgage & Lending */}
              <div 
                onClick={() => { setActiveStudyTab('lending'); setCustomMessages([]); }}
                className={`group cursor-pointer text-left rounded-2xl p-6 border transition-all duration-300 ${
                  activeStudyTab === 'lending' 
                    ? 'border-blue-500 bg-neutral-900/80 shadow-[0_0_25px_rgba(59,130,246,0.12)]' 
                    : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-blue-400 transition-colors">
                    Mortgage & Lending
                  </h3>
                  <span className="text-[8px] font-mono tracking-widest font-extrabold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/40">
                    HIGH INTENT FOCUS
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Automate income intake, calculate instant pre-qualifications, and verify documents automatically.
                </p>
              </div>

              {/* Tab 2: High-Value Sales Teams */}
              <div 
                onClick={() => { setActiveStudyTab('sales'); setCustomMessages([]); }}
                className={`group cursor-pointer text-left rounded-2xl p-6 border transition-all duration-300 ${
                  activeStudyTab === 'sales' 
                    ? 'border-blue-500 bg-neutral-900/80 shadow-[0_0_25px_rgba(59,130,246,0.12)]' 
                    : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-blue-400 transition-colors">
                    High-Value Sales Teams
                  </h3>
                  <span className="text-[8px] font-mono tracking-widest font-extrabold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/40">
                    SPEED TO LEAD
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Book qualified calendar slots, trigger sub-60s callbacks, and sync lead details dynamically.
                </p>
              </div>

              {/* Tab 3: Internal CRM Operations */}
              <div 
                onClick={() => { setActiveStudyTab('crm'); setCustomMessages([]); }}
                className={`group cursor-pointer text-left rounded-2xl p-6 border transition-all duration-300 ${
                  activeStudyTab === 'crm' 
                    ? 'border-blue-500 bg-neutral-900/80 shadow-[0_0_25px_rgba(59,130,246,0.12)]' 
                    : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-blue-400 transition-colors">
                    Internal CRM Operations
                  </h3>
                  <span className="text-[8px] font-mono tracking-widest font-extrabold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/40">
                    ERROR PROOF
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Link databases, trigger Slack alerts on hot metrics, and eliminate manual copy-pasting.
                </p>
              </div>

            </div>

            {/* RIGHT COLUMN: Master Unified Interactive Simulator Container (col-span-8) */}
            <div className="lg:col-span-8 border border-neutral-800 bg-[#07090F]/90 rounded-[2.25rem] p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(37,99,235,0.06)] flex flex-col justify-between relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 w-full">
                
                {/* Simulator text instructions block (col-span-7) */}
                <div className="lg:col-span-7 text-left flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[10px] font-black text-blue-400 tracking-widest block uppercase mb-2">
                      {activeStudyTab === 'lending' ? 'USE CASE SIMULATOR' : activeStudyTab === 'sales' ? 'CONVERSION SIMULATOR' : 'AUTOMATION CONTROLS'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 leading-[1.12]">
                      {activeStudyTab === 'lending' ? 'Lending Workflow Automation' : activeStudyTab === 'sales' ? 'Inbound Lead Automation' : 'CRM & Database Automation'}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                      {activeStudyTab === 'lending' 
                        ? 'We build intelligent ingestion pipelines for mortgage brokers. AI conversational systems calculate metrics instantly, verify documentation accuracy, and structure information for final human advisor approval.'
                        : activeStudyTab === 'sales'
                          ? 'We build intelligent callback routines and fast calendar routers. AI systems measure customer interest instantly, filter invalid tickets, and queue the record for immediate human team dial.'
                          : 'We bridge legacy databases with modern LLM guardrails. Sync customer logs, check compliance rules, and push records securely while alerting core developers of anomalies.'
                      }
                    </p>

                    <ul className="space-y-3 mb-8 w-full">
                      {(activeStudyTab === 'lending'
                        ? [
                            "Calculate combined LTV values dynamically",
                            "Auto-parse pay slips & SA302 forms (OCR)",
                            "Auto-populate Acre or Mortgage Brain CRM"
                          ]
                        : activeStudyTab === 'sales'
                          ? [
                              "Trigger sub-45s outbound dials on high-tier leads",
                              "Intelligently book validated slots based on agent availability",
                              "Push verified customer details direct to active pipelines"
                            ]
                          : [
                              "Bi-directional replication over secure REST sockets",
                              "Dispatch real-time Slack and email webhooks on exception alerts",
                              "Pre-validate inputs to enforce data formatting consistency"
                            ]
                      ).map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-neutral-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nested Adjustable Calibration Sliders inside the layout */}
                  <div className="bg-black/40 border border-neutral-800/80 rounded-2xl p-4.5 w-full mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black text-neutral-400 tracking-widest uppercase">
                        Adjust Variables
                      </span>
                      <Button 
                        onClick={handleResetSimulator}
                        variant="ghost"
                        size="sm"
                        className="text-[9px] font-bold text-neutral-400 hover:text-blue-400 uppercase py-0 px-2 h-auto cursor-pointer"
                      >
                        Reset ↺
                      </Button>
                    </div>

                    {activeStudyTab === 'lending' && (
                      <div className="space-y-4 font-normal">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Combined Income:</span>
                            <span className="text-blue-400 font-extrabold">£{grossIncome.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min="30000"
                            max="250000"
                            step="5000"
                            value={grossIncome}
                            onChange={(e) => {
                              setGrossIncome(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Property Price:</span>
                            <span className="text-blue-400 font-extrabold">£{propertyPrice.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min="100000"
                            max="900000"
                            step="10000"
                            value={propertyPrice}
                            onChange={(e) => {
                              setPropertyPrice(Number(e.target.value));
                              if (deposit >= Number(e.target.value)) setDeposit(Math.floor(Number(e.target.value) * 0.15));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Deposit Amount:</span>
                            <span className="text-blue-400 font-extrabold">£{deposit.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min="5000"
                            max={Math.min(250000, Math.floor(propertyPrice * 0.5))}
                            step="2500"
                            value={deposit}
                            onChange={(e) => {
                              setDeposit(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {activeStudyTab === 'sales' && (
                      <div className="space-y-4 font-normal">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Average Deal Value:</span>
                            <span className="text-blue-400 font-extrabold">£{dealValue.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={dealValue}
                            onChange={(e) => {
                              setDealValue(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Inbound Monthly Leads:</span>
                            <span className="text-blue-400 font-extrabold">{monthlyLeads} leads</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="3000"
                            step="50"
                            value={monthlyLeads}
                            onChange={(e) => {
                              setMonthlyLeads(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Close Conversion Rate:</span>
                            <span className="text-blue-400 font-extrabold">{closeRate}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            step="1"
                            value={closeRate}
                            onChange={(e) => {
                              setCloseRate(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {activeStudyTab === 'crm' && (
                      <div className="space-y-4 font-normal">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Database Records synced:</span>
                            <span className="text-blue-400 font-extrabold">{recordsCount.toLocaleString()} items</span>
                          </div>
                          <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={recordsCount}
                            onChange={(e) => {
                              setRecordsCount(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Connected Legacy Clients:</span>
                            <span className="text-blue-400 font-extrabold">{legacySystems} connectors</span>
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="12"
                            step="1"
                            value={legacySystems}
                            onChange={(e) => {
                              setLegacySystems(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-neutral-200 mb-1">
                            <span>Monthly Human Key-Errors:</span>
                            <span className="text-blue-400 font-extrabold">{teamErrors} events</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="200"
                            step="5"
                            value={teamErrors}
                            onChange={(e) => {
                              setTeamErrors(Number(e.target.value));
                              setCustomMessages([]);
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Live Preview Advisor Panel / Widget Block (col-span-12 or col-span-5) */}
                <div className="lg:col-span-5 w-full">
                  <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl relative">
                    
                    {/* Header bar widget matching phone preview perfectly */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800/80 mb-4 select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                        <span className="text-[10px] sm:text-xs font-bold text-neutral-200 font-sans tracking-tight">
                          {activeStudyTab === 'lending' ? 'Mortgage AI Advisor' : activeStudyTab === 'sales' ? 'Outbound Lead Dial' : 'CRM Monitor Node'}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-neutral-500 tracking-widest uppercase">
                        Active
                      </span>
                    </div>

                    {/* Chat dialog bubbles exactly as requested inside the phone frame */}
                    <div className="flex flex-col gap-3 min-h-[220px] max-h-[240px] overflow-y-auto mb-4 select-none scrollbar-thin">
                      {currentDialogue.map((msg, idx) => {
                        const isAgent = msg.sender === 'ai' || msg.sender === 'advisor';
                        return (
                          <div 
                            key={msg.id || idx} 
                            className={`p-3 rounded-2xl max-w-[90%] text-xs text-left leading-relaxed ${
                              isAgent 
                                ? 'bg-blue-600 font-medium text-white self-end rounded-tr-none shadow-[0_4px_12px_rgba(37,99,235,0.25)]' 
                                : 'bg-neutral-900 border border-neutral-800/60 text-neutral-200 self-start rounded-tl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat query text input block */}
                    <form onSubmit={handleCustomQuery} className="flex gap-2 items-center border border-neutral-800 bg-black/80 p-1 rounded-xl mb-4">
                      <input
                        type="text"
                        placeholder="Ask advisor or verify another..."
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none text-[11px] text-neutral-200 placeholder-neutral-500 font-sans focus:outline-none pl-2.5 h-8 focus:ring-0"
                      />
                      <Button 
                        type="submit"
                        variant="default"
                        size="sm"
                        className="rounded-lg text-[10px] tracking-wide font-extrabold uppercase h-7 cursor-pointer px-3 flex items-center justify-center.5"
                      >
                        Ask
                      </Button>
                    </form>

                    {/* Status widget metrics bar at the foot of preview */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-900 text-[10px] font-mono text-neutral-400 font-bold select-none">
                      <span>
                        {activeStudyTab === 'lending' 
                          ? `Est. LTV: ${ltvValue.toFixed(2)}%` 
                          : activeStudyTab === 'sales'
                            ? `Est. ROI: ${estRoiMultiplier}x`
                            : `Errors Solved: 100%`}
                      </span>
                      <span className="text-green-500 uppercase flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        {activeStudyTab === 'lending' ? 'CRM Synced' : activeStudyTab === 'sales' ? 'Agent Routed' : 'Slack Synced'}
                      </span>
                    </div>

                  </div>
                </div>

              </div>
              
              {/* Telemetry bottom line indicators */}
              <div className="flex flex-wrap gap-2 justify-between items-center text-[9px] text-neutral-500 font-mono font-bold tracking-widest uppercase mt-8 pt-4 border-t border-neutral-900 relative z-10 w-full">
                <span>SYSTEM UPTIME: {systemUptime}</span>
                <span>{activePipelines} REAL-TIME INTEGRATION NODES ACTIVE</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* THE PROCESS SECTION */}
      <ProcessSection
        subtitle="Our Model"
        title="How We Do It"
        description="We work on a typical matrix of time, effort, and money, following Agile methodologies to deliver exceptional results."
        buttonText="Book a Call"
        items={processItemsData}
        onButtonClick={() => setShowFittingModal(true)}
      />

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-black border-b border-neutral-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto z-10 relative">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-400 tracking-wider block uppercase mb-1.5">TESTIMONIALS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">What Our Clients Say</h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-3">
              See how vertical teams, clinic operators, and brokers leverage our low-latency agents and custom CRM automations to bypass manual processes.
            </p>
          </div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={16} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
          </div>
        </div>
      </section>


      {/* CONTACT / STRATEGY CALL FORM SECTION */}
      <section id="contact" className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-black border-b border-neutral-900 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-850 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white hover:border-blue-900/40 transition-all">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-lg mx-auto mb-10 relative z-10">
            <span className="text-xs font-bold text-blue-400 tracking-wider block uppercase mb-1.5">Work With Us</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase mb-3 text-center">Book a call</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Explore our custom suite of AI systems. Please note that we operate on waitlist schedules depending on horizontal complexity.
            </p>
          </div>

          <div className="text-center relative z-10">
            <Button
              onClick={() => {
                setBookingFormData({ ...bookingFormData, notes: "Direct landing booking via Strategy section." });
                setShowFittingModal(true);
              }}
              variant="glow"
              size="lg"
              className="rounded-full shadow-xl shadow-blue-500/20 px-8 py-4 sm:py-4.5 cursor-pointer text-xs sm:text-sm font-bold uppercase"
            >
              BOOK A CALL
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Button>
            <span className="block text-[10px] text-neutral-500 mt-3 font-semibold">
              Waitlist Priority: High-Net-Worth Vertical Teams & Mortgage Brokers
            </span>
          </div>

        </div>
      </section>

      {/* FOOTER AREA */}
      <footer className="bg-neutral-950 text-white pt-16 pb-8 px-6 sm:px-12 md:px-20 lg:px-28 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1 Logo details */}
          <div className="md:col-span-2 text-left">
            <div className="flex items-center mb-4 bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl w-fit">
              <Logo showText={true} dark={true} />
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-6 font-normal">
              AI Infrastructure & Systems. Leading custom workflow automation, low-latency audio pipelines, and enterprise scale integrations.
            </p>
            <div className="text-xs text-neutral-300 space-y-1">
              <div>Global Remote Operations</div>
              <div className="font-bold text-blue-400">+1 (555) 123-4567</div>
            </div>
          </div>

          {/* Column 2 Services */}
          <div className="text-left">
            <h4 className="text-[10px] font-black text-neutral-400 tracking-wider uppercase mb-4">SERVICES</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <li><button onClick={() => scrollTo('services')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Sales Inbound</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Internal Ops CRM</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">Automation Content</button></li>
            </ul>
          </div>

          {/* Column 3 Info Column */}
          <div className="text-left">
            <h4 className="text-[10px] font-black text-neutral-400 tracking-wider uppercase mb-4">COMPANY</h4>
            <ul className="space-y-2.5 text-xs text-[#EDEDED] font-semibold">
              <li><button onClick={() => scrollTo('case-studies')} className="hover:text-blue-400 transition-colors cursor-pointer">Case Studies</button></li>
              <li><button onClick={() => scrollTo('blog')} className="hover:text-blue-400 transition-colors cursor-pointer">Blog Insights</button></li>
              <li><button onClick={() => scrollTo('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">Get Contact</button></li>
              <li><span className="text-neutral-600 font-normal">Careers (We are hiring!)</span></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
          <div>
            © 2026 Flodon. All rights reserved. Registered Enterprise System.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* SESSION BOOKING MODAL */}
      {showFittingModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden transition-all duration-300 p-6 text-white text-left">
            
            <div className="flex justify-between items-start pb-4 border-b border-neutral-800 mb-4">
              <div className="text-left">
                <span className="text-[10px] font-black text-blue-400 tracking-widest block uppercase">WAITLIST ACCESS</span>
                <h3 className="text-base font-bold text-white">Book Flodon Session</h3>
              </div>
              <button
                onClick={() => {
                  setShowFittingModal(false);
                  setBookingStatus('idle');
                }}
                className="text-neutral-400 hover:text-white font-extrabold text-sm transition-colors p-1 text-right cursor-pointer"
              >
                ✕
              </button>
            </div>

            {bookingStatus === 'success' ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-emerald-950/80 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-800">
                  <Check className="w-6 h-6 border-2 border-emerald-400 rounded-full" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Call requested successfully</h4>
                <p className="text-xs text-neutral-300 max-w-xs mx-auto mb-5 leading-relaxed font-normal">
                  Our automation specialist will reach out shortly to <strong>{bookingFormData.email}</strong> to confirm your slot on <strong>{bookingFormData.preferredDate}</strong>.
                </p>
                <div className="p-3 bg-neutral-950 rounded-xl max-w-xs mx-auto mb-6 text-left border border-neutral-800">
                  <span className="text-[9px] font-bold text-neutral-400 block uppercase mb-1">TRANSACTION PARAMS TO SYNC</span>
                  <div className="text-[10px] font-mono text-neutral-400 space-y-0.5">
                    <div>• Department: {bookingFormData.department}</div>
                    <div>• Client: {bookingFormData.name}</div>
                    <div>• Phone: {bookingFormData.phone}</div>
                    <div>• Simulated Uptime: {systemUptime}</div>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    setShowFittingModal(false);
                    setBookingStatus('idle');
                  }}
                  variant="default"
                  size="default"
                  className="rounded-full shadow-lg shadow-blue-500/20 px-6 py-2.5 cursor-pointer max-w-fit"
                >
                  Return to Dashboard
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBookFitting} className="space-y-3.5 text-left">
                
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase text-left">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.name}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    placeholder="E.g., Jack Rhysider"
                    className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-neutral-700 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase text-left">Email Address</label>
                    <input
                      type="email"
                      required
                      value={bookingFormData.email}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                      placeholder="jack@domain.com"
                      className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase text-left">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={bookingFormData.phone}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase text-left">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={bookingFormData.preferredDate}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, preferredDate: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase text-left">Target Automation Track</label>
                    <select
                      value={bookingFormData.department}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, department: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white font-semibold transition-colors [&>option]:bg-neutral-900"
                    >
                      <option value="Sales Automation">Sales Lead Conversion</option>
                      <option value="Workflow Automation">Workflow CRM Sync</option>
                      <option value="Marketing Systems">Marketing Content Scaler</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase text-left">Tell Us About Your System Gaps</label>
                  <textarea
                    rows={2}
                    value={bookingFormData.notes}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                    placeholder="E.g. We wish to automate our inbound mortgage document flows directly to the CRM."
                    className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-white placeholder-neutral-700 transition-colors font-normal animate-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full text-white font-bold text-xs rounded-full py-3.5 shadow-lg shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    SUBMIT TO PRIORITY WAITLIST
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Button>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-neutral-500 justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  Request processed securely. Waitlist limits apply.
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Floating Interactive Top Navigation Pill Bar */}
      <BottomNavBar stickyTop={true} onBookCall={() => setShowFittingModal(true)} />

    </div>
  );
}
