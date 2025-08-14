import { describe, it, expect, vi, beforeEach, afterEach, MockedFunction } from 'vitest'
import { authService } from '../../../src/services/auth/authService'
import { supabase } from '../../../src/services/auth/config'
import type { AuthError, Session, SupabaseClient, User } from '@supabase/supabase-js'

// Mock do Supabase
vi.mock('../../../src/services/auth/config', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
      signInWithOtp: vi.fn(),
      getSession: vi.fn(),
      refreshSession: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}))

const mockSupabase = vi.mocked(supabase) as unknown as SupabaseClient & {
  auth: {
    signInWithPassword: MockedFunction<typeof supabase.auth.signInWithPassword>
    signInWithOAuth: MockedFunction<typeof supabase.auth.signInWithOAuth>
    signUp: MockedFunction<typeof supabase.auth.signUp>
    signOut: MockedFunction<typeof supabase.auth.signOut>
    resetPasswordForEmail: MockedFunction<typeof supabase.auth.resetPasswordForEmail>
    updateUser: MockedFunction<typeof supabase.auth.updateUser>
    signInWithOtp: MockedFunction<typeof supabase.auth.signInWithOtp>
    getSession: MockedFunction<typeof supabase.auth.getSession>
    refreshSession: MockedFunction<typeof supabase.auth.refreshSession>
    onAuthStateChange: MockedFunction<typeof supabase.auth.onAuthStateChange>
  }
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const mockSession: Session = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: {
          id: 'user-id',
          email: 'test@example.com',
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
        },
      }

      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: mockSession, user: mockSession.user },
        error: null,
      })

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.data).toEqual(mockSession)
      expect(result.error).toBeNull()
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    it('deve retornar erro quando login falha', async () => {
      const mockError = {
        name: 'AuthError',
        message: 'Invalid credentials',
      } as AuthError

      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: null, user: null },
        error: mockError,
      })

      const result = await authService.login({
        email: 'test@example.com',
        password: 'wrong-password',
      })

      expect(result.data).toBeNull()
      expect(result.error).toEqual(mockError)
    })
  })

  describe('loginWithOAuth', () => {
    it('deve iniciar login OAuth com sucesso', async () => {
      mockSupabase.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'google', url: 'https://oauth-url.com' },
        error: null,
      })

      const result = await authService.loginWithOAuth({
        provider: 'google',
        options: { redirectTo: 'http://localhost:3000/auth/callback' },
      })

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: { redirectTo: 'http://localhost:3000/auth/callback' },
      })
    })
  })

  describe('signUp', () => {
    it('deve registrar usuário com sucesso', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'test@example.com',
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
      }

      const mockSession: Session = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: mockUser,
      }

      mockSupabase.auth.signUp.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      })

      const result = await authService.signUp({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.data).toEqual(mockSession)
      expect(result.error).toBeNull()
    })

    it('deve retornar erro quando registro falha', async () => {
      const mockError = {
        name: 'AuthError',
        message: 'Email already exists',
      } as AuthError

      mockSupabase.auth.signUp.mockResolvedValue({
        data: { session: null, user: null },
        error: mockError,
      })

      const result = await authService.signUp({
        email: 'existing@example.com',
        password: 'password123',
      })

      expect(result.data).toBeNull()
      expect(result.error).toEqual(mockError)
    })
  })

  describe('logout', () => {
    it('deve fazer logout com sucesso', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({
        error: null,
      })

      const result = await authService.logout()

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockSupabase.auth.signOut).toHaveBeenCalled()
    })

    it('deve retornar erro quando logout falha', async () => {
      const mockError = {
        name: 'AuthError',
        message: 'Logout failed',
      } as AuthError

      mockSupabase.auth.signOut.mockResolvedValue({
        error: mockError,
      })

      const result = await authService.logout()

      expect(result.data).toBeNull()
      expect(result.error).toEqual(mockError)
    })
  })

  describe('resetPassword', () => {
    it('deve enviar email de recuperação com sucesso', async () => {
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
        data: {},
        error: null,
      })

      const result = await authService.resetPassword({
        email: 'test@example.com',
        redirectTo: 'http://localhost:3000/reset-password',
      })

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('test@example.com', {
        redirectTo: 'http://localhost:3000/reset-password',
      })
    })
  })

  describe('updatePassword', () => {
    it('deve atualizar senha com sucesso', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'test@example.com',
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
      }

      mockSupabase.auth.updateUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const result = await authService.updatePassword({
        password: 'newpassword123',
      })

      expect(result.data).toEqual(mockUser)
      expect(result.error).toBeNull()
      expect(mockSupabase.auth.updateUser).toHaveBeenCalledWith({
        password: 'newpassword123',
      })
    })
  })

  describe('updateUser', () => {
    it('deve atualizar dados do usuário com sucesso', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'newemail@example.com',
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: { name: 'New Name' },
      }

      mockSupabase.auth.updateUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const result = await authService.updateUser({
        email: 'newemail@example.com',
        data: { name: 'New Name' },
      })

      expect(result.data).toEqual(mockUser)
      expect(result.error).toBeNull()
    })
  })

  describe('sendMagicLink', () => {
    it('deve enviar link mágico com sucesso', async () => {
      mockSupabase.auth.signInWithOtp.mockResolvedValue({
        data: { user: null, session: null },
        error: null,
      })

      const result = await authService.sendMagicLink({
        email: 'test@example.com',
        options: {
          emailRedirectTo: 'http://localhost:3000/auth/callback',
        },
      })

      expect(result.data).toBeNull()
      expect(result.error).toBeNull()
      expect(mockSupabase.auth.signInWithOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        options: {
          emailRedirectTo: 'http://localhost:3000/auth/callback',
        },
      })
    })
  })

  describe('getSession', () => {
    it('deve obter sessão atual com sucesso', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'test@example.com',
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
      }

      const mockSession: Session = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: mockUser,
      }

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })

      const result = await authService.getSession()

      expect(result.data.session).toEqual(mockSession)
      expect(result.data.user).toEqual(mockSession.user)
      expect(result.error).toBeNull()
    })

    it('deve retornar null quando não há sessão', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      })

      const result = await authService.getSession()

      expect(result.data.session).toBeNull()
      expect(result.data.user).toBeNull()
      expect(result.error).toBeNull()
    })
  })

  describe('refreshSession', () => {
    it('deve atualizar sessão com sucesso', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'test@example.com',
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
      }

      const mockSession: Session = {
        access_token: 'new_access_token',
        refresh_token: 'new_refresh_token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: mockUser,
      }

      mockSupabase.auth.refreshSession.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      })

      const result = await authService.refreshSession()

      expect(result.data.session).toEqual(mockSession)
      expect(result.data.user).toEqual(mockUser)
      expect(result.error).toBeNull()
    })
  })

  describe('onAuthStateChange', () => {
    it('deve configurar listener de mudanças de autenticação', () => {
      const mockCallback = vi.fn()
      const mockUnsubscribe = vi.fn()

      mockSupabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: mockUnsubscribe, id: '1', callback: mockCallback } },
      })

      const result = authService.onAuthStateChange(mockCallback)

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledWith(mockCallback)
      expect(result).toBeDefined()
    })
  })
})
