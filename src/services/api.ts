// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
const API_PREFIX = '/api/v1'

// Tipos base para respostas da API
export interface ApiResponse<T = unknown> {
  data?: T
  message?: string
  total?: number
}

export interface ApiError {
  error: {
    message: string
    stack?: string
  }
}

// Configuração do fetch com headers padrão
const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// Função auxiliar para fazer requests
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('/api')
    ? `${API_BASE_URL}${endpoint}`
    : `${API_BASE_URL}${API_PREFIX}${endpoint}`

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error?.message || `Erro HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro de conexão com a API')
  }
}

// Funções auxiliares para diferentes tipos de request
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, data: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),

  patch: <T>(endpoint: string, data: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}

export { API_BASE_URL, API_PREFIX }
