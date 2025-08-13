import type { Request, Response } from 'express'
import { CONFIG } from '../config'

export interface ApiError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (err: ApiError, req: Request, res: Response): void => {
  const { statusCode = 500, message } = err

  const response = {
    error: {
      message,
      ...(CONFIG.NODE_ENV === 'development' && { stack: err.stack }),
    },
  }

  console.error(`[ERROR] ${req.method} ${req.path}:`, err)

  res.status(statusCode).json(response)
}

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      message: `Rota ${req.method} ${req.path} não encontrada`,
    },
  })
}
