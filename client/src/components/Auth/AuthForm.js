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
        alert(message);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    },
    onError: (err) => console.log(err),
  });

  const onSubmit = (data) => {
    const { userId, userPassword, userName } = data;
    if (type === '?????????') {
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
        placeholder="?????????"
        {...register('userId', {
          required: '???????????? ??????????????????.',
        })}
        autoComplete="off"
      />
      {errors.userId && <FormError>{errors.userId?.message}</FormError>}
      <FormInput
        type="password"
        placeholder="????????????"
        {...register('userPassword', {
          required: '??????????????? ??????????????????.',
          minLength: {
            value: 8,
            message: '8?????? ????????? ???????????????.',
          },
          maxLength: {
            value: 16,
            message: '16?????? ????????? ??????????????? ?????????????????????.',
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
            message: '??????, ????????? ???????????? 8~16?????? ??????????????????.',
          },
        })}
        autoComplete="off"
      />
      {errors.userPassword && (
        <FormError>{errors.userPassword?.message}</FormError>
      )}
      {type === '????????????' && (
        <>
          <FormInput
            type="password"
            placeholder="???????????? ??????"
            {...register('userPasswordConfirm', {
              required: '??????????????? ?????? ??? ??????????????????.',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { userPassword } = getValues();
                  return (
                    userPassword === value || '??????????????? ???????????? ????????????.'
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
            placeholder="??????"
            {...register('userName', {
              required: '????????? ??????????????????.',
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
