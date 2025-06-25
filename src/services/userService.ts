import { api } from './api'
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UsersResponse,
  UserResponse,
  CreateUserResponse,
} from './types'

/**
 * Serviço para operações relacionadas a usuários
 */
export const userService = {
  /**
   * Busca todos os usuários
   */
  async getUsers(): Promise<UsersResponse> {
    return api.get<UsersResponse>('/users')
  },

  /**
   * Busca um usuário específico por ID
   */
  async getUserById(id: number): Promise<UserResponse> {
    return api.get<UserResponse>(`/users/${id}`)
  },

  /**
   * Cria um novo usuário
   */
  async createUser(userData: CreateUserRequest): Promise<CreateUserResponse> {
    return api.post<CreateUserResponse>('/users', userData)
  },

  /**
   * Atualiza um usuário existente
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserResponse> {
    return api.put<UserResponse>(`/users/${id}`, userData)
  },

  /**
   * Remove um usuário
   */
  async deleteUser(id: number): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`/users/${id}`)
  },

  /**
   * Busca usuários com filtros (exemplo para expansão futura)
   */
  async searchUsers(query: {
    name?: string
    email?: string
    page?: number
    limit?: number
  }): Promise<UsersResponse> {
    const searchParams = new URLSearchParams()

    if (query.name) searchParams.append('name', query.name)
    if (query.email) searchParams.append('email', query.email)
    if (query.page) searchParams.append('page', query.page.toString())
    if (query.limit) searchParams.append('limit', query.limit.toString())

    const queryString = searchParams.toString()
    const endpoint = queryString ? `/users?${queryString}` : '/users'

    return api.get<UsersResponse>(endpoint)
  },
}

// Exportar funções individuais para facilitar o uso
export const { getUsers, getUserById, createUser, updateUser, deleteUser, searchUsers } =
  userService
