import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Admin from './pages/Admin';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.gray.lightest};
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <AuthProvider>
        <PostProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="post/:id" element={<PostDetail />} />
                <Route
                  path="create-post"
                  element={
                    <ProtectedRoute requireTeacher>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit-post/:id"
                  element={
                    <ProtectedRoute requireTeacher>
                      <EditPost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute requireTeacher>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: theme.colors.secondary.darkest,
                color: theme.colors.white,
                borderRadius: theme.borderRadius.md,
                boxShadow: theme.shadows.lg,
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: theme.colors.success.main,
                  secondary: theme.colors.white,
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: theme.colors.error.main,
                  secondary: theme.colors.white,
                },
              },
            }}
          />
        </PostProvider>
      </AuthProvider>
    </AppContainer>
  );
}

export default App;
