import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, User, Calendar, Clock, Tag } from 'lucide-react';
import { postService } from '../services/postService';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #5a67d8;
  }
`;

const PostContainer = styled.article`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  line-height: 1.2;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2, h3, h4 {
    margin: 2rem 0 1rem 0;
    color: #1f2937;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const TagsContainer = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const TagsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TagItem = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.1rem;
  color: #6b7280;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #ef4444;
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
        const response = await postService.getPostById(id);

        const postData = response?.data || response?.post || response;
        setPost(postData);
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setError('Post não encontrado');
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
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner>Carregando post...</LoadingSpinner>;
  }

  if (error || !post) {
    return (
      <Container>
        <BackButton to="/">
          <ArrowLeft size={16} />
          Voltar aos posts
        </BackButton>
        <ErrorMessage>
          <h2>Post não encontrado</h2>
          <p>O post que você está procurando não existe ou foi removido.</p>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <ArrowLeft size={16} />
        Voltar aos posts
      </BackButton>

      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        
        <PostMeta>
          <MetaItem>
            <User size={16} />
            {post.author}
          </MetaItem>
          <MetaItem>
            <Calendar size={16} />
            {formatDate(post.createdAt)}
          </MetaItem>
          <MetaItem>
            <Clock size={16} />
            {post.readTime} min de leitura
          </MetaItem>
        </PostMeta>

        <PostContent>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </PostContent>

        {post.tags && post.tags.length > 0 && (
          <TagsContainer>
            <TagsTitle>
              <Tag size={16} />
              Tags
            </TagsTitle>
            <Tags>
              {post.tags.map((tag, index) => (
                <TagItem key={index}>#{tag}</TagItem>
              ))}
            </Tags>
          </TagsContainer>
        )}
      </PostContainer>
    </Container>
  );
};

export default PostDetail;
