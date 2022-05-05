import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 400px;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Image = styled.img`
  margin-top: 20px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

function ModalPost({ title, text, img }) {
  return (
    <>
      <Title>{title}</Title>
      <Contents>{text}</Contents>
      {img && <Image src={`http://localhost:5000/${img}`} alt="테스트" />}
    </>
  );
}

export default ModalPost;
