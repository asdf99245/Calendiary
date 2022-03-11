import { createAction, handleActions } from 'redux-actions';
import dayjs from 'dayjs';

const SET_TODAY = 'date/SET_TODAY';
const GO_NEXT = 'date/GO_NEXT';
const GO_PREV = 'date/GO_PREV';

export const setToday = createAction(SET_TODAY);
export const goNext = createAction(GO_NEXT);
export const goPrev = createAction(GO_PREV);

const initialState = {
  currentDate: dayjs(),
};

const date = handleActions(
  {
    [SET_TODAY]: (state) => ({
      ...state,
      currentDate: dayjs(),
    }),
    [GO_NEXT]: (state) => ({
      ...state,
      currentDate: state.currentDate.add(1, 'M'),
    }),
    [GO_PREV]: (state) => ({
      ...state,
      currentDate: state.currentDate.subtract(1, 'M'),
    }),
  },
  initialState
);

export default date;
