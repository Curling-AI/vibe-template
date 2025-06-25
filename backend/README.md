# Vibe Template Backend (BFF)

Backend For Frontend (BFF) para o projeto Vibe Template usando Express.js 5.0.

## 🚀 Funcionalidades

- **Express.js 5.0** - Framework web moderno
- **TypeScript** - Tipagem estática para JavaScript
- **CORS configurado** - Para comunicação com o frontend
- **Middlewares de segurança** - Helmet para proteção básica
- **Compressão** - Otimização de responses
- **Logging** - Morgan para logs de requisições
- **Tratamento de erros** - Middleware centralizado
- **Hot reload** - Nodemon para desenvolvimento

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── config/          # Configurações da aplicação
│   ├── controllers/     # Controladores da API
│   ├── middleware/      # Middlewares customizados
│   ├── routes/          # Definição das rotas
│   ├── services/        # Lógica de negócio
│   ├── types/           # Tipos TypeScript customizados
│   ├── app.ts           # Configuração da aplicação Express
│   └── index.ts         # Ponto de entrada do servidor
├── dist/                # Arquivos compilados (gerado)
├── node_modules/        # Dependências (gerado)
├── package.json         # Configurações do npm
├── tsconfig.json        # Configurações do TypeScript
└── nodemon.json         # Configurações do nodemon
```

## 🛠️ Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar versão compilada
npm start
```

## 🔧 Configuração

As configurações são gerenciadas através do arquivo `src/config/index.ts` e variáveis de ambiente:

- `PORT` - Porta do servidor (padrão: 3001)
- `NODE_ENV` - Ambiente de execução (development/production)
- `FRONTEND_URL` - URL do frontend para CORS (padrão: http://localhost:5173)
- `API_PREFIX` - Prefixo das rotas da API (padrão: /api/v1)

## 📡 Endpoints Disponíveis

### Health Check

- `GET /health` - Status do servidor
- `GET /info` - Informações da aplicação

### API de Exemplo

- `GET /api/v1/users` - Listar usuários
- `GET /api/v1/users/:id` - Obter usuário por ID
- `POST /api/v1/users` - Criar novo usuário

## 🔄 Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado na porta 3001 (ou na porta definida na variável PORT) com hot reload automático.

## 🏗️ Build e Deploy

Para compilar o projeto para produção:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm start
```

## 🔍 Logs

A aplicação utiliza Morgan para logging de requisições HTTP. Em desenvolvimento, os logs incluem informações detalhadas das requisições.

## 🛡️ Segurança

- **Helmet** - Headers de segurança básicos
- **CORS** - Configurado para aceitar apenas origins específicas
- **Rate limiting** - Pode ser adicionado futuramente
- **Validação de entrada** - Implementar conforme necessário
