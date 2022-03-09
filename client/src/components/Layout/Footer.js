import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  height: 100px;
  ${({ theme }) => theme.common.flexCenter};
  background-color: ${({ theme }) => theme.colors.gray_1};
  border-top: 1px solid ${({ theme }) => theme.colors.gray_3};
  color: ${({ theme }) => theme.colors.gray_2};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

function Footer() {
  return (
    <Container>Copyright &copy; Calendiary All Rights Reserved.</Container>
  );
}

export default Footer;