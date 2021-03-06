import { createAction, handleActions } from 'redux-actions';

const SET_DIARY = 'diary/SET_DIARY';

export const setDiary = createAction(SET_DIARY, (payload) => payload);

const initialState = {
  diaryId: null,
  diaryTitle: '',
  diaryText: '',
  diaryImg: null,
};

const diary = handleActions(
  {
    [SET_DIARY]: (state, action) => ({
      ...state,
      diaryId: action.payload[0],
      diaryTitle: action.payload[1],
      diaryText: action.payload[2],
      diaryImg: action.payload[3],
    }),
  },
  initialState
);

export default diary;
