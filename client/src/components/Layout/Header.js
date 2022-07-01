import React from 'react';
import styled from 'styled-components';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { userLogout } from '../../modules/user';
import { onLogout } from '../../api/authAPI';
import axios from 'axios';
import logo from '../../assets/logo.png';
import logo_sm from '../../assets/logo_sm.png';

const Container = styled.header`
  height: 140px;
  ${({ theme }) => theme.common.flexCenter};
  position: relative;

  h1 {
    margin: 0;
    cursor: pointer;
    width: 350px;
    height: 80px;
    background-image: url(${logo});
    background-repeat: no-repeat;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;

    ${({ theme }) => theme.mobile`
     background-image: url(${logo_sm});
     width:200px;
     height:50px;
    `};
  }
`;

const Avatar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 55px;
  height: 55px;
  background: white;
  cursor: pointer;
  border-radius: 50%;
  ${({ theme }) => theme.common.boxShadow}
  ${({ theme }) => theme.common.flexCenter}
  font-size: ${({ theme }) => theme.fontSizes.lg};
  white-space: nowrap;

  ${({ theme }) => theme.mobile`
      font-size: ${({ theme }) => theme.fontSizes.base};
      width:40px;
      height:40px;
    `};
`;

function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation(() => onLogout(), {
    onSuccess: (res) => {
      alert(res.data.message);
      axios.defaults.headers.common['Authorization'] = '';
      queryClient.clear();
      dispatch(userLogout());
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
