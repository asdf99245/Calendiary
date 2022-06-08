import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray_3};
  padding: ${({ theme }) => theme.spaces.base};

  & + & {
    margin-top: ${({ theme }) => theme.spaces.base};
  }

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue_2};
  }

  ${({ theme }) => theme.mobile`
     font-size:${({ theme }) => theme.fontSizes.xs};

     & + & {
       margin-top: ${({ theme }) => theme.spaces.xs};
     }
  `};
`;

function AuthInput({ ...props }) {
  return <Input {...props} autoComplete="off" />;
}

export default AuthInput;
