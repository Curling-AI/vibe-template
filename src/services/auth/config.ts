import { createClient } from '@supabase/supabase-js'
import type { SupabaseConfig } from './types'

// Configuração do Supabase
const supabaseConfig: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  },
}

// Validação das variáveis de ambiente
if (!supabaseConfig.url) {
  throw new Error('VITE_SUPABASE_URL é obrigatória')
}

if (!supabaseConfig.anonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY é obrigatória')
}

// Cliente do Supabase
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  supabaseConfig.options,
)

// Re-exportar configuração para testes
export { supabaseConfig }

// Função para verificar se o Supabase está configurado corretamente
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseConfig.url && supabaseConfig.anonKey)
}

// Função para obter informações de configuração (útil para debug)
export const getSupabaseInfo = () => ({
  url: supabaseConfig.url,
  hasAnonKey: !!supabaseConfig.anonKey,
  isConfigured: isSupabaseConfigured(),
})
