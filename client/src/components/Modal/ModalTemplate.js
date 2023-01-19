import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../modules/modal';
import { MdClose } from 'react-icons/md';
import ModalForm from './ModalForm';
import ModalRead from './ModalRead';
import { MODAL_TYPE } from '../../utils/constants';

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

  ${({ theme }) => theme.tablet`
      width:520px;
  `};

  ${({ theme }) => theme.mobile`
      max-width:350px;
      width:100%;
  `};
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.base};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  padding: ${({ theme }) => theme.spaces.xl};

  ${({ theme }) => theme.mobile`
     padding: ${({ theme }) => theme.spaces.lg};
     font-size: ${({ theme }) => theme.fontSizes.base};
  `};
`;

const ButtonClose = styled(MdClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

function ModalTemplate() {
  const { modalDate, modalType } = useSelector((state) => state.modal);
  const { diaryId, diaryTitle, diaryText, diaryImg } = useSelector(
    (state) => state.diary
  );
  const dispatch = useDispatch();
  const onClose = () => dispatch(modalClose());

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <ModalBackground onClick={onClose} />
      <ModalWrapper>
        <ModalHeader>
          {modalDate}
          <ButtonClose onClick={onClose} />
        </ModalHeader>
        {modalType === MODAL_TYPE.READ ? (
          <ModalRead
            id={diaryId}
            title={diaryTitle}
            text={diaryText}
            image={diaryImg}
          />
        ) : (
          <ModalForm
            date={modalDate}
            modalType={modalType}
            diaryTitle={diaryTitle}
            diaryText={diaryText}
            diaryId={diaryId}
            diaryImg={diaryImg}
          />
        )}
      </ModalWrapper>
    </>
  );
}

export default ModalTemplate;
