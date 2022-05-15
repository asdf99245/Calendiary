import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalClose } from '../../modules/modal';
import { useMutation, useQueryClient } from 'react-query';
import { onUpdate, onWrite } from '../../api/diaryAPI';
import ModalWrite from './ModalWrite';
import ModalButton from './ModalButton';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spaces.xl};
  min-height: 500px;
  max-height: 560px;
  overflow-y: scroll;
`;

const ModalFooter = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
`;

function ModalForm({
  date,
  modalType,
  diaryId,
  diaryTitle,
  diaryText,
  diaryImg,
}) {
  const [img, setImg] = useState({
    imgURL: null,
    imgFile: null,
  });
  const { imgURL, imgFile } = img;
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

  const [diary, setDiary] = useState({
    title: '',
    text: '',
  });
  const { title, text } = diary;
  const onChange = (e) => {
    const { id, value } = e.target;
    setDiary({
      ...diary,
      [id]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      alert('제목과 내용을 모두 작성해주세요.');
      return;
    }

    if (modalType === 'write') {
      // 글 쓰기
      const formdata = new FormData();
      formdata.append('date', date);
      formdata.append('title', title);
      formdata.append('text', text);
      if (imgFile) formdata.append('file', imgFile);
      writeDiary(formdata);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <ModalBody>
        <ModalWrite
          diary={diary}
          onChange={onChange}
          img={img}
          setImg={setImg}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton>등록</ModalButton>
      </ModalFooter>
    </Form>
  );
}

export default ModalForm;
