import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import CalendarDate from './CalendarDate';
import CalendarDay from './CalendarDay';
import getDates from '../../utils/getDates';
import Button from './../common/Button';
import { setToday } from '../../modules/date';

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
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(getDates(currentDate));
  }, [currentDate]);

  const onClickToday = () => dispatch(setToday());

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
          <CalendarDay key={i} idx={i} day={d} currentDate={currentDate} />
        ))}
        <ButtonToday onClick={onClickToday}>TODAY</ButtonToday>
      </CalendarWrapper>
    </>
  );
}

export default CalendarTemplate;
