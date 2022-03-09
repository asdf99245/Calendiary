import React from 'react';
import styled from 'styled-components';
import { MdLogin, MdLogout } from 'react-icons/md';

const Container = styled.header`
  height: 140px;
  ${({ theme }) => theme.common.flexCenter};
  position: relative;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.logo};
    letter-spacing: 8px;
    font-weight: 400;
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 55px;
  height: 55px;
  background: white;
  cursor: pointer;
  border-radius: 50%;
  ${({ theme }) => theme.common.boxShadow}
  ${({ theme }) => theme.common.flexCenter}
  font-size: ${({ theme }) => theme.fontSizes.xl};
  white-space: nowrap;
`;

function Header() {
  return (
    <Container>
      <h1>Calendiary</h1>
      <Avatar>
        <MdLogin />
        <MdLogout />
      </Avatar>
    </Container>
  );
}

export default Header;
