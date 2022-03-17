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
import { useSelector } from 'react-redux';

function App() {
  const modalOpen = useSelector((state) => state.modal.open);
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
