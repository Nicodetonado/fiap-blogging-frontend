import api from './api';

export const postService = {
  // Buscar todos os posts
  async getAllPosts() {
    const response = await api.get('/posts');
    return response.data;
  },

  // Buscar post por ID
  async getPostById(id) {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Buscar posts por termo
  async searchPosts(query) {
    const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
    return response.data;
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
