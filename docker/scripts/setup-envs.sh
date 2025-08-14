#!/bin/bash

# Script para configurar variáveis de ambiente facilmente
# Uso: ./setup-envs.sh [ambiente]
# Ambientes: local, staging, production

set -e

ENVIRONMENT=${1:-"local"}
ENV_FILE=".env"

echo "🔧 Configurando variáveis de ambiente: $ENVIRONMENT"

case $ENVIRONMENT in
  "local")
    read -p "🔒 Usar HTTPS para URLs locais? (y/N): " USE_HTTPS_LOCAL

    if [[ $USE_HTTPS_LOCAL =~ ^[Yy]$ ]]; then
      PROTOCOL="https"
      SSL_ENABLED=true
      HTTPS_REDIRECT=true
    else
      PROTOCOL="http"
      SSL_ENABLED=false
      HTTPS_REDIRECT=false
    fi

    cat > $ENV_FILE << EOF
# Configurações de Ambiente - Desenvolvimento Local
NODE_ENV=development
PORT=3001

# Domínios
FRONTEND_DOMAIN=localhost:5173
API_DOMAIN=localhost:3001
TRAEFIK_DOMAIN=localhost:8080

# SSL / Certificados
LETSENCRYPT_EMAIL=dev@localhost
SSL_ENABLED=$SSL_ENABLED
LETSENCRYPT_STAGING=true

# Traefik
TRAEFIK_DASHBOARD_ENABLED=true
HTTPS_REDIRECT_ENABLED=$HTTPS_REDIRECT

# Frontend
FRONTEND_URL=$PROTOCOL://localhost:5173
VITE_API_BASE_URL=$PROTOCOL://localhost:3001

# Portas de desenvolvimento
FRONTEND_PORT=5173
API_PORT=3001
TRAEFIK_PORT=8080

# Supabase (Autenticação)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
EOF
    echo "✅ Configuração local criada em $ENV_FILE"
    echo "🌐 Frontend: $PROTOCOL://localhost"
    echo "🌐 API: $PROTOCOL://api.localhost"
    echo "🌐 Traefik: http://traefik.localhost:8080"
    ;;

    "staging")
    read -p "📝 Digite o domínio base (ex: myapp.com): " BASE_DOMAIN
    read -p "📧 Digite o email para Let's Encrypt: " EMAIL
    read -p "🔒 Usar HTTPS para URLs? (Y/n): " USE_HTTPS_STAGING

    if [[ $USE_HTTPS_STAGING =~ ^[Nn]$ ]]; then
      PROTOCOL="http"
      SSL_ENABLED=false
      HTTPS_REDIRECT=false
      LETSENCRYPT_STAGING_MODE=false
    else
      PROTOCOL="https"
      SSL_ENABLED=true
      HTTPS_REDIRECT=true
      LETSENCRYPT_STAGING_MODE=true
    fi

    cat > $ENV_FILE << EOF
# Configurações de Ambiente - Staging
NODE_ENV=production
PORT=3001

# Domínios
FRONTEND_DOMAIN=staging.$BASE_DOMAIN
API_DOMAIN=api-staging.$BASE_DOMAIN
TRAEFIK_DOMAIN=traefik-staging.$BASE_DOMAIN

# SSL / Certificados
LETSENCRYPT_EMAIL=$EMAIL
SSL_ENABLED=$SSL_ENABLED
LETSENCRYPT_STAGING=$LETSENCRYPT_STAGING_MODE

# Traefik
TRAEFIK_DASHBOARD_ENABLED=true
HTTPS_REDIRECT_ENABLED=$HTTPS_REDIRECT

# Frontend
FRONTEND_URL=$PROTOCOL://staging.$BASE_DOMAIN
VITE_API_BASE_URL=$PROTOCOL://api-staging.$BASE_DOMAIN

# Portas
FRONTEND_PORT=5173
API_PORT=3001
TRAEFIK_PORT=8080

