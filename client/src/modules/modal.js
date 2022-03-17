import { createAction, handleActions } from 'redux-actions';

const MODAL_OPEN = 'modal/MODAL_OPEN';
const MODAL_CLOSE = 'modal/MODAL_CLOSE';

export const modalOpen = createAction(MODAL_OPEN, (payload) => payload);
export const modalClose = createAction(MODAL_CLOSE);

const initialState = {
  open: false,
  modalDate: null,
};

const modal = handleActions(
  {
    [MODAL_OPEN]: (state, action) => ({
      ...state,
      open: true,
      modalDate: action.payload,
    }),
    [MODAL_CLOSE]: (state) => ({
      ...state,
      open: false,
    }),
  },
  initialState
);

export default modal;
