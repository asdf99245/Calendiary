function getDates(date) {
  let start = date.set('date', 1); // 현재 달의 첫번째 날
  const day = start.get('day'); // 첫번째 날의 요일 0 ~ 6
  start = start.subtract(day, 'd'); // 현재 날짜의 달력에서 첫날
  const last = start.add(1, 'month'); // 현재 달의 마지막 날

  const dates = [];
  // 달력의 첫날부터 현재 달의 마지막 날까지의 날짜들
  while (start.isBefore(last, 'day')) {
    dates.push(start);
    start = start.add(1, 'd');
  }

  // 현재 달력에 표시해야 할 42개의 날중 남은 날짜들
  for (let i = dates.length; i < 42; i++) {
    dates.push(start);
    start = start.add(1, 'd');
  }

  return dates;
}

export default getDates;
