import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Logo from "@/components/zamboti/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer, ArrowLeft, Loader2, Award, Calendar, ShieldCheck, CheckCircle } from "lucide-react";

interface Certificate {
  id: string;
  student_name: string;
  course_name: string;
  hours: number;
  issue_date: string;
  instructor: string;
  status: string;
}

export default function ViewCertificate({ params }: { params: { code: string } }) {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      const code = params.code.trim().toUpperCase();
      try {
        // 1. Search in Supabase
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from("zamboti_certificates")
            .select("*")
            .eq("id", code)
            .maybeSingle();

          if (data && !error) {
            setCertificate(data as Certificate);
            setLoading(false);
            return;
          }
        }

        // 2. Search in LocalStorage fallback
        const savedCerts = localStorage.getItem("zamboti_crm_certificates");
        if (savedCerts) {
          const parsed = JSON.parse(savedCerts) as Certificate[];
          const match = parsed.find(c => c.id.toUpperCase() === code);
          if (match) {
            setCertificate(match);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Erro ao buscar certificado:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [params.code]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
        <p className="text-sm text-muted-foreground">Buscando certificado digital...</p>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-4 font-sans text-center">
        <Card className="max-w-md bg-black/60 border border-red-500/20 p-8 rounded-3xl space-y-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold">Certificado Não Encontrado</h1>
          <p className="text-sm text-muted-foreground">
            O certificado com o código <strong className="text-white font-mono">{params.code.toUpperCase()}</strong> não existe ou foi removido do sistema.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setLocation("/validar")} className="bg-primary text-black font-bold">
              Ir para o Validador
            </Button>
            <Button onClick={() => setLocation("/")} variant="outline" className="border-white/10 text-white">
              Página Inicial
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Formatting date
  const issueDateFormatted = new Date(certificate.issue_date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center py-8 px-4 relative overflow-hidden font-sans select-none">
      {/* Background glow styling (hidden on print) */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 no-print" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 no-print" />

      {/* Top Action Panel (hidden on print) */}
      <div className="w-full max-w-[900px] mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 no-print bg-[#0F172A]/80 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/validar")}
            className="text-xs hover:bg-white/5 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar
          </Button>
          <span className="h-4 w-[1px] bg-white/10" />
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Código autenticado: <strong className="text-white font-mono">{certificate.id}</strong>
          </span>
        </div>
        
        <Button 
          onClick={handlePrint}
          className="bg-primary text-black hover:bg-primary/90 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Printer className="w-4 h-4" />
          Imprimir Certificado / Salvar PDF
        </Button>
      </div>

      {/* CERTIFICATE CONTAINER (Landscape A4-ratio) */}
      <div className="print-full w-full max-w-[960px] aspect-[1.414/1] bg-slate-950 border-[10px] border-double border-primary/20 rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col justify-between relative shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Certificate Border Details (Fine circuit design lines) */}
        <div className="absolute inset-2 border border-primary/10 rounded-2xl pointer-events-none" />
        
        {/* Diagonal glowing corners */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/5 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-accent/5 rounded-full blur-xl pointer-events-none" />

        {/* Certificate Watermark in Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%]">
            <path d="M 22,15 H 75 L 22,85 H 75" fill="none" stroke="#FFFFFF" strokeWidth="8" />
          </svg>
        </div>

        {/* Top Header Section */}
        <div className="flex justify-between items-start z-10">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.3em] font-mono text-primary font-bold uppercase">Zamboti Academy</span>
            <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Cursos & Treinamentos de TI</h4>
          </div>
          <Logo iconOnly className="opacity-90 scale-95" />
        </div>

        {/* Core Content */}
        <div className="text-center space-y-6 md:space-y-8 my-auto z-10">
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.1em] font-exo uppercase text-white leading-none">
              Certificado de Conclusão
            </h1>
            <p className="text-xs sm:text-sm text-primary font-mono tracking-wider italic font-medium">
              de Curso Particular de Tecnologia
            </p>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Certificamos, para os devidos fins de validação e comprovação curricular, que
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-exo text-primary text-glow uppercase tracking-wide leading-none py-1">
            {certificate.student_name}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            concluiu com êxito o curso particular de <strong className="text-white font-semibold">{certificate.course_name}</strong> ministrado pela <strong className="text-white font-semibold">Zamboti Company</strong>, com carga horária total de <strong className="text-white font-semibold font-mono">{certificate.hours} horas</strong> de atividades letivas e avaliativas, concluído no dia <strong className="text-white font-semibold">{issueDateFormatted}</strong>.
          </p>
        </div>

        {/* Bottom Signatures Block */}
        <div className="grid grid-cols-2 gap-8 items-end z-10 pt-4">
          {/* Left Signature */}
          <div className="text-center space-y-2 flex flex-col items-center">
            {/* Elegant Signature script name */}
            <div className="h-10 flex items-center justify-center">
              <span className="font-serif italic text-lg sm:text-xl text-white/60 tracking-wider font-mono">
                {certificate.instructor}
              </span>
            </div>
            <div className="w-full max-w-[200px] h-[1px] bg-white/20" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-white/90 leading-none">Marcus Zamboti</p>
              <p className="text-[8px] text-muted-foreground leading-none">Instrutor & Diretor de TI</p>
            </div>
          </div>

          {/* Right Signature */}
          <div className="text-center space-y-2 flex flex-col items-center">
            {/* Seal or Verification symbol */}
            <div className="h-10 flex items-center justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono font-bold tracking-wider uppercase">
                <CheckCircle className="w-3.5 h-3.5" />
                Selo de Autenticidade
              </div>
            </div>
            <div className="w-full max-w-[200px] h-[1px] bg-white/20" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-white/90 leading-none">Zamboti Company</p>
              <p className="text-[8px] text-muted-foreground leading-none">Assinado Digitalmente</p>
            </div>
          </div>
        </div>

        {/* Bottom Details Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-white/5 pt-4 mt-6 text-[8px] text-muted-foreground/80 font-mono z-10">
          <span>
            Chave de Validação: <strong className="text-white">{certificate.id}</strong>
          </span>
          <span className="text-center sm:text-right">
            Verifique a autenticidade deste documento em: <strong className="text-primary">zamboticompany.com.br/validar</strong>
          </span>
        </div>

      </div>

      {/* Embedded print css rules */}
      <style>{`
        @media print {
          body, html {
            background: #020617 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-full {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(1.05) !important;
            width: 900px !important;
            max-width: 900px !important;
            aspect-ratio: 1.414 / 1 !important;
            border-[10px] border-double border-[#06B6D4]/30 !important;
            background: #020617 !important;
            border-radius: 20px !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 40px !important;
            page-break-inside: avoid !important;
          }
        }
        @page {
          size: A4 landscape;
          margin: 0;
        }
      `}</style>

    </div>
  );
}
