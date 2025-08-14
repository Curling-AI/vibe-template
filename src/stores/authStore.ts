import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { authService } from '../services/auth/authService'
import type { AuthStore, AuthResponse } from '../services/auth/types'
import type { AuthError, Session, User } from '@supabase/supabase-js'

/**
 * Store de autenticação usando Zustand
 * Gerencia o estado global de autenticação da aplicação
 */
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: false,

        // Helpers para manipular estado
        setLoading: (loading: boolean) => {
          set({ isLoading: loading }, false, 'setLoading')
        },

        setUser: (user) => {
          set(
            {
              user,
              isAuthenticated: !!user,
            },
            false,
            'setUser',
          )
        },

        setSession: (session) => {
          set(
            {
              session,
              user: session?.user || null,
              isAuthenticated: !!session?.user,
            },
            false,
            'setSession',
          )
        },

        reset: () => {
          set(
            {
              user: null,
              session: null,
              isLoading: false,
              isAuthenticated: false,
              isInitialized: true,
            },
            false,
            'reset',
          )
        },

        // Actions de autenticação
        login: async (credentials): Promise<AuthResponse<Session>> => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.login(credentials)

            if (response.data && !response.error) {
              set(
                {
                  session: response.data,
                  user: response.data.user,
                  isAuthenticated: true,
                },
                false,
                'login:success',
              )
            }

            return response
          } catch (error) {
            console.error('Erro no login:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        loginWithOAuth: async (credentials) => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.loginWithOAuth(credentials)
            return response
          } catch (error) {
            console.error('Erro no login OAuth:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        signUp: async (credentials): Promise<AuthResponse<Session>> => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.signUp(credentials)

            if (response.data && !response.error) {
              set(
                {
                  session: response.data,
                  user: response.data.user,
                  isAuthenticated: true,
                },
                false,
                'signUp:success',
              )
            }

            return response
          } catch (error) {
            console.error('Erro no registro:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        logout: async () => {
          const { setLoading, reset } = get()

          try {
            setLoading(true)
            const response = await authService.logout()

            if (!response.error) {
              reset()
            }

            return response
          } catch (error) {
            console.error('Erro no logout:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        resetPassword: async (data) => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.resetPassword(data)
            return response
          } catch (error) {
            console.error('Erro ao resetar senha:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        updatePassword: async (data): Promise<AuthResponse<User>> => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.updatePassword(data)

            if (response.data && !response.error) {
              set({ user: response.data }, false, 'updatePassword:success')
            }

            return response
          } catch (error) {
            console.error('Erro ao atualizar senha:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        updateUser: async (data): Promise<AuthResponse<User>> => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.updateUser(data)

            if (response.data && !response.error) {
              set({ user: response.data }, false, 'updateUser:success')
            }

            return response
          } catch (error) {
            console.error('Erro ao atualizar usuário:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        sendMagicLink: async (data) => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.sendMagicLink(data)
            return response
          } catch (error) {
            console.error('Erro ao enviar link mágico:', error)
            return {
              data: null,
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        getSession: async () => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.getSession()

            if (response.data && !response.error) {
              set(
                {
                  session: response.data.session,
                  user: response.data.user,
                  isAuthenticated: !!response.data.user,
                },
                false,
                'getSession:success',
              )
            }

            return response
          } catch (error) {
            console.error('Erro ao obter sessão:', error)
            return {
              data: { user: null, session: null },
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        refreshSession: async () => {
          const { setLoading } = get()

          try {
            setLoading(true)
            const response = await authService.refreshSession()

            if (response.data && !response.error) {
              set(
                {
                  session: response.data.session,
                  user: response.data.user,
                  isAuthenticated: !!response.data.user,
                },
                false,
                'refreshSession:success',
              )
            }

            return response
          } catch (error) {
            console.error('Erro ao atualizar sessão:', error)
            return {
              data: { user: null, session: null },
              error: error as AuthError,
            }
          } finally {
            setLoading(false)
          }
        },

        // Inicialização da autenticação
        initializeAuth: async () => {
          const { setLoading, setSession } = get()

          try {
            setLoading(true)

            // Obter sessão atual
            const sessionResponse = await authService.getSession()

            if (sessionResponse.data && !sessionResponse.error) {
              setSession(sessionResponse.data.session)
            }

            // Configurar listener para mudanças de autenticação
            authService.onAuthStateChange((event, session) => {
              console.log('Auth state changed:', event, session)
              setSession(session)
            })

            set({ isInitialized: true }, false, 'initializeAuth:complete')
          } catch (error) {
            console.error('Erro ao inicializar autenticação:', error)
            set({ isInitialized: true }, false, 'initializeAuth:error')
          } finally {
            setLoading(false)
          }
        },
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          session: state.session,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: 'auth-store',
    },
  ),
)
