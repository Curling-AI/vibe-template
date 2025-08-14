import type { User, Session, AuthError, Provider } from '@supabase/supabase-js'

export type { User, Session, AuthError, Provider }

// Tipos para dados de autenticação
export interface AuthCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends AuthCredentials {
  options?: {
    data?: Record<string, unknown>
    emailRedirectTo?: string
  }
}

export interface ResetPasswordData {
  email: string
  redirectTo?: string
}

export interface UpdatePasswordData {
  password: string
}

export interface UpdateUserData {
  email?: string
  password?: string
  data?: Record<string, unknown>
}

export interface MagicLinkData {
  email: string
  options?: {
    emailRedirectTo?: string
    shouldCreateUser?: boolean
    data?: Record<string, unknown>
  }
}

// Tipos para OAuth
export interface OAuthCredentials {
  provider: Provider
  options?: {
    redirectTo?: string
    scopes?: string
    queryParams?: Record<string, string>
  }
}

// Tipos para respostas de autenticação
export interface AuthResponse<T = unknown> {
  data: T | null
  error: AuthError | null
}

export interface AuthSessionResponse {
  data: {
    user: User | null
    session: Session | null
  }
  error: AuthError | null
}

// Estado de autenticação
export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isInitialized: boolean
}

// Tipos para o store
export interface AuthStore extends AuthState {
  // Actions
  login: (credentials: AuthCredentials) => Promise<AuthResponse<Session>>
  loginWithOAuth: (credentials: OAuthCredentials) => Promise<AuthResponse<never>>
  signUp: (credentials: SignUpCredentials) => Promise<AuthResponse<Session>>
  logout: () => Promise<AuthResponse<never>>
  resetPassword: (data: ResetPasswordData) => Promise<AuthResponse<never>>
  updatePassword: (data: UpdatePasswordData) => Promise<AuthResponse<User>>
  updateUser: (data: UpdateUserData) => Promise<AuthResponse<User>>
  sendMagicLink: (data: MagicLinkData) => Promise<AuthResponse<never>>
  getSession: () => Promise<AuthSessionResponse>
  refreshSession: () => Promise<AuthSessionResponse>
  initializeAuth: () => Promise<void>

  // Helpers
  setLoading: (loading: boolean) => void
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  reset: () => void
}

// Tipos para configuração do Supabase
export interface SupabaseConfig {
  url: string
  anonKey: string
  options?: {
    auth?: {
      persistSession?: boolean
      autoRefreshToken?: boolean
      detectSessionInUrl?: boolean
      flowType?: 'implicit' | 'pkce'
    }
  }
}

// Tipos para erros customizados
export interface AuthErrorDetails {
  code: string
  message: string
  details?: unknown
}

export class AuthServiceError extends Error {
  code: string
  details?: unknown

  constructor(error: AuthError | string, code?: string, details?: unknown) {
    if (typeof error === 'string') {
      super(error)
      this.code = code || 'UNKNOWN_ERROR'
      this.details = details
    } else {
      super(error.message)
      this.code = error.name || 'SUPABASE_ERROR'
      this.details = error
    }

    this.name = 'AuthServiceError'
  }
}
