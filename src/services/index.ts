// Exportar todas as configurações da API
export * from './api'

// Exportar todos os tipos
export * from './types'

// Exportar serviços específicos
export * from './userService'

// Exportar serviços como objetos para uso direto
export { userService } from './userService'

// Re-exportar a instância da API para uso direto quando necessário
export { api } from './api'
