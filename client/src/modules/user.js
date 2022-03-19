import { createAction, handleActions } from 'redux-actions';

const USER_LOGIN = 'user/USER_LOGIN';
const USER_LOGOUT = 'user/USER_LOGOUT';

export const userLogin = createAction(USER_LOGIN, (payload) => payload);
export const userLogout = createAction(USER_LOGOUT);

const initialState = {
  isLogin: false,
  user_id: '',
  user_name: '',
};

const user = handleActions(
  {
    [USER_LOGIN]: (state, action) => ({
      ...state,
      isLogin: true,
      user_id: action.payload.user_id,
      user_name: action.payload.user_name,
    }),
    [USER_LOGOUT]: (state) => ({
      ...state,
      isLogin: false,
      user_id: '',
      user_name: '',
    }),
  },
  initialState
);

export default user;
