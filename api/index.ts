import app from './app'
import { CONFIG } from './config'

const startServer = () => {
  try {
    const server = app.listen(CONFIG.PORT, '0.0.0.0', () => {
      console.log('🚀 Servidor BFF iniciado com sucesso!')
      console.log(`📍 URL: http://localhost:${CONFIG.PORT}`)
      console.log(`🌍 Ambiente: ${CONFIG.NODE_ENV}`)
      console.log(`📊 Health Check: http://localhost:${CONFIG.PORT}/health`)
      console.log(`🔌 API Base: http://localhost:${CONFIG.PORT}${CONFIG.API_PREFIX}`)
      console.log('─'.repeat(50))
    })

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n${signal} recebido. Encerrando servidor graciosamente...`)
      server.close(() => {
        console.log('Servidor encerrado com sucesso.')
        process.exit(0)
      })
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error)
    process.exit(1)
  }
}

startServer()
