# Variáveis de Ambiente

Este documento lista todas as variáveis de ambiente necessárias para o projeto.

## ⚠️ IMPORTANTE: Todas as configurações devem estar no .env

**NUNCA** use valores hardcoded no código! Todas as configurações devem vir exclusivamente dos arquivos `.env`.

## Backend (.env)

Crie um arquivo `.env` no diretório `backend/` com as seguintes variáveis:

```bash
# ================================
# CONFIGURAÇÕES DO SERVIDOR
# ================================
NODE_ENV=development
PORT=5000

# ================================
# CONFIGURAÇÕES DO SUPABASE
# ================================
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here

# ================================
# CONFIGURAÇÕES DE AUTENTICAÇÃO
# ================================
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=28800  # 8 horas em segundos

# ================================
# META ADS API
# ================================
META_ACCESS_TOKEN=your_meta_access_token_here
META_AD_ACCOUNT_ID=act_your_ad_account_id_here
META_APP_ID=your_app_id_here
META_APP_SECRET=your_app_secret_here

# ================================
# CONFIGURAÇÕES DE CORS
# ================================
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,https://localhost:3000
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization

# ================================
# CONFIGURAÇÕES DE UPLOAD
# ================================
MAX_FILE_SIZE=10485760  # 10MB em bytes
UPLOAD_DIR=./uploads

# ================================
# CONFIGURAÇÕES DO WHATSAPP
# ================================
WHATSAPP_AUTH_DIR=./whatsapp-auth
WHATSAPP_TIMEOUT=20000
```

## Frontend (.env)

Crie um arquivo `.env` no diretório `frontend/` com as seguintes variáveis:

```bash
# ================================
# CONFIGURAÇÕES DA API
# ================================
# URL da API do backend (OBRIGATÓRIO)
REACT_APP_API_URL=http://localhost:5000/api

# URL do WebSocket (OBRIGATÓRIO)
REACT_APP_SOCKET_URL=http://localhost:5000

# ================================
# CONFIGURAÇÕES DO SUPABASE
# ================================
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# ================================
# CONFIGURAÇÕES DE UPLOAD
# ================================
REACT_APP_MAX_FILE_SIZE=10485760  # 10MB em bytes
REACT_APP_ALLOWED_FILE_TYPES=application/pdf

# ================================
# CONFIGURAÇÕES DE AUTENTICAÇÃO
# ================================
REACT_APP_TOKEN_EXPIRY=28800000  # 8 horas em millisegundos
```

## Segurança

⚠️ **IMPORTANTE:**
- Nunca commite arquivos `.env` no Git
- Mantenha suas credenciais seguras
- Use chaves diferentes para desenvolvimento e produção
- O arquivo `.env` já está no `.gitignore` 