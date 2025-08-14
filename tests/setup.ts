// Mock das variáveis de ambiente para testes
// Nota: Os testes devem ser independentes do ambiente de produção/desenvolvimento
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_BASE_URL: 'http://localhost:3001',
  },
  writable: true,
})
