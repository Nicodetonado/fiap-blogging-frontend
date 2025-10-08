import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, User, Calendar, Clock } from 'lucide-react';
import { postService } from '../services/postService';
import { Button } from '../components/ui';
import { theme } from '../styles';
import {
  PageContainer,
  PostCard,
  PostTitle,
  PostMeta,
  MetaItem,
  TagsContainer,
  Tag,
  LoadingSpinner,
  ErrorMessage
} from '../styles';
import toast from 'react-hot-toast';

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary.main};
  text-decoration: none;
  margin-bottom: ${theme.spacing.xl};
  font-weight: ${theme.fontWeight.medium};
  transition: color ${theme.transitions.normal};
  
  &:hover {
    color: ${theme.colors.primary.dark};
  }
`;

const PostContent = styled.div`
  color: ${theme.colors.secondary.darker};
  line-height: ${theme.lineHeight.relaxed};
  font-size: ${theme.fontSize.lg};
  
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.secondary.darkest};
    margin-top: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
  }
  
  ul, ol {
    margin-bottom: ${theme.spacing.md};
    padding-left: ${theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${theme.spacing.xs};
  }
  
  blockquote {
    border-left: 4px solid ${theme.colors.primary.main};
    padding-left: ${theme.spacing.md};
    margin: ${theme.spacing.lg} 0;
    font-style: italic;
    color: ${theme.colors.secondary.main};
  }
  
  code {
    background-color: ${theme.colors.secondary.lighter};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.secondary.darkest};
  }
  
  pre {
    background-color: ${theme.colors.secondary.lighter};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin: ${theme.spacing.lg} 0;
    
    code {
      background: none;
      padding: 0;
    }
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getPostById(id);
        console.log('Response getPostById:', response);
        
        const postData = response?.data || response?.post || response;
        setPost(postData);
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setError('Erro ao carregar post');
        toast.error('Erro ao carregar post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
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

  if (error || !post) {
    return (
      <PageContainer>
        <ErrorMessage>
          {error || 'Post não encontrado'}
        </ErrorMessage>
        <Button as={Link} to="/" variant="primary">
          <ArrowLeft size={20} />
          Voltar para Home
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton to="/">
        <ArrowLeft size={20} />
        Voltar para Home
      </BackButton>

      <PostCard>
        <PostTitle>
          {post.title || 'Título não disponível'}
        </PostTitle>

        <PostMeta>
          <MetaItem>
            <User size={20} />
            {post.author || 'Autor não informado'}
          </MetaItem>
          
          <MetaItem>
            <Calendar size={20} />
            {formatDate(post.createdAt)}
          </MetaItem>
          
          {post.readTime && (
            <MetaItem>
              <Clock size={20} />
              {post.readTime} min de leitura
            </MetaItem>
          )}
        </PostMeta>

        <PostContent>
          {post.content || 'Conteúdo não disponível'}
        </PostContent>

        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <TagsContainer>
            <Tag>
              <Tag size={16} />
              Tags:
            </Tag>
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
      </PostCard>
    </PageContainer>
  );
};

export default PostDetail;