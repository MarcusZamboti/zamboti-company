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
        <div className="absolute -inset-1.5 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="relative w-12 h-12 bg-slate-950/80 border border-white/10 rounded-xl flex items-center justify-center overflow-visible transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          {/* Subtle grid pattern inside icon */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:6px_6px] rounded-xl" />
          
          {/* Vector Z Conectado Logo */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-9 h-9 overflow-visible transition-transform duration-500 group-hover:scale-105"
          >
            <defs>
              {/* Cyan to Royal Blue Gradient */}
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              
              {/* Glowing filter */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            <g filter="url(#neonGlow)">
              {/* Trace 1 (Topmost Horizontal) */}
              <path 
                d="M 22,15 H 75" 
                fill="none" 
                stroke="url(#logoGradient)" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
              />

              {/* Trace 2 (Middle-Left Z) */}
              <path 
                d="M 10,32 H 70 L 22,85 H 65" 
                fill="none" 
                stroke="url(#logoGradient)" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Trace 3 (Right Z) */}
              <path 
                d="M 88,32 L 40,85 H 80" 
                fill="none" 
                stroke="url(#logoGradient)" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Trace 4 (Bottom Branch) */}
              <path 
                d="M 90,70 H 45 L 32,85" 
                fill="none" 
                stroke="url(#logoGradient)" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Nodes (Left/Cyan) */}
              <circle cx="22" cy="15" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="10" cy="32" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="22" cy="85" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="32" cy="85" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />

              {/* Nodes (Right/Blue) */}
              <circle cx="75" cy="15" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="88" cy="32" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="90" cy="70" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="65" cy="85" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="80" cy="85" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
            </g>
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
