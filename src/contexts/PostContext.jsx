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

  // Carregar todos os posts
  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await postService.getAllPosts();
      setPosts(data.posts || data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  // Buscar posts
  const searchPosts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await postService.searchPosts(query);
      setSearchResults(data.posts || data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      toast.error('Erro ao buscar posts');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Criar post
  const createPost = async (postData) => {
    try {
      const newPost = await postService.createPost(postData);
      setPosts(prev => [newPost.post, ...prev]);
      toast.success('Post criado com sucesso!');
      return newPost;
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post');
      throw error;
    }
  };

  // Atualizar post
  const updatePost = async (id, postData) => {
    try {
      const updatedPost = await postService.updatePost(id, postData);
      setPosts(prev => prev.map(post => 
        post._id === id ? updatedPost.post : post
      ));
      toast.success('Post atualizado com sucesso!');
      return updatedPost;
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      toast.error('Erro ao atualizar post');
      throw error;
    }
  };

  // Deletar post
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

  // Carregar posts na inicialização
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
