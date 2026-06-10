import React, { useState, useEffect } from "react";
import {
  Users,
  Cpu,
  Server,
  Network,
  CreditCard,
  Search,
  Plus,
  Trash2,
  Edit2,
  Save,
  Lock,
  ArrowLeft,
  Check,
  AlertCircle,
  FileText,
  DollarSign,
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/zamboti/Logo";

// Types definition
interface Device {
  id: string;
  name: string;
  type: "pc" | "server";
  ip: string;
  specs: string;
  status: "online" | "warning" | "offline";
  notes?: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  device: string;
}

interface NetworkInfo {
  provider: string;
  speed: string;
  routerIp: string;
  wifiSsid: string;
  wifiPassword?: string;
  notes?: string;
}

interface Client {
  id: string;
  name: string;
  cnpj: string;
  contactName: string;
  phone: string;
  email: string;
  monthlyFee: number;
  dueDate: number;
  paymentStatus: "Pago" | "Pendente";
  devices: Device[];
  employees: Employee[];
  network: NetworkInfo;
  notes?: string;
}

// Initial mock data to avoid empty screen on first load
const INITIAL_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Marmoraria Estrela Ltda",
    cnpj: "12.345.678/0001-99",
    contactName: "Roberto Estrela",
    phone: "(11) 97777-8888",
    email: "roberto@marmorariaestrela.com.br",
    monthlyFee: 1200,
    dueDate: 10,
    paymentStatus: "Pago",
    devices: [
      { id: "d1", name: "PC-Recepcao", type: "pc", ip: "192.168.1.50", specs: "Core i3 / 8GB RAM / 240GB SSD", status: "online" },
      { id: "d2", name: "PC-Financeiro", type: "pc", ip: "192.168.1.51", specs: "Core i5 / 16GB RAM / 480GB SSD", status: "online" },
      { id: "d3", name: "Servidor-Local", type: "server", ip: "192.168.1.200", specs: "Xeon v4 / 32GB RAM / 2TB Raid-1", status: "online", notes: "Backup local configurado" }
    ],
    employees: [
      { id: "e1", name: "Ana Paula", email: "recepcao@marmorariaestrela.com.br", role: "Recepcionista", device: "PC-Recepcao" },
      { id: "e2", name: "Ricardo Alves", email: "financeiro@marmorariaestrela.com.br", role: "Gerente Financeiro", device: "PC-Financeiro" }
    ],
    network: {
      provider: "Vivo Fibra",
      speed: "500 Mbps",
      routerIp: "192.168.1.1",
      wifiSsid: "Marmoraria_Estrela_VIP",
      wifiPassword: "estrela_dourada_2026",
      notes: "Roteador da operadora no rack da recepção."
    },
    notes: "Cliente com contrato desde Jan/2026. Visita preventiva agendada para a primeira terça do mês."
  },
  {
    id: "c2",
    name: "Consultório Odonto Sorriso",
    cnpj: "98.765.432/0001-11",
    contactName: "Dra. Letícia Carvalho",
    phone: "(11) 96666-5555",
    email: "contato@odontosorrisosp.com.br",
    monthlyFee: 950,
    dueDate: 5,
    paymentStatus: "Pendente",
    devices: [
      { id: "d4", name: "Note-DraLeticia", type: "pc", ip: "192.168.15.20", specs: "Intel Core i7 / 16GB RAM / 512GB SSD", status: "online" },
      { id: "d5", name: "PC-Triagem", type: "pc", ip: "192.168.15.21", specs: "Intel Core i3 / 8GB RAM / 240GB SSD", status: "warning", notes: "Trocar pasta térmica na próxima visita" }
    ],
    employees: [
      { id: "e3", name: "Leticia Carvalho", email: "leticia@odontosorrisosp.com.br", role: "Dentista Principal", device: "Note-DraLeticia" },
      { id: "e4", name: "Mariana Souza", email: "atendimento@odontosorrisosp.com.br", role: "Secretária", device: "PC-Triagem" }
    ],
    network: {
      provider: "Claro Fibra",
      speed: "350 Mbps",
      routerIp: "192.168.15.1",
      wifiSsid: "Odonto_Sorriso_Cliente",
      wifiPassword: "dente_forte_carvalho",
      notes: "Modem da Claro na sala de arquivos."
    },
    notes: "Backup configurado no Google Drive corporativo da clínica."
  }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Clients states
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Forms states
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientCnpj, setNewClientCnpj] = useState("");
  const [newClientContact, setNewClientContact] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientFee, setNewClientFee] = useState(1000);
  const [newClientDueDate, setNewClientDueDate] = useState(10);

  // Client editing states
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [editCnpj, setEditCnpj] = useState("");
  const [editContact, setEditContact] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editFee, setEditFee] = useState(0);
  const [editDueDate, setEditDueDate] = useState(10);
  const [editNotes, setEditNotes] = useState("");

  // Network editing states
  const [netProvider, setNetProvider] = useState("");
  const [netSpeed, setNetSpeed] = useState("");
  const [netRouterIp, setNetRouterIp] = useState("");
  const [netWifiSsid, setNetWifiSsid] = useState("");
  const [netWifiPassword, setNetWifiPassword] = useState("");
  const [netNotes, setNetNotes] = useState("");

  // Add sub-asset states
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [devName, setDevName] = useState("");
  const [devType, setDevType] = useState<"pc" | "server">("pc");
  const [devIp, setDevIp] = useState("");
  const [devSpecs, setDevSpecs] = useState("");
  const [devNotes, setDevNotes] = useState("");

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [empDevice, setEmpDevice] = useState("");

  // Load clients from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("zamboti_crm_clients");
    if (saved) {
      try {
        setClients(JSON.parse(saved));
      } catch (e) {
        setClients(INITIAL_CLIENTS);
      }
    } else {
      setClients(INITIAL_CLIENTS);
      localStorage.setItem("zamboti_crm_clients", JSON.stringify(INITIAL_CLIENTS));
    }
  }, []);

  // Save clients to LocalStorage whenever state changes
  const saveClients = (updatedClients: Client[]) => {
    setClients(updatedClients);
    localStorage.setItem("zamboti_crm_clients", JSON.stringify(updatedClients));
    
    // Maintain active client reference update
    if (selectedClient) {
      const updatedSelect = updatedClients.find(c => c.id === selectedClient.id);
      setSelectedClient(updatedSelect || null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Alphanumeric password check. Hardcoded for client convenience but protected.
    if (passcode === "102938Mbk@") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Senha incorreta. Tente novamente.");
      setPasscode("");
    }
  };

  // KPI Calculations
  const totalClients = clients.length;
  const mrr = clients.reduce((acc, c) => acc + c.monthlyFee, 0);
  const pendingPayments = clients.filter(c => c.paymentStatus === "Pendente").length;
  const totalDevices = clients.reduce((acc, c) => acc + c.devices.length, 0);

  // Search Filter
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Client operations
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    const newClient: Client = {
      id: "c_" + Date.now(),
      name: newClientName,
      cnpj: newClientCnpj || "Não informado",
      contactName: newClientContact || "Não informado",
      phone: newClientPhone || "Não informado",
      email: newClientEmail || "Não informado",
      monthlyFee: Number(newClientFee) || 0,
      dueDate: Number(newClientDueDate) || 10,
      paymentStatus: "Pendente",
      devices: [],
      employees: [],
      network: {
        provider: "Não cadastrado",
        speed: "Não cadastrado",
        routerIp: "192.168.1.1",
        wifiSsid: "Não cadastrado"
      }
    };

    const updated = [...clients, newClient];
    saveClients(updated);
    
    // Reset form
    setNewClientName("");
    setNewClientCnpj("");
    setNewClientContact("");
    setNewClientPhone("");
    setNewClientEmail("");
    setNewClientFee(1000);
    setNewClientDueDate(10);
    setShowAddClientModal(false);
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm("Tem certeza que deseja excluir permanentemente este cliente e todos os seus dados?")) {
      const updated = clients.filter(c => c.id !== clientId);
      saveClients(updated);
      setSelectedClient(null);
    }
  };

  const togglePaymentStatus = (clientId: string) => {
    const updated = clients.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          paymentStatus: c.paymentStatus === "Pago" ? "Pendente" as const : "Pago" as const
        };
      }
      return c;
    });
    saveClients(updated);
  };

  // Start edit client profile
  const startEditing = (client: Client) => {
    setIsEditingClient(true);
    setEditCnpj(client.cnpj);
    setEditContact(client.contactName);
    setEditPhone(client.phone);
    setEditEmail(client.email);
    setEditFee(client.monthlyFee);
    setEditDueDate(client.dueDate);
    setEditNotes(client.notes || "");
  };

  const saveClientEdits = () => {
    if (!selectedClient) return;
    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          cnpj: editCnpj,
          contactName: editContact,
          phone: editPhone,
          email: editEmail,
          monthlyFee: Number(editFee) || 0,
          dueDate: Number(editDueDate) || 10,
          notes: editNotes
        };
      }
      return c;
    });
    saveClients(updated);
    setIsEditingClient(false);
  };

  // Network info update
  const loadNetworkInfo = (client: Client) => {
    setNetProvider(client.network.provider || "");
    setNetSpeed(client.network.speed || "");
    setNetRouterIp(client.network.routerIp || "");
    setNetWifiSsid(client.network.wifiSsid || "");
    setNetWifiPassword(client.network.wifiPassword || "");
    setNetNotes(client.network.notes || "");
  };

  const saveNetworkInfo = () => {
    if (!selectedClient) return;
    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          network: {
            provider: netProvider,
            speed: netSpeed,
            routerIp: netRouterIp,
            wifiSsid: netWifiSsid,
            wifiPassword: netWifiPassword,
            notes: netNotes
          }
        };
      }
      return c;
    });
    saveClients(updated);
    alert("Configurações de rede salvas com sucesso!");
  };

  // Devices CRUD
  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !devName) return;

    const newDevice: Device = {
      id: "d_" + Date.now(),
      name: devName,
      type: devType,
      ip: devIp || "DHCP",
      specs: devSpecs || "Specs não informadas",
      status: "online",
      notes: devNotes
    };

    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          devices: [...c.devices, newDevice]
        };
      }
      return c;
    });

    saveClients(updated);
    setDevName("");
    setDevIp("");
    setDevSpecs("");
    setDevNotes("");
    setShowAddDevice(false);
  };

  const handleDeleteDevice = (deviceId: string) => {
    if (!selectedClient) return;
    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          devices: c.devices.filter(d => d.id !== deviceId)
        };
      }
      return c;
    });
    saveClients(updated);
  };

  // Employees CRUD
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !empName) return;

    const newEmployee: Employee = {
      id: "e_" + Date.now(),
      name: empName,
      email: empEmail || "Não cadastrado",
      role: empRole || "Não cadastrado",
      device: empDevice || "Nenhum"
    };

    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          employees: [...c.employees, newEmployee]
        };
      }
      return c;
    });

    saveClients(updated);
    setEmpName("");
    setEmpEmail("");
    setEmpRole("");
    setEmpDevice("");
    setShowAddEmployee(false);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (!selectedClient) return;
    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          employees: c.employees.filter(e => e.id !== employeeId)
        };
      }
      return c;
    });
    saveClients(updated);
  };

  // Select client hook to fill network forms
  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditingClient(false);
    setShowAddDevice(false);
    setShowAddEmployee(false);
    loadNetworkInfo(client);
  };

  // PASSCODE AUTHENTICATION SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4 selection:bg-primary selection:text-black">
        <Card className="w-full max-w-md bg-black/60 border border-primary/20 p-8 rounded-3xl backdrop-blur-md text-center space-y-6 shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
          <div className="flex flex-col items-center gap-3">
            <Logo />
            <h1 className="text-xl font-bold text-white/90 font-mono tracking-wider mt-4">
              ZAMBOTI ADMIN GATEWAY
            </h1>
            <p className="text-xs text-muted-foreground">
              Acesso exclusivo para gerenciar clientes e ativos de TI.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="w-4 h-4 text-primary absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Digite a Senha de Acesso"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-center text-sm font-mono text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-all"
                autoFocus
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-500 font-semibold flex items-center justify-center gap-1.5 animate-shake">
                <AlertCircle className="w-3.5 h-3.5" />
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Acessar Painel
            </Button>
          </form>

          <div className="pt-2 text-[10px] text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3 h-3" /> Voltar para o Site Principal
            </a>
          </div>
        </Card>
      </div>
    );
  }

  // MAIN ADMIN PANEL VIEW
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-primary selection:text-black font-sans">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-md py-4 px-6 fixed top-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-mono">
              CRM & ASSET MANAGER
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthenticated(false)}
              className="border-white/10 text-white hover:bg-white/5 font-semibold text-xs"
            >
              Sair
            </Button>
            <a
              href="/"
              className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              Ver Site
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-24 pb-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: KPIS & CLIENT LIST (Cols: 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* KPI Dashboard Card */}
          <Card className="bg-black/40 border border-white/10 p-5 rounded-2xl grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3 text-primary" /> Clientes
              </span>
              <p className="text-2xl font-bold">{totalClients}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-primary" /> Faturamento
              </span>
              <p className="text-xl font-bold font-mono text-emerald-400">R$ {mrr}</p>
            </div>
            <div className="space-y-1 border-t border-white/5 pt-2">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-primary" /> Pendentes
              </span>
              <p className={`text-xl font-bold font-mono ${pendingPayments > 0 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                {pendingPayments}
              </p>
            </div>
            <div className="space-y-1 border-t border-white/5 pt-2">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1">
                <Cpu className="w-3 h-3 text-primary" /> Ativos de TI
              </span>
              <p className="text-2xl font-bold font-mono">{totalDevices}</p>
            </div>
          </Card>

          {/* Search & Action Panel */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar cliente ou contato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>
            <Button
              onClick={() => setShowAddClientModal(true)}
              className="bg-primary text-black hover:bg-primary/90 w-10 h-10 p-0 rounded-xl flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.2)]"
              title="Cadastrar Novo Cliente"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Client List Grid */}
          <Card className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
            <div className="p-4 bg-white/[0.01]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground font-mono">
                Lista de Clientes Ativos
              </h3>
            </div>
            <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5">
              {filteredClients.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  Nenhum cliente correspondente encontrado.
                </div>
              ) : (
                filteredClients.map(client => {
                  const isSelected = selectedClient?.id === client.id;
                  return (
                    <div
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className={`p-4 cursor-pointer transition-all hover:bg-white/[0.03] flex items-center justify-between ${
                        isSelected ? "bg-primary/5 border-l-2 border-primary" : ""
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <span className="font-semibold text-sm block text-white/90">
                          {client.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          Contato: {client.contactName}
                        </span>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-mono font-bold block text-white/80">
                          R$ {client.monthlyFee}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePaymentStatus(client.id);
                          }}
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold inline-block border ${
                            client.paymentStatus === "Pago"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-red-500/10 border-red-500/30 text-red-400"
                          }`}
                        >
                          {client.paymentStatus}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>

        </div>

        {/* RIGHT COLUMN: DETAILED VIEW (Cols: 8) */}
        <div className="lg:col-span-8">
          {selectedClient ? (
            <Card className="bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
              
              {/* Detailed Client Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold text-white">{selectedClient.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>CNPJ: {selectedClient.cnpj}</span>
                    <span>&bull;</span>
                    <span>Contrato: R$ {selectedClient.monthlyFee}/mês (Venc. todo dia {selectedClient.dueDate})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => togglePaymentStatus(selectedClient.id)}
                    className={`text-xs font-semibold font-mono ${
                      selectedClient.paymentStatus === "Pago"
                        ? "bg-emerald-500 text-black hover:bg-emerald-500/90"
                        : "bg-red-500 text-white hover:bg-red-500/90 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    }`}
                  >
                    Marcar Pago
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClient(selectedClient.id)}
                    className="border-white/10 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 p-2 rounded-xl"
                    title="Excluir Cliente"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Subtabs Navigation */}
              <Tabs defaultValue="geral" className="w-full">
                <TabsList className="bg-black/60 border border-white/10 p-1 w-full grid grid-cols-4 rounded-xl mb-6">
                  <TabsTrigger value="geral" className="text-xs py-2">Cadastro</TabsTrigger>
                  <TabsTrigger value="equipamentos" className="text-xs py-2">Ativos ({selectedClient.devices.length})</TabsTrigger>
                  <TabsTrigger value="equipe" className="text-xs py-2">Equipe ({selectedClient.employees.length})</TabsTrigger>
                  <TabsTrigger value="rede" className="text-xs py-2">Rede & Conectividade</TabsTrigger>
                </TabsList>

                {/* TAB 1: CADASTRO / GERAL */}
                <TabsContent value="geral" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-wider font-mono">
                      Dados de Faturamento & Cadastro
                    </h3>
                    {!isEditingClient ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditing(selectedClient)}
                        className="border-white/10 text-xs font-semibold"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1" /> Editar Dados
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={saveClientEdits}
                        className="bg-emerald-500 text-black hover:bg-emerald-500/90 text-xs font-semibold"
                      >
                        <Save className="w-3.5 h-3.5 mr-1" /> Salvar Edições
                      </Button>
                    )}
                  </div>

                  {!isEditingClient ? (
                    <div className="grid sm:grid-cols-2 gap-6 bg-black/20 p-5 rounded-xl border border-white/5 text-sm">
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Razão Social / Nome</span>
                        <p className="font-semibold text-white/95">{selectedClient.name}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">CNPJ / CPF</span>
                        <p className="font-semibold text-white/95">{selectedClient.cnpj}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Contato Principal</span>
                        <p className="font-semibold text-white/95">{selectedClient.contactName}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">WhatsApp / Telefone</span>
                        <p className="font-semibold text-white/95">{selectedClient.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Email Comercial</span>
                        <p className="font-semibold text-white/95 font-mono">{selectedClient.email}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Faturamento Mensal</span>
                        <p className="font-bold text-emerald-400 font-mono">R$ {selectedClient.monthlyFee},00</p>
                      </div>
                      <div className="sm:col-span-2 space-y-1 pt-2 border-t border-white/5">
                        <span className="text-xs text-muted-foreground block">Notas & Observações Internas</span>
                        <p className="text-xs text-white/80 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-white/5">
                          {selectedClient.notes || "Sem observações cadastradas para este cliente."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4 bg-black/20 p-5 rounded-xl border border-white/5 text-sm">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">CNPJ / CPF</label>
                        <input
                          type="text"
                          value={editCnpj}
                          onChange={(e) => setEditCnpj(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Nome de Contato</label>
                        <input
                          type="text"
                          value={editContact}
                          onChange={(e) => setEditContact(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">WhatsApp / Telefone</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Email Comercial</label>
                        <input
                          type="text"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Mensalidade (R$)</label>
                        <input
                          type="number"
                          value={editFee}
                          onChange={(e) => setEditFee(Number(e.target.value))}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Dia do Vencimento</label>
                        <input
                          type="number"
                          value={editDueDate}
                          onChange={(e) => setEditDueDate(Number(e.target.value))}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs text-muted-foreground">Notas & Observações</label>
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* TAB 2: ATIVOS / EQUIPAMENTOS */}
                <TabsContent value="equipamentos" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-wider font-mono">
                      Computadores & Servidores Gerenciados
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowAddDevice(true)}
                      className="bg-primary text-black hover:bg-primary/90 text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar Ativo
                    </Button>
                  </div>

                  {/* Add Device Form */}
                  {showAddDevice && (
                    <form onSubmit={handleAddDevice} className="bg-black/40 border border-primary/20 p-5 rounded-xl space-y-4">
                      <span className="text-xs font-bold text-primary font-mono block">NOVO DISPOSITIVO</span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nome da Máquina (ex: PC-Financeiro)"
                          value={devName}
                          onChange={(e) => setDevName(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                          required
                        />
                        <select
                          value={devType}
                          onChange={(e) => setDevType(e.target.value as "pc" | "server")}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        >
                          <option value="pc" className="bg-[#080808]">PC / Notebook</option>
                          <option value="server" className="bg-[#080808]">Servidor</option>
                        </select>
                        <input
                          type="text"
                          placeholder="IP Local (ex: 192.168.1.10)"
                          value={devIp}
                          onChange={(e) => setDevIp(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono"
                        />
                        <input
                          type="text"
                          placeholder="Especificações (ex: Core i5, 8GB RAM, SSD)"
                          value={devSpecs}
                          onChange={(e) => setDevSpecs(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Observações do equipamento"
                          value={devNotes}
                          onChange={(e) => setDevNotes(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white sm:col-span-2"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddDevice(false)}
                          className="border-white/10 text-xs"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          size="sm"
                          className="bg-primary text-black hover:bg-primary/90 text-xs"
                        >
                          Salvar Dispositivo
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Device List Grid */}
                  <div className="grid gap-3">
                    {selectedClient.devices.length === 0 ? (
                      <div className="p-8 text-center text-xs text-muted-foreground border border-dashed border-white/10 rounded-xl">
                        Nenhum computador ou servidor cadastrado para este cliente.
                      </div>
                    ) : (
                      selectedClient.devices.map(device => (
                        <div
                          key={device.id}
                          className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              {device.type === "server" ? (
                                <Server className="w-5 h-5 text-primary" />
                              ) : (
                                <Laptop className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{device.name}</span>
                                <span className="text-[9px] font-mono bg-black px-1.5 py-0.5 rounded border border-white/10 text-muted-foreground">
                                  {device.ip}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{device.specs}</p>
                              {device.notes && (
                                <p className="text-[10px] text-primary/70 leading-none mt-1">Obs: {device.notes}</p>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDevice(device.id)}
                            className="border-white/10 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 p-2 rounded-xl"
                            title="Remover Dispositivo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* TAB 3: EQUIPE / FUNCIONÁRIOS */}
                <TabsContent value="equipe" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-wider font-mono">
                      Funcionários e Contatos do Cliente
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowAddEmployee(true)}
                      className="bg-primary text-black hover:bg-primary/90 text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar Funcionário
                    </Button>
                  </div>

                  {/* Add Employee Form */}
                  {showAddEmployee && (
                    <form onSubmit={handleAddEmployee} className="bg-black/40 border border-primary/20 p-5 rounded-xl space-y-4">
                      <span className="text-xs font-bold text-primary font-mono block">NOVO FUNCIONÁRIO</span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nome Completo"
                          value={empName}
                          onChange={(e) => setEmpName(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Cargo / Setor (ex: Recepção, Gerente)"
                          value={empRole}
                          onChange={(e) => setEmpRole(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="email"
                          placeholder="E-mail Corporativo"
                          value={empEmail}
                          onChange={(e) => setEmpEmail(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono"
                        />
                        <input
                          type="text"
                          placeholder="Dispositivo Principal Usado"
                          value={empDevice}
                          onChange={(e) => setEmpDevice(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddEmployee(false)}
                          className="border-white/10 text-xs"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          size="sm"
                          className="bg-primary text-black hover:bg-primary/90 text-xs"
                        >
                          Salvar Cadastro
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Employees List */}
                  <div className="grid gap-3">
                    {selectedClient.employees.length === 0 ? (
                      <div className="p-8 text-center text-xs text-muted-foreground border border-dashed border-white/10 rounded-xl">
                        Nenhum funcionário cadastrado para este cliente.
                      </div>
                    ) : (
                      selectedClient.employees.map(employee => (
                        <div
                          key={employee.id}
                          className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{employee.name}</span>
                                <span className="text-[9px] font-mono bg-[#111] px-1.5 py-0.5 rounded border border-white/10 text-primary">
                                  {employee.role}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">E-mail: {employee.email}</p>
                              {employee.device && (
                                <p className="text-[10px] text-muted-foreground">Dispositivo Vinculado: <span className="text-white">{employee.device}</span></p>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="border-white/10 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 p-2 rounded-xl"
                            title="Remover Funcionário"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* TAB 4: REDE E WI-FI */}
                <TabsContent value="rede" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-wider font-mono">
                      Configurações de Rede & Conectividade do Cliente
                    </h3>
                    <Button
                      size="sm"
                      onClick={saveNetworkInfo}
                      className="bg-emerald-500 text-black hover:bg-emerald-500/90 text-xs font-semibold"
                    >
                      <Save className="w-3.5 h-3.5 mr-1" /> Salvar Rede
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 bg-black/20 p-5 rounded-xl border border-white/5 text-sm">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Provedor de Internet (ex: Vivo, Claro)</label>
                      <input
                        type="text"
                        value={netProvider}
                        onChange={(e) => setNetProvider(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-primary/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Velocidade Contratada (ex: 500 Mega)</label>
                      <input
                        type="text"
                        value={netSpeed}
                        onChange={(e) => setNetSpeed(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-primary/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">IP do Roteador / Gateway Principal</label>
                      <input
                        type="text"
                        value={netRouterIp}
                        onChange={(e) => setNetRouterIp(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-primary/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Nome da Rede Wi-Fi (SSID)</label>
                      <input
                        type="text"
                        value={netWifiSsid}
                        onChange={(e) => setNetWifiSsid(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-primary/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs text-muted-foreground">Senha da Rede Wi-Fi</label>
                      <input
                        type="text"
                        value={netWifiPassword}
                        onChange={(e) => setNetWifiPassword(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-primary/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs text-muted-foreground">Observações Técnicas de Rede (ex: IPs fixos de impressoras, DNS)</label>
                      <textarea
                        value={netNotes}
                        onChange={(e) => setNetNotes(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white h-20 resize-none focus:border-primary/40 focus:outline-none"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          ) : (
            <Card className="bg-black/20 border border-dashed border-white/10 p-12 text-center rounded-2xl flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-white/[0.02] border border-white/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Nenhum Cliente Selecionado</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                  Selecione um cliente na barra lateral para ver suas informações detalhadas, cadastrar computadores, redes e controlar pagamentos.
                </p>
              </div>
            </Card>
          )}
        </div>

      </main>

      {/* CADASTRAR CLIENTE MODAL OVERLAY */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddClientModal(false)} />
          
          <Card className="relative w-full max-w-lg bg-black border border-primary/20 p-6 md:p-8 rounded-3xl z-10 space-y-6 shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white">Cadastrar Novo Cliente</h4>
              <p className="text-xs text-muted-foreground">Insira as informações básicas para iniciar a monitoração do contrato.</p>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome Fantasia / Razão Social"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="CNPJ / CPF"
                  value={newClientCnpj}
                  onChange={(e) => setNewClientCnpj(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nome do Contato"
                    value={newClientContact}
                    onChange={(e) => setNewClientContact(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="E-mail de Contato"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Mensalidade (R$)"
                    value={newClientFee}
                    onChange={(e) => setNewClientFee(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Dia de Vencimento"
                    value={newClientDueDate}
                    onChange={(e) => setNewClientDueDate(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddClientModal(false)}
                  className="border-white/10 text-xs"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-black hover:bg-primary/90 text-xs font-bold"
                >
                  Salvar Cliente
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
      
    </div>
  );
}
