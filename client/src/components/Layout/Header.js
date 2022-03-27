import React from 'react';
import styled from 'styled-components';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { userLogout } from '../../modules/user';
import { onLogout } from '../../api/authAPI';
import axios from 'axios';

const Container = styled.header`
  height: 140px;
  ${({ theme }) => theme.common.flexCenter};
  position: relative;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.logo};
    letter-spacing: 8px;
    font-weight: 400;
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 55px;
  height: 55px;
  background: white;
  cursor: pointer;
  border-radius: 50%;
  ${({ theme }) => theme.common.boxShadow}
  ${({ theme }) => theme.common.flexCenter}
  font-size: ${({ theme }) => theme.fontSizes.xl};
  white-space: nowrap;
`;

function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation(() => onLogout(), {
    onSuccess: (res) => {
      console.log(res.data.message);
      axios.defaults.headers.common['Authorization'] = '';
      queryClient.invalidateQueries('diaries');
    },
  });

  const onClickLogo = () => {
    navigate('/');
  };

  const onClickLogin = () => {
    navigate('/login');
  };
  const onClickLogout = () => {
    logout();
    dispatch(userLogout());
  };

  return (
    <Container>
      <h1 onClick={onClickLogo}>Calendiary</h1>
      <Avatar onClick={isLogin ? onClickLogout : onClickLogin}>
        {isLogin ? <MdLogout title="로그아웃" /> : <MdLogin title="로그인" />}
      </Avatar>
    </Container>
  );
}

export default Header;
