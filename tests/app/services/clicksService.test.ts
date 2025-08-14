import { describe, it, expect, beforeEach, vi } from 'vitest'
import { clicksService } from '../../../src/services/clicksService'
import * as apiModule from '../../../src/services/api'

// Mock do módulo api
vi.mock('../../../src/services/api', () => ({
  api: {
    get: vi.fn(),
    put: vi.fn(),
  },
}))

const mockApi = apiModule.api as typeof apiModule.api & {
  get: ReturnType<typeof vi.fn>
  put: ReturnType<typeof vi.fn>
}

describe('ClicksService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getClicks', () => {
    it('deve buscar clicks com sucesso', async () => {
      const mockResponse = {
        data: { clicks: 10 },
        message: 'Clicks listados com sucesso',
      }

      mockApi.get.mockResolvedValueOnce(mockResponse)

      const result = await clicksService.getClicks()

      expect(mockApi.get).toHaveBeenCalledWith('/clicks')
      expect(result).toEqual(mockResponse)
    })

    it('deve propagar erros da API', async () => {
      const error = new Error('Erro de rede')
      mockApi.get.mockRejectedValueOnce(error)

      await expect(clicksService.getClicks()).rejects.toThrow('Erro de rede')
    })
  })

  describe('updateClicks', () => {
    it('deve atualizar clicks com sucesso', async () => {
      const mockResponse = {
        data: { clicks: 11 },
        message: 'Clicks incrementados com sucesso',
      }

      mockApi.put.mockResolvedValueOnce(mockResponse)

      const result = await clicksService.updateClicks()

      expect(mockApi.put).toHaveBeenCalledWith('/clicks', {})
      expect(result).toEqual(mockResponse)
    })

    it('deve propagar erros da API', async () => {
      const error = new Error('Erro interno')
      mockApi.put.mockRejectedValueOnce(error)

      await expect(clicksService.updateClicks()).rejects.toThrow('Erro interno')
    })
  })

  describe('Exportações individuais', () => {
    it('deve exportar getClicks como função individual', () => {
      expect(typeof clicksService.getClicks).toBe('function')
    })

    it('deve exportar updateClicks como função individual', () => {
      expect(typeof clicksService.updateClicks).toBe('function')
    })
  })
})
