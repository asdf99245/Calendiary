import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalClose } from '../../modules/modal';
import { useMutation, useQueryClient } from 'react-query';
import { onDelete, onWrite } from '../../api/diaryAPI';
import Button from '../common/Button';
import ModalWrite from './ModalWrite';
import ModalPost from './ModalPost';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spaces.xl};
  max-height: 560px;
  overflow-y: scroll;
`;

const ModalFooter = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
`;

const ModalButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 0;
`;

function ModalForm({ date, modalType, modalText, id, onClose }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: writeDiary } = useMutation((infos) => onWrite(infos), {
    onSuccess: (res) => {
      if (res.data.success) {
        alert(res.data.message);
        queryClient.invalidateQueries('diaries');
        dispatch(modalClose());
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { mutate: deleteDiary } = useMutation((id) => onDelete(id), {
    onSuccess: (res) => {
      if (res.data.success) {
        alert(res.data.message);
        queryClient.invalidateQueries('diaries');
        dispatch(modalClose());
      }
    },
  });
  const [text, setText] = useState(modalText);
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'write') {
      writeDiary({ date, text });
    } else if (modalType === 'post') {
      deleteDiary(id);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <ModalBody>
        {modalType === 'post' && <ModalPost text={modalText} />}
        {modalType === 'write' && (
          <ModalWrite text={text} onChange={onChange} />
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton>{modalType === 'write' ? '등록' : '삭제'}</ModalButton>
        <ModalButton type="button" onClick={onClose}>
          취소
        </ModalButton>
      </ModalFooter>
    </Form>
  );
}

export default ModalForm;
