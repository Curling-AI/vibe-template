// This is a example store, you can remove it if you don't need it, but keep following the structure

import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { clicksService } from '@/services'

interface ClickState {
  // Estado dos dados
  clicks: number

  // Estados de loading
  isLoading: boolean

  // Estado de erro
  error: string | null
}

interface ClickActions {
  // Ações de busca
  fetchClicks: () => Promise<number>

  // Ações de manipulação
  updateClicks: () => Promise<number>

  // Ações de interface
  setClicks: (clicks: number) => void
  clearError: () => void
}

type ClickStore = ClickState & ClickActions

const initialState: ClickState = {
  clicks: 0,
  isLoading: false,
  error: null,
}

export const useClickStore = create<ClickStore>()(
  combine(initialState, (set) => ({
    // Buscar todos os clicks
    fetchClicks: async () => {
      set({ isLoading: true, error: null })

      try {
        const response = await clicksService.getClicks()

        set({
          clicks: response.data.clicks,
          isLoading: false,
        })

        return response.data.clicks
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar clicks'
        set({
          error: errorMessage,
          isLoading: false,
        })

        return 0
      }
    },

    // Atualizar clicks
    updateClicks: async () => {
      set({ isLoading: true, error: null })

      try {
        const response = await clicksService.updateClicks()
        const clicks = response.data.clicks

        set({
          clicks,
          isLoading: false,
        })

        return clicks
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuário'
        set({
          error: errorMessage,
          isLoading: false,
        })

        return 0
      }
    },

    // Selecionar clicks
    setClicks: (clicks: number) => {
      set({ clicks })
    },

    // Limpar erro
    clearError: () => {
      set({ error: null })
    },
  })),
)

// Hook customizado para usar apenas os dados dos clicks

export const useClicks = () => {
  const clicks = useClickStore((state) => state.clicks)
  const isLoading = useClickStore((state) => state.isLoading)
  const error = useClickStore((state) => state.error)

  return { clicks, isLoading, error }
}

// Hook customizado para ações de clicks
export const useClickActions = () => {
  const fetchClicks = useClickStore((state) => state.fetchClicks)
  const updateClicks = useClickStore((state) => state.updateClicks)
  const setClicks = useClickStore((state) => state.setClicks)
  const clearError = useClickStore((state) => state.clearError)

  return {
    fetchClicks,
    updateClicks,
    setClicks,
    clearError,
  }
}

// Hook customizado para estados de loading
export const useClickLoadingStates = () => {
  const isLoading = useClickStore((state) => state.isLoading)

  return { isLoading }
}
