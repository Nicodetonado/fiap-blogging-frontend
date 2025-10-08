import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Clock, User, Calendar } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const PostsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const PostCard = styled(Link)`
  display: block;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
  line-height: 1.3;
`;

const PostExcerpt = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #6b7280;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const Home = () => {
  const { posts, searchResults, loading, isSearching, searchPosts } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchPosts(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchPosts]);

  // Garantir que displayPosts seja sempre um array
  const displayPosts = React.useMemo(() => {
    const source = searchQuery.trim() ? searchResults : posts;
    return Array.isArray(source) ? source : [];
  }, [searchQuery, searchResults, posts]);
  
  const isLoading = loading || isSearching;

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content || typeof content !== 'string') return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput>
          <SearchIcon size={20} />
          <Input
            type="text"
            placeholder="Buscar posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInput>
      </SearchContainer>

      {isLoading ? (
        <LoadingSpinner>
          {isSearching ? 'Buscando...' : 'Carregando posts...'}
        </LoadingSpinner>
      ) : displayPosts.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>
            {searchQuery.trim() ? 'Nenhum post encontrado' : 'Nenhum post disponível'}
          </EmptyStateTitle>
          <p>
            {searchQuery.trim() 
              ? 'Tente uma busca diferente ou limpe o campo de busca.'
              : 'Ainda não há posts publicados.'
            }
          </p>
        </EmptyState>
      ) : (
        <PostsGrid>
          {displayPosts.map((post) => (
            <PostCard key={post?._id || Math.random()} to={`/post/${post?._id}`}>
              <PostTitle>{post?.title || 'Título não disponível'}</PostTitle>
              <PostExcerpt>{getExcerpt(post?.content)}</PostExcerpt>
              
              <PostMeta>
                <MetaItem>
                  <User size={14} />
                  {post?.author || 'Autor não informado'}
                </MetaItem>
                <MetaItem>
                  <Calendar size={14} />
                  {post?.createdAt ? formatDate(post.createdAt) : 'Data não disponível'}
                </MetaItem>
                <MetaItem>
                  <Clock size={14} />
                  {post?.readTime || 1} min de leitura
                </MetaItem>
              </PostMeta>
              
              {post?.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                <Tags>
                  {post.tags.map((tag, index) => (
                    <Tag key={index}>#{tag}</Tag>
                  ))}
                </Tags>
              )}
            </PostCard>
          ))}
        </PostsGrid>
      )}
    </Container>
  );
};

export default Home;
