import React, { useState, useRef } from "react";
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Clock, ShieldAlert, ShieldCheck } from "lucide-react";

export default function OptimizationSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center max-w-lg mx-auto">
        <h3 className="text-2xl font-bold text-white mb-2">
          Compare o Desempenho Real
        </h3>
        <p className="text-sm text-muted-foreground">
          Arraste o cursor abaixo para ver a diferença entre um sistema lento e um otimizado pela Zamboti.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-[380px] w-full rounded-2xl overflow-hidden border border-white/10 select-none cursor-ew-resize bg-black"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* BEFORE SIDE (Left/Red) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#110505] flex flex-col justify-center px-8 md:px-16 text-left"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          {/* Subtle grid red */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef44440a_1px,transparent_1px),linear-gradient(to_bottom,#ef44440a_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="relative z-10 space-y-6 max-w-[260px] sm:max-w-[320px] md:max-w-[350px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              Lento & Instável
            </div>
            
            <h4 className="text-3xl font-extrabold text-red-500 tracking-tight leading-none">
              Sem Zamboti
            </h4>
            
            <p className="text-xs sm:text-sm text-red-200/60 leading-relaxed">
              Computadores travando no meio do trabalho, sites lentos que perdem clientes e perda de tempo tentando resolver problemas simples de TI.
            </p>

            <div className="space-y-3 font-mono text-[10px] sm:text-xs text-red-400">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4" />
                <span>Tempo de carregamento: 4.8s (Lento)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Risco de vírus e perda de dados</span>
              </div>
            </div>
          </div>
        </div>

        {/* AFTER SIDE (Right/Blue-Cyan) - Overlay with Clip Path */}
        <div
          className="absolute inset-0 w-full h-full bg-[#0B1329] flex flex-col justify-center items-end px-8 md:px-16 text-right"
          style={{
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          {/* Subtle grid cyan */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="relative z-10 space-y-6 max-w-[260px] sm:max-w-[320px] md:max-w-[350px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Ultra Rápido & Seguro
            </div>
            
            <h4 className="text-3xl font-extrabold text-primary tracking-tight leading-none">
              Com Zamboti
            </h4>
            
            <p className="text-xs sm:text-sm text-primary/70 leading-relaxed">
              Seu PC voando com peças e limpeza em dia, sites carregando instantaneamente gerando orçamentos e TI estruturada para sua empresa rodar lisa.
            </p>

            <div className="space-y-3 font-mono text-[10px] sm:text-xs text-primary/80">
              <div className="flex items-center gap-2.5 justify-end">
                <span>Tempo de carregamento: 0.3s (Voando!)</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2.5 justify-end">
                <span>Infraestrutura monitorada e segura</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* SLIDER BAR / DRAG HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20 group"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border-4 border-black flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform">
            <ChevronLeft className="w-3.5 h-3.5 text-black absolute left-0.5" />
            <ChevronRight className="w-3.5 h-3.5 text-black absolute right-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
