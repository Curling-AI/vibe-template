import { config } from 'dotenv'
import path from 'path'

// Carregar variáveis de ambiente
config({ path: path.resolve(__dirname, '../../../.env') })

export const CONFIG = {
  // Configurações do servidor
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // CORS
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // API
  API_PREFIX: process.env.API_PREFIX || '/api/v1',

  // Outros
  LOG_LEVEL: process.env.LOG_LEVEL || 'combined',
} as const

export default CONFIG
