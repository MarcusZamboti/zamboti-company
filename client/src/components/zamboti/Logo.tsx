import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Logo */}
      <div className="relative group flex-shrink-0">
        {/* Glow behind the icon on hover */}
        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative w-10 h-10 bg-black border border-primary/30 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary/80 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          {/* Subtle grid pattern inside icon */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:8px_8px]" />
          
          {/* Animated golden star in the corner */}
          <svg
            className="absolute top-1 right-1 w-3.5 h-3.5 text-primary animate-pulse transition-transform duration-500 group-hover:rotate-45"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>

          {/* </> symbol styled elegantly */}
          <svg
            className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            Zamboti<span className="text-primary font-extrabold text-2xl leading-none">.</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold -mt-1.5">
            Company
          </span>
        </div>
      )}
    </div>
  );
}
