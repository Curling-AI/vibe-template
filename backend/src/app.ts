import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

import { CONFIG } from './config'
import { corsMiddleware } from './middleware/cors'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { healthRouter } from './routes/health'
import { apiRouter } from './routes/api'

const app = express()

// Middlewares de segurança e performance
app.use(helmet())
app.use(compression())
app.use(morgan(CONFIG.LOG_LEVEL))

// CORS
app.use(corsMiddleware)

// Parser de JSON e URL encoded
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rotas de saúde (sem prefixo)
app.use('/', healthRouter)

// Rotas da API (com prefixo)
app.use(CONFIG.API_PREFIX, apiRouter)

// Middleware para rotas não encontradas
app.use(notFoundHandler)

// Middleware de tratamento de erros (deve vir por último)
app.use(errorHandler)

export default app
