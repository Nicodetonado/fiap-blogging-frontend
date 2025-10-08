export const authService = {
  async login(credentials) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'professor@fiap.com' && credentials.password === '123456') {
      const user = {
        id: '1',
        email: credentials.email,
        name: 'Professor FIAP',
        role: 'teacher'
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user, token };
    }
    
    throw new Error('Credenciais inválidas');
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      return null;
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  getToken() {
    return localStorage.getItem('authToken');
  }
};