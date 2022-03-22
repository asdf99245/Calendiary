import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalClose } from '../../modules/modal';
import { useMutation, useQueryClient } from 'react-query';
import { onWrite } from '../../api/diaryAPI';
import Button from '../common/Button';
import ModalWrite from './ModalWrite';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spaces.xl};
  overflow-y: auto;
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

function ModalForm({ date }) {
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
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    writeDiary({ date, text });
  };

  return (
    <Form onSubmit={onSubmit}>
      <ModalBody>
        <ModalWrite text={text} onChange={onChange} />
      </ModalBody>
      <ModalFooter>
        <ModalButton>확인</ModalButton>
        <ModalButton type="button">취소</ModalButton>
      </ModalFooter>
    </Form>
  );
}

export default ModalForm;
