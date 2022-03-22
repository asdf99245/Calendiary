import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  outline: none;
  resize: none;
  border: 2px solid ${({ theme }) => theme.colors.gray_2};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

function ModalWrite({ text, onChange }) {
  return (
    <TextArea
      autoFocus
      spellCheck="false"
      wrap="physical"
      value={text}
      onChange={onChange}
    />
  );
}

export default ModalWrite;
