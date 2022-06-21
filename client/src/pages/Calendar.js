import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CalendarTemplate from '../components/Calendar/CalendarTemplate';
import ModalTemplate from '../components/Modal/ModalTemplate';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  margin-bottom: 70px;
`;

function Calendar() {
  const modalOpen = useSelector((state) => state.modal.open);

  return (
    <Container>
      <CalendarTemplate />
      {modalOpen && <ModalTemplate />}
    </Container>
  );
}

export default Calendar;
