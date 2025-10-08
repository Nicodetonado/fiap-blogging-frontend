import api from './api';

export const postService = {
  // Buscar todos os posts
  async getAllPosts() {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.error('Erro na API getAllPosts:', error);
      // Retornar array vazio em caso de erro
      return { posts: [] };
    }
  },

  // Buscar post por ID
  async getPostById(id) {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Buscar posts por termo
  async searchPosts(query) {
    try {
      const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Erro na API searchPosts:', error);
      // Retornar array vazio em caso de erro
      return { posts: [] };
    }
  },

  // Criar novo post
  async createPost(postData) {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Atualizar post
  async updatePost(id, postData) {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Deletar post
  async deletePost(id) {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};
