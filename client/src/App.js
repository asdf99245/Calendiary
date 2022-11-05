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
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';
import { silentRefresh } from './api/authAPI';
import axios from 'axios';
import { userLogin } from './modules/user';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const queryClient = useQueryClient();

  // 새로고침 시 silent refresh
  useQuery('user', silentRefresh, {
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess: (res) => {
      const { accessToken, user_id, user_name } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      dispatch(userLogin({ user_id, user_name }));
      queryClient.invalidateQueries('diaries');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 로그인 상태에서 자동으로 token 갱신
  useQuery('user', silentRefresh, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!isLogin, // 로그인 상태일때만 갱신
    refetchInterval: 60 * 60 * 1000 - 60000,
    refetchIntervalInBackground: true,
    onSuccess: (res) => {
      const { accessToken, user_id, user_name } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      dispatch(userLogin({ user_id, user_name }));
      queryClient.invalidateQueries('diaries');
    },
    onError: (err) => {
      console.log(err);
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
