// Serviço de autenticação simulado
// Em um projeto real, isso seria integrado com um sistema de autenticação real

export const authService = {
  // Simular login
  async login(credentials) {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validação simples para demonstração
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

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Verificar se está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  // Obter usuário atual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar se é professor
  isTeacher() {
    const user = this.getCurrentUser();
    return user && user.role === 'teacher';
  }
};
