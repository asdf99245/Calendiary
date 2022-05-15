import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 0;
`;

function ModalButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default ModalButton;
