import React from 'react';
import styled, { useTheme } from 'styled-components';
import ModalButton from './ModalButton';
import { useDispatch } from 'react-redux';
import { modalChangeType, modalClose } from '../../modules/modal';
import { useMutation, useQueryClient } from 'react-query';
import { onDelete } from '../../api/diaryAPI';

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Contents = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  overflow-y: auto;
`;

const Image = styled.img`
  margin-top: 20px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spaces.xl};
  min-height: 500px;
  max-height: 560px;
  overflow-y: scroll;

  ${({ theme }) => theme.tablet`
     padding: ${({ theme }) => theme.spaces.lg};
     min-height: 400px
     max-height: 450px;
  `};

  ${({ theme }) => theme.mobile`
     padding:${({ theme }) => theme.spaces.base};
     min-height: 300px;
     max-height: 350px;

     h1 {
      font-size: ${({ theme }) => theme.fontSizes.base};
     }
     div {
      font-size: ${({ theme }) => theme.fontSizes.small};
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

function ModalPost({ id, title, text, image }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: deleteDiary } = useMutation((id) => onDelete(id), {
    onSuccess: (res) => {
      if (res.data.success) {
        alert(res.data.message);
        queryClient.invalidateQueries('diaries');
        dispatch(modalClose());
      }
    },
  });

  const switchToUpdateMode = () => {
    dispatch(modalChangeType('update'));
  };

  return (
    <>
      <ModalBody>
        <Title>{title}</Title>
        <Contents>{text}</Contents>
        {image && <Image src={image} alt="?????????" />}
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={switchToUpdateMode}>??????</ModalButton>
        <ModalButton
          onClick={() => deleteDiary(id)}
          background={theme.colors.red_2}
        >
          ??????
        </ModalButton>
      </ModalFooter>
    </>
  );
}

export default ModalPost;
