import cors from 'cors'
import { CONFIG } from '../config'

export const corsMiddleware = cors({
  origin: [
    CONFIG.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
})
