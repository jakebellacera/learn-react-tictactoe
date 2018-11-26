import { combineReducers } from 'redux';
import board from './board';
import historySortOrder from './historySortOrder';

export default combineReducers({
  board,
  historySortOrder
});
