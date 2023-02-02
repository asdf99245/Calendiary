import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 10px;
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
  background: ${({ theme }) => theme.colors.gray_3};
  border-radius: 4px;
  width: 100px;
  height: 100px;
  position: relative;
  padding: 10px;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
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

function ModalWrite({ diary, images, setImages, onChange }) {
  const [blobURLs, setBlobURLs] = useState([]);
  const inputRef = useRef(null);

  const { title, text } = diary;

  useEffect(() => {
    setBlobURLs(
      images.map((image) => {
        return { id: image.id, url: URL.createObjectURL(image) };
      })
    );

    return () => {
      blobURLs.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [images]);

  const onClickUpload = () => {
    inputRef.current?.click();
  };

  const onImageUpload = (e) => {
    const target = e.target;
    if (target.files) {
      if (target.files.length > 4) {
        alert('파일은 최대 4개까지 등록할 수 있습니다.');
        return;
      }

      setImages([...target.files]);
    }
  };

  const onClickDelete = (e, url) => {
    e.stopPropagation();
    const idx = blobURLs.findIndex((item) => item.url === url);
    URL.revokeObjectURL(url);

    setBlobURLs(blobURLs.filter((_, i) => i !== url));
    setImages(images.filter((_, i) => i !== idx));
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
      <Label htmlFor="img">사진 업로드</Label>
      <FileInput
        ref={inputRef}
        type="file"
        id="img"
        accept="image/*"
        multiple
        onChange={onImageUpload}
      />
      <Upload onClick={onClickUpload}>
        {blobURLs.map((blobURL) => (
          <PreviewBox key={blobURL.id}>
            <Preview src={blobURL.url} />
            <FileDelete onClick={(e) => onClickDelete(e, blobURL.url)} />
          </PreviewBox>
        ))}
      </Upload>
    </>
  );
}

export default ModalWrite;
