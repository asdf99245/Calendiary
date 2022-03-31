import { createAction, handleActions } from 'redux-actions';

const MODAL_OPEN = 'modal/MODAL_OPEN';
const MODAL_CLOSE = 'modal/MODAL_CLOSE';
const MODAL_TEXT_SET = 'modal/MODAL_TEXT_SET';

export const modalOpen = createAction(MODAL_OPEN, (payload) => payload);
export const modalClose = createAction(MODAL_CLOSE);
export const modalTextSet = createAction(MODAL_TEXT_SET, (payload) => payload);

const initialState = {
  open: false,
  modalDate: null,
  modalText: '',
  modalType: null,
  id: null,
};

const modal = handleActions(
  {
    [MODAL_OPEN]: (state, action) => ({
      ...state,
      open: true,
      modalDate: action.payload[0],
      modalType: action.payload[1],
      modalText: action.payload[2],
      id: action.payload[3],
    }),
    [MODAL_CLOSE]: (state) => ({
      ...state,
      open: false,
    }),
    [MODAL_TEXT_SET]: (state, action) => ({
      ...state,
      modalText: action.payload,
    }),
  },
  initialState
);

export default modal;
