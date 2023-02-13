import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalClose } from '../../modules/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onUpdate, onWrite } from '../../api/diaryAPI';
import ModalWrite from './ModalWrite';
import ModalButton from './ModalButton';
import QUERY_KEY from '../../libs/react-query/queryKey';
import { MODAL_TYPE } from '../../utils/constants';
import { convertURLToFile } from '../../utils/file';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spaces.xl};
  max-height: 560px;
  overflow-y: scroll;

  ${({ theme }) => theme.tablet`
     padding: ${({ theme }) => theme.spaces.lg};
     max-height: 450px;
  `};

  ${({ theme }) => theme.mobile`
     padding:${({ theme }) => theme.spaces.base};
     max-height: 350px;

     label,input,textarea {
      font-size: ${({ theme }) => theme.fontSizes.xs};
     }

     textarea {
       height:200px;
     }
  `};
`;

const ModalFooter = styled.div`
  display: flex;
  height: 50px;
  width: 100%;

  ${({ theme }) => theme.mobile`
     height:40px;
     button {
       font-size: ${({ theme }) => theme.fontSizes.xs};
      }
  `};
`;

function ModalForm({
  date,
  modalType,
  diaryId,
  diaryTitle,
  diaryText,
  diaryImg,
}) {
  const [images, setImages] = useState([]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: writeDiary } = useMutation((infos) => onWrite(infos), {
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries([QUERY_KEY.DIARIES]);
      dispatch(modalClose());
    },
  });
  const { mutate: updateDiary } = useMutation((data) => onUpdate(data), {
    onSuccess: (res) => {
      alert(res.data.message);
      queryClient.invalidateQueries([QUERY_KEY.DIARIES]);
      dispatch(modalClose());
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
    if (modalType !== MODAL_TYPE.UPDATE) return;

    (async () => {
      setDiary({
        ...diary,
        title: diaryTitle,
        text: diaryText,
      });

      if (diaryImg) {
        setImages(
          await Promise.all(
            diaryImg.map((image) => convertURLToFile(image.file_path))
          )
        );
      }
    })();
  }, [modalType]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) {
      alert('제목과 내용을 모두 작성해주세요.');
      return;
    }

    const formdata = new FormData();

    if (modalType === MODAL_TYPE.WRITE) {
      formdata.append('diary_date', date);
      formdata.append('diary_title', title);
      formdata.append('diary_text', text);
      images.forEach((image) => formdata.append('files', image));
      writeDiary(formdata);
    } else {
      formdata.append('diary_title', title);
      formdata.append('diary_text', text);
      // if (!imgURL) formdata.append('isDeleteImg', true);
      images.forEach((image) => formdata.append('files', image));
      updateDiary({ id: diaryId, infos: formdata });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <ModalBody>
        <ModalWrite
          diary={diary}
          images={images}
          setImages={setImages}
          onChange={onChange}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton>등록</ModalButton>
      </ModalFooter>
    </Form>
  );
}

export default ModalForm;
