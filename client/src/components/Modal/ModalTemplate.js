import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../modules/modal';
import { MdClose } from 'react-icons/md';
import ModalForm from './ModalForm';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  /* backdrop-filter: blur(1px); */
  z-index: 10;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  background-color: white;
  z-index: 100;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  ${({ theme }) => theme.common.boxShadow_3};
  overflow: hidden;
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue_2};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  padding: ${({ theme }) => theme.spaces.xl};
`;

const ButtonClose = styled(MdClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

function ModalTemplate() {
  const { modalDate, modalType, modalText, id } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const onClose = () => dispatch(modalClose());

  return (
    <>
      <ModalBackground onClick={onClose} />
      <ModalWrapper>
        <ModalHeader>
          {modalDate}
          <ButtonClose onClick={onClose} />
        </ModalHeader>
        <ModalForm
          date={modalDate}
          modalType={modalType}
          modalText={modalText}
          id={id}
          onClose={onClose}
        />
      </ModalWrapper>
    </>
  );
}

export default ModalTemplate;
