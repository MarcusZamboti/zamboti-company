import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Zap,
  Shield,
  ArrowRight,
  MessageCircle,
  Phone,
  Cpu,
  Globe,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/zamboti/Logo";
import StatusDashboard from "@/components/zamboti/StatusDashboard";
import OptimizationSlider from "@/components/zamboti/OptimizationSlider";
import ProjectCalculator from "@/components/zamboti/ProjectCalculator";
import PromoModal from "@/components/zamboti/PromoModal";

/**
 * Zamboti Company - Tech Elegante Moderno
 * Design Philosophy: High-tech minimalista com contraste preto profundo/dourado
 * Colors: Preto profundo (#080808), Dourado (#d4af37), Acentos em Bronze/Creme
 * Typography: Poppins (títulos), Inter (corpo)
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <a href="#servicos" className="text-white/70 hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#otimizacao" className="text-white/70 hover:text-primary transition-colors">
              Otimização
            </a>
            <a href="#simulador" className="text-white/70 hover:text-primary transition-colors">
              Simulador
            </a>
            <a href="#faq" className="text-white/70 hover:text-primary transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#simulador"
              className="hidden sm:inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl border border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-all"
            >
              Simular Orçamento
            </a>
            <a
              href="https://wa.me/5511982326883"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-primary text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Contato</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[radial-gradient(ellipse_at_center,#121212_0%,#080808_100%)]">
        {/* Background glow animations */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core pitch */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3  py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Suporte TI & Desenvolvimento de Alta Performance
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                  Tecnologia que impulsiona sua empresa,{" "}
                  <span className="text-primary text-glow">elevada ao máximo.</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Manutenção especializada para fazer seu computador voar, sites ultra-rápidos que atraem clientes e consultoria de TI robusta para sua infraestrutura nunca parar.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#simulador"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-black font-bold text-sm tracking-wide px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  Simular Projeto <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#otimizacao"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold text-sm tracking-wide px-8 py-4 rounded-xl transition-all"
                >
                  Ver Otimização
                </a>
              </div>

              {/* Status pills row */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Uptime Garantido 99.9%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>PageSpeed 95+ Otimizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Suporte Rápido e Seguro</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Status Dashboard */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <StatusDashboard />
            </div>

          </div>
        </div>
      </section>

      {/* Infinite Technology/Benefit Marquee */}
      <section className="py-5 bg-black border-y border-white/5 overflow-hidden">
        <div className="animate-marquee-container">
          <div className="animate-marquee-content">
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Cpu className="w-4 h-4 text-primary" /> OTIMIZAÇÃO DE HARDWARE
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Globe className="w-4 h-4 text-primary" /> SITES & E-COMMERCE
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Shield className="w-4 h-4 text-primary" /> SEGURANÇA DE REDE
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Zap className="w-4 h-4 text-primary" /> PERFORMANCE EXTREMA
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Sparkles className="w-4 h-4 text-primary" /> CLOUD & BACKUP
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
          </div>
          {/* Duplicate content to make seamless animation */}
          <div className="animate-marquee-content" aria-hidden="true">
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Cpu className="w-4 h-4 text-primary" /> OTIMIZAÇÃO DE HARDWARE
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Globe className="w-4 h-4 text-primary" /> SITES & E-COMMERCE
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Shield className="w-4 h-4 text-primary" /> SEGURANÇA DE REDE
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Zap className="w-4 h-4 text-primary" /> PERFORMANCE EXTREMA
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest text-white/50">
              <Sparkles className="w-4 h-4 text-primary" /> CLOUD & BACKUP
            </span>
            <span className="text-primary font-bold text-lg">&bull;</span>
          </div>
        </div>
      </section>

      {/* Services Hub */}
      <section id="servicos" className="py-20 md:py-28 bg-[#0B0B0B] relative">
        <div className="container max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider font-mono">
              Nossas Soluções
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Infraestrutura Digital de <span className="text-primary">Ponta a Ponta</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Seja na manutenção física do seu hardware ou na criação de plataformas de vendas modernas, nós entregamos resultados profissionais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1: PC Support */}
            <Card className="relative overflow-hidden border-white/5 bg-black/40 p-8 rounded-2xl hover:border-primary/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all group flex flex-col justify-between min-h-[360px]">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
              
              <div className="space-y-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                  <Cpu className="w-7 h-7 text-primary" />
                </div>
                
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    Hardware & Manutenção
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Diagnósticos avançados, limpeza profissional completa com troca de pasta térmica importada e upgrades de peças (SSD/RAM) para extrair a máxima velocidade do seu computador.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-6 border-t border-white/5 font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Limpeza Física e Química</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Diagnóstico Completo de Peças</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Instalação de SSD e RAM</span>
                </div>
              </div>
            </Card>

            {/* Service Card 2: Web Dev */}
            <Card className="relative overflow-hidden border-white/5 bg-black/40 p-8 rounded-2xl hover:border-primary/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all group flex flex-col justify-between min-h-[360px] md:translate-y-4">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
              
              <div className="space-y-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    Sites & Lojas Virtuais
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Desenvolvimento de páginas com design premium de alta conversão, plataformas e-commerce seguras e estruturação de SEO técnico para sua empresa dominar as pesquisas do Google.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-6 border-t border-white/5 font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Landing Pages de Conversão</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Sistemas de E-commerce Completos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Indexação no Google (SEO Técnico)</span>
                </div>
              </div>
            </Card>

            {/* Service Card 3: IT Consulting */}
            <Card className="relative overflow-hidden border-white/5 bg-black/40 p-8 rounded-2xl hover:border-primary/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all group flex flex-col justify-between min-h-[360px]">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
              
              <div className="space-y-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    Redes & Consultoria TI
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Instalação e gestão de redes corporativas estruturadas, configuração de backups automáticos em nuvem para prevenir perdas de dados e suporte técnico preventivo contínuo.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-6 border-t border-white/5 font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Backups Periódicos Automatizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Wi-Fi Empresarial e Cabeamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Gestão de Servidores Locais e Nuvem</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </section>

      {/* Before / After Drag Comparison Slider */}
      <section id="otimizacao" className="py-20 md:py-28 bg-black relative border-y border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container max-w-7xl mx-auto px-4">
          <OptimizationSlider />
        </div>
      </section>

      {/* Structured Method section */}
      <section className="py-20 md:py-28 bg-[#0B0B0B]">
        <div className="container max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider font-mono">
              O Método
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Como Fazemos a <span className="text-primary font-bold">Diferença</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Um processo técnico focado em diagnósticos precisos e execução transparente para garantir que sua tecnologia seja sua melhor aliada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl relative space-y-4">
              <span className="text-5xl font-extrabold text-primary/10 font-mono absolute top-4 right-4">01</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Diagnóstico Técnico</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Análise aprofundada da integridade física do seu hardware ou dos gargalos técnicos de SEO, carregamento e design do seu site atual.
              </p>
            </div>

            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl relative space-y-4">
              <span className="text-5xl font-extrabold text-primary/10 font-mono absolute top-4 right-4">02</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Estratégia sob Medida</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Planejamos a melhor estrutura de peças para upgrades, ou a arquitetura ideal de páginas e copywriting de conversão para o site do seu negócio.
              </p>
            </div>

            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl relative space-y-4">
              <span className="text-5xl font-extrabold text-primary/10 font-mono absolute top-4 right-4">03</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Execução & Validação</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Implementamos as soluções e validamos tudo através de testes rigorosos de benchmark de hardware ou auditorias de performance no Google.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Project Calculator */}
      <section id="simulador" className="py-20 md:py-28 bg-black relative border-y border-white/5">
        <div className="container max-w-7xl mx-auto px-4">
          <ProjectCalculator />
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section id="faq" className="py-20 md:py-28 bg-[#0B0B0B]">
        <div className="container max-w-4xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider font-mono">
              FAQ Estratégico
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Dúvidas <span className="text-primary">Frequentes</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Encontre respostas rápidas sobre nossos serviços, prazos de entrega e atendimento.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            
            <AccordionItem value="faq-1" className="border border-white/10 bg-black/40 rounded-xl px-5">
              <AccordionTrigger className="text-left font-bold text-sm sm:text-base hover:text-primary py-4">
                Quanto tempo demora para otimizar meu computador?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                A manutenção física completa (limpeza + pasta térmica + upgrade) costuma levar no máximo 24 horas úteis. O prazo pode variar de acordo com a necessidade de importar peças específicas de reposição, o que é informado previamente.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border border-white/10 bg-black/40 rounded-xl px-5">
              <AccordionTrigger className="text-left font-bold text-sm sm:text-base hover:text-primary py-4">
                Como os sites desenvolvidos pela Zamboti ajudam a vender mais?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                Nossos projetos unem três pilares essenciais: design premium (que gera credibilidade instantânea), velocidade extrema (para diminuir a desistência de carregamento) e SEO técnico integrado (para atrair tráfego qualificado de pesquisas do Google direto para seus canais de atendimento).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border border-white/10 bg-black/40 rounded-xl px-5">
              <AccordionTrigger className="text-left font-bold text-sm sm:text-base hover:text-primary py-4">
                Vocês atendem empresas com suporte mensal de TI?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                Sim! Possuímos planos sob medida de suporte de TI corporativo preventivo. Monitoramos a rede, mantemos a infraestrutura de computadores atualizada, configuramos backups automáticos e criamos políticas de segurança para que a sua empresa nunca sofra com paradas inesperadas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border border-white/10 bg-black/40 rounded-xl px-5">
              <AccordionTrigger className="text-left font-bold text-sm sm:text-base hover:text-primary py-4">
                A Zamboti atende projetos fora da minha região?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                Sim. Toda a parte de desenvolvimento de softwares, sites, lojas virtuais e consultorias em nuvem é feita de forma remota com abrangência nacional e internacional. Para a manutenção de hardware física, atendemos presencialmente na região metropolitana de São Paulo ou através do envio seguro de equipamentos pelos Correios/transportadora.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Logo />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Desenvolvimento web inteligente, otimização física de computadores e infraestrutura de TI focada em performance empresarial e conversão.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 font-mono">Serviços</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <a href="#servicos" className="hover:text-primary transition-colors">Manutenção de Hardware</a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-primary transition-colors">Sites & Landing Pages</a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-primary transition-colors">Lojas Virtuais</a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-primary transition-colors">Contratos de TI Mensais</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 font-mono">Links Úteis</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <a href="#servicos" className="hover:text-primary transition-colors">Nossas Soluções</a>
                </li>
                <li>
                  <a href="#otimizacao" className="hover:text-primary transition-colors">Antes & Depois</a>
                </li>
                <li>
                  <a href="#simulador" className="hover:text-primary transition-colors">Calculadora de Escopo</a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors">Dúvidas Comuns</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 font-mono">Canais de Contato</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground font-mono">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <a href="https://wa.me/5511982326883" className="hover:text-primary transition-colors">
                    (11) 98232-6883
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+5511982326883" className="hover:text-primary transition-colors">
                    (11) 98232-6883
                  </a>
                </li>
                <li>
                  <span className="text-[10px] text-muted-foreground block uppercase font-sans tracking-wide">Suporte Emergencial</span>
                  <span className="text-white text-xs">Atendimento em horário comercial</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Zamboti Company. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0 font-mono">
              <span className="text-white/40">Premium Tech Elegante</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp Button */}
      <a
        href="https://wa.me/5511982326883?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Zamboti%20Company%20sobre%20um%20servi%C3%A7o."
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(37,211,102,0.4)] hover:bg-[#20BA56] hover:scale-110 transition-all duration-300 group"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Tooltip */}
        <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-black/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-white font-sans pointer-events-none">
          Chamar no WhatsApp
        </span>
      </a>

      {/* Floating Offer / Promo widget (No Monkey) */}
      <PromoModal />
    </div>
  );
}

