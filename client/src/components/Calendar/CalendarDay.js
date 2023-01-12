import React from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { MODAL_TYPE } from '../../utils/constants';

const Day = styled.div`
  height: 100px;
  padding: ${({ theme }) => theme.spaces.small};
  font-weight: 700;
  cursor: pointer;
  display: flex;

  ${(props) => {
    const mod = props.idx % 7;
    if (mod === 0)
      return css`
        color: ${({ theme }) => theme.colors.red_1};
      `;
    else if (mod === 6)
      return css`
        color: ${({ theme }) => theme.colors.blue_1};
      `;
  }}

  ${(props) =>
    !props.isCurrentMonth &&
    css`
      opacity: 0.5;
    `}
  
  ${(props) =>
    props.isToday &&
    css`
      ${({ theme }) => theme.common.boxShadow_yellow};
    `}

  ${(props) =>
    props.isDiary &&
    css`
      color: white;
      background: ${({ theme }) => theme.colors.blue_2};
      ${({ theme }) => theme.common.boxShadow_2};
      border-radius: ${({ theme }) => theme.borderRadius.base};
    `} 

  ${({ theme }) => theme.laptop`
     height: 80px;
  `};

  ${({ theme }) => theme.tablet`
     justify-content:center;
     align-items:center;
     height: 60px;
  `};

  ${({ theme }) => theme.mobile`
     height: 35px;
  `};
`;

function CalendarDay({ idx, day, currentDate, diaries = [], onClick }) {
  const onClickDay = () => {
    const filtered = diaries.filter((diary) =>
      day.isSame(dayjs(diary.diary_date), 'day')
    );
    const date = day.format('YYYY-MM-DD');

    if (filtered.length > 0) {
      const diary = filtered[0];
      onClick(date, MODAL_TYPE.READ, diary);
    } else {
      onClick(date, MODAL_TYPE.WRITE);
    }
  };

  return (
    <Day
      isCurrentMonth={day.get('M') === currentDate.get('M')}
      isToday={day.isSame(dayjs(), 'day')}
      isDiary={diaries.some((diary) =>
        day.isSame(dayjs(diary.diary_date), 'day')
      )}
      idx={idx}
      onClick={onClickDay}
    >
      {day.get('date')}
    </Day>
  );
}

export default React.memo(CalendarDay);
