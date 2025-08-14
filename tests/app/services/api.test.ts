import { describe, it, expect, beforeEach, vi } from 'vitest'
import { api, apiRequest } from '../../../src/services/api'

// Mock do fetch global
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('API Service', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('apiRequest', () => {
    it('deve fazer uma requisição GET com sucesso', async () => {
      const mockResponse = {
        data: { clicks: 5 },
        message: 'Sucesso',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiRequest('/clicks')

      expect(mockFetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/clicks`,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        }),
      )
      expect(result).toEqual(mockResponse)
    })

    it('deve tratar erros HTTP corretamente', async () => {
      const errorResponse = {
        error: {
          message: 'Erro interno do servidor',
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => errorResponse,
      })

      await expect(apiRequest('/clicks')).rejects.toThrow('Erro interno do servidor')
    })

    it('deve tratar erros de conexão', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(apiRequest('/clicks')).rejects.toThrow('Network error')
    })

    it('deve tratar erros desconhecidos', async () => {
      mockFetch.mockRejectedValueOnce('Unknown error')

      await expect(apiRequest('/clicks')).rejects.toThrow('Erro de conexão com a API')
    })

    it('deve construir URL corretamente para endpoints com /api', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await apiRequest('/api/custom')

      expect(mockFetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_BASE_URL}/api/custom`,
        expect.any(Object),
      )
    })

    it('deve construir URL corretamente para endpoints sem /api', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await apiRequest('/clicks')

      expect(mockFetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/clicks`,
        expect.any(Object),
      )
    })
  })

  describe('api.get', () => {
    it('deve fazer uma requisição GET', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'test' }),
      })

      await api.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
        }),
      )
    })
  })

  describe('api.post', () => {
    it('deve fazer uma requisição POST com dados', async () => {
      const testData = { name: 'test' }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'created' }),
      })

      await api.post('/test', testData)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(testData),
        }),
      )
    })
  })

  describe('api.put', () => {
    it('deve fazer uma requisição PUT com dados', async () => {
      const testData = { id: 1, name: 'updated' }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'updated' }),
      })

      await api.put('/test', testData)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(testData),
        }),
      )
    })
  })

  describe('api.delete', () => {
    it('deve fazer uma requisição DELETE', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'deleted' }),
      })

      await api.delete('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'DELETE',
        }),
      )
    })
  })

  describe('api.patch', () => {
    it('deve fazer uma requisição PATCH com dados', async () => {
      const testData = { name: 'patched' }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'patched' }),
      })

      await api.patch('/test', testData)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(testData),
        }),
      )
    })
  })
})
