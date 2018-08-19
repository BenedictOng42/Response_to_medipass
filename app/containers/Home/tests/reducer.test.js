import { fromJS } from 'immutable';

import {
  updateTableSuccess,
  updateTableError,
  updateTable,
} from 'containers/Home/actions';

import homeReducer from '../reducer';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      currentPage: fromJS([]),
      totalCount: fromJS(0),
      sorting: fromJS(''),
      error: false,
      loading: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(state, {})).toEqual(expectedResult);
  });
  it('should handle the updateTable action', () => {
    const expectedResult = state.set('loading', true);
    const page = 1;
    const rowPerPage = 1;
    expect(homeReducer(state, updateTable(page, rowPerPage))).toEqual(
      expectedResult,
    );
  });
  it('should handle the updateTableSuccess action', () => {
    const totalCount = 0;
    const page = 0;
    const result = [];
    const expectedResult = state
      .set('currentPage', fromJS(result))
      .set('loading', false)
      .set('totalCount', totalCount)
      .set('error', false);
    expect(
      homeReducer(state, updateTableSuccess({ result, page, totalCount })),
    ).toEqual(expectedResult);
  });
  it('should handle the updateTableError action', () => {
    const error = new Error('error');
    const expectedResult = state
      .set('error', error.toString())
      .set('loading', false);
    expect(homeReducer(state, updateTableError(error))).toEqual(expectedResult);
  });
});
