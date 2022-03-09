import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  margin-bottom: 70px;
`;

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function Calendar() {
  return <Container></Container>;
}

export default Calendar;
