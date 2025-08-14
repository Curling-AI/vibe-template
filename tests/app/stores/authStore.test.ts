import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuthStore } from '../../../src/stores/authStore'
import { authService } from '../../../src/services/auth/authService'
import type { Session, User, AuthError } from '@supabase/supabase-js'

// Mock do authService
vi.mock('../../../src/services/auth/authService', () => ({
  authService: {
    login: vi.fn(),
    loginWithOAuth: vi.fn(),
    signUp: vi.fn(),
    logout: vi.fn(),
    resetPassword: vi.fn(),
    updatePassword: vi.fn(),
    updateUser: vi.fn(),
    sendMagicLink: vi.fn(),
    getSession: vi.fn(),
    refreshSession: vi.fn(),
    onAuthStateChange: vi.fn(),
  },
}))

const mockAuthService = vi.mocked(authService)

// Dados mock para testes
const mockUser: User = {
  id: 'user-id',
  email: 'test@example.com',
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: { name: 'Test User' },
}

const mockSession: Session = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  token_type: 'bearer',
  user: mockUser,
}

const mockError = {
  name: 'AuthError',
  message: 'Test error',
} as AuthError

describe('AuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock console.error e console.log para evitar logs durante os testes
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
    // Reset do store antes de cada teste
    useAuthStore.getState().reset()
  })

  afterEach(() => {
    vi.resetAllMocks()
    // Restaurar console
    vi.restoreAllMocks()
  })

  describe('Estado inicial', () => {
    it('deve ter estado inicial correto', () => {
      // Reset store completamente para garantir estado inicial limpo
      useAuthStore.setState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: false,
      })

      const state = useAuthStore.getState()

      expect(state.user).toBeNull()
      expect(state.session).toBeNull()
      expect(state.isLoading).toBe(false)
      expect(state.isAuthenticated).toBe(false)
      expect(state.isInitialized).toBe(false)
    })
  })

  describe('Helpers de estado', () => {
    it('deve atualizar loading state', () => {
      const { setLoading } = useAuthStore.getState()

      setLoading(true)
      expect(useAuthStore.getState().isLoading).toBe(true)

      setLoading(false)
      expect(useAuthStore.getState().isLoading).toBe(false)
    })

    it('deve atualizar usuário e status de autenticação', () => {
      const { setUser } = useAuthStore.getState()

      setUser(mockUser)
      const state = useAuthStore.getState()

      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)

      setUser(null)
      const stateAfterNull = useAuthStore.getState()

      expect(stateAfterNull.user).toBeNull()
      expect(stateAfterNull.isAuthenticated).toBe(false)
    })

    it('deve atualizar sessão e dados relacionados', () => {
      const { setSession } = useAuthStore.getState()

      setSession(mockSession)
      const state = useAuthStore.getState()

      expect(state.session).toEqual(mockSession)
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
    })

    it('deve resetar estado completamente', () => {
      const { setUser, setSession, reset } = useAuthStore.getState()

      // Configurar estado
      setUser(mockUser)
      setSession(mockSession)

      // Resetar
      reset()
      const state = useAuthStore.getState()

      expect(state.user).toBeNull()
      expect(state.session).toBeNull()
      expect(state.isLoading).toBe(false)
      expect(state.isAuthenticated).toBe(false)
      expect(state.isInitialized).toBe(true)
    })
  })

  describe('Login', () => {
    it('deve fazer login com sucesso', async () => {
      mockAuthService.login.mockResolvedValue({
        data: mockSession,
        error: null,
      })

      const { login } = useAuthStore.getState()
      const result = await login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.data).toEqual(mockSession)
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.session).toEqual(mockSession)
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
      expect(state.isLoading).toBe(false)
    })

    it('deve lidar com erro no login', async () => {
      mockAuthService.login.mockResolvedValue({
        data: null,
        error: mockError,
      })

      const { login } = useAuthStore.getState()
      const result = await login({
        email: 'test@example.com',
        password: 'wrong-password',
      })

      expect(result.data).toBeNull()
      expect(result.error).toEqual(mockError)
      expect(useAuthStore.getState().isLoading).toBe(false)
    })
  })

  describe('Login OAuth', () => {
    it('deve iniciar login OAuth', async () => {
      mockAuthService.loginWithOAuth.mockResolvedValue({
        data: null,
        error: null,
      })

      const { loginWithOAuth } = useAuthStore.getState()
      const result = await loginWithOAuth({
        provider: 'google',
      })

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockAuthService.loginWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
      })
    })
  })

  describe('Registro', () => {
    it('deve registrar usuário com sucesso', async () => {
      mockAuthService.signUp.mockResolvedValue({
        data: mockSession,
        error: null,
      })

      const { signUp } = useAuthStore.getState()
      const result = await signUp({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.data).toEqual(mockSession)
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.session).toEqual(mockSession)
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
    })
  })

  describe('Logout', () => {
    it('deve fazer logout com sucesso', async () => {
      // Configurar estado autenticado
      const { setSession } = useAuthStore.getState()
      setSession(mockSession)

      mockAuthService.logout.mockResolvedValue({
        data: null,
        error: null,
      })

      const { logout } = useAuthStore.getState()
      const result = await logout()

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.session).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.isInitialized).toBe(true)
    })
  })

  describe('Reset de senha', () => {
    it('deve enviar email de recuperação', async () => {
      mockAuthService.resetPassword.mockResolvedValue({
        data: null,
        error: null,
      })

      const { resetPassword } = useAuthStore.getState()
      const result = await resetPassword({
        email: 'test@example.com',
      })

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })
  })

  describe('Atualizar senha', () => {
    it('deve atualizar senha com sucesso', async () => {
      mockAuthService.updatePassword.mockResolvedValue({
        data: mockUser,
        error: null,
      })

      const { updatePassword } = useAuthStore.getState()
      const result = await updatePassword({
        password: 'newpassword123',
      })

      expect(result.data).toEqual(mockUser)
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
    })
  })

  describe('Atualizar usuário', () => {
    it('deve atualizar dados do usuário', async () => {
      const updatedUser: User = {
        ...mockUser,
        email: 'newemail@example.com',
      }

      mockAuthService.updateUser.mockResolvedValue({
        data: updatedUser,
        error: null,
      })

      const { updateUser } = useAuthStore.getState()
      const result = await updateUser({
        email: 'newemail@example.com',
      })

      expect(result.data).toEqual(updatedUser)
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.user).toEqual(updatedUser)
    })
  })

  describe('Link mágico', () => {
    it('deve enviar link mágico', async () => {
      mockAuthService.sendMagicLink.mockResolvedValue({
        data: null,
        error: null,
      })

      const { sendMagicLink } = useAuthStore.getState()
      const result = await sendMagicLink({
        email: 'test@example.com',
      })

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockAuthService.sendMagicLink).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })
  })

  describe('Gerenciar sessão', () => {
    it('deve obter sessão atual', async () => {
      mockAuthService.getSession.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      })

      const { getSession } = useAuthStore.getState()
      const result = await getSession()

      expect(result.data.session).toEqual(mockSession)
      expect(result.data.user).toEqual(mockUser)
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.session).toEqual(mockSession)
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
    })

    it('deve atualizar sessão', async () => {
      const newSession: Session = {
        ...mockSession,
        access_token: 'new_access_token',
      }

      mockAuthService.refreshSession.mockResolvedValue({
        data: { session: newSession, user: mockUser },
        error: null,
      })

      const { refreshSession } = useAuthStore.getState()
      const result = await refreshSession()

      expect(result.data.session).toEqual(newSession)
      expect(result.data.user).toEqual(mockUser)
      expect(result.error).toBeNull()

      const state = useAuthStore.getState()
      expect(state.session).toEqual(newSession)
    })
  })

  describe('Inicialização', () => {
    it('deve inicializar autenticação', async () => {
      mockAuthService.getSession.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      })

      mockAuthService.onAuthStateChange.mockReturnValue({
        data: {
          subscription: {
            id: 'test-subscription',
            unsubscribe: vi.fn(),
            callback: vi.fn(),
          },
        },
      })

      const { initializeAuth } = useAuthStore.getState()
      await initializeAuth()

      const state = useAuthStore.getState()
      expect(state.isInitialized).toBe(true)
      expect(state.session).toEqual(mockSession)
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
      expect(mockAuthService.onAuthStateChange).toHaveBeenCalled()
    })

    it('deve inicializar mesmo com erro', async () => {
      mockAuthService.getSession.mockRejectedValue(new Error('Connection error'))

      const { initializeAuth } = useAuthStore.getState()
      await initializeAuth()

      const state = useAuthStore.getState()
      expect(state.isInitialized).toBe(true)
      expect(state.isLoading).toBe(false)
    })
  })
})
