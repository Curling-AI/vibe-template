import { supabase } from './config'
import type {
  AuthCredentials,
  SignUpCredentials,
  ResetPasswordData,
  UpdatePasswordData,
  UpdateUserData,
  MagicLinkData,
  OAuthCredentials,
  AuthResponse,
  AuthSessionResponse,
} from './types'
import type { Session, AuthError, User } from '@supabase/supabase-js'
import { AuthServiceError } from './types'

/**
 * Service de autenticação utilizando Supabase
 * Implementa todas as funcionalidades de autenticação necessárias
 */
export class AuthService {
  /**
   * Realiza login com email e senha
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse<Session>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: data.session, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError('Erro interno no login', 'LOGIN_ERROR', error)
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Realiza login com OAuth providers (Google, GitHub, etc.)
   */
  async loginWithOAuth(credentials: OAuthCredentials): Promise<AuthResponse<never>> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: credentials.provider,
        options: credentials.options,
      })

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: null, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError(
        'Erro interno no login OAuth',
        'OAUTH_LOGIN_ERROR',
        error,
      )
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Registra um novo usuário
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse<Session>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: credentials.options,
      })

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: data.session, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError('Erro interno no registro', 'SIGNUP_ERROR', error)
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Realiza logout do usuário
   */
  async logout(): Promise<AuthResponse<never>> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: null, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError('Erro interno no logout', 'LOGOUT_ERROR', error)
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Envia email de recuperação de senha
   */
  async resetPassword(data: ResetPasswordData): Promise<AuthResponse<never>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: data.redirectTo,
      })

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: null, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError(
        'Erro interno ao enviar recuperação de senha',
        'RESET_PASSWORD_ERROR',
        error,
      )
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Atualiza a senha do usuário autenticado
   */
  async updatePassword(data: UpdatePasswordData): Promise<AuthResponse<User>> {
    try {
      const { data: userData, error } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: userData.user, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError(
        'Erro interno ao atualizar senha',
        'UPDATE_PASSWORD_ERROR',
        error,
      )
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Atualiza os dados do usuário autenticado
   */
  async updateUser(data: UpdateUserData): Promise<AuthResponse<User>> {
    try {
      const { data: userData, error } = await supabase.auth.updateUser(data)

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: userData.user, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError(
        'Erro interno ao atualizar usuário',
        'UPDATE_USER_ERROR',
        error,
      )
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Envia link mágico para login
   */
  async sendMagicLink(data: MagicLinkData): Promise<AuthResponse<never>> {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: data.options,
      })

      if (error) {
        throw new AuthServiceError(error)
      }

      return { data: null, error: null }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return { data: null, error: error.details as AuthError }
      }

      const authError = new AuthServiceError(
        'Erro interno ao enviar link mágico',
        'MAGIC_LINK_ERROR',
        error,
      )
      return { data: null, error: authError.details as AuthError }
    }
  }

  /**
   * Obtém a sessão atual do usuário
   */
  async getSession(): Promise<AuthSessionResponse> {
    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        throw new AuthServiceError(error)
      }

      return {
        data: {
          session: data.session,
          user: data.session?.user || null,
        },
        error: null,
      }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return {
          data: { user: null, session: null },
          error: error.details as AuthError,
        }
      }

      const authError = new AuthServiceError(
        'Erro interno ao obter sessão',
        'GET_SESSION_ERROR',
        error,
      )
      return {
        data: { user: null, session: null },
        error: authError.details as AuthError,
      }
    }
  }

  /**
   * Atualiza a sessão atual
   */
  async refreshSession(): Promise<AuthSessionResponse> {
    try {
      const { data, error } = await supabase.auth.refreshSession()

      if (error) {
        throw new AuthServiceError(error)
      }

      return {
        data: {
          session: data.session,
          user: data.user,
        },
        error: null,
      }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        return {
          data: { user: null, session: null },
          error: error.details as AuthError,
        }
      }

      const authError = new AuthServiceError(
        'Erro interno ao atualizar sessão',
        'REFRESH_SESSION_ERROR',
        error,
      )
      return {
        data: { user: null, session: null },
        error: authError.details as AuthError,
      }
    }
  }

  /**
   * Monitora mudanças no estado de autenticação
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Instância singleton do service
export const authService = new AuthService()
