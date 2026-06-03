import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RefreshCw, Check, Activity, Cpu, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StatusDashboard() {
  const [pcOptimizing, setPcOptimizing] = useState(false);
  const [pcSpeed, setPcSpeed] = useState(42);
  const [optimizationStep, setOptimizationStep] = useState(0);
  const [uptime, setUptime] = useState(99.98);
  const [webPerformance, setWebPerformance] = useState(98);
  
  // Simulation steps for optimization
  const steps = [
    "Escaneando arquivos temporários...",
    "Limpando cache do sistema...",
    "Removendo bloatwares em segundo plano...",
    "Ajustando configurações de registro...",
    "Otimizando memória RAM..."
  ];

  // Simulates small uptime fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => {
        const diff = (Math.random() - 0.5) * 0.01;
        const next = prev + diff;
        return Number(Math.max(99.95, Math.min(100.00, next)).toFixed(3));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleOptimize = async () => {
    if (pcOptimizing) return;
    
    setPcOptimizing(true);
    setOptimizationStep(0);
    
    // Cycle through steps
    for (let i = 0; i < steps.length; i++) {
      setOptimizationStep(i);
      // Wait for a bit for each step
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    // Finalize boost animation
    setPcSpeed(99);
    setPcOptimizing(false);
  };

  const handleReset = () => {
    if (pcOptimizing) return;
    setPcSpeed(42);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-black/60 border border-primary/20 rounded-2xl p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Background soft glow effect */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      {/* Decorative Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-muted-foreground ml-2 font-mono uppercase tracking-wider">
            Zamboti-OS v2.4.1
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Module 1: PC SPEED SIMULATOR */}
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-white">Desempenho do PC</h3>
            </div>
            {pcSpeed === 99 && !pcOptimizing && (
              <button 
                onClick={handleReset}
                className="text-[10px] text-muted-foreground hover:text-white transition-colors"
                title="Resetar simulação"
              >
                Resetar
              </button>
            )}
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-4 items-center">
            {/* Speed Meter Graph */}
            <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className={`h-full ${
                  pcSpeed < 50 
                    ? "bg-gradient-to-r from-red-500 to-amber-500" 
                    : "bg-gradient-to-r from-amber-400 to-primary"
                }`}
                initial={{ width: "42%" }}
                animate={{ width: `${pcSpeed}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
              <div className="absolute inset-0 flex items-center justify-end pr-3">
                <span className="text-[9px] font-mono text-white/70 font-semibold">
                  {pcSpeed}%
                </span>
              </div>
            </div>

            {/* Optimize Button */}
            <Button
              size="sm"
              disabled={pcOptimizing}
              onClick={handleOptimize}
              className={`w-full text-xs font-semibold ${
                pcSpeed === 99 
                  ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : "bg-primary text-black hover:bg-primary/90"
              }`}
            >
              {pcOptimizing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : pcSpeed === 99 ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Voando
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 mr-1" />
                  Otimizar
                </>
              )}
            </Button>
          </div>

          {/* Console Output for steps */}
          <div className="h-10 bg-black/40 border border-white/5 rounded-lg p-2 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {pcOptimizing ? (
                <motion.div
                  key={`step-${optimizationStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] text-primary font-mono text-center"
                >
                  {steps[optimizationStep]}
                </motion.div>
              ) : pcSpeed === 99 ? (
                <motion.div
                  key="done"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" /> Otimização Concluída! PC está voando.
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="text-[10px] text-muted-foreground font-mono text-center"
                >
                  Status: Sistema lento detectado. Clique em Otimizar.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Module 2: WEB PERFORMANCE & SEO */}
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-white">Performance do Site</h3>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Qualidade Zamboti</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Score 1 */}
            <div className="flex flex-col items-center p-2.5 bg-black/40 border border-white/5 rounded-lg text-center relative group">
              <div className="w-11 h-11 rounded-full border-2 border-emerald-500/80 flex items-center justify-center text-sm font-bold font-mono text-emerald-400 group-hover:scale-105 transition-transform">
                {webPerformance}
              </div>
              <span className="text-[10px] font-semibold mt-2 text-white/90">Performance</span>
            </div>

            {/* Score 2 */}
            <div className="flex flex-col items-center p-2.5 bg-black/40 border border-white/5 rounded-lg text-center relative group">
              <div className="w-11 h-11 rounded-full border-2 border-emerald-500/80 flex items-center justify-center text-sm font-bold font-mono text-emerald-400 group-hover:scale-105 transition-transform">
                100
              </div>
              <span className="text-[10px] font-semibold mt-2 text-white/90">SEO Técnico</span>
            </div>

            {/* Score 3 */}
            <div className="flex flex-col items-center p-2.5 bg-black/40 border border-white/5 rounded-lg text-center relative group">
              <div className="w-11 h-11 rounded-full border-2 border-emerald-500/80 flex items-center justify-center text-sm font-bold font-mono text-emerald-400 group-hover:scale-105 transition-transform">
                100
              </div>
              <span className="text-[10px] font-semibold mt-2 text-white/90">Acessibilidade</span>
            </div>
          </div>
        </div>

        {/* Module 3: INFRASTRUCTURE / BACKUP UPTIME */}
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-white">Disponibilidade de Rede</h3>
            </div>
            <span className="text-[11px] font-mono text-primary font-bold">
              Uptime {uptime}%
            </span>
          </div>

          {/* Simple simulated graphic wave */}
          <div className="h-12 flex items-end gap-1 px-1 bg-black/30 border border-white/5 rounded-lg overflow-hidden">
            {[45, 55, 60, 50, 75, 80, 70, 65, 85, 90, 80, 85, 99, 95, 98, 99, 99.98].map((val, idx) => (
              <motion.div
                key={idx}
                className="flex-1 bg-gradient-to-t from-primary/30 to-primary rounded-t-sm"
                initial={{ height: 0 }}
                animate={{ height: `${(val / 100) * 100}%` }}
                transition={{ delay: idx * 0.02, duration: 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle details on bottom */}
      <div className="mt-5 text-[10px] text-muted-foreground flex items-center justify-between font-mono">
        <span>CPU: 12% | RAM: 3.2GB / 16GB</span>
        <span>LATÊNCIA: 14ms</span>
      </div>
    </div>
  );
}
