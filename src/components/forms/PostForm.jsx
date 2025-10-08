import React from 'react';
import styled from 'styled-components';
import { Button, Input, Card } from '../ui';
import { useForm } from '../../hooks';
import { theme } from '../../styles/theme';

const FormContainer = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary.darkest};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.secondary.darker};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => {
    if (props.error) return theme.colors.error.main;
    if (props.success) return theme.colors.success.main;
    return theme.colors.secondary.medium;
  }};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.white};
  color: ${theme.colors.secondary.darkest};
  font-size: ${theme.fontSize.base};
  font-family: inherit;
  font-weight: ${theme.fontWeight.normal};
  line-height: ${theme.lineHeight.relaxed};
  resize: vertical;
  min-height: 120px;
  transition: all ${theme.transitions.normal};
  
  &::placeholder {
    color: ${theme.colors.secondary.base};
    font-weight: ${theme.fontWeight.normal};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => {
      if (props.error) return theme.colors.error.main;
      if (props.success) return theme.colors.success.main;
      return theme.colors.primary.main;
    }};
    box-shadow: 0 0 0 3px ${props => {
      if (props.error) return theme.colors.error.lighter;
      if (props.success) return theme.colors.success.lighter;
      return theme.colors.primary.lighter;
    }};
  }
  
  &:disabled {
    background-color: ${theme.colors.secondary.lighter};
    color: ${theme.colors.secondary.base};
    cursor: not-allowed;
    border-color: ${theme.colors.secondary.light};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background-color: ${theme.colors.primary.lighter};
  color: ${theme.colors.primary.dark};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary.dark};
  cursor: pointer;
  padding: 0;
  margin-left: ${theme.spacing.xs};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  
  &:hover {
    color: ${theme.colors.primary.darker};
  }
`;

const CharacterCount = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${props => {
    if (props.count > props.max) return theme.colors.error.main;
    if (props.count > props.max * 0.9) return theme.colors.warning.main;
    return theme.colors.secondary.main;
  }};
  margin-top: ${theme.spacing.sm};
  text-align: right;
`;

const ErrorMessage = styled.span`
  display: block;
  color: ${theme.colors.error.dark};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

const HelpText = styled.span`
  display: block;
  color: ${theme.colors.secondary.main};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
`;

export const PostForm = ({ 
  initialData = {}, 
  onSubmit, 
  loading = false,
  submitText = 'Publicar Post',
  cancelText = 'Cancelar',
  onCancel
}) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    addTag,
    removeTag,
    validateForm
  } = useForm(initialData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag && !values.tags?.includes(tag)) {
        addTag(tag);
        e.target.value = '';
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>
        {initialData.id ? 'Editar Post' : 'Criar Novo Post'}
      </FormTitle>
      
      <form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Input
            label="Título"
            name="title"
            value={values.title || ''}
            onChange={handleChange}
            error={errors.title}
            placeholder="Digite o título do post"
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Autor"
            name="author"
            value={values.author || ''}
            onChange={handleChange}
            error={errors.author}
            placeholder="Digite o nome do autor"
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Label>Conteúdo</Label>
          <StyledTextarea
            name="content"
            value={values.content || ''}
            onChange={handleChange}
            error={errors.content}
            placeholder="Digite o conteúdo do post..."
          />
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
          <CharacterCount 
            count={values.content?.length || 0} 
            max={5000}
          >
            {values.content?.length || 0} / 5000 caracteres
          </CharacterCount>
        </FormGroup>

        <FormGroup>
          <Label>Tags</Label>
          <Input
            placeholder="Digite uma tag e pressione Enter"
            onKeyPress={handleTagKeyPress}
            fullWidth
          />
          <HelpText>
            Adicione tags para facilitar a busca e organização
          </HelpText>
          
          {values.tags && values.tags.length > 0 && (
            <TagsContainer>
              {values.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                  <RemoveTagButton
                    type="button"
                    onClick={() => removeTag(index)}
                  >
                    ×
                  </RemoveTagButton>
                </Tag>
              ))}
            </TagsContainer>
          )}
        </FormGroup>

        <ButtonGroup>
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {submitText}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};