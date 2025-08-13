import { Router, type Request, type Response } from 'express'

const router = Router()

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// Info endpoint
router.get('/info', (_req: Request, res: Response) => {
  res.json({
    name: 'Vibe Template BFF',
    version: '1.0.0',
    description: 'Backend For Frontend para o Vibe Template',
    nodeVersion: process.version,
  })
})

export { router as healthRouter }
