import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import media from './media';
import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout/Layout';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import useUserRefresh from './hooks/useUserRefresh';

function App() {
  // 새로고침 시 silent refresh
  useUserRefresh();

  return (
    <ThemeProvider theme={{ ...theme, ...media }}>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
