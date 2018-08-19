/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_TABLE,
  UPDATE_TABLE_SUCCESS,
  UPDATE_TABLE_ERROR,
} from './constants';

const initialState = fromJS({
  currentPage: fromJS([]),
  totalCount: fromJS(0),
  error: false,
  loading: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TABLE:
      return state.set('loading', true);
    case UPDATE_TABLE_SUCCESS:
      return state
        .set('currentPage', fromJS(action.result))
        .set('loading', false)
        .set('totalCount', action.totalCount)
        .set('error', false);
    case UPDATE_TABLE_ERROR:
      return state
        .set('error', fromJS(action.error.toString()))
        .set('loading', false);
    default:
      return state;
  }
}

export default homeReducer;
