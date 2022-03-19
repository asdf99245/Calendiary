import { combineReducers } from 'redux';
import date from './date';
import modal from './modal';
import user from './user';

const rootReducer = combineReducers({ date, modal, user });

export default rootReducer;
