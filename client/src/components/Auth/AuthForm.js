import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import AuthInput from './AuthInput';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spaces.lg};
`;

const ButtonStyled = styled(Button)`
  margin-top: ${({ theme }) => theme.spaces.lg};
`;

function AuthForm({ type }) {
  const [inputs, setInputs] = useState({
    userId: '',
    userPassword: '',
    userPasswordConfirm: '',
    userName: '',
  });
  const { userId, userPassword, userPasswordConfirm, userName } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <AuthInput
        type="text"
        placeholder="아이디"
        value={userId}
        name="userId"
        onChange={onInputChange}
      />
      <AuthInput
        type="password"
        placeholder="비밀번호"
        value={userPassword}
        name="userPassword"
        onChange={onInputChange}
      />
      {type === '회원가입' && (
        <>
          <AuthInput
            type="password"
            name="userPasswordConfirm"
            value={userPasswordConfirm}
            placeholder="비밀번호 확인"
            onChange={onInputChange}
          />
          <AuthInput
            type="text"
            name="userName"
            value={userName}
            placeholder="이름"
            onChange={onInputChange}
          />
        </>
      )}
      <ButtonStyled>{type}</ButtonStyled>
    </Form>
  );
}

export default AuthForm;
