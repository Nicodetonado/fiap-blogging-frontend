import React from 'react';
import styled from 'styled-components';
import { theme, gradients, mixins } from '../../../styles/theme';

const StyledButton = styled.button`
  ${mixins.buttonReset}
  ${mixins.flexCenter}
  
  gap: ${theme.spacing.sm};
  padding: ${props => {
    switch (props.size) {
      case 'sm': return `${theme.spacing.sm} ${theme.spacing.md}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.sm} ${theme.spacing.lg}`;
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return theme.fontSize.sm;
      case 'lg': return theme.fontSize.lg;
      default: return theme.fontSize.base;
    }
  }};
  
  font-weight: ${theme.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.normal};
  
  ${mixins.focusRing}
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary.main};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.sm};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary.dark};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.sm};
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.white};
          color: ${theme.colors.secondary.main};
          border: 1px solid ${theme.colors.secondary.medium};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.secondary.lightest};
            border-color: ${theme.colors.secondary.base};
            color: ${theme.colors.secondary.darkest};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary.main};
          border: 2px solid ${theme.colors.primary.main};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary.lightest};
            border-color: ${theme.colors.primary.dark};
            color: ${theme.colors.primary.dark};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.secondary.main};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.secondary.lighter};
            color: ${theme.colors.secondary.darkest};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error.main};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.sm};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.error.dark};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.sm};
          }
        `;
      default:
        return `
          background: ${theme.colors.primary.main};
          color: ${theme.colors.white};
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  ${props => props.loading && `
    pointer-events: none;
    opacity: 0.8;
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  fullWidth = false, 
  onClick, 
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};