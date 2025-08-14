# 🐳 Docker + Traefik - Vibe Template

Configuração Docker completa com proxy reverso Traefik e SSL automático.

## 🚀 Início Rápido

```bash
# 1. Configurar
npm run env:init         # Criar .env
npm run env:local        # Ou configurar interativamente

# 2. Executar
npm run docker:dev       # Desenvolvimento com hot reload
npm run docker:prod      # Produção com proxy reverso

# 3. Acessar
# Dev: localhost:5173 (frontend) + localhost:3001 (api)
# Prod: localhost (frontend) + api.localhost (api) + localhost:8080 (traefik)
```

## 📋 Scripts

```bash
# Configuração
npm run env:init         # Copiar .env.default -> .env
npm run env:local        # Configurar ambiente local
npm run env:staging      # Configurar staging
npm run env:production   # Configurar produção

# Execução
npm run docker:dev       # Desenvolvimento (hot reload)
npm run docker:prod      # Produção HTTP (local)
npm run docker:prod:ssl  # Produção HTTPS (domínio real)
npm run docker:prod:down # Parar containers

# Utilitários
npm run docker:logs      # Ver logs
npm run docker:clean     # Limpar sistema
```

## 🔧 Configuração SSL/HTTPS

**Para desenvolvimento local (HTTP):**

```bash
npm run env:local        # Configura localhost
npm run docker:prod      # HTTP simples
```

**Para produção real (HTTPS + Let's Encrypt):**

```bash
npm run env:production   # Configura domínio real
npm run docker:prod:ssl  # HTTPS + certificados automáticos
```

## 🌐 URLs de Acesso

| Ambiente            | Frontend          | API                   | Traefik                        |
| ------------------- | ----------------- | --------------------- | ------------------------------ |
| **Desenvolvimento** | `localhost:5173`  | `localhost:3001`      | -                              |
| **Produção Local**  | `localhost`       | `api.localhost`       | `localhost:8080`               |
| **Produção Real**   | `seu-dominio.com` | `api.seu-dominio.com` | `traefik.seu-dominio.com:8080` |

## 🔧 Troubleshooting

```bash
# Ver logs
docker-compose logs -f

# Verificar portas em uso
lsof -i :80 :443 :5173 :3001 :8080

# Limpeza completa
docker-compose down
npm run docker:clean

# Rebuild forçado
docker-compose up --build --force-recreate
```

## ⚙️ Variáveis de Ambiente (.env)

**Principais variáveis:**

```env
# Domínios
FRONTEND_DOMAIN=localhost           # Domínio do frontend (Traefik)
API_DOMAIN=api.localhost           # Domínio da API (Traefik)
FRONTEND_URL=http://localhost      # URL completa para CORS
VITE_API_BASE_URL=http://api.localhost # URL da API para build frontend

# SSL (produção)
LETSENCRYPT_EMAIL=admin@seudominio.com
SSL_ENABLED=true
LETSENCRYPT_STAGING=false

# Configurações
NODE_ENV=production
TRAEFIK_DASHBOARD_ENABLED=true
```

**Configuração rápida:**

```bash
npm run env:local       # localhost (desenvolvimento)
npm run env:staging     # staging.dominio.com
npm run env:production  # dominio.com (produção)
```

## 📊 Monitoramento

```bash
docker-compose ps              # Status dos containers
docker-compose logs -f         # Logs em tempo real
docker-compose logs -f api     # Logs específicos
docker stats                   # Recursos utilizados
```
