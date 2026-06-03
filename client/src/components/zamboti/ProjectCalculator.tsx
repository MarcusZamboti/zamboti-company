import React, { useState } from "react";
import { Cpu, Globe, ShieldAlert, ArrowRight, Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ServiceType = "pc" | "web" | "infra";

interface Option {
  id: string;
  label: string;
  days: number;
}

export default function ProjectCalculator() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientDetails, setClientDetails] = useState("");

  // Configured options for each service category
  const optionsMap: Record<ServiceType, Option[]> = {
    pc: [
      { id: "limpeza", label: "Limpeza Física + Troca de Pasta Térmica Premium", days: 1 },
      { id: "formatacao", label: "Formatação Limpa com Backup de Dados Seguro", days: 1 },
      { id: "upgrade", label: "Upgrade de Hardware (Instalação de SSD/RAM)", days: 1 },
      { id: "virus", label: "Remoção de Vírus e Otimização de Performance OS", days: 1 }
    ],
    web: [
      { id: "landing", label: "Landing Page de Alta Conversão (Vendas de Serviço)", days: 5 },
      { id: "institucional", label: "Site Institucional Completo (Multi-páginas)", days: 10 },
      { id: "ecommerce", label: "Loja Virtual / E-commerce com Gestão de Estoque", days: 15 },
      { id: "seo", label: "SEO Avançado + Otimização de Velocidade (PageSpeed 95+)", days: 4 }
    ],
    infra: [
      { id: "rede", label: "Estruturação de Rede Wi-Fi & Cabeamento Empresarial", days: 3 },
      { id: "backup", label: "Configuração de Backup Automático em Nuvem (Cloud)", days: 2 },
      { id: "servidor", label: "Servidor Interno Linux/Windows (Compartilhamento)", days: 5 },
      { id: "suporte", label: "Contrato de Suporte Mensal Preventivo (Helpdesk)", days: 30 }
    ]
  };

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setSelectedOptions([]);
    setActiveStep(2);
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  const getActiveOptions = (): Option[] => {
    if (!selectedService) return [];
    return optionsMap[selectedService];
  };

  const calculateEstimation = () => {
    if (!selectedService) return { days: 0, complexity: "N/A" };
    const activeOpts = getActiveOptions();
    const chosen = activeOpts.filter(o => selectedOptions.includes(o.id));
    
    // Sum days
    const totalDays = chosen.reduce((acc, curr) => acc + curr.days, 0);
    
    let complexity = "Essencial";
    if (selectedOptions.length >= 3) complexity = "Avançado";
    else if (selectedOptions.length >= 2) complexity = "Intermediário";

    return {
      days: totalDays === 0 ? 0 : totalDays,
      complexity
    };
  };

  const handleSendWhatsApp = () => {
    if (!selectedService) return;
    const { days, complexity } = calculateEstimation();
    const activeOpts = getActiveOptions();
    const chosenLabels = activeOpts
      .filter(o => selectedOptions.includes(o.id))
      .map(o => `• ${o.label}`)
      .join("\n");

    const categoryLabel = 
      selectedService === "pc" ? "Manutenção de Computador" :
      selectedService === "web" ? "Desenvolvimento Web" : "Infraestrutura TI";

    const text = `Olá Zamboti! Solicitação de Orçamento pelo Simulador do Site.

*Nome do Solicitante:* ${clientName || "Não informado"}
*Serviço Escolhido:* ${categoryLabel}
*Complexidade Estimada:* ${complexity}
*Tempo de Execução Estimado:* ~${days} dias úteis (sujeito a variação conforme demanda)

*Itens Selecionados:*
${chosenLabels || "Nenhum item adicional selecionado."}

*Detalhes/Observações Adicionais:*
${clientDetails || "Nenhuma observação informada."}

Gostaria de agendar ou solicitar um orçamento final!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5511982326883?text=${encodedText}`, "_blank");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/60 border border-primary/20 p-6 md:p-8 backdrop-blur-md text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* Steps Indicator */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h4 className="font-bold text-lg md:text-xl">
          Simulador de Projetos
        </h4>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className={activeStep >= 1 ? "text-primary font-bold" : ""}>01</span>
          <span>&rarr;</span>
          <span className={activeStep >= 2 ? "text-primary font-bold" : ""}>02</span>
          <span>&rarr;</span>
          <span className={activeStep >= 3 ? "text-primary font-bold" : ""}>03</span>
        </div>
      </div>

      {/* STEP 1: SELECT CATEGORY */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h5 className="text-xl font-bold mb-2">Qual área de tecnologia você precisa?</h5>
            <p className="text-sm text-muted-foreground">Selecione uma das opções abaixo para iniciar a sua simulação personalizada.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-2">
            {/* Option 1: PC */}
            <button
              onClick={() => handleServiceSelect("pc")}
              className="flex flex-col items-center p-6 bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-primary/[0.03] transition-all rounded-xl text-center group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-sm block mb-1">Hardware & PC</span>
              <span className="text-[11px] text-muted-foreground">Manutenção, upgrades e limpeza interna rápida.</span>
            </button>

            {/* Option 2: Web */}
            <button
              onClick={() => handleServiceSelect("web")}
              className="flex flex-col items-center p-6 bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-primary/[0.03] transition-all rounded-xl text-center group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-sm block mb-1">Sites & E-commerce</span>
              <span className="text-[11px] text-muted-foreground">Sites de alta conversão, portais e SEO.</span>
            </button>

            {/* Option 3: Infra */}
            <button
              onClick={() => handleServiceSelect("infra")}
              className="flex flex-col items-center p-6 bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-primary/[0.03] transition-all rounded-xl text-center group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-sm block mb-1">Redes & Cloud</span>
              <span className="text-[11px] text-muted-foreground">Servidores, Wi-Fi comercial e backups seguros.</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CHOOSE SPECIFICS */}
      {activeStep === 2 && selectedService && (
        <div className="space-y-6">
          <div>
            <h5 className="text-xl font-bold mb-2">Quais recursos ou melhorias são necessários?</h5>
            <p className="text-sm text-muted-foreground">Marque tudo o que você gostaria de incluir neste escopo de serviço.</p>
          </div>

          <div className="space-y-3">
            {getActiveOptions().map(option => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`w-full flex items-center justify-between p-4 bg-white/[0.02] border rounded-xl text-left transition-all ${
                    isSelected ? "border-primary bg-primary/[0.03]" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      isSelected ? "border-primary bg-primary text-black" : "border-white/30"
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-semibold">{option.label}</span>
                  </div>
                  <span className="text-xs font-mono text-primary">
                    +{option.days} {option.days === 1 ? "dia" : "dias"}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-2 font-mono">
            *Os prazos indicados acima são estimativos e podem variar de acordo com a nossa fila de atendimento.
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <Button
              variant="outline"
              onClick={() => setActiveStep(1)}
              className="border-white/10 hover:bg-white/5 text-white"
            >
              Voltar
            </Button>
            <Button
              onClick={() => setActiveStep(3)}
              disabled={selectedOptions.length === 0}
              className="bg-primary text-black hover:bg-primary/95"
            >
              Calcular Estimativa <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: SUMMARY & WHATSAPP */}
      {activeStep === 3 && selectedService && (
        <div className="space-y-6">
          <div className="text-center">
            <h5 className="text-2xl font-extrabold text-primary mb-2">Simulação Pronta!</h5>
            <p className="text-sm text-muted-foreground">Temos uma estimativa inicial de escopo baseada em suas seleções.</p>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl grid grid-cols-2 gap-4 text-center font-mono">
            <div className="border-r border-white/10 p-2">
              <span className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider">Complexidade</span>
              <span className="text-lg font-bold text-white">{calculateEstimation().complexity}</span>
            </div>
            <div className="p-2">
              <span className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider">Prazo Estimado</span>
              <span className="text-lg font-bold text-white">~{calculateEstimation().days} Dias Úteis</span>
            </div>
          </div>
          
          <p className="text-[11px] text-muted-foreground/80 text-center -mt-3 font-mono">
            *O prazo final de execução pode variar de acordo com a nossa demanda de projetos e fila de suporte do período.
          </p>

          <div className="space-y-3 p-4 bg-black/40 border border-white/5 rounded-xl text-xs max-h-36 overflow-y-auto">
            <span className="font-bold text-muted-foreground uppercase block mb-2 tracking-wider">Resumo do Pedido:</span>
            {getActiveOptions()
              .filter(o => selectedOptions.includes(o.id))
              .map(o => (
                <div key={o.id} className="flex gap-2 items-start text-white/90">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{o.label}</span>
                </div>
              ))}
          </div>

          {/* Form fields for direct quote requests */}
          <div className="space-y-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-xs font-bold text-primary uppercase tracking-wider font-mono block mb-1">
              Dados para solicitar o orçamento:
            </span>
            <input
              type="text"
              placeholder="Seu Nome ou Nome da Empresa"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-all"
            />
            <textarea
              placeholder="Observações adicionais ou detalhes do serviço (ex: modelo do seu PC, urgência, link do site atual...)"
              value={clientDetails}
              onChange={(e) => setClientDetails(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-all h-16 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setActiveStep(2)}
              className="border-white/10 hover:bg-white/5 text-white flex-1"
            >
              Ajustar Escolhas
            </Button>
            <Button
              onClick={handleSendWhatsApp}
              className="bg-primary text-black hover:bg-primary/95 flex-1 font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-pulse hover:animate-none"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
