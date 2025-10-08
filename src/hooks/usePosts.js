import { useState, useEffect, useCallback } from 'react';
import { postService } from '../services/postService';
import { useApi } from './useApi';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, execute } = useApi();

  const loadPosts = useCallback(async () => {
    try {
      const response = await execute(() => postService.getAllPosts());
      const postsArray = response?.data?.posts || response?.posts || response || [];
      setPosts(Array.isArray(postsArray) ? postsArray : []);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      setPosts([]);
    }
  }, [execute]);

  const searchPosts = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await execute(() => postService.searchPosts(query));
      const resultsArray = response?.data?.posts || response?.posts || response || [];
      setSearchResults(Array.isArray(resultsArray) ? resultsArray : []);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      setSearchResults([]);
    }
  }, [execute]);

  const createPost = useCallback(async (postData) => {
    try {
      const response = await execute(() => postService.createPost(postData));
      const createdPost = response?.data || response?.post || response;
      setPosts(prev => [createdPost, ...prev]);
      return createdPost;
    } catch (err) {
      console.error('Erro ao criar post:', err);
      throw err;
    }
  }, [execute]);

  const updatePost = useCallback(async (id, postData) => {
    try {
      const response = await execute(() => postService.updatePost(id, postData));
      const updatedPost = response?.data || response?.post || response;
      setPosts(prev => prev.map(post => 
        post._id === id ? updatedPost : post
      ));
      return updatedPost;
    } catch (err) {
      console.error('Erro ao atualizar post:', err);
      throw err;
    }
  }, [execute]);

  const deletePost = useCallback(async (id) => {
    try {
      await execute(() => postService.deletePost(id));
      setPosts(prev => prev.filter(post => post._id !== id));
      setSearchResults(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      console.error('Erro ao deletar post:', err);
      throw err;
    }
  }, [execute]);

  const getPostById = useCallback(async (id) => {
    try {
      const response = await execute(() => postService.getPostById(id));
      return response?.data || response?.post || response;
    } catch (err) {
      console.error('Erro ao buscar post:', err);
      throw err;
    }
  }, [execute]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    searchResults,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    loadPosts,
    searchPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById,
  };
};
