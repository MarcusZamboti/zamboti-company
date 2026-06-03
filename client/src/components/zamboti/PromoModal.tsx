import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingWidget, setShowFloatingWidget] = useState(false);

  // Show floating widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingWidget(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleWhatsAppAction = () => {
    const text = `Olá Zamboti! Tenho interesse na Oferta Especial: Site Profissional + Otimização de Computador em até 12x de R$ 125,00. Como funciona?`;
    window.open(`https://wa.me/5511982326883?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* FLOATING PROMO WIDGET */}
      <AnimatePresence>
        {showFloatingWidget && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-40 cursor-pointer max-w-[280px] bg-black/80 border border-primary/30 p-4 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.2)] backdrop-blur-md hover:border-primary transition-all group hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)]"
          >
            {/* Pulsing indicator */}
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full" />

            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary text-[10px] uppercase font-bold tracking-widest font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Oferta Especial
              </div>
              <h5 className="font-extrabold text-sm text-white group-hover:text-primary transition-colors">
                Site Completo + Otimização
              </h5>
              <p className="text-[11px] text-muted-foreground leading-normal">
                12x de R$ 125,00. Design de alto impacto, SEO e PC rápido de trabalho!
              </p>
              <div className="flex justify-between items-center pt-1 text-[10px] text-primary font-bold">
                <span>VER DETALHES</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-xl bg-black border border-primary/30 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.15)] z-10 flex flex-col"
            >
              {/* Golden gradient header design (No image backgrounds to keep it light/elegant) */}
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-primary/10 via-black to-black border-b border-white/10 flex flex-col justify-end">
                {/* Floating particle effect in CSS */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#d4af3715_0%,transparent_50%)]" />
                
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/5"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider font-mono">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Zamboti Start Combo
                  </span>
                  <h4 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Acelere Seus Negócios e Sua Máquina
                  </h4>
                  <div className="text-2xl md:text-3xl font-extrabold text-primary font-mono pt-1">
                    12x de R$ 125,00
                    <span className="text-xs text-muted-foreground font-normal font-sans block mt-0.5">
                      ou R$ 1.250,00 à vista via Pix
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 md:p-8 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Criamos a sua estrutura de vendas na internet e garantimos que o seu computador de trabalho esteja rápido e otimizado para você produzir mais.
                </p>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-primary uppercase tracking-wider font-mono">
                    O que está incluso no pacote:
                  </h5>
                  
                  <div className="grid gap-3.5 text-xs text-white/90">
                    <div className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Site Profissional Completo</strong> com design moderno, responsivo e links integrados.</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>SEO Técnico Inicial</strong> estruturado para indexar no Google.</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Botão flutuante de WhatsApp</strong> para facilitar o contato de potenciais clientes.</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Otimização Física e Digital de 1 PC</strong> (limpeza interna completa + troca de pasta térmica de alta performance + formatação limpa inclusa).</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="border-white/10 hover:bg-white/5 text-white flex-1"
                  >
                    Talvez mais tarde
                  </Button>
                  <Button
                    onClick={handleWhatsAppAction}
                    className="bg-primary text-black hover:bg-primary/95 flex-1 font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Quero Garantir a Oferta
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
