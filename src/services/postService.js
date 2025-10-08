import api from './api';

export const postService = {
  async getAllPosts() {
    const response = await api.get('/api/posts');
    return response.data;
  },

  async getPostById(id) {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  },

  async searchPosts(query) {
    const response = await api.get(`/api/posts/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  async createPost(postData) {
    const response = await api.post('/api/posts', postData);
    return response.data;
  },


  async updatePost(id, postData) {
    const response = await api.put(`/api/posts/${id}`, postData);
    return response.data;
  },

  // Deletar post
  async deletePost(id) {
    const response = await api.delete(`/api/posts/${id}`);
    return response.data;
  },
};
