import React from 'react';
import styled from 'styled-components';
import CalendarTemplate from '../components/Calendar/CalendarTemplate';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  margin-bottom: 70px;
`;

function Calendar() {
  return (
    <Container>
      <CalendarTemplate />
    </Container>
  );
}

export default Calendar;
