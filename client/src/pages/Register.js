import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
`;

function Register() {
  return <Container></Container>;
}

export default Register;
