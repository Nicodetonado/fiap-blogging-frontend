import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';
import { postService } from '../services/postService';
import { PostForm } from '../components/forms';
import { Button } from '../components/ui';
import {
  PageContainer,
  AdminHeader,
  AdminTitle,
  ButtonGroup,
  LoadingSpinner,
  ErrorMessage
} from '../styles';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePost } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (postData) => {
    setSubmitting(true);
    try {
      const updatedPostData = {
        ...postData,
        readTime: Math.ceil((postData.content?.length || 0) / 200)
      };

      await updatePost(id, updatedPostData);
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
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
        <Button onClick={() => navigate('/admin')} variant="primary">
          <ArrowLeft size={20} />
          Voltar para Admin
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AdminHeader>
        <AdminTitle>Editar Post</AdminTitle>
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={submitting}
          >
            <X size={20} />
            Cancelar
          </Button>
        </ButtonGroup>
      </AdminHeader>

      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        loading={submitting}
        submitText="Salvar Alterações"
        cancelText="Cancelar"
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default EditPost;