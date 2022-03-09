import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../components/Auth/AuthTemplate';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
`;

function Login() {
  return (
    <Container>
      <AuthTemplate type="로그인" />
    </Container>
  );
}

export default Login;
