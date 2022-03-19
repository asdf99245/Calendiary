import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMutation } from 'react-query';
import Button from '../common/Button';
import AuthInput from './AuthInput';
import { onLogin, onRegister } from '../../api/authAPI';
import { userLogin } from './../../modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: register } = useMutation((infos) => onRegister(infos), {
    onSuccess: (res) => {
      if (res.data.success) {
        alert(res.data.message);
        navigate('/login');
      } else {
        alert(res.data.message);
      }
    },
    onError: (err) => console.log(err),
  });
  const { mutate: login } = useMutation((infos) => onLogin(infos), {
    onSuccess: (res) => {
      if (res.data.success) {
        const { accessToken, user_id, user_name, message } = res.data;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        dispatch(userLogin({ user_id, user_name }));
        console.log(message);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    },
    onError: (err) => console.log(err),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === '로그인') {
      if (!userId || !userPassword) {
        alert('모두 입력해주세요.');
        return;
      }
      login({
        user_id: userId,
        user_password: userPassword,
      });
    } else {
      if (userPassword !== userPasswordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      register({
        user_id: userId,
        user_password: userPassword,
        user_name: userName,
      });
    }
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
