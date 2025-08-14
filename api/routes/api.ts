// This API route is a example for this boilerplate ans should be removed

import { Router, type Request, type Response } from 'express'

const router = Router()

const state = {
  clickCount: 0,
}

router.get('/clicks', (_req: Request, res: Response) => {
  res.json({
    data: { clicks: state.clickCount },
    message: 'Clicks listados com sucesso',
  })
})

router.put('/clicks', (_req: Request, res: Response) => {
  state.clickCount++
  res.json({
    data: { clicks: state.clickCount },
    message: 'Clicks incrementados com sucesso',
  })
})

export { router as apiRouter }
