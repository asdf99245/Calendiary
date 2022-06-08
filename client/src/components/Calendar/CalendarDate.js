import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdSearch,
  MdSearchOff,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { goNext, goPrev, setDay } from './../../modules/date';
import CalendarSelect from './CalendarSelect';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  padding: ${({ theme }) => theme.spaces.base};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.common.boxShadow};

  ${({ theme }) => theme.mobile`
     width: 300px;
  `};
`;

const Date = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  position: relative;

  span {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    letter-spacing: ${({ theme }) => theme.spaces.small};

    ${({ theme }) => theme.mobile`
      font-size: ${({ theme }) => theme.fontSizes.lg};
   `};
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform ease 0.5s;

  &:hover {
    transform: scale(1.125);
  }
`;

const ButtonSearch = styled.div`
  position: absolute;
  bottom: 0;
  right: -15px;
  cursor: pointer;
`;

function CalendarDate({ currentDate }) {
  const [openSelect, setOpenSelect] = useState(false);
  const dispatch = useDispatch();
  const onToggleSelect = () => setOpenSelect(!openSelect);
  const onCloseSelect = () => setOpenSelect(false);
  const onClickPrev = () => {
    dispatch(goPrev());
    onCloseSelect();
  };
  const onClickNext = () => {
    dispatch(goNext());
    onCloseSelect();
  };
  const onSetDay = (year, month) => dispatch(setDay({ year, month }));

  return (
    <Container>
      <Button onClick={onClickPrev}>
        <MdOutlineArrowBackIos />
      </Button>
      <Date>
        <span>{currentDate.format('YYYY-MM')}</span>
        <ButtonSearch onClick={onToggleSelect}>
          {openSelect ? <MdSearchOff /> : <MdSearch />}
        </ButtonSearch>
        {openSelect && (
          <CalendarSelect
            currentDate={currentDate}
            onSetDay={onSetDay}
            onClose={onCloseSelect}
          />
        )}
      </Date>
      <Button onClick={onClickNext}>
        <MdOutlineArrowForwardIos />
      </Button>
    </Container>
  );
}

export default CalendarDate;
