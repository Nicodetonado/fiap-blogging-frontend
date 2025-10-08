import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Lock, BookOpen, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../components/ui';
import { theme } from '../styles';
import {
  LoginContainer,
  LoginCard,
  LoginTitle,
  LoginSubtitle,
  FormGroup,
  FormLabel,
  FormError,
  FormHelpText
} from '../styles';
import toast from 'react-hot-toast';

const LogoIcon = styled(BookOpen)`
  color: ${theme.colors.primary.main};
  margin-bottom: ${theme.spacing.md};
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PasswordInputWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.secondary.main};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  
  &:hover {
    color: ${theme.colors.secondary.darkest};
  }
`;

const BackToHomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.secondary.main};
  text-decoration: none;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.primary.lighter};
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Email deve ter um formato válido')
      .required('Email é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Login realizado com sucesso!');
      
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <LogoIcon size={48} />
          <LoginTitle>FIAP Blog</LoginTitle>
          <LoginSubtitle>
            Sistema de blogging para professores
          </LoginSubtitle>
        </Logo>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              error={errors.email?.message}
              {...register('email')}
              fullWidth
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Senha</FormLabel>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                error={errors.password?.message}
                {...register('password')}
                fullWidth
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </PasswordInputWrapper>
          </FormGroup>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Entrar
          </Button>
        </form>

        <FormHelpText>
          <strong>Credenciais de demonstração:</strong><br />
          Email: professor@fiap.com<br />
          Senha: 123456
        </FormHelpText>

        <div style={{ textAlign: 'center' }}>
          <BackToHomeLink to="/">
            <ArrowLeft size={16} />
            Voltar para a página principal
          </BackToHomeLink>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;