import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setToday } from '../../modules/date';
import { modalOpen } from './../../modules/modal';
import { useNavigate } from 'react-router-dom';
import { getDiaries } from '../../api/diaryAPI';
import CalendarDate from './CalendarDate';
import CalendarDay from './CalendarDay';
import getDates from '../../utils/getDates';
import Button from './../common/Button';

const CalendarWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: ${({ theme }) => theme.spaces.xxl};
  padding: ${({ theme }) => theme.spaces.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.common.boxShadow};
`;

const CalendarHeader = styled.div`
  width: 130px;
  ${({ theme }) => theme.common.flexCenter};
  ${({ theme }) => theme.common.boxShadow_2};
  font-weight: 700;

  ${(props) => {
    const idx = props.idx;
    if (idx === 0) {
      return css`
        color: ${({ theme }) => theme.colors.red_1};
      `;
    } else if (idx === 6) {
      return css`
        color: ${({ theme }) => theme.colors.blue_1};
      `;
    }
  }}
`;

const ButtonToday = styled(Button)`
  position: absolute;
  top: -35px;
  right: 40px;
  padding: ${({ theme }) => theme.spaces.small}
    ${({ theme }) => theme.spaces.lg};
`;

function CalendarTemplate() {
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentDate = useSelector((state) => state.date.currentDate);
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDays(getDates(currentDate));
  }, [currentDate]);

  const onClickToday = () => dispatch(setToday());
  const onClickDay = (date, type, text = '') => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      dispatch(modalOpen([date, type, text]));
    }
  };

  const { isLoading, data, error } = useQuery('diaries', getDiaries, {
    onSuccess: (res) => {
      setDiaries(res.data);
    },
    onError: (err) => {
      console.log(err);
    },
    retry: false,
  });

  return (
    <>
      <CalendarDate currentDate={currentDate} />
      <CalendarWrapper>
        {week.map((w, i) => (
          <CalendarHeader key={i} idx={i}>
            {w}
          </CalendarHeader>
        ))}
        {days.map((d, i) => (
          <CalendarDay
            key={i}
            idx={i}
            day={d}
            currentDate={currentDate}
            diaries={diaries}
            onClick={onClickDay}
          />
        ))}
        <ButtonToday onClick={onClickToday}>TODAY</ButtonToday>
      </CalendarWrapper>
    </>
  );
}

export default CalendarTemplate;
