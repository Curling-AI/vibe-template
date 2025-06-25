import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { userService } from '@/services'
import type { User, CreateUserRequest, UpdateUserRequest } from '@/services'

interface UserState {
  // Estado dos dados
  users: User[]
  selectedUser: User | null

  // Estados de loading
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean

  // Estado de erro
  error: string | null

  // Metadados
  total: number
  lastUpdated: Date | null
}

interface UserActions {
  // Ações de busca
  fetchUsers: () => Promise<void>
  fetchUserById: (id: number) => Promise<void>

  // Ações de manipulação
  createUser: (userData: CreateUserRequest) => Promise<User | null>
  updateUser: (id: number, userData: UpdateUserRequest) => Promise<User | null>
  deleteUser: (id: number) => Promise<boolean>

  // Ações de interface
  selectUser: (user: User | null) => void
  clearError: () => void
  clearUsers: () => void

  // Busca com filtros
  searchUsers: (query: {
    name?: string
    email?: string
    page?: number
    limit?: number
  }) => Promise<void>
}

type UserStore = UserState & UserActions

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  total: 0,
  lastUpdated: null,
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Buscar todos os usuários
      fetchUsers: async () => {
        set({ isLoading: true, error: null })

        try {
          const response = await userService.getUsers()
          set({
            users: response.data,
            total: response.total,
            lastUpdated: new Date(),
            isLoading: false,
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuários'
          set({
            error: errorMessage,
            isLoading: false,
          })
        }
      },

      // Buscar usuário por ID
      fetchUserById: async (id: number) => {
        set({ isLoading: true, error: null })

        try {
          const response = await userService.getUserById(id)
          const user = response.data

          // Atualizar o usuário na lista se já existe
          const currentUsers = get().users
          const userIndex = currentUsers.findIndex((u) => u.id === id)

          if (userIndex >= 0) {
            const updatedUsers = [...currentUsers]
            updatedUsers[userIndex] = user
            set({
              users: updatedUsers,
              selectedUser: user,
              isLoading: false,
            })
          } else {
            set({
              selectedUser: user,
              isLoading: false,
            })
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuário'
          set({
            error: errorMessage,
            isLoading: false,
          })
        }
      },

      // Criar novo usuário
      createUser: async (userData: CreateUserRequest) => {
        set({ isCreating: true, error: null })

        try {
          const response = await userService.createUser(userData)
          const newUser = response.data

          // Adicionar o novo usuário à lista
          set((state) => ({
            users: [...state.users, newUser],
            total: state.total + 1,
            isCreating: false,
            lastUpdated: new Date(),
          }))

          return newUser
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao criar usuário'
          set({
            error: errorMessage,
            isCreating: false,
          })
          return null
        }
      },

      // Atualizar usuário
      updateUser: async (id: number, userData: UpdateUserRequest) => {
        set({ isUpdating: true, error: null })

        try {
          const response = await userService.updateUser(id, userData)
          const updatedUser = response.data

          // Atualizar o usuário na lista
          set((state) => ({
            users: state.users.map((user) => (user.id === id ? updatedUser : user)),
            selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser,
            isUpdating: false,
            lastUpdated: new Date(),
          }))

          return updatedUser
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar usuário'
          set({
            error: errorMessage,
            isUpdating: false,
          })
          return null
        }
      },

      // Deletar usuário
      deleteUser: async (id: number) => {
        set({ isDeleting: true, error: null })

        try {
          await userService.deleteUser(id)

          // Remover o usuário da lista
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
            selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
            total: Math.max(0, state.total - 1),
            isDeleting: false,
            lastUpdated: new Date(),
          }))

          return true
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar usuário'
          set({
            error: errorMessage,
            isDeleting: false,
          })
          return false
        }
      },

      // Buscar usuários com filtros
      searchUsers: async (query) => {
        set({ isLoading: true, error: null })

        try {
          const response = await userService.searchUsers(query)
          set({
            users: response.data,
            total: response.total,
            lastUpdated: new Date(),
            isLoading: false,
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuários'
          set({
            error: errorMessage,
            isLoading: false,
          })
        }
      },

      // Selecionar usuário
      selectUser: (user: User | null) => {
        set({ selectedUser: user })
      },

      // Limpar erro
      clearError: () => {
        set({ error: null })
      },

      // Limpar lista de usuários
      clearUsers: () => {
        set({
          users: [],
          selectedUser: null,
          total: 0,
          lastUpdated: null,
        })
      },
    }),
    {
      name: 'user-store',
    },
  ),
)

// Hook customizado para usar apenas os dados dos usuários
export const useUsers = () => {
  const users = useUserStore((state) => state.users)
  const total = useUserStore((state) => state.total)
  const isLoading = useUserStore((state) => state.isLoading)
  const error = useUserStore((state) => state.error)
  const lastUpdated = useUserStore((state) => state.lastUpdated)

  return { users, total, isLoading, error, lastUpdated }
}

// Hook customizado para usar apenas o usuário selecionado
export const useSelectedUser = () => {
  const selectedUser = useUserStore((state) => state.selectedUser)
  const selectUser = useUserStore((state) => state.selectUser)

  return { selectedUser, selectUser }
}

// Hook customizado para ações de usuários
export const useUserActions = () => {
  const fetchUsers = useUserStore((state) => state.fetchUsers)
  const fetchUserById = useUserStore((state) => state.fetchUserById)
  const createUser = useUserStore((state) => state.createUser)
  const updateUser = useUserStore((state) => state.updateUser)
  const deleteUser = useUserStore((state) => state.deleteUser)
  const searchUsers = useUserStore((state) => state.searchUsers)
  const clearError = useUserStore((state) => state.clearError)
  const clearUsers = useUserStore((state) => state.clearUsers)

  return {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    clearError,
    clearUsers,
  }
}

// Hook customizado para estados de loading
export const useUserLoadingStates = () => {
  const isLoading = useUserStore((state) => state.isLoading)
  const isCreating = useUserStore((state) => state.isCreating)
  const isUpdating = useUserStore((state) => state.isUpdating)
  const isDeleting = useUserStore((state) => state.isDeleting)

  return { isLoading, isCreating, isUpdating, isDeleting }
}
