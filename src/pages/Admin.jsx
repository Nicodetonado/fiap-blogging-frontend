import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Edit, Trash2, Plus, Eye, Calendar, User, Clock, Search } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
`;

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.div`
  position: relative;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const PostsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
`;

const PostExcerpt = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
  line-height: 1.4;
`;

const PostMeta = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const Tag = styled.span`
  background: #f3f4f6;
  color: #374151;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
`;

const EditButton = styled(ActionButton)`
  background: #f3f4f6;
  color: #374151;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #fef2f2;
  color: #ef4444;
  
  &:hover {
    background: #fee2e2;
  }
`;

const ViewButton = styled(ActionButton)`
  background: #f0f9ff;
  color: #0ea5e9;
  
  &:hover {
    background: #e0f2fe;
  }
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-weight: 500;
`;

const Admin = () => {
  const { posts, loading, deletePost } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.tags && post.tags.some(tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  const handleDelete = async (postId, postTitle) => {
    if (window.confirm(`Tem certeza que deseja deletar o post "${postTitle}"?`)) {
      try {
        await deletePost(postId);
      } catch (error) {
        console.error('Erro ao deletar post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getExcerpt = (content, maxLength = 80) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Container>
      <Header>
        <Title>Painel Administrativo</Title>
        <CreateButton to="/create-post">
          <Plus size={16} />
          Novo Post
        </CreateButton>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatNumber>{posts.length}</StatNumber>
          <StatLabel>Total de Posts</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{posts.filter(post => post.isPublished).length}</StatNumber>
          <StatLabel>Posts Publicados</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{posts.filter(post => !post.isPublished).length}</StatNumber>
          <StatLabel>Posts Rascunhos</StatLabel>
        </StatCard>
      </StatsContainer>

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

      {loading ? (
        <LoadingSpinner>Carregando posts...</LoadingSpinner>
      ) : filteredPosts.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>
            {searchQuery ? 'Nenhum post encontrado' : 'Nenhum post disponível'}
          </EmptyStateTitle>
          <p>
            {searchQuery 
              ? 'Tente uma busca diferente.'
              : 'Comece criando seu primeiro post!'
            }
          </p>
        </EmptyState>
      ) : (
        <PostsTable>
          <TableHeader>
            <div>Post</div>
            <div>Autor</div>
            <div>Data</div>
            <div>Tags</div>
            <div>Ações</div>
          </TableHeader>
          
          {filteredPosts.map((post) => (
            <TableRow key={post._id}>
              <div>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{getExcerpt(post.content)}</PostExcerpt>
              </div>
              
              <PostMeta>
                <User size={14} />
                {post.author}
              </PostMeta>
              
              <PostMeta>
                <Calendar size={14} />
                {formatDate(post.createdAt)}
              </PostMeta>
              
              <PostTags>
                {post.tags && post.tags.length > 0 ? (
                  post.tags.slice(0, 2).map((tag, index) => (
                    <Tag key={index}>#{tag}</Tag>
                  ))
                ) : (
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    Sem tags
                  </span>
                )}
              </PostTags>
              
              <Actions>
                <ViewButton
                  title="Visualizar post"
                  onClick={() => window.open(`/post/${post._id}`, '_blank')}
                >
                  <Eye size={16} />
                </ViewButton>
                <EditButton
                  title="Editar post"
                  as={Link}
                  to={`/edit-post/${post._id}`}
                >
                  <Edit size={16} />
                </EditButton>
                <DeleteButton
                  title="Deletar post"
                  onClick={() => handleDelete(post._id, post.title)}
                >
                  <Trash2 size={16} />
                </DeleteButton>
              </Actions>
            </TableRow>
          ))}
        </PostsTable>
      )}
    </Container>
  );
};

export default Admin;
