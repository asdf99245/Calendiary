import dayjs from 'dayjs';
import React from 'react';
import styled, { css } from 'styled-components';

const Day = styled.div`
  height: 100px;
  padding: ${({ theme }) => theme.spaces.small};
  font-weight: 700;
  cursor: pointer;

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
      background-color: #fff3bf;
      ${({ theme }) => theme.common.boxShadow_2};
      border-radius: ${({ theme }) => theme.borderRadius.base};
    `}
`;

function CalendarDay({ idx, day, currentDate, diaries, onClick }) {
  return (
    <Day
      isCurrentMonth={day.get('M') === currentDate.get('M')}
      isToday={day.isSame(dayjs(), 'day')}
      isDiary={diaries.some((a) => day.isSame(dayjs(a.date), 'day'))}
      idx={idx}
      onClick={() => onClick(day.format('YYYY-MM-DD'))}
    >
      {day.get('date')}
    </Day>
  );
}

export default React.memo(CalendarDay);
