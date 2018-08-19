import { createSelector } from 'reselect';

/**
 * Direct selector to the home state domain
 */
const selectHomeDomain = state => state.get('home');

const makeSelectCurrentPage = () =>
  createSelector(selectHomeDomain, home => home.get('currentPage').toJS());

const makeSelectTotalCount = () =>
  createSelector(selectHomeDomain, home => home.get('totalCount'));

const makeSelectLoading = () =>
  createSelector(selectHomeDomain, home => home.get('loading'));

const makeSelectError = () =>
  createSelector(selectHomeDomain, home => home.get('error'));

// export default makeSelectHome;
export {
  selectHomeDomain,
  makeSelectCurrentPage,
  makeSelectTotalCount,
  makeSelectLoading,
  makeSelectError,
};
