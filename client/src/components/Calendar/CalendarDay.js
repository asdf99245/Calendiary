import dayjs from 'dayjs';
import React from 'react';
import styled, { css } from 'styled-components';
import { useQueryClient } from 'react-query';

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
      background: ${({ theme }) => theme.colors.gray_3};
      ${({ theme }) => theme.common.boxShadow_2};
      border-radius: ${({ theme }) => theme.borderRadius.base};
    `}
`;

function CalendarDay({ idx, day, currentDate, onClick }) {
  const queryClient = useQueryClient();
  const diaries = queryClient.getQueryData('diaries')
    ? queryClient.getQueryData('diaries').data
    : [];

  const onClickDay = () => {
    const filtered = diaries.filter((diary) =>
      day.isSame(dayjs(diary.date), 'day')
    );
    const date = day.format('YYYY-MM-DD');
    if (filtered.length > 0) {
      onClick(
        date,
        'post',
        filtered[0].text,
        filtered[0].title,
        filtered[0].id,
        filtered[0].imgurl
      );
    } else {
      onClick(date, 'write');
    }
  };
  return (
    <Day
      isCurrentMonth={day.get('M') === currentDate.get('M')}
      isToday={day.isSame(dayjs(), 'day')}
      isDiary={diaries.some((a) => day.isSame(dayjs(a.date), 'day'))}
      idx={idx}
      onClick={onClickDay}
    >
      {day.get('date')}
    </Day>
  );
}

export default React.memo(CalendarDay);
