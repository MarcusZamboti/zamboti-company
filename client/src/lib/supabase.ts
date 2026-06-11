import { createClient } from "@supabase/supabase-js";

// Lê as variáveis de ambiente do Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Verifica se as credenciais são válidas e não são placeholders padrão
export const isSupabaseConfigured = 
  supabaseUrl.trim() !== "" && 
  supabaseAnonKey.trim() !== "" && 
  supabaseUrl !== "YOUR_SUPABASE_URL" && 
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";

// Inicializa o cliente se configurado, caso contrário exporta nulo
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
