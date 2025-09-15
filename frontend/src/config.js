// Configuração da API - TODAS as configurações vêm do .env
const config = {
  // URL base da API - SEMPRE do .env
  API_BASE_URL: process.env.REACT_APP_API_URL || '/api',
  
  // URL do WebSocket - SEMPRE do .env
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || '',
  
  // Configurações do Supabase - SEMPRE do .env
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
  
  // Configurações de ambiente - SEMPRE do .env
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configurações de upload - SEMPRE do .env
  MAX_FILE_SIZE: parseInt(process.env.REACT_APP_MAX_FILE_SIZE || 10485760),
  ALLOWED_FILE_TYPES: process.env.REACT_APP_ALLOWED_FILE_TYPES 
    ? process.env.REACT_APP_ALLOWED_FILE_TYPES.split(',')
    : ['application/pdf'],
  
  // Configurações de autenticação - SEMPRE do .env
  TOKEN_EXPIRY: parseInt(process.env.REACT_APP_TOKEN_EXPIRY || 28800000),
};

export default config; 