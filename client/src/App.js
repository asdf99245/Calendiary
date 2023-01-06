import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import media from './media';
import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';
import { silentRefresh } from './api/authAPI';
import { userLogin } from './modules/user';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // 새로고침 시 silent refresh
  useQuery('user', silentRefresh, {
    retry: false,
    onSuccess: (res) => {
      const { user_id, user_name } = res.data;
      dispatch(userLogin({ user_id, user_name }));
      queryClient.invalidateQueries('diaries');
    },
  });

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
