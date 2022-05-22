import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MdOutlineAddPhotoAlternate, MdClose } from 'react-icons/md';

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  outline: none;
  resize: none;
  border: 2px solid ${({ theme }) => theme.colors.gray_2};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: ${({ theme }) => theme.spaces.base};
`;

const Label = styled.label`
  display: inline-block;
  padding: ${({ theme }) => theme.spaces.base} 0px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.gray_2};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: ${({ theme }) => theme.spaces.base};
`;

const FileInput = styled.input`
  display: none;
`;

const Upload = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${({ theme }) => theme.colors.gray_2};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: 34px;
  color: ${({ theme }) => theme.colors.gray_2};
  cursor: pointer;
  overflow: hidden;
  padding: ${({ theme }) => theme.spaces.lg};

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue_2};
    color: ${({ theme }) => theme.colors.blue_2};
  }
`;

const PreviewBox = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gray_3};
  border-radius: 4px;
  position: relative;
  padding: 10px;
`;

const Preview = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const FileDelete = styled(MdClose)`
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue_2};
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

function ModalWrite({ diary, onChange, img, setImg }) {
  const { title, text } = diary;
  const imgInput = useRef();
  const { imgURL, imgFile } = img;

  const onClickUpload = () => {
    imgInput.current.click();
  };

  const onChangeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImg({
        ...img,
        imgURL: url,
        imgFile: file,
      });
    }
  };

  const onClickDelete = (e) => {
    e.stopPropagation();
    setImg({
      ...img,
      imgURL: null,
      imgFile: null,
    });
  };

  return (
    <>
      <Label htmlFor="title">제목</Label>
      <Input
        type="text"
        id="title"
        placeholder="제목"
        value={title}
        onChange={onChange}
      />
      <Label htmlFor="text">내용</Label>
      <TextArea
        id="text"
        placeholder="일기를 작성해주세요."
        spellCheck="false"
        wrap="physical"
        value={text}
        onChange={onChange}
      />
      <Label htmlFor="img">사진 업로드(1개만 가능함)</Label>
      <FileInput
        ref={imgInput}
        type="file"
        id="img"
        accept="image/png, image/jpeg"
        onChange={onChangeUpload}
      />
      <Upload onClick={onClickUpload}>
        {imgURL ? (
          <PreviewBox>
            <Preview src={imgURL} />
            <FileDelete onClick={onClickDelete} />
          </PreviewBox>
        ) : (
          <MdOutlineAddPhotoAlternate />
        )}
      </Upload>
    </>
  );
}

export default ModalWrite;
