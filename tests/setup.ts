// Mock das variáveis de ambiente
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_BASE_URL: 'http://localhost:3001',
  },
  writable: true,
})
