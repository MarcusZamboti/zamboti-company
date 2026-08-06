import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* SVG Icon Logo */}
      <div className="relative flex-shrink-0">
        {/* Glow behind the icon on hover */}
        <div className="absolute -inset-1 bg-primary/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="relative w-11 h-11 bg-slate-950 border border-white/10 rounded-xl flex items-center justify-center overflow-visible transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          {/* Subtle grid pattern inside icon */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:6px_6px] rounded-xl" />
          
          {/* Vector Z Conectado Logo */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-8 h-8 overflow-visible transition-transform duration-500 group-hover:scale-105"
          >
            <defs>
              {/* Cyan to Royal Blue Gradient */}
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            
            {/* Main Z circuit tracks */}
            <path 
              d="M 25,25 H 75 L 25,75 H 75" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="7" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-all duration-500"
            />
            
            {/* Top secondary branch */}
            <path 
              d="M 40,13 H 65 L 75,25" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Bottom secondary branch */}
            <path 
              d="M 60,87 H 35 L 25,75" 
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Nodes at main vertices */}
            <circle cx="25" cy="25" r="5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" className="transition-transform duration-300 group-hover:scale-110" />
            <circle cx="75" cy="25" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" className="transition-transform duration-300 group-hover:scale-110" />
            <circle cx="25" cy="75" r="5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" className="transition-transform duration-300 group-hover:scale-110" />
            <circle cx="75" cy="75" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" className="transition-transform duration-300 group-hover:scale-110" />
            
            {/* Nodes at secondary branches */}
            <circle cx="40" cy="13" r="3.5" fill="#06B6D4" />
            <circle cx="60" cy="87" r="3.5" fill="#2563EB" />
          </svg>
        </div>
      </div>

      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <span className="text-xl font-bold tracking-wider text-white font-exo uppercase leading-none group-hover:text-primary transition-colors duration-300">
            Zamboti
          </span>
          <span className="text-[8px] uppercase tracking-[0.25em] text-primary font-medium mt-1 flex items-center gap-1.5 leading-none">
            <span className="h-[1px] w-2 bg-primary/40 group-hover:w-3 group-hover:bg-primary/80 transition-all duration-300"></span>
            Company
            <span className="h-[1px] w-2 bg-primary/40 group-hover:w-3 group-hover:bg-primary/80 transition-all duration-300"></span>
          </span>
        </div>
      )}
    </div>
  );
}
