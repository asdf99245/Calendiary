import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

function ModalPost({ title, text }) {
  return (
    <>
      <Title>{title}</Title>
      <Contents>{text}</Contents>
    </>
  );
}

export default ModalPost;
