import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  ${({ theme }) => theme.common.boxShadow_3};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  position: absolute;
  top: 120%;
  z-index: 10;
  padding: ${({ theme }) => theme.spaces.base};
  font-size: ${({ theme }) => theme.fontSizes.small};
  background: white;
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.small};
    margin: 0;
  }
`;

const Select = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spaces.small};
`;

const List = styled.ul`
  flex: 1;
  padding: 0;
  margin: 0;
  margin-top: ${({ theme }) => theme.spaces.small};
  overflow-y: scroll;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray_3};
`;

const ListItem = styled.li`
  padding: 4px 6px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_1};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: ${({ theme }) => theme.colors.gray_1};
    `}
`;

function CalendarSelect({ currentDate, onClose, onSetDay }) {
  const [date, setDate] = useState({
    year: currentDate.get('year'),
    month: currentDate.get('month') + 1,
  });
  const months = Array.from({ length: 12 }, (x, i) => i + 1);
  const years = Array.from({ length: 123 }, (x, i) => i + 1900);
  const monthRef = useRef();
  const yearRef = useRef();
  const { year, month } = date;

  useEffect(() => {
    monthRef.current.scrollTop = 25 * (month - 1);
    yearRef.current.scrollTop = 25 * (year - 1901);
  }, []);

  const onClickYear = (y) => {
    setDate({
      ...date,
      year: y,
    });
  };

  const onClickMonth = (m) => {
    onSetDay(year, m);
    onClose();
  };

  return (
    <SelectWrapper>
      <h2>날짜 선택</h2>
      <Select>
        <List ref={yearRef}>
          {years.map((y, i) => (
            <ListItem
              key={i}
              active={year === y}
              id="year"
              value={y}
              onClick={() => onClickYear(y)}
            >
              {y}
            </ListItem>
          ))}
        </List>
        <List ref={monthRef}>
          {months.map((m, i) => (
            <ListItem
              key={i}
              active={month === m}
              id="month"
              value={m}
              onClick={() => onClickMonth(m)}
            >
              {m}
            </ListItem>
          ))}
        </List>
      </Select>
    </SelectWrapper>
  );
}

export default CalendarSelect;
