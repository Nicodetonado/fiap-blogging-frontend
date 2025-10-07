import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const Form = styled.form`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 300px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const TagsContainer = styled.div`
  margin-top: 1rem;
`;

const TagsInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TagInput = styled(Input)`
  flex: 1;
`;

const AddTagButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const schema = yup.object({
  title: yup
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(200, 'Título não pode ter mais de 200 caracteres')
    .required('Título é obrigatório'),
  content: yup
    .string()
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .required('Conteúdo é obrigatório'),
  author: yup
    .string()
    .min(2, 'Autor deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do autor não pode ter mais de 100 caracteres')
    .required('Autor é obrigatório'),
});

const CreatePost = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createPost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      author: user?.name || '',
    },
  });

  const content = watch('content', '');
  const title = watch('title', '');

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const postData = {
        ...data,
        tags: tags,
        isPublished: true,
      };
      
      await createPost(postData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <Title>Criar Novo Post</Title>
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>
            <X size={16} />
            Cancelar
          </CancelButton>
          <SaveButton
            type="submit"
            form="create-post-form"
            disabled={isLoading}
          >
            <Save size={16} />
            {isLoading ? 'Salvando...' : 'Publicar Post'}
          </SaveButton>
        </ButtonGroup>
      </Header>

      <Form id="create-post-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título do post..."
            {...register('title')}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <CharacterCount>
            {title.length}/200 caracteres
          </CharacterCount>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Autor *</Label>
          <Input
            id="author"
            type="text"
            placeholder="Nome do autor..."
            {...register('author')}
          />
          {errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Conteúdo *</Label>
          <TextArea
            id="content"
            placeholder="Escreva o conteúdo do post..."
            {...register('content')}
          />
          {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
          <CharacterCount>
            {content.length} caracteres
          </CharacterCount>
        </FormGroup>

        <FormGroup>
          <Label>Tags</Label>
          <TagsContainer>
            <TagsInput>
              <TagInput
                type="text"
                placeholder="Adicionar tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <AddTagButton type="button" onClick={addTag}>
                <Plus size={16} />
                Adicionar
              </AddTagButton>
            </TagsInput>
            
            {tags.length > 0 && (
              <TagsList>
                {tags.map((tag, index) => (
                  <Tag key={index}>
                    #{tag}
                    <RemoveTagButton
                      type="button"
                      onClick={() => removeTag(tag)}
                    >
                      <Trash2 size={12} />
                    </RemoveTagButton>
                  </Tag>
                ))}
              </TagsList>
            )}
          </TagsContainer>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreatePost;
