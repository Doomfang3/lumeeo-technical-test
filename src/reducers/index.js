import { combineReducers } from 'redux';
import coinReducer from './coinReducer';

export default combineReducers({
  currencies: coinReducer
});
