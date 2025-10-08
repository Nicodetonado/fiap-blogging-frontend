import styled from 'styled-components';
import { theme, mixins } from '../theme';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

export const SearchContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing['3xl']};
  border: 2px solid ${theme.colors.secondary.medium};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSize.base};
  transition: border-color ${theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${theme.colors.primary.lighter};
  }
  
  &::placeholder {
    color: ${theme.colors.secondary.base};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.secondary.main};
`;

export const PostsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
`;

export const PostCard = styled.div`
  display: block;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray.light};
  transition: all ${theme.transitions.normal};
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.secondary.medium};
  }
`;

export const PostTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.secondary.darkest};
  margin-bottom: ${theme.spacing.sm};
  line-height: ${theme.lineHeight.tight};
`;

export const PostExcerpt = styled.p`
  color: ${theme.colors.secondary.darker};
  line-height: ${theme.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.md};
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.secondary.main};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export const Tag = styled.span`
  background: ${theme.colors.primary.lighter};
  color: ${theme.colors.primary.dark};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
`;

export const LoadingSpinner = styled.div`
  ${mixins.flexCenter}
  height: 200px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${theme.colors.secondary.light};
    border-top: 4px solid ${theme.colors.primary.main};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const EmptyState = styled.div`
  ${mixins.flexCenter}
  flex-direction: column;
  padding: ${theme.spacing['3xl']};
  text-align: center;
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.secondary.darkest};
  margin-bottom: ${theme.spacing.sm};
`;

export const EmptyStateText = styled.p`
  color: ${theme.colors.secondary.main};
  margin-bottom: ${theme.spacing.lg};
`;

export const ErrorMessage = styled.div`
  background: ${theme.colors.error.lighter};
  color: ${theme.colors.error.dark};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.error.light};
  margin-bottom: ${theme.spacing.lg};
`;
