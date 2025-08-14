// Exportar todas as configurações da API
export * from './api'

// Exportar todos os tipos
export * from './types'

// Exportar serviços específicos
export * from './clicksService'
export * from './auth/authService'
export * from './auth/types'
export * from './auth/config'

// Exportar serviços como objetos para uso direto
export { clicksService } from './clicksService'
export { authService } from './auth/authService'
export { supabase } from './auth/config'

// Re-exportar a instância da API para uso direto quando necessário
export { api } from './api'
