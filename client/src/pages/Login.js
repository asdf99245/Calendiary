import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
`;

function Login() {
  return <Container></Container>;
}

export default Login;
