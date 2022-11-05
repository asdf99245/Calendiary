import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  flex: 1;

  div {
    font-size: ${({ theme }) => theme.fontSizes.logo};
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

function NotFound() {
  return (
    <Container>
      <div>404 Not Found</div>
      <br />
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
    </Container>
  );
}

export default NotFound;
