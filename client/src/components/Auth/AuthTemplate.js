import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const Template = styled.div`
  width: 500px;
  ${({ theme }) => theme.common.flexCenterColumn};
  ${({ theme }) => theme.common.boxShadow};
  padding: ${({ theme }) => theme.spaces.lg};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  h1 {
    margin: 0;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const Navigate = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.blue_1};
  }
`;

function AuthTemplate({ type }) {
  return (
    <Template>
      <h1>{type}</h1>
      <AuthForm type={type} />
      <Navigate>
        {type === '로그인' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Navigate>
    </Template>
  );
}

export default AuthTemplate;
