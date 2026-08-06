import React, { useState } from "react";
import { useLocation } from "wouter";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Logo from "@/components/zamboti/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, ShieldCheck, ShieldAlert, Loader2, ArrowLeft, Award, Calendar, Clock, User } from "lucide-react";

interface Certificate {
  id: string;
  student_name: string;
  course_name: string;
  hours: number;
  issue_date: string;
  instructor: string;
  status: string;
}

export default function VerifyCertificate() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setChecked(false);
    setCertificate(null);

    const formattedCode = code.trim().toUpperCase();

    try {
      // 1. Search in Supabase if configured
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("zamboti_certificates")
          .select("*")
          .eq("id", formattedCode)
          .maybeSingle();

        if (data && !error) {
          setCertificate(data as Certificate);
          setChecked(true);
          setLoading(false);
          return;
        }
      }

      // 2. Fallback to LocalStorage
      const savedCerts = localStorage.getItem("zamboti_crm_certificates");
      if (savedCerts) {
        const parsed = JSON.parse(savedCerts) as Certificate[];
        const match = parsed.find(c => c.id.toUpperCase() === formattedCode);
        if (match) {
          setCertificate(match);
          setChecked(true);
          setLoading(false);
          return;
        }
      }

      // If not found anywhere
      setCertificate(null);
      setChecked(true);
    } catch (err) {
      console.error("Erro ao validar certificado:", err);
      setCertificate(null);
      setChecked(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col selection:bg-primary selection:text-primary-foreground relative overflow-hidden font-sans">
      {/* Background glow decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-accent/10 rounded-full blur-3xl -z-10" />

      {/* Main Grid Header */}
      <header className="container max-w-5xl mx-auto px-4 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
        <Logo />
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="text-xs hover:bg-white/5 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao site
        </Button>
      </header>

      {/* Lookup Area */}
      <main className="flex-grow container max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center relative z-10">
        <div className="text-center space-y-4 max-w-lg mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider font-mono">
            Portal de Autenticidade
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Validador de Certificados
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Consulte a legitimidade dos certificados de cursos e treinamentos emitidos pela Zamboti Company digitando o código impresso no documento.
          </p>
        </div>

        <Card className="w-full bg-black/40 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="cert-code-input"
                type="text"
                placeholder="Código do Certificado (ex: ZAMB-XXXXXX)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm font-mono text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-all uppercase"
                disabled={loading}
                autoFocus
              />
            </div>
            <Button
              id="cert-verify-button"
              type="submit"
              disabled={loading || !code.trim()}
              className="bg-primary text-black hover:bg-primary/90 font-bold px-6 py-3.5 rounded-xl h-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Validar Código"
              )}
            </Button>
          </form>

          {/* Results display */}
          {checked && (
            <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
              {certificate ? (
                // SUCCESS CARD
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <ShieldCheck className="w-10 h-10 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-emerald-400">Certificado Autêntico & Válido</h3>
                      <p className="text-xs text-muted-foreground">Este documento foi emitido oficialmente e está registrado no sistema.</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl text-sm">
                    <div className="flex gap-2.5 items-start">
                      <User className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-mono tracking-wider">Aluno</span>
                        <span className="font-bold text-white/90">{certificate.student_name}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 items-start">
                      <Award className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-mono tracking-wider">Curso / Treinamento</span>
                        <span className="font-bold text-white/90">{certificate.course_name}</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Clock className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-mono tracking-wider">Carga Horária</span>
                        <span className="font-bold text-white/90">{certificate.hours} Horas Aula</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Calendar className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-mono tracking-wider">Data de Emissão</span>
                        <span className="font-bold text-white/90">
                          {new Date(certificate.issue_date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 pt-2 border-t border-white/5 flex flex-wrap justify-between items-center gap-3">
                      <div className="text-xs text-muted-foreground">
                        Instrutor: <strong className="text-white/80 font-semibold">{certificate.instructor}</strong>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Código de Validação: <strong className="text-white/80 font-mono">{certificate.id}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => setLocation(`/certificado/${certificate.id}`)}
                      className="bg-primary text-black hover:bg-primary/95 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      Visualizar Certificado Digital
                    </Button>
                  </div>
                </div>
              ) : (
                // ERROR CARD
                <div className="flex items-start gap-4 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <ShieldAlert className="w-10 h-10 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-red-400">Código não encontrado</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Não encontramos nenhum certificado associado ao código <strong className="text-white font-mono">{code.trim().toUpperCase()}</strong>. 
                      Verifique se digitou os caracteres corretamente (incluindo hífen e letras maiúsculas) ou contate nosso suporte se o problema persistir.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-xs text-muted-foreground relative z-10">
        <p>&copy; {new Date().getFullYear()} Zamboti Company. Validador Oficial de Cursos e Treinamentos.</p>
      </footer>
    </div>
  );
}
