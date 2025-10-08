import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, Calendar } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';
import { useDebounce } from '../hooks';
import {
  PageContainer,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  PostsGrid,
  PostCard,
  PostTitle,
  PostExcerpt,
  PostMeta,
  MetaItem,
  TagsContainer,
  Tag,
  LoadingSpinner,
  EmptyState,
  EmptyStateTitle,
  EmptyStateText,
  ErrorMessage
} from '../styles';

const Home = () => {
  const { posts, loading, searchPosts, searchResults, isSearching } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      searchPosts(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  const displayPosts = React.useMemo(() => {
    if (debouncedSearchQuery.trim()) {
      return Array.isArray(searchResults) ? searchResults : [];
    }
    return Array.isArray(posts) ? posts : [];
  }, [posts, searchResults, debouncedSearchQuery]);

  const getExcerpt = (content) => {
    if (!content || typeof content !== 'string') return '';
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch (error) {
      return 'Data não disponível';
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInputWrapper>
      </SearchContainer>

      {displayPosts.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>
            {isSearching ? 'Nenhum resultado encontrado' : 'Nenhum post encontrado'}
          </EmptyStateTitle>
          <EmptyStateText>
            {isSearching 
              ? 'Tente uma busca diferente ou limpe o campo de busca.'
              : 'Seja o primeiro a criar um post!'
            }
          </EmptyStateText>
        </EmptyState>
      ) : (
        <PostsGrid>
          {displayPosts.map((post) => (
            <PostCard key={post._id} as={Link} to={`/post/${post._id}`}>
              <PostTitle>
                {post.title || 'Título não disponível'}
              </PostTitle>
              
              <PostExcerpt>
                {getExcerpt(post.content)}
              </PostExcerpt>
              
              <PostMeta>
                <MetaItem>
                  <User size={16} />
                  {post.author || 'Autor não informado'}
                </MetaItem>
                
                <MetaItem>
                  <Calendar size={16} />
                  {formatDate(post.createdAt)}
                </MetaItem>
                
                {post.readTime && (
                  <MetaItem>
                    <Clock size={16} />
                    {post.readTime} min
                  </MetaItem>
                )}
              </PostMeta>
              
              {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                <TagsContainer>
                  {post.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              )}
            </PostCard>
          ))}
        </PostsGrid>
      )}
    </PageContainer>
  );
};

export default Home;