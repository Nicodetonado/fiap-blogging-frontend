import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const StyledInput = styled.input`
  width: 100%;
  padding: ${props => {
    switch (props.size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.lg}`;
      default: return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return theme.fontSize.sm;
      case 'lg': return theme.fontSize.lg;
      default: return theme.fontSize.base;
    }
  }};
  
  border: 2px solid ${props => {
    if (props.error) return theme.colors.error.main;
    if (props.success) return theme.colors.success.main;
    return theme.colors.secondary.medium;
  }};
  
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.white};
  color: ${theme.colors.secondary.darkest};
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

const Label = styled.label`
  display: block;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.secondary.darker};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
`;

const ErrorMessage = styled.span`
  display: block;
  color: ${theme.colors.error.dark};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

const SuccessMessage = styled.span`
  display: block;
  color: ${theme.colors.success.dark};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

const HelpText = styled.span`
  display: block;
  color: ${theme.colors.secondary.main};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.sm};
`;

export const Input = ({
  label,
  error,
  success,
  helpText,
  fullWidth = false,
  ...props
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && <Label>{label}</Label>}
      <StyledInput
        error={error}
        success={success}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      {helpText && !error && !success && <HelpText>{helpText}</HelpText>}
    </div>
  );
};