import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye, Calendar, User, Clock, Search } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';
import { Button } from '../components/ui';
import {
  AdminContainer,
  AdminHeader,
  AdminTitle,
  AdminStats,
  StatCard,
  StatValue,
  StatLabel,
  PostsTable,
  TableHeader,
  TableRow,
  ActionButtons,
  ActionButton,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  EmptyState,
  EmptyStateTitle,
  EmptyStateText
} from '../styles';
import toast from 'react-hot-toast';

const Admin = () => {
  const { posts, loading, deletePost, searchPosts, searchResults, isSearching } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchPosts(query);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Tem certeza que deseja excluir o post "${title}"?`)) {
      try {
        await deletePost(id);
        toast.success('Post excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir post');
      }
    }
  };

  const displayPosts = searchQuery.trim() ? searchResults : posts;
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.isPublished).length;
  const draftPosts = posts.filter(post => !post.isPublished).length;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch (error) {
      return 'N/A';
    }
  };

  const getExcerpt = (content) => {
    if (!content || typeof content !== 'string') return '';
    return content.length > 50 ? content.substring(0, 50) + '...' : content;
  };

  if (loading) {
    return (
      <AdminContainer>
        <div>Carregando...</div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Painel Administrativo</AdminTitle>
        <Button as={Link} to="/create-post" variant="primary">
          <Plus size={20} />
          Novo Post
        </Button>
      </AdminHeader>

      <AdminStats>
        <StatCard>
          <StatValue>{totalPosts}</StatValue>
          <StatLabel>Total de Posts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{publishedPosts}</StatValue>
          <StatLabel>Publicados</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{draftPosts}</StatValue>
          <StatLabel>Rascunhos</StatLabel>
        </StatCard>
      </AdminStats>

      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar posts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
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
              ? 'Tente uma busca diferente.'
              : 'Crie seu primeiro post!'
            }
          </EmptyStateText>
        </EmptyState>
      ) : (
        <PostsTable>
          <TableHeader>
            <div>Título</div>
            <div>Autor</div>
            <div>Data</div>
            <div>Status</div>
            <div>Ações</div>
          </TableHeader>
          
          {displayPosts.map((post) => (
            <TableRow key={post._id}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {post.title || 'Sem título'}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {getExcerpt(post.content)}
                </div>
              </div>
              
              <div>{post.author || 'N/A'}</div>
              
              <div>{formatDate(post.createdAt)}</div>
              
              <div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: post.isPublished ? '#dcfce7' : '#fef3c7',
                  color: post.isPublished ? '#166534' : '#92400e'
                }}>
                  {post.isPublished ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              
              <ActionButtons>
                <ActionButton
                  as={Link}
                  to={`/post/${post._id}`}
                  variant="view"
                  title="Visualizar"
                >
                  <Eye size={16} />
                </ActionButton>
                
                <ActionButton
                  as={Link}
                  to={`/edit-post/${post._id}`}
                  variant="edit"
                  title="Editar"
                >
                  <Edit size={16} />
                </ActionButton>
                
                <ActionButton
                  onClick={() => handleDelete(post._id, post.title)}
                  variant="delete"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </ActionButton>
              </ActionButtons>
            </TableRow>
          ))}
        </PostsTable>
      )}
    </AdminContainer>
  );
};

export default Admin;