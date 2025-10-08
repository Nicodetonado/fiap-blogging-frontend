import styled from 'styled-components';
import { theme, mixins } from '../theme';

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.gray.light};
`;

export const FormTitle = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary.darkest};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.secondary.darker};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
`;

export const FormTextarea = styled.textarea`
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

export const TagsInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

export const TagItem = styled.span`
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

export const RemoveTagButton = styled.button`
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

export const CharacterCount = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${props => {
    if (props.count > props.max) return theme.colors.error.main;
    if (props.count > props.max * 0.9) return theme.colors.warning.main;
    return theme.colors.secondary.main;
  }};
  margin-top: ${theme.spacing.sm};
  text-align: right;
`;

export const FormError = styled.span`
  display: block;
  color: ${theme.colors.error.dark};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

export const FormHelpText = styled.span`
  display: block;
  color: ${theme.colors.secondary.main};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  ${mixins.flexCenter}
  background: linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%);
`;

export const LoginCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing['3xl']};
  width: 100%;
  max-width: 400px;
`;

export const LoginTitle = styled.h1`
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary.darkest};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

export const LoginSubtitle = styled.p`
  color: ${theme.colors.secondary.main};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

export const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

export const AdminTitle = styled.h1`
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary.darkest};
`;

export const AdminStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

export const StatCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray.light};
`;

export const StatValue = styled.div`
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary.main};
`;

export const StatLabel = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.secondary.main};
  margin-top: ${theme.spacing.xs};
`;

export const PostsTable = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray.light};
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.secondary.lightest};
  border-bottom: 1px solid ${theme.colors.gray.light};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.secondary.darkest};
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray.light};
  align-items: center;
  
  &:hover {
    background: ${theme.colors.gray.lightest};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const ActionButton = styled.button`
  ${mixins.buttonReset}
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  color: ${props => {
    switch (props.variant) {
      case 'edit': return theme.colors.primary.main;
      case 'delete': return theme.colors.error.main;
      case 'view': return theme.colors.secondary.main;
      default: return theme.colors.secondary.main;
    }
  }};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'edit': return theme.colors.primary.lighter;
        case 'delete': return theme.colors.error.lighter;
        case 'view': return theme.colors.secondary.lighter;
        default: return theme.colors.secondary.lighter;
      }
    }};
  }
`;
