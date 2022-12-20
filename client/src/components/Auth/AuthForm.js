import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMutation } from 'react-query';
import Button from '../common/Button';
import { onLogin, onRegister } from '../../api/authAPI';
import { userLogin } from './../../modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spaces.lg};

  ${({ theme }) => theme.mobile`
     padding: ${({ theme }) => theme.spaces.base};
     button {
       font-size:${({ theme }) => theme.fontSizes.xs};
     }
  `};
`;

const FormInput = styled.input`
  border: none;
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.gray_3};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spaces.base};

  & + & {
    margin-top: ${({ theme }) => theme.spaces.base};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.blue_2};
  }

  ${({ theme }) => theme.mobile`
     font-size:${({ theme }) => theme.fontSizes.xs};

     & + & {
       margin-top: ${({ theme }) => theme.spaces.xs};
     }
  `};
`;

const FormError = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.red_2};
  font-weight: bold;
  padding: ${({ theme }) => theme.spaces.small};
`;

const ButtonStyled = styled(Button)`
  margin-top: ${({ theme }) => theme.spaces.lg};
`;

function AuthForm({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: signUp } = useMutation((infos) => onRegister(infos), {
    onSuccess: (res) => {
      alert(res.data.message);
      navigate('/login');
    },
    onError: (err) => console.error(err.message),
  });

  const { mutate: login } = useMutation((infos) => onLogin(infos), {
    onSuccess: (res) => {
      const { accessToken, user_id, user_name, message } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      dispatch(userLogin({ user_id, user_name }));
      alert(message);
      navigate('/');
    },
    onError: (err) => console.error(err.message),
  });

  const onSubmit = (data) => {
    const { userId, userPassword, userName } = data;
    console.log(data);
    if (type === '로그인') {
      login({
        user_id: userId,
        user_password: userPassword,
      });
    } else {
      signUp({
        user_id: userId,
        user_password: userPassword,
        user_name: userName,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type="text"
        placeholder="아이디"
        {...register('userId', {
          required: '아이디를 입력해주세요.',
        })}
        autoComplete="off"
      />
      {errors.userId && <FormError>{errors.userId?.message}</FormError>}
      <FormInput
        type="password"
        placeholder="비밀번호"
        {...register('userPassword', {
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '8자리 이상을 입력하세요.',
          },
          maxLength: {
            value: 16,
            message: '16자리 이하의 비밀번호만 사용가능합니다.',
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
            message: '영문, 숫자를 혼용하여 8~16자를 입력해주세요.',
          },
        })}
        autoComplete="off"
      />
      {errors.userPassword && (
        <FormError>{errors.userPassword?.message}</FormError>
      )}
      {type === '회원가입' && (
        <>
          <FormInput
            type="password"
            placeholder="비밀번호 확인"
            {...register('userPasswordConfirm', {
              required: '비밀번호를 한번 더 입력해주세요.',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { userPassword } = getValues();
                  return (
                    userPassword === value || '비밀번호가 일치하지 않습니다.'
                  );
                },
              },
            })}
            autoComplete="off"
          />
          {errors.userPasswordConfirm && (
            <FormError>{errors.userPasswordConfirm?.message}</FormError>
          )}
          <FormInput
            type="text"
            placeholder="이름"
            {...register('userName', {
              required: '이름을 입력해주세요.',
            })}
            autoComplete="off"
          />
          {errors.userName && <FormError>{errors.userName?.message}</FormError>}
        </>
      )}
      <ButtonStyled disabled={isSubmitting}>{type}</ButtonStyled>
    </Form>
  );
}

export default AuthForm;
