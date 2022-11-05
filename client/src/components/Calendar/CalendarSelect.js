import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './../common/Button';
import dayjs from 'dayjs';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 5;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 250px;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spaces.base};
`;

const List = styled.ul`
  flex: 1;
  padding: 0;
  margin: 0;
  margin-top: ${({ theme }) => theme.spaces.small};
  overflow-y: scroll;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray_3};

  & + & {
    margin-left: 5px;
  }
`;

const ListItem = styled.li`
  padding: 4px 6px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_1};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: ${({ theme }) => theme.colors.gray_3};
    `}
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  padding: ${({ theme }) => theme.spaces.small}
    ${({ theme }) => theme.spaces.lg};
  margin-top: ${({ theme }) => theme.spaces.base};
`;

function CalendarSelect({ currentDate, onClose, onSetDay }) {
  const [date, setDate] = useState({
    year: currentDate.get('year'),
    month: currentDate.get('month') + 1,
  });
  const { year, month } = date;

  const currentYear = dayjs().get('year');
  const months = Array.from({ length: 12 }, (x, i) => i + 1);
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (x, i) => i + 1900
  );
  const monthRef = useRef();
  const yearRef = useRef();

  useEffect(() => {
    monthRef.current.scrollTop = 25 * (month - 1); // 25 => list item의 height
    yearRef.current.scrollTop = 25 * (year - 1901);
  }, []);

  const onClickDate = (e) => {
    const { id, value } = e.target;
    setDate({
      ...date,
      [id]: value,
    });
  };

  const onClickButton = () => {
    onSetDay(year, month);
    onClose();
  };

  return (
    <>
      <Background onClick={onClose} />
      <SelectWrapper>
        <h2>날짜</h2>
        <Select onClick={onClickDate}>
          <List ref={yearRef}>
            {years.map((y, i) => (
              <ListItem key={i} active={year === y} id="year" value={y}>
                {y}
              </ListItem>
            ))}
          </List>
          <List ref={monthRef}>
            {months.map((m, i) => (
              <ListItem key={i} active={month === m} id="month" value={m}>
                {m}
              </ListItem>
            ))}
          </List>
        </Select>
        <StyledButton onClick={onClickButton}>GO</StyledButton>
      </SelectWrapper>
    </>
  );
}

export default CalendarSelect;
