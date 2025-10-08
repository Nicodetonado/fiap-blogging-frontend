import React, { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '../services/postService';
import toast from 'react-hot-toast';

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts deve ser usado dentro de um PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await postService.getAllPosts();
    
      const postsArray = response?.data?.posts || response?.posts || response || [];
      setPosts(Array.isArray(postsArray) ? postsArray : []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await postService.searchPosts(query);
      console.log('Response searchPosts:', response); // Debug
      
      // A API retorna: { success: true, data: { posts: [...] } }
      const resultsArray = response?.data?.posts || response?.posts || response || [];
      setSearchResults(Array.isArray(resultsArray) ? resultsArray : []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      toast.error('Erro ao buscar posts');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await postService.createPost(postData);
      console.log('Response createPost:', response); // Debug
      
      // A API retorna: { success: true, data: post }
      const createdPost = response?.data || response?.post || response;
      setPosts(prev => [createdPost, ...prev]);
      toast.success('Post criado com sucesso!');
      return response;
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post');
      throw error;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const response = await postService.updatePost(id, postData);
      console.log('Response updatePost:', response); // Debug
      
      // A API retorna: { success: true, data: post }
      const updatedPostData = response?.data || response?.post || response;
      setPosts(prev => prev.map(post => 
        post._id === id ? updatedPostData : post
      ));
      toast.success('Post atualizado com sucesso!');
      return response;
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      toast.error('Erro ao atualizar post');
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(prev => prev.filter(post => post._id !== id));
      setSearchResults(prev => prev.filter(post => post._id !== id));
      toast.success('Post deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      toast.error('Erro ao deletar post');
      throw error;
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const value = {
    posts,
    searchResults,
    loading,
    isSearching,
    loadPosts,
    searchPosts,
    createPost,
    updatePost,
    deletePost
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
