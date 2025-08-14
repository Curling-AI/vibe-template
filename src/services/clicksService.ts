// This is a example service, you can remove it if you don't need it, but keep following the structure

import { api } from './api'
import type { ClicksResponse } from './types'

/**
 * Serviço para operações relacionadas a usuários
 */
export const clicksService = {
  /**
   * Busca todos os usuários
   */
  async getClicks(): Promise<ClicksResponse> {
    return api.get<ClicksResponse>('/clicks')
  },

  /**
   * Atualiza um usuário existente
   */
  async updateClicks(): Promise<ClicksResponse> {
    return api.put<ClicksResponse>(`/clicks`, {})
  },
}

// Exportar funções individuais para facilitar o uso
export const { getClicks, updateClicks } = clicksService
