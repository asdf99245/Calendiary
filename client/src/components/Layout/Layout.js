import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  margin: 0px 10px;
`;

function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}

export default Layout;
