import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import { PostForm } from '../components/forms';
import { Button } from '../components/ui';
import {
  PageContainer,
  AdminHeader,
  AdminTitle,
  ButtonGroup
} from '../styles';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (postData) => {
    setLoading(true);
    try {
      const postWithAuthor = {
        ...postData,
        author: user?.name || 'Autor não informado',
        isPublished: true,
        readTime: Math.ceil((postData.content?.length || 0) / 200)
      };

      await createPost(postWithAuthor);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <AdminHeader>
        <AdminTitle>Criar Novo Post</AdminTitle>
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            <X size={20} />
            Cancelar
          </Button>
        </ButtonGroup>
      </AdminHeader>

      <PostForm
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Publicar Post"
        cancelText="Cancelar"
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default CreatePost;