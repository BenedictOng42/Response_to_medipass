/*
 *
 * Home actions
 *
 */

import {
  UPDATE_TABLE,
  UPDATE_TABLE_SUCCESS,
  UPDATE_TABLE_ERROR,
} from './constants';

export function updateTable(page, rowPerPage) {
  return {
    type: UPDATE_TABLE,
    page,
    rowPerPage,
  };
}

export function updateTableSuccess({ result, page, totalCount }) {
  return {
    type: UPDATE_TABLE_SUCCESS,
    result,
    page,
    totalCount,
  };
}

export function updateTableError(error) {
  return {
    type: UPDATE_TABLE_ERROR,
    error,
  };
}