# Supabase (Autenticação)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
EOF
    echo "✅ Configuração staging criada em $ENV_FILE"
    echo "🌐 Frontend: $PROTOCOL://staging.$BASE_DOMAIN"
    echo "🌐 API: $PROTOCOL://api-staging.$BASE_DOMAIN"
    echo "🌐 Traefik: http://traefik-staging.$BASE_DOMAIN:8080"
    ;;

    "production")
    read -p "📝 Digite o domínio base (ex: myapp.com): " BASE_DOMAIN
    read -p "📧 Digite o email para Let's Encrypt: " EMAIL
    read -p "🔒 Usar HTTPS para URLs? (Y/n): " USE_HTTPS_PRODUCTION
    read -p "🔒 Habilitar dashboard Traefik? (y/N): " ENABLE_DASHBOARD

    if [[ $USE_HTTPS_PRODUCTION =~ ^[Nn]$ ]]; then
      PROTOCOL="http"
      SSL_ENABLED=false
      HTTPS_REDIRECT=false
      LETSENCRYPT_STAGING_MODE=false
    else
      PROTOCOL="https"
      SSL_ENABLED=true
      HTTPS_REDIRECT=true
      LETSENCRYPT_STAGING_MODE=false
    fi

    if [[ $ENABLE_DASHBOARD =~ ^[Yy]$ ]]; then
      DASHBOARD_ENABLED=true
    else
      DASHBOARD_ENABLED=false
    fi

    cat > $ENV_FILE << EOF
# Configurações de Ambiente - Produção
NODE_ENV=production
PORT=3001

# Domínios
FRONTEND_DOMAIN=$BASE_DOMAIN
API_DOMAIN=api.$BASE_DOMAIN
TRAEFIK_DOMAIN=traefik.$BASE_DOMAIN

# SSL / Certificados
LETSENCRYPT_EMAIL=$EMAIL
SSL_ENABLED=$SSL_ENABLED
LETSENCRYPT_STAGING=$LETSENCRYPT_STAGING_MODE

# Traefik
TRAEFIK_DASHBOARD_ENABLED=$DASHBOARD_ENABLED
HTTPS_REDIRECT_ENABLED=$HTTPS_REDIRECT

# Frontend
FRONTEND_URL=$PROTOCOL://$BASE_DOMAIN
VITE_API_BASE_URL=$PROTOCOL://api.$BASE_DOMAIN

# Portas
FRONTEND_PORT=5173
API_PORT=3001
TRAEFIK_PORT=8080

# Supabase (Autenticação)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
EOF
    echo "✅ Configuração produção criada em $ENV_FILE"
    echo "🌐 Frontend: $PROTOCOL://$BASE_DOMAIN"
    echo "🌐 API: $PROTOCOL://api.$BASE_DOMAIN"
    if [[ $DASHBOARD_ENABLED == "true" ]]; then
      echo "🌐 Traefik: http://traefik.$BASE_DOMAIN:8080"
    fi
    ;;

  *)
    echo "❌ Ambiente inválido: $ENVIRONMENT"
    echo "Ambientes válidos: local, staging, production"
    exit 1
    ;;
esac

echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis do Supabase:"
echo "   - VITE_SUPABASE_URL: URL do seu projeto Supabase"
echo "   - VITE_SUPABASE_ANON_KEY: Chave anônima do Supabase"
echo "2. Configure DNS para apontar os domínios para este servidor (se necessário)"
echo "3. Execute: npm run docker:prod"
echo "4. Aguarde os certificados SSL serem gerados automaticamente"
echo ""
echo "📄 Arquivo de configuração gerado: $ENV_FILE"
echo ""
echo "🔑 Para obter as variáveis do Supabase:"
echo "   1. Acesse https://supabase.com"
echo "   2. Crie um novo projeto"
echo "   3. Vá para Settings > API"
echo "   4. Copie a URL e a chave anônima"
echo ""
echo "💡 Dica: Para usar um template base, copie o arquivo .env.default:"
echo "   cp .env.default .env"
