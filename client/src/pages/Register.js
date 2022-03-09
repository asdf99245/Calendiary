import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../components/Auth/AuthTemplate';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
`;

function Register() {
  return (
    <Container>
      <AuthTemplate type="회원가입" />
    </Container>
  );
}

export default Register;
