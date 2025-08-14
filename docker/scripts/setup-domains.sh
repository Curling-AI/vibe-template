#!/bin/bash

# Script para configurar domínios do Docker facilmente
# Uso: ./setup-domains.sh [ambiente]
# Ambientes: local, staging, production

set -e

ENVIRONMENT=${1:-"local"}
ENV_FILE=".env"

echo "🔧 Configurando ambiente: $ENVIRONMENT"

case $ENVIRONMENT in
  "local")
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
SSL_ENABLED=false
LETSENCRYPT_STAGING=true

# Traefik
TRAEFIK_DASHBOARD_ENABLED=true
HTTPS_REDIRECT_ENABLED=false

# Frontend
FRONTEND_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3001

# Portas de desenvolvimento
FRONTEND_PORT=5173
API_PORT=3001
TRAEFIK_PORT=8080
EOF
    echo "✅ Configuração local criada em $ENV_FILE"
    echo "🌐 Frontend: http://localhost"
    echo "🌐 API: http://api.localhost"
    echo "🌐 Traefik: http://traefik.localhost:8080"
    ;;

    "staging")
    read -p "📝 Digite o domínio base (ex: myapp.com): " BASE_DOMAIN
    read -p "📧 Digite o email para Let's Encrypt: " EMAIL

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
SSL_ENABLED=true
LETSENCRYPT_STAGING=true

# Traefik
TRAEFIK_DASHBOARD_ENABLED=true
HTTPS_REDIRECT_ENABLED=true

# Frontend
FRONTEND_URL=https://staging.$BASE_DOMAIN
VITE_API_BASE_URL=https://api-staging.$BASE_DOMAIN

# Portas
FRONTEND_PORT=5173
API_PORT=3001
TRAEFIK_PORT=8080
EOF
    echo "✅ Configuração staging criada em $ENV_FILE"
    echo "🌐 Frontend: https://staging.$BASE_DOMAIN"
    echo "🌐 API: https://api-staging.$BASE_DOMAIN"
    echo "🌐 Traefik: http://traefik-staging.$BASE_DOMAIN:8080"
    ;;

    "production")
    read -p "📝 Digite o domínio base (ex: myapp.com): " BASE_DOMAIN
    read -p "📧 Digite o email para Let's Encrypt: " EMAIL
    read -p "🔒 Habilitar dashboard Traefik? (y/N): " ENABLE_DASHBOARD

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
SSL_ENABLED=true
LETSENCRYPT_STAGING=false

# Traefik
TRAEFIK_DASHBOARD_ENABLED=$DASHBOARD_ENABLED
HTTPS_REDIRECT_ENABLED=true

# Frontend
FRONTEND_URL=https://$BASE_DOMAIN
VITE_API_BASE_URL=https://api.$BASE_DOMAIN

# Portas
FRONTEND_PORT=5173
API_PORT=3001
TRAEFIK_PORT=8080
EOF
    echo "✅ Configuração produção criada em $ENV_FILE"
    echo "🌐 Frontend: https://$BASE_DOMAIN"
    echo "🌐 API: https://api.$BASE_DOMAIN"
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
echo "1. Configure DNS para apontar os domínios para este servidor"
echo "2. Execute: npm run docker:prod"
echo "3. Aguarde os certificados SSL serem gerados automaticamente"
echo ""
echo "📄 Arquivo de configuração gerado: $ENV_FILE"
echo ""
echo "💡 Dica: Para usar um template base, copie o arquivo .env.default:"
echo "   cp .env.default .env"
