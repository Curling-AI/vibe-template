// Exportar todas as configurações da API
export * from './api'

// Exportar todos os tipos
export * from './types'

// Exportar serviços específicos
export * from './clicksService'

// Exportar serviços como objetos para uso direto
export { clicksService } from './clicksService'

// Re-exportar a instância da API para uso direto quando necessário
export { api } from './api'
