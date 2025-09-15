import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    // Verificar se o token é válido (não vazio e não 'null' string)
    return savedToken && savedToken !== 'null' && savedToken.trim() !== '' ? savedToken : null;
  });

  // Configurar URL base da API - SEMPRE do config (que vem do .env)
  const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

  const clearAllData = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const makeRequest = async (url, options = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    // Sempre buscar o token atual do localStorage
    const currentToken = localStorage.getItem('token');
    if (currentToken && currentToken !== 'null' && currentToken.trim() !== '') {
      headers.Authorization = `Bearer ${currentToken}`;
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Token expirado ou inválido
      logout();
      throw new Error('Sessão expirada');
    }

    return response;
  };

  const login = async (email, senha) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no login');
      }

      const { token: newToken, usuario } = data;
      
      // Salvar token no localStorage e no state
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(usuario));
      setToken(newToken);
      setUser(usuario);

      return { success: true, user: usuario };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    clearAllData();
  };

  const verifyToken = async () => {
    const currentToken = localStorage.getItem('token');
    
    if (!currentToken || currentToken === 'null' || currentToken.trim() === '') {
      clearAllData();
      setLoading(false);
      return;
    }

    try {
      const response = await makeRequest('/verify-token');
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.usuario);
        setToken(currentToken);
        localStorage.setItem('user', JSON.stringify(data.usuario));
      } else {
        clearAllData();
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      clearAllData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    // Verificar se há dados corrompidos e limpar se necessário
    try {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      

      // Se há dados inconsistentes, limpar tudo
      if ((savedUser && !savedToken) || (!savedUser && savedToken)) {
        clearAllData();
        setLoading(false);
        return;
      }
      
      // Se há usuário salvo mas token é inválido
      if (savedUser && savedToken && (!token || token.trim() === '' || token === 'null')) {
        clearAllData();
        setLoading(false);
        return;
      }
      
      // Tentar fazer parse do usuário se existir
      if (savedUser) {
        JSON.parse(savedUser);
      }
      
    } catch (error) {
      clearAllData();
      setLoading(false);
      return;
    }

    // Se chegou até aqui, verificar token
    verifyToken();
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    makeRequest,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.tipo === 'admin',
    isConsultor: user?.tipo === 'consultor'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 