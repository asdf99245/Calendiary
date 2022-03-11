import React from 'react';
import styled from 'styled-components';

const ButtonTemplate = styled.button`
  outline: none;
  border: none;
  background: ${({ theme }) => theme.colors.blue_2};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: ${({ theme }) => theme.spaces.base};
  ${({ theme }) => theme.common.boxShadow};
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`;

function Button({ children, ...props }) {
  return <ButtonTemplate {...props}>{children}</ButtonTemplate>;
}

export default Button;
