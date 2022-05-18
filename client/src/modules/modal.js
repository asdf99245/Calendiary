import { createAction, handleActions } from 'redux-actions';

const MODAL_OPEN = 'modal/MODAL_OPEN';
const MODAL_CLOSE = 'modal/MODAL_CLOSE';
const MODAL_CHANGE_TYPE = 'modal/MODAL_CHANGE_TYPE';

export const modalOpen = createAction(MODAL_OPEN, (payload) => payload);
export const modalClose = createAction(MODAL_CLOSE);
export const modalChangeType = createAction(
  MODAL_CHANGE_TYPE,
  (payload) => payload
);

const initialState = {
  open: false,
  modalDate: null,
  modalType: null,
};

const modal = handleActions(
  {
    [MODAL_OPEN]: (state, action) => ({
      ...state,
      open: true,
      modalDate: action.payload[0],
      modalType: action.payload[1],
    }),
    [MODAL_CLOSE]: (state) => ({
      ...state,
      open: false,
    }),
    [MODAL_CHANGE_TYPE]: (state, action) => ({
      ...state,
      modalType: action.payload,
    }),
  },
  initialState
);

export default modal;
