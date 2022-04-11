import { combineReducers } from 'redux';
import date from './date';
import modal from './modal';
import user from './user';
import diary from './diary';

const rootReducer = combineReducers({ date, modal, user, diary });

export default rootReducer;
