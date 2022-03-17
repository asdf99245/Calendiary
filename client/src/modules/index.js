import { combineReducers } from 'redux';
import date from './date';
import modal from './modal';

const rootReducer = combineReducers({ date, modal });

export default rootReducer;
