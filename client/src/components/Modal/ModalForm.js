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
  const { mutate: updateDiary } = useMutation((data) => onUpdate(data), {
    onSuccess: (res) => {
      if (res.data.success) {
        alert(res.data.message);
        queryClient.invalidateQueries('diaries');
        dispatch(modalClose());
      }
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

  useEffect(() => {
    if (modalType === 'update') {
      setDiary({
        ...diary,
        title: diaryTitle,
        text: diaryText,
      });
      if (diaryImg) {
        setImg({
          ...img,
          imgURL: `http://localhost:5000/${diaryImg}`,
        });
      }
    }
  }, [modalType]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      alert('제목과 내용을 모두 작성해주세요.');
      return;
    }

    if (modalType === 'write') {
      // 글 쓰기
      const formdata = new FormData();
      formdata.append('diary_date', date);
      formdata.append('diary_title', title);
      formdata.append('diary_text', text);
      if (imgFile) formdata.append('file', imgFile);
      writeDiary(formdata);
    } else {
      // 글 수정
      const formdata = new FormData();
      if (title !== diaryTitle) formdata.append('diary_title', title);
      if (text !== diaryText) formdata.append('diary_text', text);
      if (imgFile) formdata.append('file', imgFile);
      updateDiary({ id: diaryId, infos: formdata });
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
