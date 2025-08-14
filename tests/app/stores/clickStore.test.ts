import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useClickStore } from '../../../src/stores/clickStore'
import * as clicksServiceModule from '../../../src/services/clicksService'

// Mock do authService para evitar carregamento do config Supabase
vi.mock('../../../src/services/auth/config', () => ({
  supabase: {},
  supabaseConfig: {},
  isSupabaseConfigured: () => false,
  getSupabaseInfo: () => ({}),
}))

// Mock do clicksService
vi.mock('../../../src/services/clicksService', () => ({
  clicksService: {
    getClicks: vi.fn(),
    updateClicks: vi.fn(),
  },
}))

const mockClicksService =
  clicksServiceModule.clicksService as typeof clicksServiceModule.clicksService & {
    getClicks: ReturnType<typeof vi.fn>
    updateClicks: ReturnType<typeof vi.fn>
  }

describe('ClickStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset do store antes de cada teste
    useClickStore.setState({
      clicks: 0,
      isLoading: false,
      error: null,
    })
  })

  describe('Estado inicial', () => {
    it('deve ter o estado inicial correto', () => {
      const state = useClickStore.getState()

      expect(state.clicks).toBe(0)
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe(null)
    })
  })

  describe('fetchClicks', () => {
    it('deve buscar clicks com sucesso', async () => {
      const mockResponse = {
        data: { clicks: 15 },
        message: 'Sucesso',
      }
      mockClicksService.getClicks.mockResolvedValueOnce(mockResponse)

      const clicks = await useClickStore.getState().fetchClicks()

      expect(clicks).toBe(15)
      expect(useClickStore.getState().isLoading).toBe(false)
      expect(useClickStore.getState().error).toBe(null)
      expect(mockClicksService.getClicks).toHaveBeenCalledTimes(1)
    })

    it('deve definir loading como true durante a requisição', async () => {
      let resolvePromise: (value: unknown) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockClicksService.getClicks.mockReturnValueOnce(promise)

      useClickStore.getState().fetchClicks()

      expect(useClickStore.getState().isLoading).toBe(true)
      expect(useClickStore.getState().error).toBe(null)

      resolvePromise!({ data: { clicks: 10 } })

      await promise

      expect(useClickStore.getState().isLoading).toBe(false)
    })

    it('deve tratar erros corretamente', async () => {
      const error = new Error('Erro de rede')
      mockClicksService.getClicks.mockRejectedValueOnce(error)

      const clicks = await useClickStore.getState().fetchClicks()

      expect(clicks).toBe(0)

      expect(useClickStore.getState().clicks).toBe(0)
      expect(useClickStore.getState().isLoading).toBe(false)
      expect(useClickStore.getState().error).toBe('Erro de rede')
    })

    it('deve tratar erros desconhecidos', async () => {
      mockClicksService.getClicks.mockRejectedValueOnce('Erro desconhecido')

      const clicks = await useClickStore.getState().fetchClicks()

      expect(clicks).toBe(0)

      expect(useClickStore.getState().clicks).toBe(0)
      expect(useClickStore.getState().isLoading).toBe(false)
      expect(useClickStore.getState().error).toBe('Erro ao buscar clicks')
    })
  })

  describe('updateClicks', () => {
    it('deve atualizar clicks com sucesso', async () => {
      const mockResponse = {
        data: { clicks: 25 },
        message: 'Atualizado',
      }
      mockClicksService.updateClicks.mockResolvedValueOnce(mockResponse)

      const clicks = await useClickStore.getState().updateClicks()

      expect(clicks).toBe(25)
      expect(useClickStore.getState().isLoading).toBe(false)
      expect(useClickStore.getState().error).toBe(null)
      expect(mockClicksService.updateClicks).toHaveBeenCalledTimes(1)
    })

    it('deve definir loading como true durante a requisição', async () => {
      let resolvePromise: (value: unknown) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockClicksService.updateClicks.mockReturnValueOnce(promise)

      useClickStore.getState().updateClicks()

      expect(useClickStore.getState().isLoading).toBe(true)
      expect(useClickStore.getState().error).toBe(null)

      resolvePromise!({ data: { clicks: 20 } })

      await promise

      expect(useClickStore.getState().isLoading).toBe(false)
    })

    it('deve tratar erros corretamente', async () => {
      const error = new Error('Erro de servidor')
      mockClicksService.updateClicks.mockRejectedValueOnce(error)

      const clicks = await useClickStore.getState().updateClicks()

      expect(clicks).toBe(0)

      expect(useClickStore.getState().clicks).toBe(0)
      expect(useClickStore.getState().isLoading).toBe(false)
      expect(useClickStore.getState().error).toBe('Erro de servidor')
    })
  })

  describe('setClicks', () => {
    it('deve definir clicks diretamente', () => {
      useClickStore.getState().setClicks(42)

      expect(useClickStore.getState().clicks).toBe(42)
    })
  })

  describe('clearError', () => {
    it('deve limpar o erro', () => {
      useClickStore.setState({ error: 'Algum erro' })

      expect(useClickStore.getState().error).toBe('Algum erro')

      useClickStore.getState().clearError()

      expect(useClickStore.getState().error).toBe(null)
    })
  })

  describe('Hooks customizados', () => {
    describe('useClicks', () => {
      it('deve retornar apenas dados dos clicks', () => {
        useClickStore.setState({
          clicks: 30,
          isLoading: true,
          error: 'Erro teste',
        })

        const { clicks, isLoading, error } = useClickStore.getState()

        expect({
          clicks,
          isLoading,
          error,
        }).toEqual({
          clicks: 30,
          isLoading: true,
          error: 'Erro teste',
        })
      })
    })

    describe('useClickActions', () => {
      it('deve retornar apenas as ações', () => {
        expect(typeof useClickStore.getState().fetchClicks).toBe('function')
        expect(typeof useClickStore.getState().updateClicks).toBe('function')
        expect(typeof useClickStore.getState().setClicks).toBe('function')
        expect(typeof useClickStore.getState().clearError).toBe('function')
      })
    })

    describe('useClickLoadingStates', () => {
      it('deve retornar apenas estados de loading', () => {
        useClickStore.setState({ isLoading: true })

        expect(useClickStore.getState().isLoading).toBe(true)
      })
    })
  })

  describe('Integração entre ações', () => {
    it('deve limpar erro ao fazer nova requisição', async () => {
      useClickStore.setState({ error: 'Erro anterior' })

      expect(useClickStore.getState().error).toBe('Erro anterior')

      // Mock de sucesso
      mockClicksService.getClicks.mockResolvedValueOnce({
        data: { clicks: 5 },
      })

      // Fazer nova requisição
      await useClickStore.getState().fetchClicks()

      // Erro deve ter sido limpo
      expect(useClickStore.getState().error).toBe(null)
    })
  })
})
