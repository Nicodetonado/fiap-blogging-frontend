import React from 'react';
import styled from 'styled-components';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, BookOpen, Plus, Settings } from 'lucide-react';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const LoginButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Layout = () => {
  const { user, logout, isAuthenticated, isTeacher } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo to="/">
            <BookOpen size={24} />
            FIAP Blog
          </Logo>
          
          <Nav>
            <NavLink to="/">
              <BookOpen size={16} />
              Posts
            </NavLink>
            
            {isAuthenticated && isTeacher && (
              <>
                <NavLink to="/create-post">
                  <Plus size={16} />
                  Novo Post
                </NavLink>
                <NavLink to="/admin">
                  <Settings size={16} />
                  Admin
                </NavLink>
              </>
            )}
            
            {isAuthenticated ? (
              <UserInfo>
                <UserName>
                  <User size={16} />
                  {user.name}
                </UserName>
                <LogoutButton onClick={handleLogout}>
                  <LogOut size={16} />
                  Sair
                </LogoutButton>
              </UserInfo>
            ) : (
              <LoginButton to="/login">
                <User size={16} />
                Login
              </LoginButton>
            )}
          </Nav>
        </HeaderContent>
      </Header>
      
      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  );
};

export default Layout;
