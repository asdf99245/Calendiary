import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setToday } from '../../modules/date';
import { modalOpen } from './../../modules/modal';
import { setDiary } from '../../modules/diary';
import { useNavigate } from 'react-router-dom';
import { getDiaries } from '../../api/diaryAPI';
import CalendarDate from './CalendarDate';
import CalendarDay from './CalendarDay';
import getDates from '../../utils/getDates';
import Button from './../common/Button';
import QUERY_KEY from './../../libs/react-query/queryKey';

const CalendarWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: ${({ theme }) => theme.spaces.xxl};
  padding: ${({ theme }) => theme.spaces.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.common.boxShadow};

  ${({ theme }) => theme.laptop`
     max-width: 800px;
  `};

  ${({ theme }) => theme.tablet`
     max-width: 550px;
     padding: ${({ theme }) => theme.spaces.lg};
  `};

  ${({ theme }) => theme.mobile`
     max-width: 350px;
     font-size:  ${({ theme }) => theme.fontSizes.xs};
  `};
`;

const CalendarHeader = styled.div`
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

  ${({ theme }) => theme.mobile`
    right:50%;
    transform:translateX(50%);
    font-size:  ${({ theme }) => theme.fontSizes.xs};
  `};
`;

function CalendarTemplate() {
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentDate = useSelector((state) => state.date.currentDate);
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [days, setDays] = useState([]);
  const [duration, setDuration] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    setDays(getDates(currentDate));
  }, [currentDate]);

  useEffect(() => {
    if (days.length > 0) {
      setDuration({
        ...duration,
        from: days[0],
        to: days[days.length - 1],
      });
    }
  }, [days]);

  const onClickToday = () => dispatch(setToday());
  const onClickDay = (date, type, text, title, id, imgurl) => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      dispatch(setDiary([id, title, text, imgurl]));
      dispatch(modalOpen([date, type]));
    }
  };

  useQuery(
    [QUERY_KEY.DIARIES, duration],
    ({ queryKey }) => getDiaries(queryKey[1]),
    {
      retry: false,
      staleTime: 1000 * 60,
      enabled: !!isLogin,
    }
  );

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
            onClick={onClickDay}
            duration={duration}
          />
        ))}
        <ButtonToday onClick={onClickToday}>TODAY</ButtonToday>
      </CalendarWrapper>
    </>
  );
}

export default React.memo(CalendarTemplate);
