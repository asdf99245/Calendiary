import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  height: 100px;
  ${({ theme }) => theme.common.flexCenter};
  color: ${({ theme }) => theme.colors.gray_2};
  font-size: ${({ theme }) => theme.fontSizes.small};

  ${({ theme }) => theme.mobile`
     font-size:  ${({ theme }) => theme.fontSizes.xs};
  `};
`;

function Footer() {
  return (
    <Container>Copyright &copy; Calendiary All Rights Reserved.</Container>
  );
}

export default Footer;
