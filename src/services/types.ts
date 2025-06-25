// Tipos para as entidades da aplicação
export interface User {
  id: number
  name: string
  email: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
}

// Tipos para respostas da API
export interface UsersResponse {
  data: User[]
  total: number
  message: string
}

export interface UserResponse {
  data: User
  message: string
}

export interface CreateUserResponse {
  data: User
  message: string
}
