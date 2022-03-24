import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

function ModalPost({ text }) {
  return <Contents>{text}</Contents>;
}

export default ModalPost;
