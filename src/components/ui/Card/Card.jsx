import React from 'react';
import styled from 'styled-components';
import { theme, mixins } from '../../../styles/theme';

const StyledCard = styled.div`
  ${mixins.card}
  
  ${props => props.hoverable && `
    cursor: pointer;
    transition: all ${theme.transitions.normal};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
      border-color: ${theme.colors.secondary.medium};
    }
  `}
  
  ${props => props.clickable && `
    cursor: pointer;
    transition: all ${theme.transitions.normal};
    
    &:active {
      transform: translateY(0);
      box-shadow: ${theme.shadows.sm};
    }
  `}
`;

const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.secondary.darkest};
  margin: 0;
`;

const CardSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.secondary.main};
  margin: ${theme.spacing.xs} 0 0 0;
`;

const CardContent = styled.div`
  color: ${theme.colors.secondary.darker};
  line-height: ${theme.lineHeight.relaxed};
`;

const CardFooter = styled.div`
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.secondary.light};
`;

export const Card = ({ 
  children, 
  hoverable = false, 
  clickable = false, 
  onClick,
  ...props 
}) => {
  return (
    <StyledCard
      hoverable={hoverable}
      clickable={clickable}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Footer = CardFooter;