import React from 'react';
import styled from 'styled-components';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { goNext, goPrev } from './../../modules/date';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  padding: ${({ theme }) => theme.spaces.base};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.common.boxShadow};
`;

const Date = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  position: relative;

  span {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    letter-spacing: ${({ theme }) => theme.spaces.small};
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

function CalendarDate({ today }) {
  const dispatch = useDispatch();
  const onClickPrev = () => dispatch(goPrev());
  const onClickNext = () => dispatch(goNext());

  return (
    <Container>
      <Button onClick={onClickPrev}>
        <MdOutlineArrowBackIos />
      </Button>
      <Date>
        <span>{today.format('YYYY-MM')}</span>
      </Date>
      <Button onClick={onClickNext}>
        <MdOutlineArrowForwardIos />
      </Button>
    </Container>
  );
}

export default CalendarDate;
