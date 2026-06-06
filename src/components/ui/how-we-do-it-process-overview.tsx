import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { ArrowUpRight } from 'lucide-react';

// Interface for individual process card props
interface ProcessCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

// Reusable Process Card Component
const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, className }) => (
  <div className={cn("group relative w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all cursor-pointer duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:bg-neutral-900 text-left hover:-translate-y-0.5", className)}>
    {/* Decorative Line - Visible on larger screens */}
    <div className="absolute -left-[1px] top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-neutral-800 transition-colors group-hover:bg-blue-500/60 md:block" />
    <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-neutral-800 transition-colors group-hover:bg-blue-500/60 md:hidden" />

    {/* Icon Container */}
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl duration-300 border border-neutral-800 bg-neutral-950 text-blue-400 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
      <Icon className="h-5 w-5" />
    </div>

    {/* Content */}
    <div className="flex flex-col">
      <h3 className="mb-1.5 text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-neutral-400 leading-relaxed font-normal">{description}</p>
    </div>
  </div>
);

// Interface for the main section props
interface ProcessSectionProps {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  items: ProcessCardProps[];
  onButtonClick?: () => void;
}

// Main Process Section Component
export const ProcessSection: React.FC<ProcessSectionProps> = ({
  subtitle,
  title,
  description,
  buttonText,
  items,
  onButtonClick,
}) => {
  return (
    <section id="process" className="w-full bg-black py-20 px-6 sm:px-12 md:py-24 border-b border-neutral-900 relative overflow-hidden">
      {/* Cool Aura Glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-950/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-12 sm:px-4 md:grid-cols-3 md:gap-8 lg:gap-16 relative z-10">
        {/* Left Content */}
        <div className="flex flex-col items-start justify-center text-left md:col-span-1">
          <span className="mb-2.5 text-xs font-black uppercase tracking-widest text-blue-400">
            {subtitle}
          </span>
          <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase leading-tight">
            {title}
          </h2>
          <p className="mb-6 text-xs sm:text-sm text-neutral-450 leading-relaxed font-normal text-neutral-400">
            {description}
          </p>
          <Button 
            size="lg" 
            onClick={onButtonClick}
            className="hover:scale-105 active:scale-95 duration-300 transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold px-6 py-2.5 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-500"
          >
            {buttonText}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Right Content - Grid of Process Cards */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:col-span-2">
          {items.map((item, index) => (
            <ProcessCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
