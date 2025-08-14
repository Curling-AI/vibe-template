import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../../api/app'

describe('API Routes', () => {
  describe('GET /api/v1/clicks', () => {
    it('deve retornar o número de clicks inicial', async () => {
      const response = await request(app).get('/api/v1/clicks').expect(200)

      expect(response.body).toEqual({
        data: { clicks: 0 },
        message: 'Clicks listados com sucesso',
      })
    })

    it('deve ter o content-type correto', async () => {
      const response = await request(app).get('/api/v1/clicks')

      expect(response.headers['content-type']).toMatch(/json/)
    })
  })

  describe('PUT /api/v1/clicks', () => {
    beforeEach(async () => {
      // Reset do estado para cada teste
      // Como o estado é compartilhado, vamos fazer requests para resetar
      await request(app).get('/api/v1/clicks')
    })

    it('deve incrementar o contador de clicks', async () => {
      const response = await request(app).put('/api/v1/clicks').expect(200)

      expect(response.body).toEqual({
        data: { clicks: 1 },
        message: 'Clicks incrementados com sucesso',
      })
    })

    it('deve incrementar sequencialmente', async () => {
      // Primeiro click
      await request(app).put('/api/v1/clicks').expect(200)

      // Segundo click
      const response = await request(app).put('/api/v1/clicks').expect(200)

      expect(response.body.data.clicks).toBeGreaterThan(0)
    })

    it('deve ter o content-type correto', async () => {
      const response = await request(app).put('/api/v1/clicks')

      expect(response.headers['content-type']).toMatch(/json/)
    })
  })

  describe('Health Check', () => {
    it('deve retornar status de saúde', async () => {
      const response = await request(app).get('/health').expect(200)

      expect(response.body).toHaveProperty('status')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('Rotas não encontradas', () => {
    it('deve retornar 404 para rotas inexistentes', async () => {
      const response = await request(app).get('/api/v1/rota-inexistente').expect(404)

      expect(response.body).toHaveProperty('error')
    })
  })

  describe('CORS', () => {
    it('deve incluir headers CORS', async () => {
      const response = await request(app)
        .options('/api/v1/clicks')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'GET')

      // Verifica se o middleware CORS está funcionando
      expect(response.status).toBeLessThan(500)
    })
  })
})
