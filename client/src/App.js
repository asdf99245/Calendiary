import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import ModalTemplate from './components/Modal/ModalTemplate';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';
import { silentRefresh } from './api/authAPI';
import axios from 'axios';
import { userLogin } from './modules/user';

function App() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.open);
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery('user', silentRefresh, {
    onSuccess: (res) => {
      const { accessToken, user_id, user_name } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      dispatch(userLogin({ user_id, user_name }));
      queryClient.invalidateQueries('diaries');
    },
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {modalOpen && <ModalTemplate />}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
