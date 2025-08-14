import { beforeEach, vi } from 'vitest'
import { config } from 'dotenv'
import path from 'path'

// Carrega variáveis de ambiente do arquivo .env
config({ path: path.resolve(process.cwd(), '.env') })

// Função para obter variáveis de ambiente com fallbacks para testes
function getEnvVar(key: string, fallback: string): string {
  return process.env[key] || fallback
}

// Mock das variáveis de ambiente para testes
// Carrega do .env com fallbacks apropriados para testes
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001'),
    VITE_SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL', 'https://test.supabase.co'),
    VITE_SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY', 'test-anon-key'),
    NODE_ENV: getEnvVar('NODE_ENV', 'test'),
    // Adiciona outras variáveis conforme necessário
    FRONTEND_URL: getEnvVar('FRONTEND_URL', 'http://localhost:5173'),
    PORT: getEnvVar('PORT', '3001'),
  },
  writable: true,
})

// Mock localStorage para testes
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}

// Mock global para localStorage
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Debug: Log das variáveis carregadas (apenas em modo de desenvolvimento dos testes)
if (process.env.VITEST_DEBUG) {
  console.log('🔧 Variáveis de ambiente carregadas para testes:')
  console.log('VITE_API_BASE_URL:', getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001'))
  console.log('VITE_SUPABASE_URL:', getEnvVar('VITE_SUPABASE_URL', 'https://test.supabase.co'))
  console.log('VITE_SUPABASE_ANON_KEY:', getEnvVar('VITE_SUPABASE_ANON_KEY', 'test-anon-key'))
}

// Reset all modules before each test
beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
})
